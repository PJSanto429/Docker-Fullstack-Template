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
    res.status(200).json({
        message: 'Hello from the server! Here are the items:',
        data: items
    })   
})

// app.delete('/', async (_req: Request, res: Response) => {
//     await Thing.deleteMany({})
//     res.status(200).end()
// })

// app.post('/', async (req: Request, res: Response) => {
//     const created = await Thing.create(req.body)
//     res.status(200).json(created)
// })

// app.put('/:thingId', async (req: Request, res: Response) => {
//     const { thingId } = req.params

//     const updated = await Thing.findByIdAndUpdate(
//         thingId,
//         {
//             $set: req.body
//         },
//         {
//             new: true
//         }
//     )
//     if (!updated) {
//         throw new Error('Thing not found.')
//     }
//     res.status(200).json(updated)
// })

const start = async () => {
    try {
        const port = 5000
        await mongoose.connect('mongodb://mongo:27017/mydb')
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log('Server listening on port ' +  port +'\n\n\n\n\n\n\n\n'))
    } catch (err) {
        console.error('Something went wrong starting the server\n', err)
    }
}

start()
