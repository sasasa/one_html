FROM ruby:2.6.4

# nodeのバージョンが6以上であればなんでも良いと思う
RUN curl -SL https://deb.nodesource.com/setup_10.x | bash
# 最新のyarnを取得
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn sqlite3 libsqlite3-dev vim
RUN mkdir /myapp
WORKDIR /myapp
COPY ./api/Gemfile /myapp/Gemfile
COPY ./api/Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY ./api /myapp


# Gemfile
# source 'https://rubygems.org'



# docker-machine ip default
# 192.168.99.100
# docker-compose run web rails new . --force --database=postgresql --skip-test --skip-turbolinks --skip-bundle
# docker-compose build
# vim config/database.yml
# host: db
# username: postgres
# password:

# docker-machine ssh default
# docker volume ls
# /var/lib/docker/volumes

# docker-compose run web rails db:create
# docker-compose run web rails db:migrate
# docker-compose up -d

# docker-compose exec web bash

# 192.168.99.100:3000

# docker-compose ps

# docker-compose stop↓
# docker-compose start↑

# docker-compose down -v

