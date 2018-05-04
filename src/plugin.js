import immediate from './js';
import './scss/index.scss';


if (module.hot) {
    module.hot.accept(/\.(js?$|scss)/, () => {
        console.log('all the dependencies have been accepted');
    });
}

$.fn.immediate = function (options) {
    return this.each(function () {
        new immediate(this, options);
    });
};
