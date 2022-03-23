//функция добавления класов в зависимости от поддержки браузером webp
export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height >= 1);
        };
        webP.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";
    }

    testWebP(function (support){
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className)
    })
}