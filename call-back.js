const doworkcallback = (callback) => {
  setTimeout(() => {
        // callback('This is my error!',undefined)
        callback(undefined, [1, 5, 7])
  }, 2000)
}
doworkcallback((error, result) => {
	if (error) {
		return console.log(error)
	}
	console.log(result)
})
const geocode = (address, callback) => {
	setTimeout(() => {
	const data =
		{
			latitude: 0,

			longitude: 0
		}
	callback(data)
	}, 2000
	)
}
geocode('Philadelphia', (data) => {
  	console.log(data)
})
console.log(data)
