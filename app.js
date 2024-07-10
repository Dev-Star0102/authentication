const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routerUser = require('./router')
const mongodbConeection = require("./config/mongodb");
const cors = require('cors')

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routerUser)
mongodbConeection()

app.get('/', (req, res) => {
    res.send('jadi')
})

app.listen(4000, () => {
    console.log('listening on port 4000')})