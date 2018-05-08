import './hot';

import 'jquery';
import immediateImageUploading from './js';
import './scss/index.scss';


$.fn.immediateImageUploading = function (options) {
    return this.each(function () {
        new immediateImageUploading($(this), options);
    });
};

$('#ahmed').immediateImageUploading({
    multi: true,
    btnText: 'upload Images',
    bootstrapClasses: false,
});
