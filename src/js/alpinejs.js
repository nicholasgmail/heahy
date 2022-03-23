import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'

var $ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
$ready(() => {
    window.Alpine = Alpine;
    Alpine.plugin(intersect);
    Alpine.start();
})

