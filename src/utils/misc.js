import axios from 'axios'
import { isEmpty } from 'lodash'
import mongoose from 'mongoose'
import { USER_STATUS } from './user'
import { Readable } from 'stream'
import OrderID from 'ordersid-generator'
import numeral from 'numeral'

export const getNewInvoiceNumber = () => {
  // return OrderID('long')
  return OrderID('short', process.env.CLIENT_NAME.replace(' ', ''))
}

export function formatToCurrency(number) {
  return numeral(number).format('$0,0.00')
}

export const getRandomWholeNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export function fRemainingDays({ endDate, startDate = Date.now() }) {
  const countDownDate = new Date(endDate).getTime()
  const now = new Date(startDate).getTime()
  const timeleft = countDownDate - now
  const days = Math.ceil(timeleft / (1000 * 60 * 60 * 24))

  return days
}

export const bufferToStream = (binary) => {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary)
      this.push(null)
    },
  })

  return readableInstanceStream
}

export const removeSeperatorKey = (fileKey) => {
  const seperator = '-seperator-'

  const transformed = fileKey.includes(seperator)
    ? fileKey.slice(fileKey.indexOf(seperator) + seperator.length, fileKey.length)
    : fileKey

  return transformed
}

export const filterNullUndefined = (arr) => {
  const newArray = arr.filter((a) => a !== undefined && a !== null && !isNaN(a))
  return newArray
}

export const getFacebookUserData = async (access_token) => {
  const { data } = await axios.get('https://graph.facebook.com/me', {
    params: {
      fields: ['id', 'email', 'first_name', 'last_name', 'picture'].join(','),
      access_token,
    },
  })
  return data
}

export const getRandomString = () => {
  const random = Math.random().toString(36)
  return random.slice(2, random.length)
}

export const toObjectId = (id) => {
  return mongoose.Types.ObjectId(id)
}

export const getLoginLinkByEnv = () => {
  return process.env.CLOUD === 'DEV_CLOUD' ? process.env.DOMAIN_FRONT_DEV : process.env.DOMAIN_PROD
}

export const getSanitizeCompanyName = (company, countryCode) => {
  console.log('company, countryCode', company, countryCode)
  return countryCode?.toLowerCase() + '-' + company?.toLowerCase().replace(/[^a-z]/gi, '')
}

export const filterDeletedItem = (arr) => {
  return arr.filter((item) => item.status === USER_STATUS.active)
}
export const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const getEndDateByDurationYear = (duration) => {
  const endDate = new Date()
  if (duration !== '1 year') endDate.setFullYear(endDate.getFullYear() + 2)
  else endDate.setFullYear(endDate.getFullYear() + 1)
  return endDate
}

export const sortByLatestDate = (array, key) =>
  array.sort(function (a, b) {
    return new Date(b[key]) - new Date(a[key])
  })

export const extractAssessmentIdFromReportKey = (key) => {
  const arraySplited = key.split('-')
  const keyContainsId = arraySplited.length === 5

  if (keyContainsId) {
    const companyAndId = arraySplited[1]
    const id = companyAndId.slice(companyAndId.indexOf('/') + 1, companyAndId.length)

    return id
  }
}
export const filterReportsByAssessmentIds = (array, ids = []) =>
  array?.filter((item) => {
    const idFromKey = extractAssessmentIdFromReportKey(item?.Key)

    return ids.indexOf(idFromKey) !== -1
  })

export const sortByFirstDate = (array, key) =>
  array.sort(function (a, b) {
    return new Date(a[key]) - new Date(b[key])
  })

export const getShortName = (string) => {
  if (isEmpty(string)) return ''

  let shortName = string.slice(0, 2)
  const splittedName = string.split(' ')

  if (splittedName.length >= 2)
    shortName = splittedName[0].charAt(0) + splittedName[splittedName.length - 1].replace('&\r\n', '').charAt(0)

  return shortName.toUpperCase()
}
