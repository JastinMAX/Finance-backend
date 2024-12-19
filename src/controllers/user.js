// * Libraries
import { StatusCodes } from 'http-status-codes'
import dotenv from 'dotenv'

dotenv.config()

// * Models
import { User } from '../models'

// * Middlewares
import { asyncMiddleware } from '../middlewares'

export const CONTROLLER_USER = {
  // ZEAL FITNESS APP APIS

  profile: asyncMiddleware(async (req, res) => {
    const { _id } = req.user
    const id = req.query.id
    let userId
    
    if (id) {
      userId = id
    } else userId = _id

    const user = await User.findByIdAndUpdate(
      userId,
      { lastActive: new Date() }, // the update operation
      { new: true } // options for the update operation
    )
      .select('-password') // selecting fields to exclude
      .lean()

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found.',
      })

    res.status(StatusCodes.OK).json({
      data: {
        user,
      },
      message: 'Profiles Fetched Successfully',
    })
  }),
}
