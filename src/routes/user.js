// * Libraries
import { Router } from 'express'

// * Controllers
import { CONTROLLER_USER } from '../controllers'

// * Middlewares
import { Authenticate } from '../middlewares'

const router = Router()

router.get('/profile', Authenticate(), CONTROLLER_USER.profile)

export default router
