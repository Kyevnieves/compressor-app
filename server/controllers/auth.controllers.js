import User, { encryptPassword, validatePassword } from '../models/User.js'
import { connectionDB } from '../database.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serializeToken } from '../libs/serializeToken.js';
import { encrypt } from '../libs/encryptToken.js'

export const validateToken = async (token, tokenUser)=> {
    return await bcrypt.compare(token, tokenUser);
};

export const logout = (req, res) =>{
	res.clearCookie('user_token');
	res.redirect('/')
}

export const signup = async (req, res, next) => {
	const {username, email, password} = req.body

	if(username != "" && email != "" && password != ""){
		try{
			const newUser = new User({
			username,
			email,
			password
			})

			newUser.password = await encryptPassword(newUser.password)
			const saveUser = await newUser.save();

			// CREANDO TOKEN DE USUARIO
			const token = jwt.sign({_id: newUser._id, email: newUser.email, username: newUser.username}, process.env.TOKEN_SECRET, {
				expiresIn: 60 * 60 * 24
			})

			// ENCRIPTAR JWT
			const tokenEncrypted = encrypt(token)

			// GUARDAR COOKIE EN NAVEGADOR
			const serialized = serializeToken(tokenEncrypted)
			res.setHeader('Set-Cookie', serialized)
			res.cookie('user_token', tokenEncrypted) // USUARIOS MOBILES

			res.redirect('/')

		} catch(err){
			err.message.includes('email_1 dup') ? res.json({message: "correo ya registrado"}) : next()
			res.json({
			"error": err.message
			})
		}
	} else {
		res.json({
			"message": "Faltan campos"
		})
	}
}

export const signin = async (req, res)=>{

	const {email, password} = req.body

	// VERIFICAR SI EXISTE USUARIO
	const user = await User.findOne({email:email})
	if(!user) return res.status(400).json("Email o password wrong")
	// VERIFICAR CONTRASEÑA
	const correctPassword = await validatePassword(password, user.password)
	if(!correctPassword) return res.status(400).json("Invalid password")

	// CREANDO TOKEN DE USUARIO
	const token = jwt.sign({_id: user._id, email: user.email, username: user.username}, process.env.TOKEN_SECRET, {
		expiresIn: 60 * 60 * 24
	})

	// ENCRIPTAR JWT
	const tokenEncrypted = encrypt(token)

	// GUARDAR COOKIE EN NAVEGADOR
	const serialized = serializeToken(tokenEncrypted)

	res.setHeader('Set-Cookie', serialized)
	res.cookie('user_token', tokenEncrypted) // USUARIOS MOBILES
	res.redirect('/')
}

export const signinView = (req, res)=>{
	res.render('auth/signin')
}
export const signupView = (req, res)=>{
	res.render('auth/signup')
}

export const profile = async (req, res) => {
	const user = await User.findById(req.userId)
	if(!user) return res.redirect('/signin')
	/* res.json({
		_id: user._id,
		username: user.username,
		email: user.email
	}); */ 
	res.render('user/profile')
}