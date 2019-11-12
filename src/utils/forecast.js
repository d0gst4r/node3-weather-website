const request = require('request')
const forecast = (longt, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/f5b157c2016f52741eb50826fd705cb2/' + longt + ',' + lat + '?units=si'
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast api', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.apparentTemperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. ' + 'Max Temptrature: ' + body.daily.data[0].temperatureMax + ' and Min Temprature: ' + body.daily.data[0].temperatureMin + '.')
        }
    })
}

module.exports = forecast