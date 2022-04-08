# one_html

たにぐちさんのページが素晴らしいので真似して作ってみた

- HTML,CSS,JS一つずつで
- Webpackを使って
- 面倒なギミックはマルパクリあり
- なるべく古いブラウザ(IE11)対応を目指す
- railsAPIでcontactを受け取る

heroku set up

    $heroku create onehtml
    $git push heroku master
    $heroku addons:create heroku-postgresql
    $heroku run rails db:migrate


## 動作させるにはwebpackdevserver(フロント)とjsonserver(バック)の場合
    cd <プロジェクトフォルダ>
    npm run start
    npm run json
    ブラウザでlocalhost:8080にアクセス

## 動作させるにはwebpackdevserver(フロント)とRails(バック)の場合
    cd <プロジェクトフォルダ>
    npm run start
    cd api
    rails db:create
    rails db:migrate
    rails s
    ブラウザでlocalhost:8080にアクセス

## 動作させるにはRails(docker)の場合
    cd <プロジェクトフォルダ>
    docker-compose build
    docker-compose run web rails db:create
    docker-compose run web rails db:migrate
    docker-compose up -d
    ブラウザで192.168.99.100:3000にアクセス


## リリース
1. V1
1. スクロールのバグを修正
1. rails対応
1. 同一origin対応
1. docker対応