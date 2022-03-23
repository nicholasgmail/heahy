//основные модули
import gulp from "gulp";
//импорт модулей
import {path} from "./gulp/config/path.js";
//Импорт общих плагинов
import {plugins, rel} from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменую
global.app = {
    isBuild: process.argv.includes('--build'), //продакшен
    isDev: !process.argv.includes('--build'), //разрабочика
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import {reset} from "./gulp/tasks/reset.js";
import {html, resetPages} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./gulp/tasks/fonts.js";
import {svgSprive} from "./gulp/tasks/svgSprive.js";
import {zip} from "./gulp/tasks/zip.js";
import {ftp} from "./gulp/tasks/ftp.js";

// Наблюдатель за изменениями в файлах авто выгрузка
/*function watcher() {
    gulp.watch(path.watch.files, gulp.series(copy, ftp));
    gulp.watch(path.watch.html, gulp.series(html, ftp));
    gulp.watch(path.watch.scss, gulp.series(scss, ftp));
    gulp.watch(path.watch.js, gulp.series(js, ftp));
    gulp.watch(path.watch.images, gulp.series(images, ftp));
}*/
// Наблюдатель за изменениями в файлах
async function watcher() {
    try {
        await gulp.watch(path.watch.html).on('change', gulp.series(resetPages, html));
        await gulp.watch(path.watch.scss).on('change', gulp.series(scss));
        await gulp.watch(path.watch.js).on('change', gulp.series(js));
        await gulp.watch(path.watch.images, gulp.series(images));
    }catch (error) {
        throw new Error(`Unable to get currency watcher`);
    }
}

export {svgSprive};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.parallel(fonts, gulp.parallel(html, scss, js, images, svgSprive));


// Построение сценариев выполнение задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//Экспорт сценариев
export {dev}
export {build}
export {deployZIP}
export {deployFTP}

//выподнить сценарий по умолчанию
gulp.task("default", dev);