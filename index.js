/**
 * Cookie-Sink is a simple Express server which delivers a page
 * containing an image from a site that sets cross-site cookies.
 *
 * This server does not set any cookies itself, so `document.cookie`
 * will always be an empty object.
 *
 * This app is deployed at https://cookie-sink.herokuapp.com/
 *
 * You can also erve the page locally using
 *
 *   npm start # from the cookie-sink directory
 * OR
 *   heroku local web
 * OR
 *   npm run start:sink # from the parent directory
 *
 * When you visit the page, use the Developer Tools Inspector to
 * view the cookies that have been set for third-party domains:
 *
 * Chrome: Dev Tools > Application > Storage > Cookies
 * Firefox: Dev Tools > Storage > Cookies
 */

require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const DEFAULT_PORT = "5000" // used by `heroku local web`
const PORT = process.env.PORT || DEFAULT_PORT

app.listen(PORT, () => {
  // Use a different message for running locally or on Heroku
  const message = (PORT === DEFAULT_PORT)
    ? `Ctrl-click to visit local site at http://localhost:${PORT}`
    : `Heroku port: ${PORT}`

  console.log(message)
})

// Log all cookies set by this server. This server sets no cookies,
// so the output should be an empty object.
const showCookies = (request, response, next) => {
  console.log("request.cookies:", request.cookies);
  next()
}

app.use(cookieParser())
app.get("*", showCookies)

// Deliver the requested page, if it exists in the public
// directory
app.use(express.static('public'))

// Send a 404 (Not Found) response for all other routes
app.all("*", (request, response) => {
  response.sendStatus(404)
})