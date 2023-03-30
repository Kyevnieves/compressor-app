import { serialize } from 'cookie'

export const serializeToken = (token) =>{
	return serialize('user_token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 1000 * 60 * 60 * 24 * 30,
		path: '/'
	})
}