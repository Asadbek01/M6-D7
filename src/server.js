import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mongoose from "mongoose"

import usersRouter from "./services/users/index.js"
import { badRequestHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js"

const server = express()

const port = process.env.PORT || 3001

// ******************************* MIDDLEWARES *************************************

server.use(cors())
server.use(express.json())

// ******************************** ROUTES *****************************************

server.use("/users", usersRouter)

// ******************************** ERROR HANDLERS *********************************

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!")

  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server running on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})
