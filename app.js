const request = require('request')

const weatherURL = 'https://api.darksky.net/forecast/1c2ac9cf96405e17c939d056625894f8/37.8267,-122.4233?units=si'
const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Brisbane.json?access_token=pk.eyJ1IjoiZ2VuenIiLCJhIjoiY2p5c2w4bXR4MG40eTNkc2Vudm8xYTI1cyJ9.oC0SL3EnP1lo_h_75sc6xA&limit=1'


request({ url: weatherURL, json: true }, (error, response) => {
    const temp = response.body.currently.temperature
    const chanceRain = response.body.currently.precipProbability
    const summary = response.body.daily.data[0].summary
    console.log( `${summary} It is currently ${temp} out. There and there is ${chanceRain}% chance of rain`)
})

// Geocoding Api
// Address -> Api to lat and long
// use coordinate pair to get the weather

request({ url: geoURL, json: true }, (error, response) => {
    const long = response.body.features[0].geometry.coordinates[0]
    const lat = response.body.features[0].geometry.coordinates[1]
    console.log(lat, long)
})