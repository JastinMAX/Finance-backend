import { Router } from 'express'
import userRoutes from './user'
import authRoutes from './auth'
import revenueRoutes from './revenue'
import coaRoutes from './coa'
const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/revenue', revenueRoutes)
router.use('/coa', coaRoutes)

export default router
