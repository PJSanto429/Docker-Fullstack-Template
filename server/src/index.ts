import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import bodyParser from 'body-parser'

const { Schema, model } = mongoose

const Thing = model(
    'Thing',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            default: 50
        }
    }, {
        versionKey: false,
        timestamps: true
    })
)

const app = express()

// app.use(cookieParser('eaa2de90-688f-4cbf-99cd-c30f837b3be4'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true
}))

app.get('/', async (req: Request, res: Response) => {
    const items = await Thing.find({})
    console.log('item count ==> ', items.length)
    res.status(200).json({
        message: 'Hello from the server! Here are the items:',
        data: items
    })   
})

app.post('/', async (req: Request, res: Response) => {
    if (!req.body.name) {
        res.status(400).json({ message: 'Name is required' })
        return
    }
    if (req.body.age && typeof req.body.age !== 'number') {
        res.status(400).json({ message: 'Age must be a number' })
        return
    }
    console.log("this is the req body", req.body)
    const created = await Thing.create({
        name: req.body.name,
        age: req.body.age
    })
    res.status(200).json(created)
})

const start = async () => {
    try {
        const port = 5000
        await mongoose.connect('mongodb://root:examplepassword@mongo:27017/mydb?authSource=admin')
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log('Server listening on port ' +  port +'\n\n\n\n\n\n\n\n'))
    } catch (err) {
        console.error('Something went wrong starting the server\n', err)
    }
}

start()
