const request = require('request')
const axios = require('axios')



// request({ url: weatherURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {

//     }
// })

const getGeo = async (address) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2VuenIiLCJhIjoiY2p5c2w4bXR4MG40eTNkc2Vudm8xYTI1cyJ9.oC0SL3EnP1lo_h_75sc6xA&limit=1`
    const response = await axios.get(geoURL) 
    const data = response.data
    const long = data.features[0].geometry.coordinates[0]
    const lat = data.features[0].geometry.coordinates[1]
    return {
        long,
        lat
    }
}

const getWeather = async (address) => {
    try {
        const geoData = await getGeo(address)
        const weatherURL = `https://api.darksky.net/forecast/1c2ac9cf96405e17c939d056625894f8/${geoData.lat},${geoData.long}?units=si`
        const response = await axios.get(weatherURL)
        const data = response.data
        const temp = data.currently.temperature
        const chanceRain = data.currently.precipProbability
        const summary = data.daily.data[0].summary
        console.log( `${summary} It is currently ${temp} out. There and there is ${chanceRain}% chance of rain`)
    } catch (error) {
        console.log(error)
    }
}

getWeather('Brisbane')