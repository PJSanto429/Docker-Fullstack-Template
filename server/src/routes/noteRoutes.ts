import express, { Request, Response } from 'express'
import { Note } from '../Models/Note'

const router = express()

router.route('/')
    .get(
        async (_req: Request, res: Response) => {
            const allNotes = await Note.find({})
            res.status(200).json(allNotes)
        }
    )
    .post(
        async (req: Request, res: Response) => {
            try {
                if (!req.body.author) {
                    throw new Error('Author is required')
                }
                if (!req.body.title) {
                    throw new Error('Title is required')
                }
                if (!req.body.content) {
                    throw new Error('Note content is required')
                }
                const created = await Note.create({
                    author: req.body.author,
                    title: req.body.title,
                    content: req.body.content
                })
                res.status(200).json(created)
            } catch (err) {
                res.status(400).json({ message: (err as Error).message })
            }
        }
    )

export default router
