import express from 'express'

// routes
import thingRoutes from './thingRoutes'

const mainRouter = express()

mainRouter.use(thingRoutes)

export default mainRouter
