import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from "browser-sync";
import zip from "gulp-zip";
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import info from "./package.json";
import replace from "gulp-replace";
import config from "./gulpconfig.json";

const PRODUCTION = yargs.argv.prod;
const server = browserSync.create();
export const serve = done => {
    server.init({
        proxy: config.proxy
    });
    done();
};
export const reload = done => {
    server.reload();
    done();
};
export const clean = () => del(config.cleanFiles);

export const styles = () => {
    return src(config.sourcePaths.scss)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
    .pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(config.deployPaths.scss))
    .pipe(server.stream());
}
export const images = () => {
    return src(config.sourcePaths.images)
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest(config.deployPaths.images));
}

export const svg = () => {
    return src(config.sourcePaths.svg)
    .pipe(svgstore({
        inlineSvg: true
    }))
    .pipe(cheerio({
        run: function ($) {
            $('svg').attr('style', 'display:none');
        },
        parserOptions: {
            xmlMode: true
        }
    }))
    .pipe(dest(config.deployPaths.svg));
}
export const copy = () => {
    return src([config.sourcePaths.root + '/**/*','!src/{images,js,scss}', config.sourcePaths.root + '!/{images,js,scss}/**/*'])
    .pipe(dest(config.deployPaths.root));
}
export const scripts = () => {
    return src(config.sourcePaths.js)
    .pipe(named())
    .pipe(webpack({
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: []
                        }
                    }
                }
            ]
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
            filename: config.deployFiles.js
        }
    }))
    .pipe(dest(config.deployPaths.js));
}
export const compress = () => {
    return src([
        "**/*",
        "!node_modules{,/**}",
        "!bundled{,/**}",
        "!src{,/**}",
        "!.babelrc",
        "!.gitignore",
        "!gulpfile.babel.js",
        "!package.json",
        "!package-lock.json",
    ])
    .pipe(
        gulpif(
            file => file.relative.split(".").pop() !== "zip",
            replace("_themename", info.name)
        )
    )
    .pipe(zip(`${info.name}.zip`))
    .pipe(dest('bundled'));
};

export const watchForChanges = () => {
    watch(config.sourcePaths.scss, styles);
    watch(config.sourcePaths.images, series(images, reload));
    watch([config.sourcePaths.scss], series(copy, reload));
    watch(config.sourcePaths.js, series(scripts, reload));
    watch(config.sourcePaths.svg, svg);
    watch(config.sourcePaths.php, reload);
}
export const dev = series(clean, parallel(styles, images, svg, copy, scripts), serve, watchForChanges);
export const build = series(clean, parallel(styles, images, svg, copy, scripts), compress);
export default dev;
