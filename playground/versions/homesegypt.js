var imageHandler = {
    livePreviewContainer: $('#live-preview-container > .row'),
    uploadBtn: $('#upload-image'),
    input: function() {
        return this.uploadBtn.parent('.button-wrapper').prev('input');
    },


    addImages: function (e) {
        // IF THERE ARE IMAGES UPLOADED
        console.log(e.taregt)
        if (e.target.files && e.target.files[0]) {
            var ImagesLength = e.target.files.length;

            for (var index = 0; index < ImagesLength; index++) {
                var imgBlock = dynamicViews.imgBlockView(e, index);
                console.log(imgBlock);
                // APPEND CREATED IMAGE 
                this.livePreviewContainer.append(imgBlock);
            }
        }
    },

    removeImage: function() {
        var _imageHandler = this;
        this.livePreviewContainer.on('click', '#remove-image' , function(){
            var self = $(this);
            var imgIndex = self.nextAll('img').data('index');
            delete _imageHandler.input()["0"].files[""+imgIndex+""];
            self.parent().fadeOut(250).promise().done(function(){self.remove()});
        })
    },

    init: function(){
        this.input().on('change', e => {
            this.addImages(e);
        })

        this.uploadBtn.on('click', e => {
            this.input().click();
        })
        this.removeImage();
    }
}   