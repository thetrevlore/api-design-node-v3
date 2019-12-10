import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  res.send({ message: 'hello' })
})

app.post('/', (req, res, next) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.get('/data', (req, res) => {
  res.send({ message: 'howdy' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
