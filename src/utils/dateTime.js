import { format } from 'date-fns'
import { isEmpty } from 'lodash'

export const getDate = ({ date = Date.now(), formatString = 'yyyy.MM.dd' }) => {
  return format(new Date(date), formatString)
}

export const secsToHours = (s) => {
  const d = Number(s)
  return Math.floor(d / 3600)
}
