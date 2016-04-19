# gulp-boiler-ejs-postcss

# version

- 1.0.0

# config

## install

### install

    npm i

### ready for development

    gulp sprite

### start development with clean & watch

    gulp start

### build

    gulp

## build command

### for Product

    gulp

### for dev

    gulp dev

### for local

    gulp local

## watch command

    gulp watch

## sprite command

    gulp sprite

## image optim command

    gulp optim

## es-lint, jshint command

    gulp test

## clean dist/、tmp/ command

    gulp clean


# package

## package installed

- "autoprefixer": "^6.3.4",
- "babel-preset-es2015": "^6.6.0",
- "babelify": "^7.2.0",
- "browser-sync": "^2.11.2",
- "cssnano": "^3.5.2",
- "del": "^1.2.1",
- "es6-promise": "3.1.2",
- "eslint-config-gnavi": "0.0.9",
- "gulp": "^3.9.1",
- "gulp-babel": "^6.1.1",
- "gulp-browserify": "^0.5.1",
- "gulp-concat": "^2.6.0",
- "gulp-concat-util": "^0.5.5",
- "gulp-ejs": "^2.1.1",
- "gulp-htmlmin": "^1.3.0",
- "gulp-imageoptim": "^1.0.3",
- "gulp-jshint": "^2.0.0",
- "gulp-minify-ejs": "^1.0.3",
- "gulp-plumber": "^1.0.1",
- "gulp-postcss": "^6.1.0",
- "gulp-rename": "^1.2.2",
- "gulp-sequence": "^0.4.4",
- "gulp-size": "^2.0.0",
- "gulp-styledocco": "0.0.3",
- "gulp-stylestats": "^1.1.0",
- "gulp-uglify": "^1.5.1",
- "gulp-util": "^3.0.6",
- "gulp-watch": "^4.3.5",
- "gulp.spritesmith": "^6.2.0",
- "jshint": "^2.8.0",
- "precss": "^1.4.0"

# ルートディレクトリ構成

    bin/ ： ビルド・デプロイシェル
    dist/ ： 出力ディレクトリ
    src/ ： 開発ディレクトリ
    tmp/ ： 中間生成物一時保管ディレクトリ
    .editorconfig
    .gitignore
    gulpfile.js
    Makefile ： ビルド・デプロイシェル
    package.json
    README.md
    stats.csv ： stylestatsファイル


# 開発ディレクトリ構成

編集対象は src/ 以下のみ

    src/
      └ ejs/ ： ejs view
        └ data/ ： data
        └ html/ ： page
        └ include/ ： parts
      └ img/ ： 画像
      └ js/ ： js
      └ css/ ： css
        └ all/ ： all.css
      └ sprite/ ： sprite画像
