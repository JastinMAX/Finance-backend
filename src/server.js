import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import routes from './routes'
import { connectMongoDB } from './config/dbConnection'
import { corsConfig } from './config/cors'
import { createServer } from 'node:http'

const app = express()
const server = createServer(app)

connectMongoDB()

const PORT = process.env.PORT || 5000

const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

app.use(logger('dev'))
app.use(cookieParser())
app.use(cors(corsConfig))

app.use(express.json({ limit: '50mb', extended: true }))

app.use('/api', routes)

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

server.listen(PORT, async () => {
  console.log(`[⚡️ server]: Server running on port ${PORT}`)
})

export default server
