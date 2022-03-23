//import browserSync from "browser-sync";

//запуск сервера
async function sr(done) {
    try {
        let browser;
        browser = await app.plugins.browserSync.init({
            server: `${app.path.build.html}`,
            port: 8080
        }, done);
        return browser
    } catch (error) {
        throw new Error(`Unable to get currency PRODUCTS`);
    }
}

export const  server = sr;

/*
export const server = (done) => {
    app.plugins.browserSync.init({
        server:{
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: 3000,
    })
}*/
