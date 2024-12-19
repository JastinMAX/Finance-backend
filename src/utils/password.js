import _, { isEmpty } from 'lodash'
import bcrypt from 'bcrypt'
import generator from 'generate-password'

const saltRounds = 10

// export const generateCognitoPassword = () => {
//   const symbol = '@'
//   const randomPosition = Math.floor(Math.random() * 9)
//   const password = generator.generate({
//     length: 8,
//     numbers: true,
//     symbols: false,
//     lowercase: true,
//     uppercase: true,
//     strict: true,
//   })
//   const newPassword = [password.slice(0, randomPosition), symbol, password.slice(randomPosition)].join('')
//   console.log('PASSWORD GENERATED', newPassword)
//   return newPassword
// }

export const generatePassword = (password) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(password)) {
      password = Array(10)
        .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
        .map((x) => x[Math.floor(Math.random() * x.length)])
        .join('')
    }

    // password = '$Google123' // Comment this line to make passwords dynamic
    // console.log('Password For Newly Added User:', password)

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err)

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err)

        resolve(hash)
      })
    })
  })
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err)

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err)

        resolve(hash)
      })
    })
  })
}

// ? @params password=The password user typed, hash=The password stored in DB
export const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(password) || isEmpty(hash)) return resolve(false)
    bcrypt.compare(password, hash).then((isMatch) => {
      console.log(isMatch)
      if (isMatch) return resolve(true)
      else return resolve(false)
    })
  })
}
