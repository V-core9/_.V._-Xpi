FROM php:7.4-apache

RUN apt-get update & apt-get install -y

RUN docker-php-ext-install mysqli pdo_mysql

# Enable apache mods.
RUN a2enmod php7.4
RUN a2enmod rewrite
RUN a2enmod headers