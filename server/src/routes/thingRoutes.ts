import express, { Request, Response } from 'express'
import { Thing } from '../Models/Thing'

const router = express()

router.route('/')
    .get(
        async (req: Request, res: Response) => {
        const items = await Thing.find({})
        res.status(200).json({
            message: 'Hello from the server! Here are the items:',
            data: items
        })
    })
    .post(
        async (req: Request, res: Response) => {
        if (!req.body.name) {
            res.status(400).json({ message: 'Name is required' })
            return
        }
        if (req.body.age && typeof req.body.age !== 'number') {
            res.status(400).json({ message: 'Age must be a number' })
            return
        }
        const created = await Thing.create({
            name: req.body.name,
            age: req.body.age
        })
        res.status(200).json(created)
    })

export default router
