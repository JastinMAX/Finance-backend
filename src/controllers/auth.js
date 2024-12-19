// * Libraries
import { StatusCodes } from 'http-status-codes'

import dotenv from 'dotenv'

dotenv.config()

// * Models
import { User } from '../models'

// * Middlewares
import { asyncMiddleware } from '../middlewares'

import { comparePassword, generatePassword, generateToken } from '../utils'

export const CONTROLLER_AUTH = {
  signUp: asyncMiddleware(async (req, res) => {
    const { name, email, password } = req.body
    // Check if user already exists
    const user = await User.findOne({ email })
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email already exists.',
      })
    }

    // Hash Password
    const hashedPassword = await generatePassword(password)

    // Create New User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    const tokenPayload = {
      _id: newUser._id,
      role: newUser.role, // Ensure it's defined
    }

    const tokens = await generateToken(tokenPayload)

    res.status(StatusCodes.OK).json({
      data: {
        user: { ...newUser._doc },
        ...tokens,
      },
      message: 'User registered successfully',
    })
  }),

  signIn: asyncMiddleware(async (req, res) => {
    const { email, password } = req.body // Changed from req.query to req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found.',
      })
    }

    const isAuthenticated = await comparePassword(password, user.password)

    if (!isAuthenticated) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Incorrect Password or Email.',
      })
    }

    delete user.password

    const tokenPayload = {
      _id: user._id,
      role: user.role,
    }

    const tokens = await generateToken(tokenPayload)

    user.refreshTokens = [tokens.refreshToken]

    await user.save()

    res.status(StatusCodes.OK).json({
      data: {
        user: { ...user._doc },
        ...tokens,
      },
      message: 'Logged In Successfully',
    })
  }),

  signOut: asyncMiddleware(async (req, res) => {
    const { userId } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
    }

    if (user) {
      (user.refreshTokens = ''), (user.accessToken = ''), await user.save()
    }

    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' })
  }),

  updateUser: asyncMiddleware(async (req, res) => {
    const {name, email, password, userId} =req.body
    if (!userId || !name || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Name, email, and userId are required.' })
    }

    const user = await User.findById(userId)
    if(!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found'})
    }

    let hashedPassword;

    if(password) {
      hashedPassword = await generatePassword(password)
    }

    user.name = name, user.email = email, user.password = hashedPassword ;
    await user.save()

    const tokenPayload = {
      _id: user._id,
      role: user.role,
    }

    const tokens = await generateToken(tokenPayload)
    
    res.status(StatusCodes.OK).json({
      data: {
        user: { ...user._doc },
        ...tokens,
      },
      message: 'User profile successfully updated!'
    })
  }),
}
