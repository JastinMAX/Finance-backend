import mongoose, { Schema, model } from 'mongoose'
import crypto from 'crypto'
import Joi from 'joi'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

// User Schema
export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    file: Object,
    password: { type: String, select: false },
    role: Object,
    refreshTokens: [String],
  },
  { versionKey: false, timestamps: true }
)

// Token Generation Methods
userSchema.methods.createEmailVerifyToken = function () {
  const emailToken = crypto.randomBytes(32).toString('hex')
  this.emailToken = crypto.createHash('sha256').update(emailToken).digest('hex')
  return emailToken
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

// Joi Validation
export const validateRegistration = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false })
  return schema.validate(obj)
}

userSchema.plugin(mongooseAggregatePaginate)
export const User = model('User', userSchema)
