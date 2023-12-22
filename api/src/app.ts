import express from 'express'
import connectToMongoDB from './dbConfig/dbConfig';
import routes from '../src/routes/index'

const app = express()
routes(app)
connectToMongoDB()

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`)
}); 

