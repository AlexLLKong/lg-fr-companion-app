import './env.js'
import express from 'express'
const app = express()

app.use(express.json())
const pathRegex = RegExp('(?<=file://)(.+)(?=server.js)')
const staticPath =
	import.meta.url.match(pathRegex)[0] + '/client/build/index.html'

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(staticPath)
	})
}
const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
