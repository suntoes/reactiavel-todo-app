<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Host the todo-app with DB locally

First have php, composer and xampp at bay. Next is to clone this repo and jump into it's directory, then install dependencies with `composer install && npm install`.

After that host an apache & mysql database w/ xampp, duplicate `.env.example` to `.env` and make sure DB host, port, and database is matching with xampp DB's url, port, and phpMyAdmin's existing DB name.

Lastly migrate app DB with `php artisan migrate` then run the app with separate terminals for `npm run dev` & `php artisan serve`
