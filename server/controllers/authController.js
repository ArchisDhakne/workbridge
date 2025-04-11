import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

export const signup = async (req, res) => {
  const { username, email, password,role } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    })
    //  console.log(newUser);
     
    await newUser.save()

    const token = jwt.sign({ id: newUser._id ,role: newUser.role,name:newUser.username}, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({ user: newUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: ' NO EMAIL Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: ' PASS Invalid credentials' })

    const token = jwt.sign({ id: user._id,role: user.role,name:user.username }, JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
