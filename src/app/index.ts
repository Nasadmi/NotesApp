import express from 'express'

import session from 'express-session'

import morgan from 'morgan'

import passport from 'passport'

import cors from 'cors'

import cookieParser from 'cookie-parser'

import * as sass from 'node-sass'

import { config } from 'dotenv'

import * as path from 'node:path'

import { db } from '../lib/db'

import { indexRoutes } from '../router/index.routes'

const app = express()

const scssFolder = path.join(__dirname, '..', '..', 'scss')

config()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.disable('x-powered-by')

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 60 * 24 * 15 // 15 days
  }
}))

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'))
}

app.use(passport.initialize())

app.use(passport.session())

app.use(cors())

app.use(cookieParser())

app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    const scssDirWeb = req.url.replace('.css', '.scss').split('/')
    const scssFile = path.join(scssFolder, scssDirWeb[scssDirWeb.length - 1])
    sass.render({
      file: scssFile,
      outputStyle: 'compressed'
    }, (error, result) => {
      if (error !== null) {
        res.status(500).json({ error: 'File not found or compiler error' })
        return
      }
      res.setHeader('Content-Type', 'text/css')
      res.send(result.css)
    })
  } else {
    next()
  }
})

app.set('views', path.join(__dirname, '..', '..', 'views'))

app.set('view engine', 'ejs')

app.use('/resources', express.static(path.join(__dirname, '..', '..', 'public')))

app.use(indexRoutes)

app.set('port', parseInt(process.env.PORT as string))

app.listen(app.get('port'), () => {
  console.log('Server is listening on port', app.get('port'))
})

db.connect(err => {
  if (err !== null) {
    console.error(err)
  } else {
    console.log('Connected to database')
  }
})
