import express from 'express'
import { Request, Response } from 'express'
import connectToMongoDB from './dbConfig/dbConfig';


const app = express()

connectToMongoDB()

app.get('/', (req: Request, res : Response) => {
    res.status(200).send({Message : "Hello, World!"})
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`)
}); 

