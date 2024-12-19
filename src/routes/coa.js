// * Libraries
import { Router } from 'express'
import { CONTROLLER_COA } from '../controllers/coa'
import { Authenticate } from '../middlewares'

const router = Router()

router.post('/create', Authenticate(), CONTROLLER_COA.create)
router.post('/getCOA', Authenticate(), CONTROLLER_COA.getCOA)

export default router
