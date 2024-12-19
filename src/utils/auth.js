import jwt from 'jsonwebtoken'

// payload can be userID, email or other user details
export const generateToken = (payload) => {
  return new Promise(function (resolve, reject) {
    const tokens = {}

    tokens.accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' }) //1m,1d,1y
    tokens.refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '60m' }) // 1m,1d,1y

    resolve(tokens)
  })
}

// payload can be userID, email or other user details
export const generateOTToken = (payload) => {
  return new Promise(function (resolve, reject) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5m' })
    resolve(token)
  })
}

export const verifyTOTPToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}
