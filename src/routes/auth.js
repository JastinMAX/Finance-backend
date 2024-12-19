// * Libraries
import { Router } from 'express'

// * Controllers
import { CONTROLLER_AUTH } from '../controllers'

// * Middlewares

const router = Router()

// Zeal App User Routes

router.post('/sign-up', CONTROLLER_AUTH.signUp)

router.post('/sign-out', CONTROLLER_AUTH.signOut)

router.post('/sign-in', CONTROLLER_AUTH.signIn)

router.post('/update', CONTROLLER_AUTH.updateUser)

export default router
