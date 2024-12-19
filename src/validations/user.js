import Joi from 'joi'
import { USER_ROLE } from '../utils/user'

export const createAdminUser = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phoneNumber: Joi.string(),
    // country: Joi.string().required(),
    permissions: Joi.array(),
    subscriptionId: Joi.string().required(),
    role: Joi.string().valid(USER_ROLE.CGA, USER_ROLE.SA, USER_ROLE.SAVO, USER_ROLE.RAA, USER_ROLE.RAVO, USER_ROLE.RA),
    picture: Joi.string(),
  }).options({ abortEarly: false })
  // .keys({
  //     firstName: Joi.string().required().label('firstName').messages({
  //         'any.required': `Your {#label} is required`,
  //     }),
  //     lastName: Joi.string().required().label('lastName').messages({
  //         'any.required': `Your {#label} is required`,
  //     })
  // })

  return schema.validate(obj)
}
export const createSubscriber = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phoneNumber: Joi.string().required(),
    payment: Joi.string().valid('e-payment', 'invoiced').required(),
    type: Joi.string().when(Joi.ref('payment'), [{ is: 'invoiced', then: Joi.valid('corporate', 'enterprise') }]),
    // durationInterval: Joi.string().valid('year', 'month').required(),
    // durationIntervalCount: Joi.number().when(Joi.ref('durationInterval'), [
    //   { is: 'year', then: Joi.valid(1) },
    //   { is: 'month', then: Joi.valid(3, 6) },
    // ]),
    companyAddressDetails: Joi.object().required(),
    countryCode: Joi.string().required(),
    companyName: Joi.string().required(),
    companyAddress: Joi.string().required(),
    companyEmployees: Joi.string().required(),
    picture: Joi.string(),
    inTrial: Joi.boolean().default(false),
    // productId: Joi.string().required(),
  }).options({ abortEarly: false })
  // .keys({
  //     firstName: Joi.string().required().label('firstName').messages({
  //         'any.required': `Your {#label} is required`,
  //     }),
  //     lastName: Joi.string().required().label('lastName').messages({
  //         'any.required': `Your {#label} is required`,
  //     })
  // })

  return schema.validate(obj)
}
export const createSACompanyUser = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().valid(USER_ROLE.SA, USER_ROLE.SAVO, USER_ROLE.RAA, USER_ROLE.RAVO, USER_ROLE.RA).required(),
    subscriptionId: Joi.string().required(),
    picture: Joi.string(),
  }).options({ abortEarly: false })
  return schema.validate(obj)
}
export const createRAACompanyUser = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().valid(USER_ROLE.RA, USER_ROLE.RAVO, USER_ROLE.RAA).required(),
    subscriptionId: Joi.string().required(),
    picture: Joi.string(),
  }).options({ abortEarly: false })
  return schema.validate(obj)
}

export const changeCompanyUserStatusValidation = (obj) => {
  const schema = Joi.object({
    status: Joi.number().required(),
  }).options({ abortEarly: false })
  return schema.validate(obj)
}
export const createStripeCheckoutSessionValidation = (obj) => {
  const schema = Joi.object({
    priceId: Joi.string().required(),
    customer: Joi.string().required(),
    sanitizeCompanyName: Joi.string().required(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const subscriberResetPassword = (obj) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const subscriberAdminResetPassword = (obj) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    userId: Joi.string().email().required(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const changeStatus = (obj) => {
  const schema = Joi.object({
    status: Joi.number().required(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const initialRegister = (obj) => {
  const schema = Joi.object({
    countryCode: Joi.string().required(),
    cognitoSub: Joi.string().required(),
    emailVerified: Joi.bool().required(),
    companyName: Joi.string().required(),
    companyAddress: Joi.string().required(),
    companyAddressDetails: Joi.object().required(),
    companyEmployess: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const confirmForgotPassword = (obj) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const v_adminUpdateUser = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
    isRoleUpdate: Joi.bool(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    permissions: Joi.array(),
    role: Joi.string().valid(USER_ROLE.CGA, USER_ROLE.SA, USER_ROLE.SAVO, USER_ROLE.RAA, USER_ROLE.RAVO, USER_ROLE.RA),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
export const updateUser = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
  }).options({ abortEarly: false })

  return schema.validate(obj)
}
