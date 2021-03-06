import express from 'express'
import axios from 'axios'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

const app = express()
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20
})
const accessLogStream = fs.createWriteStream(
    path.format({ dir: process.env.LOG_DIR, base: 'access.log' }),
    { flags: 'a' }
)

app.use(morgan('combined', { stream: accessLogStream }))
app.use(limiter)
app.use(express.static('public'))
app.use(helmet())

interface State {
    id: number,
    name: string,
    capital: string,
    royal_capital: string,
    area: number,
    population: number,
    state_flag: string,
    state_website: string,
    wikipedia_page: string
}

interface SimpleState {
    id: number,
    name: string
}

app.get('/state', async (req, res) => {

    try {

        const result = await axios.get(process.env.URI + '/data.json')
        const data = result.data.map((state: State): SimpleState => {
            return { id: state.id, name: state.name }
        })
        return res.json({ success: 1, data: data })

    } catch (error) {

        return res.json({ success: 0, message: 'Something went wrong' })
        
    }
})

app.get('/state/:id', async (req, res) => {

    let id: number = +req.params.id - 1

    try {

        const result = await axios.get(process.env.URI + '/data.json')
        const data: State = result.data[id]
        return res.json({ success: 1, data: data })

    } catch (error) {

        return res.json({ success: 0, message: 'Something went wrong' })

    }
})

app.get('/docs', (req, res) => {
    
    const indexFile = path.format({ dir: process.env.PUBLIC_DIR, base: 'index.html' })
    res.sendFile(indexFile)
})

app.all('*', (req, res) => {

    res.redirect('/docs')
})

export default app