import classify from 'h/classify';
import hasAttr from 'h/hasAttr';

/**
 * @class immediateImageUploading 
 * @author Muhammed Yousrii <muhammed.yuosr y@gmail.com>
 * @version 1.0.0
 * 
 * @summary Re-place The default Browser File-input With Deep Configure Ui
 * @export
 */
class immediateImageUploading {
    constructor(el, options) {
        this.el = el;
        this.name = 'jQuploodo';
        this.default = {
            btnText: 'upload',
            bootstrapClasses: undefined,
            animateTime: 'slow',
            markupClasses: {
                rmBtnClass: 'rm-block',
                block: 'jQuploodo-block',
                blockCaption: 'block-caption',
                uploadBtn: 'upload-btn'
            }
        };
        this.options = options;
        this.indexer = 0;

        this.init();
    }

    
    processOriginal() {
        if (this.config.multi) this.el.attr('multiple', '');
        this.el.css('visibility', 'hidden');
    }

    configuration() {
        this.config = Object.assign({}, this.default, this.options); 
        if (hasAttr(this.el, 'multiple')) {
            this.config.multi = true;
        } else {
            this.config.multi = false;
        }
    }

    bootstrapSupportChecker(supportToAdd) {
        return this.config.bootstrapClasses ? supportToAdd : '';
    }

    markupCreator(files, index) {
        return $(
            `<figure class="${this.config.markupClasses.block} ${this.bootstrapSupportChecker('col')}" data-index="${index}"> 
                <button type="button" class="${this.config.markupClasses.rmBtnClass} ${this.bootstrapSupportChecker('close')}" aria-label="close"> <i> &times;</i> </button> 
                <img class="img-responsive img-thumbnail" alt="${files[index].name}" src="${window.URL.createObjectURL(files[index])}">
                <figcaption class="${this.config.markupClasses.blockCaption}" id="${files[index].name}">${files[index].name}</figcaption>
            </figure>`
        );
    }


    globalMarkupCreator() {
        this.imagesContainer = $(`
            <section id="${this.name}"></section>
        `);
        this.uploadBtn = $(
            `<div><button class="${this.config.markupClasses.uploadBtn} ${this.bootstrapSupportChecker('btn btn-info btn-lg')}">
            ${this.config.btnText} 
            </button></div>`
        );

        this.el.after(this.imagesContainer);
        this.imagesContainer.append(this.uploadBtn);
    }

    uploadImage() {
        const files = this.e.target.files; 
        const imagesLength = this.e.target.files.length;
        // IF THERE ARE ANY FILES UPLOADED

        if (files && files[0]) {
            if (imagesLength > 1) {
                if (this.config.multi) {
                    this.imagesContainer.append(this.markupCreator(files, this.indexer));
                    this.indexer++;
                    if (this.indexer == imagesLength) return this.indexer = 0;
                    return this.uploadImage();

                } else {
                    this.imagesContainer.append(this.markupCreator(files, this.indexer));
                }
            } else {
                return this.imagesContainer.append(this.markupCreator(files, this.indexer));
            }
        }
    }

    removeImage(e) {
        const self = $(e.target);
        const block = self.closest(classify(this.config.markupClasses.block));
        delete this.el[0].files[block.data('index')];
        console.log(this.el[0].files[block.data('index')]);
        block.fadeOut(this.config.animateTime);
    }

    firing() {
        this.uploadBtn.click(() => {
            this.el.click();
        });

        this.el.change((e) => {
            this.e = e;
            this.uploadImage();
        });

        this.imagesContainer.on('click', classify(this.config.markupClasses.rmBtnClass), (e) => {
            this.removeImage(e);
        });
    }

    init() {
        this.configuration();
        this.processOriginal();
        this.globalMarkupCreator();
        this.firing();
    }
}
export default immediateImageUploading;
