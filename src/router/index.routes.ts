import { Router } from 'express'

import { TITLE } from '../lib/consts'

import { theme } from '../controllers/cookies.controller'

const router = Router()

router.get('/', (req, res, next) => {
  const th = theme(req.cookies.theme)
  if (req.cookies.theme === undefined) {
    res.cookie('theme', th.type).render('index', {
      title: TITLE,
      root: th.css
    })
    return
  }
  res.render('index', {
    title: TITLE,
    root: th.css,
    content: 'home'
  })
})

router.get('/register', (req, res, next) => {
  const th = theme(req.cookies.theme)
  if (req.cookies.theme === undefined) {
    res.cookie('theme', th.type).render('index', {
      title: TITLE,
      root: th.css
    })
    return
  }
  res.render('index', {
    title: TITLE,
    root: th.css,
    content: 'register'
  })
})

export { router as indexRoutes }
