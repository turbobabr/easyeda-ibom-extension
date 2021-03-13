const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const del = require('del');
const Utils = require('./utils');
const LiveReloadClient = require('./live-reload-client');
const chalk = require('chalk');

const log = console.log;

const Config = {
  package: './package.json',
  buildDir: './build',
  distDir: './dist',
  releasesDir: './releases',  
  manifest: './src/platform/manifest.json',
  platformAssets: './src/platform/assets',  
  mainJS: './build/main.js',
  copyAsIs: [
    './src/platform/icon.svg',
    './src/platform/locale.txt'
  ]
};

const cleanDist = () => del([Config.distDir + '/*']);
const copyManifest = () => {
  const pkg = Utils.readJSON(Config.package);
  return gulp.src(Config.manifest)
    .pipe(plugins.jsonEditor({
      version: pkg.version,
      name: pkg.easy.name,
      id: pkg.easy.id,
      description: `v${pkg.version}: ${pkg.easy.description}`,
      author: pkg.author,
      homepage: pkg.easy.homepage
    }))    
    .pipe(gulp.dest(Config.distDir))
};

const copyMain = () => {
  return gulp.src(Config.mainJS)
    .pipe(plugins.modifyFile((content) => {
      const pkg = Utils.readJSON(Config.package);
      const autoIDPrefix = `// extension-${pkg.easy.id}-id\n`;
      return `${autoIDPrefix}${content}`;
    }))
    .pipe(gulp.dest(Config.distDir));
};

const copyPlatformFiles = () => {
  return gulp.src(Config.copyAsIs)
    .pipe(gulp.dest(Config.distDir));
};

const copyPlatformAssets = () => {
  return gulp.src([Config.platformAssets+`/*.*`,`!${Config.platformAssets}/readme.txt`])    
    .pipe(gulp.dest(Config.distDir));
};

const cleanRelease = () => del([Config.releasesDir + '/*']);

const buildReleaseArchive = () => {
  const pkg = Utils.readJSON(Config.package);
  const filename = Utils.buildArchiveFileName(pkg.version);
  return gulp.src(Config.distDir + '/**/*')
    .pipe(plugins.zip(filename))
    .pipe(gulp.dest(Config.releasesDir));
};

const build = () => {
  return gulp.series(cleanDist,copyManifest,copyMain,copyPlatformFiles,copyPlatformAssets);
};

const release = (callback = () => {}) => {
  return gulp.series(cleanRelease,buildReleaseArchive,callback);
};

const buildWithLiveReload = () => {
  return gulp.series(
    gulp.series(cleanDist,copyManifest,copyMain,copyPlatformFiles,copyPlatformAssets),
    (callback) => {
      LiveReloadClient.ping((alive) => {
        if(!alive) {
          log(chalk.keyword('orange')('[live-reaload]: Live reaload server is down! Run `npm run live-reload` as an independent process in separate terminal.'));
        } else {
          log(chalk.keyword('greenyellow')('[live-reaload]: Request has been sent...'));          
        }

        LiveReloadClient.installExtension(path.resolve(__dirname, '..' ,Config.distDir));      
        callback();
      })      
    }
  );
};

const buildTask = () => {
  return build()();
}

const releaseTask = (callback) => {
  return release(callback)();
}

const buildWithLiveReloadTask = () => {
  return buildWithLiveReload()();
}

module.exports = {
  build: buildTask,
  buildWithLiveReload: buildWithLiveReloadTask,
  releaseTask: releaseTask
};

