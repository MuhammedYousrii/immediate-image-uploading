import immediate from './js';
import './scss/index.scss';



$.fn.immediate = function(options) {
    return this.each(function() {
        new immediate(this, options)
    });
}