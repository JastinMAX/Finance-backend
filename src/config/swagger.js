import { Router } from 'express'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
// import yamlConfig from './swagger.yaml'
// const swaggerDocument = YAML.load('./swagger.yaml') // dist/swagger.yaml
import swaggerDocument from '../../swagger.json'

const router = Router()
const options = {
  explorer: false,
}
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

export default router
