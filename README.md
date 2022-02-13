# contact-manager

## Description

A simple web application with a contact home. It can create, read, edit and delete contacts.
It have users and authentication system based in cookie session. Use [passport](https://www.npmjs.com/package/passport)
and [passport-local](https://www.npmjs.com/package/passport-local) as local strategy.

## Resources

* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [connect-flash](https://www.npmjs.com/package/connect-flash)
* [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [express-session](https://www.npmjs.com/package/express-session)
* [passport](https://www.npmjs.com/package/passport)
* [passport-local](https://www.npmjs.com/package/passport-local)
* [pg](https://www.npmjs.com/package/pg)
* [nodemon](https://www.npmjs.com/package/nodemon)

## Configuration instructions

Clone repository

```
git clone https://github.com/agustinbarbalase/contact-manager.git
```

Create a ```.env``` file on your repository with the following options:

```
DATABASE_URI=your-database-uri-here
SECRET_COOKIE=your-secret-cookie-here
```

## Installation instructions

### Production

```shell
npm install
npm start
```

### Dev

```shell
npm install
npm run dev
```

## License

This app has a [MIT License](https://opensource.org/licenses/MIT)