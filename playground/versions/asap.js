$('#live-perview-container').on('click', '#remove-image' , function(){
    var self = $(this);
    var imgIndex = self.nextAll('img').data('index');
    delete fileInput["0"].files[""+imgIndex+""];
    self.parent().fadeOut(250).promise().done(function(){$(this).remove()});
})


uplodeImageBtn.on('click', function () {
    uplodeImages()
})
fileInput.on('change', function (e) {
   perviewImage(e);
})

function perviewImage(e) {
    if (e.target.files && e.target.files[0]) {
        var ImagesLength = e.target.files.length ;
        var livePerviewContainer = $('#live-perview-container');
        for(var index = 0 ; index < ImagesLength ; index++){
            var imgBlock = '<figure class="col-lg-2 col-sm-3 col-xs-4 img-block">'
            +'<button id="remove-image" type="button">'
            +'<i class="fa fa-times" aria-hidden="true"></i></button>'
            +'<div class="clearfix"></div>'
            +'<img class="img-responsive img-thumbnail" alt="'+e.target.files[""+index+""].name+'" src='+window.URL.createObjectURL(e.target.files[""+index+""])+' data-index="'+index+'">'
            +'<figcaption id="image-name">'+e.target.files[""+index+""].name+'</figcaption></figure>'
            livePerviewContainer.append(imgBlock);
        }
        
        return true ;
    }
    
    return false ;
}

function removeImage(img){
    var src = img.attr('src');
}