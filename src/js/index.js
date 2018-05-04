class immediateImageUploading {
    constructor(el, options) {
        this.default = {
            multi: true,
            btnText: 'upload'
        }
        this.indexer = 0;

        this.init();
    }

    configuration() {
        this.config = Object.assign({}, this.default, options); 
    }

    markupCreator(files, index) {
        return $(
            '<figure class="${} img-block"> <button id="remove-image" type="button"> <i class="fa fa-times" aria-hidden="true"></i></button> <div class="clearfix"></div> <img class="img-responsive img-thumbnail" alt="' + e.target.files["" + index + ""].name + '" src=' + window.URL.createObjectURL(e.target.files["" + index + ""]) + ' data-index="' + index + '"><figcaption id="image-name">' + e.target.files["" + index + ""].name + '</figcaption></figure>'
        );
    }


    globalMarkupCreator() {
        this.imagesContainer = $(`
            <section></section>
        `);
        this.uploadBtn = $(`<button> ${this.config.btnText} </button>`);

        this.el.after(this.imagesContainer);
        this.imagesContainer.after(this.uploadBtn);
    }

    uploadImage(e) {
        const files = e.target.files; 
        const imagesLength = e.target.files.length;
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

    firing() {
        this.uploadBtn.click(() => {
            this.el.click();
        })

        this.el.change((e) => {
            this.uploadImage(e);
        })
    }

    init() {
        this.configuration();
        this.globalMarkupCreator();
        this.firing();
    }
}


export default immediateImageUploading;