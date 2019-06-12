const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3492d671788a6aa65a9dc90a80199e55/' + latitude + ',' + longitude+'?units=si'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. The max temperature today would be '+ body.daily.data[0].temperatureMax+' and the minimum would be '+body.daily.data[0].temperatureMin+'. This place is in '+body.timezone+' timezone.')
        }
    })
}

module.exports = forecast