# node-fb-oauth-starter
Starter project to use NodeJS (using the MEAN stack) and Satellizer to set up user accounts using Token-Based Facebook 
OAuth Authentication.

## Author's Notes
I hope you find this useful. If something doesn't work, or if the documentation is insufficient, please let me know.

## Overview
We're going to use the MEAN stack to set up a basic user account management system that anyone can 
use as a starter project. We will use Satellizer to do Token-based AngularJS Authentication. It's 
going to be sweet. Once you get it going for Facebook, you can extend the token-based authentication 
to other platforms implementing OAuth authenticaion (e.g. Twitter, LinkedIn, Google, etc...). This is not
the easiest (probably not the best either) way to do Facebook authentication (see 
https://developers.facebook.com/docs/facebook-login/web).  However, it provides a consistent way to do 
authentication across several different platforms and, if Satellizer is kept up to date, will allow you 
to stay up to date with each of the different authentication methods.

## The Stack
* NodeJS
* ExpressJS
* AngularJS
* MongoDB

## Dependencies

### Node Packages
These get installed by npm

* body-parser: https://github.com/expressjs/body-parser
* cookie-parser: https://www.npmjs.com/package/cookie-parser
* debug: https://www.npmjs.com/package/debug
* express: http://expressjs.com/
* jade: http://jade-lang.com/
* morgan: https://www.npmjs.com/package/morgan
* serve-favicon: https://github.com/expressjs/serve-favicon

### Angular Packages
* satellizer: https://github.com/sahat/satellizer

## Process
How did we get this set up.

### Before Doing Anything
You need some tools:

* npm: http://blog.npmjs.org/post/85484771375/how-to-install-npm
* express application generator: `npm install express-generator -g`
* bower: `npm install -g bower` 

### Initialize the package.json file
```
npm init
```

### Initialize Express
```
express code
```
This will create a `code` directory in your current directory. Pull out all of the files into the current directory
except for the package.json file.  Copy the dependencies from the package.json file in the `code` directory to the 
one in the current directory.  This process is kind of annoying, but I like using it instead of starting from the 
exact code that the express tool gives us.  Move the `www` file out of the `bin` directory and into the current
directory and rename the file to `index.js`.  Get rid of the `bin` directory.

### Get the node packages that you need
```
npm install
```

### Test to see that it's working
```
node index.js
```
Assuming it's working, you shouldn't get any errors and you can go to localhost:3000 to see your "Welcome to Express"
message.

### Get the angular libraries set up
```
bower init
```
You're going to need the basic angular library and the satellizer library, so add those dependecies to the `bower.json`
file.
```
  "dependencies": {
    "angular": "1.4.x",
    "satellizer": "0.12.5"
  },
```
I like to install these libraries into `/public/lib`, so let's specify that in a .bowerrc file.
```
{
  "directory": "public/lib"
}
```
Now get the files.
```
bower install
```
You should see the files in `/public/lib`; there will be two directories (`angular` and `satellizer`).

### Update the views
We would like to see something more useful than the default Express html, so let's update the views a little
bit. Update `routes/idnex.js` so that the title is `Token-Based Authentication Starter Kit`

Let's change the layoout, so that there's a convenient button for signing up. Add the following code in 
`layout.jade` to put a sign-in button on all pages. (This will change to a Logout button when a user is already
logged in).

```
button Login with Facebook
```

### Get a Facebook clientId
In order to do authentication, you will need to set up a developer account with the provider of the token. We're going
to be using Facebook for this starter kit, so here's a link to that: https://developers.facebook.com.  You'll have to
"Add an New App" to get the clientId. The exact directions for this process will probably change over time, but here
are a few of the steps at the time of this writing.

* Add a New App
* Select a "Website" App
* Give the App a name.  I think this step is optional, but I always do it to help me keep track of the App.
* For testing purposes, you need to add `http://localhost:3000` as a valid OAuth redirect URI. You can do this in the Advanced tab within Settings.
 