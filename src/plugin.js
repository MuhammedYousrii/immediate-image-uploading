import immediateImageUploading from './js';
import './scss/index.scss';


if (module.hot) {
    module.hot.accept(/\.(js?$|scss)/, () => {
        console.log('all the dependencies have been accepted');
    });
}

console.log($);

// $.fn.immediateImageUploading = function (options) {
//     return this.each(function () {
//         new immediateImageUploading(this, options);
//     });
// };

// $('#ahmed').immediateImageUploading({
//     multi: true,
//     uploadBtnText: "upload Images"
// });
