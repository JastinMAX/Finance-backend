export const DOC_STATUS = {
  active: 1,
  inactive: 2,
  archived: 3,
  deleted: 4,
}

export const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value)

export const getStatusByValue = (value) => getKeyByValue(USER_STATUS, value)
export const getRoleByValue = (value) => getKeyByValue(USER_ROLE, value)

// Biddi Cars Configs

export const CHALLENGE_STATUS = {
  LIV: 'live',
  CLT: 'completed',
}

export const USER_LEVELS = {
  BEG: 'Beginner',
  INT: 'Intermediate',
  FN: 'Fitness Novice',
  FP: 'Fitness Pro',
  EV: 'Expert Verified',
}

export const USER_TYPES = {
  SYS: 'System',
  USR: 'User',
}

export const SYSTEM_STAFF_ROLE = {
  SSA: 'System Admin',
}

export const SYSTEM_USER_ROLE = {
  USR: 'Zeal User',
}

export const getRoleShortName = (userType, role) => {
  if (userType == USER_TYPES.SYS) {
    return Object.keys(SYSTEM_STAFF_ROLE).find((k) => SYSTEM_STAFF_ROLE[k] === role)
  } else {
    return Object.keys(SYSTEM_USER_ROLE).find((k) => SYSTEM_USER_ROLE[k] === role)
  }
}

export function getCurrentDayName() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDate = new Date()
  return daysOfWeek[currentDate.getDay()]
}

export const getDateForDay = (startDate, targetDay) => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const startDayIndex = new Date(startDate).getDay()
  const targetDayIndex = dayNames.indexOf(targetDay.toLowerCase())

  // Calculate the difference in days
  let dayDifference = targetDayIndex - startDayIndex
  if (dayDifference < 0) {
    dayDifference += 7
  }

  // Calculate the target date
  const targetDate = new Date(startDate)
  targetDate.setDate(targetDate.getDate() + dayDifference)
  return targetDate.toISOString()
}

export function getStartOfDayISO(date) {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return localDate.toLocaleDateString('en-CA')
}

export function getDayName(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
}

export const convertTimeToSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}
