//получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `dist`;
const srcFolder = `src`;

export const path = {
    build:{
        js: `${buildFolder}/assets/js`,
        images: `${buildFolder}/assets/images`,
        css: `${buildFolder}/assets/css`,
        html: `${buildFolder}`,
        fonts: `${buildFolder}/assets/fonts/`
    },
    src:{
        js: `${srcFolder}/js/*.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/html/pages/**/*.{html,hbs,handlebars}`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        svgicons: `${srcFolder}/svgicons/**/*.svg`
    },
    watch:{
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/html/**/*.{html,hbs,handlebars,yml}`,
        fonts: `${srcFolder}/fonts/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp:`test`
}
