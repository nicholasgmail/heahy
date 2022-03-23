import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import panini from "panini";

export async function resetPages(done) {
    panini.refresh();
    done();
}

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(panini({
            root: `src/html/pages/`,
            layouts: `src/html/layouts/`,
            partials: `src/html/partials/`,
            data: `src/html/data/`,
            helpers: `src/html/helpers/`
        }))
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, './assets/images/'))
        .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            ))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}
