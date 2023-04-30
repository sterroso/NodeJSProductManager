# E-Commerce Basic API

An API that allows to perform CRUD (create, read, update an delete) operations
on users, products, carts and orders.

## Content

1. [Purpose](#purpose).
2. [Architecture](#architecture).
3. [Endpoints](#endpoints).
   - [Users](#users).
   - [Sessions](#sessions).
   - [Products](#products).
   - [Orders](#orders).
4. [Sample deployment](#sample-deployment).
5. [Further improvement](#further-improvement).
6. [Contact](#contact).

## Purpose

To demonstrate my skills after the Backend course in Coderhouse.

## Architecture

MVC Multi-layered.

## Endpoints

Currently, there are only endpoints for users, products and orders.

### Users

Endpoints for _users_ allow to create new _users_, read, update and delete
existing ones. Update and delete require authenticated and authorized _users_
to be performed.

- [`GET`] `/api/users/`: Retrieves a list of current users. Anybody can
  perform this operation. There's no need to be an authenticated user.
- [`GET`] `/api/users/{userId}`: Retrieves detailed information for a
  specific user, identified by it's userId.
- [`POST`] `/api/users/`: Creates a new user. Only **authenticated**,
  **admin** users can create a new user through this endpoint.

### Sessions

Endpoints for _sessions_ allow new users to acquire a new account by
sumbitting their information: _first name_, _last name_, _email_, _password_,
_date of birth_, _gender_ and _picture_ (optionally).

After registration, users must use one of the _sessions_ endpoints to
confirm their _email_, before being allowed to use it for _logging in_.

It also allows _users_ lo _login_ using their provided _email_ and
_password_.

### Products

_Products_ endpoints allow to get a list of available products, create new
_products_, as well as update and delete existing ones.

### Orders

Endpoints for _orders_ allow.

## Sample deployment

A sample deployment is available throug the [Railway app](https://railway.app)
site.

## Further improvement

An _e-commerce_ API should be able to manage one or more _warehouses_.

## Contact

Sergio Terroso Cabrera [sergio.terroso@gmail.com](maito:sergio.terroso@gmail.com)
