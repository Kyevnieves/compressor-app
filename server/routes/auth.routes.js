import { Router } from 'express'

const router = Router()

import { TokenValidation } from '../libs/verifyToken.js'
import { validateSession } from '../libs/validateSession.js'


import { logout, signup, signin, profile, signinView, signupView } from '../controllers/auth.controllers.js'

const dirServerViews = 'server/views/'


router.get('/', TokenValidation , (req, res)=>{
	let userInfo = null;
	if(req.user){
		userInfo = {
			username: req.user.username,
			email: req.user.email,
		}
		res.render('index', { userInfo })
	} else {
		res.render('index', { userInfo })
	}
})

router.get('/signup', TokenValidation, validateSession, signupView)
router.get('/signin', TokenValidation, validateSession, signinView)
router.get('/logout', logout)
router.post('/signup', signup)

router.post('/signin', signin)

// RUTA PROTEGIDA
router.get('/profile', TokenValidation, validateSession, profile)


export default router;