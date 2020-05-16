import http from 'http'
import app from './app/app'

const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})