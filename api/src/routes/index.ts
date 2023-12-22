import express, { Request, Response } from "express";
import task from './taskRoutes'

const routes = (app : any) => {
    app.route('/').get((req : Request, res: Response) =>{
        res.status(200).send({ 
            Message : "HOUSE HERO 1.00"})
    })

    app.use(
        express.json(),
        task
    )
}

export default routes;