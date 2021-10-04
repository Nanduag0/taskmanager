const request = require('request')
const url = 'http://api.weatherstack.com/current?access_key=3652667981571141c689c14c1f66cbb0&query=37.8267,-122.4233'
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const obj = require('./objects')
const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmFuZHVhZzAiLCJhIjoiY2thOGQyMnJxMGJ6YzJzcDQ5dXAydDFjdiJ9.EyOD6IRaaeuPJO2Bte3eyw'

request({ url: geocodeurl, json: true }, (error, response) => {
	const latitude = response.body.features[0].center[1]
	const longitude = response.body.features[0].center[0]
	console.log(latitude, longitude)
})

request({ url: url, json: true }, (error, response) => {
  	console.log(response.body.current.weather_descriptions[0] + '. degrees out there.There is a ' + response.body.current.feelslike + '%  degrees out.')
})

/* geocode=(address,callback)=>
{
    setTimeout(()=>
    {
        const data={
            longitude:0,
            latitude:0
        }
        callback(data)
    },2000)
}
geocode('Philadelphia',(data)=>
{
    console .log(data)
})
const add=(a,b,callback)=>
{
    setTimeout(()=>
    {
        callback(a+b)
    },2000)
}
 add(1,2,(sum)=>
 {
     console.log(sum)
 })
 forecast(37.8267,-122.4233,(error,data) =>
 {
     console.log('Error',error)
     console.log('Data',data)

 }); */

geocode('Boston', (error, data) => {
	console.log('Error', error)
	console.log('Data', data)
})
