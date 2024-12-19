import { StatusCodes } from 'http-status-codes'
import _, { isEmpty } from 'lodash'

export const validateMiddleware = (validator) => (req, res, next) => {
  const { error } = validator(req.body)
  if (!isEmpty(error)) {
    const messageError = error.message.replace(/\"/g, '')
    const fields = error.details.map((item) => ({
      [item.context.key || item.context.label]: item?.message.replace(/\"/g, ''),
    }))
    const message = {
      error: messageError,
      fields,
    }
    console.log('[💫 validation]: ', message)
    return res.status(StatusCodes.BAD_REQUEST).send(message)
  }
  next()
}
