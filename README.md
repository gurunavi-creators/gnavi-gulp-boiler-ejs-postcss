# gulp-boiler-ejs-postcss

# version

- 1.1.0

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

package.json参照


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
