import express from 'express'

// routes
import noteRoutes from './noteRoutes'

const mainRouter = express()

mainRouter.use(noteRoutes)

export default mainRouter
