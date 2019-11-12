const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


// Define paths for express configs
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Elad Shuster'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Elad Shuster'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful text!',
        name: 'Elad Shuster'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    } else {
        res.send({
            products: [req.query.search]
        })
    }

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided!'
        })
    }

    const location = req.query.address

    geocode(location, (error, { latitude, longtitude, location } = {}) => {
        // console.log('Error: ', error)
        // console.log('Data: ', data)
    
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longtitude, (error, forecastdata) => {
            if (error) {
                return console(error)
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Elad Shuster',
        errorMsg: 'Help Article not found'
        })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Elad Shuster',
        errorMsg: '[*] My 404 page'
    })
})


app.listen(port, () => {
    console.log('[*] Server is up on port ' + port)
})