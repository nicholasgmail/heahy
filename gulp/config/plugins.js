import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";
import postcssPresetEnv from "postcss-preset-env";


//експортируем обьект
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlugin,
    postcssPresetEnv: postcssPresetEnv
}

export async function rel() {
    let reload;
    try {
        reload = await app.plugins.browserSync.reload;
        return reload
    } catch (error) {
        throw new Error(`Unable to get currency PRODUCTS`);
    }
}