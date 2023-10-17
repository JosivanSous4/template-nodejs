import { app } from './app'
import express from 'express'
import cors from 'cors'
import FileUpload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import swagger from '../docs/swagger.json'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())
server.use(app)
server.use(FileUpload())

server.get('/', (req, res) =>
    res.json({
        status: 'OK'
    })
)

// server.use('/api-docs', express.static('docs'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))

server.use('/api', app)

const PORT = process.env.PORT || 80
server.listen(PORT, () => {
    console.log(`Server run in port: ${PORT}`)
})
