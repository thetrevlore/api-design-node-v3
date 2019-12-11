import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  // create user
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' })
  }

  const newUser = await User.create(req.body)
  const token = newToken(newUser)
  return res.status(201).send({ token: token })
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' })
  }

  const foundUser = await User.findOne({ email: req.body.email })
  // .select('email password')
  // .exec()
  if (!foundUser) {
    return res.status(401).send({ message: 'user not found' })
  }

  const match = await foundUser.checkPassword(req.body.password)
  if (!match) {
    return res.status(401).send({ message: 'password incorrect' })
  }

  const token = newToken(foundUser)
  return res.status(201).send({ token })
}

export const protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return res.status(401).end()
  }

  const token = req.headers.authorization.split(' ')[1]
  let payload
  try {
    payload = await verifyToken(token)
  } catch (error) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
  // .exec()

  if (!user) {
    return res.status(401).end()
  }

  // verify the token
  // look for jwt in the authorization header
  // 'Bearer lkasdfoinasdfoijf'

  req.user = user
  next()
}
