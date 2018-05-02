class immediateImageUploading {
    constructor(el, options) {
        this.default = {
            multi: true,
        }
        this.config = Object.assign({}, this.default, options)
    }

    markupCreator() {
        return $(
            '<figure class="${} img-block"> <button id="remove-image" type="button"> <i class="fa fa-times" aria-hidden="true"></i></button> <div class="clearfix"></div> <img class="img-responsive img-thumbnail" alt="' + e.target.files["" + index + ""].name + '" src=' + window.URL.createObjectURL(e.target.files["" + index + ""]) + ' data-index="' + index + '"><figcaption id="image-name">' + e.target.files["" + index + ""].name + '</figcaption></figure>'
        );
    }

    uploadImage(e) {
        // IF THERE ARE ANY FILES UPLOADED
        if (e.target.files && e.target.files[0]) {
            const imagesLength = e.target.files.length;
            if (this.config.multi)
        }
    }
}