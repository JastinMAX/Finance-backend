// * Libraries
import jwt from 'jsonwebtoken'

// * Models
import { User, ErrorLog } from '../models'

export const generateToken = (payload) =>
  new Promise((resolve, reject) => {
    const token = jwt.sign(payload, process.env.USER_ROLE_JWT_SECRET_KEY, { expiresIn: '9999 years' })
    resolve(token)
  })

export const createUser = async (payload) => {
  const newUser = new User(payload)
  await newUser.save()
  return newUser
}

export const createErrorLog = async ({ body }) => {
  let newErrorLog = await new ErrorLog({ ...body }).save()
  return newErrorLog
}
