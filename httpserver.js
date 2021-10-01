const https = require('https')
const url = 'https://api.weatherstack.com/current?access_key=3652667981571141c689c14c1f66cbb0&query=37.8267,-122.4233'
const request = https.request(url, (response) => {
  let data = ''
  response.on('data', (chunk) => {
    data = data + chunk.toString()
    console.log(chunk)
  })
})
response.on('end', () => {
  const body = JSON.parse(data)
  console.log(body)
})
response.on('error', (error) => {
  console.log('An error', error)
})

// chnk data that comes is a buffer
// we need to change it

request.end()
