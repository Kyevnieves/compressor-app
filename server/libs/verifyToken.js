import jwt from 'jsonwebtoken'
import { decrypt } from '../libs/encryptToken.js'

export const TokenValidation = (req, res, next) => {
	const { user_token } = req.cookies
	if(!user_token) return next()
	const tokenDecrypted = decrypt(user_token)

	try{
		const payload = jwt.verify(tokenDecrypted, process.env.TOKEN_SECRET)
		req.user = {
			username: payload.username,
			email: payload.email
		};
		// req.userId = payload._id;
		// req.userEmail = payload.email;
		// req.username = payload.username;
	} catch(err){
		console.log(err)
	}	
	next();
}