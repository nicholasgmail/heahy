import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import gulpPostcss from 'gulp-postcss';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webp-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import nodeSassTildeImporter from 'node-sass-tilde-importer';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../images/'))
        .pipe(sass.sync({
            outputStyle: 'expanded',
            importer: nodeSassTildeImporter
        }))
        .pipe(app.plugins.if(
            app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(
            app.isBuild, webpcss({
                webpCss: ".webp",
                noWebpClass: ".no-webp"
            })))
        .pipe(app.plugins.if(
            app.isBuild, autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })))
        .pipe(gulpPostcss([
            app.plugins.postcssPresetEnv({
                stage: 2,
                browsers: 'last 3 versions',
                autoprefixer: {grid: false, cascade: false},
                features: {'nesting-rules': true}
            })
        ]))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(
            app.isBuild, cleanCss()))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
}