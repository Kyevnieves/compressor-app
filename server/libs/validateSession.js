export const validateSession = (req, res, next)=>{
	if(req.user) return res.redirect('/')
	if(!req.user) return next();
}