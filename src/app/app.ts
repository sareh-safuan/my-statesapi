import express from 'express'
import axios from 'axios'

const app = express()

app.use(express.static('public'))

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

app.get('/states', async (req, res) => {

    try {
        
        const result = await axios.get(process.env.URI + '/data.json')
        const data = result.data.map((state: State): SimpleState => {
            return { id: state.id, name: state.name }
        })
        return res.json({ success: 1, data: data })

    } catch (error) {
        
        console.log(error)
        return res.json({ success: 0, message: 'Something went wrong' })

    }
})

app.get('/state/:id', async (req, res) => {

    let id: number =  +req.params.id - 1
    
    try {
        
        const result = await axios.get(process.env.URI + '/data.json')
        const data: State = result.data[id]
        return res.json({ success: 1, data: data })

    } catch (error) {
        
        console.log(error)
        return res.json({ success: 0, message: 'Something went wrong' })

    }
})

app.get('/docs', (req, res) => {
    res.send('document is here')
})

app.all('*', (req, res) => {
    res.redirect('/docs')
})

export default app