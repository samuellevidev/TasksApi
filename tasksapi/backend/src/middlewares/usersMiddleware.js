const jwt = require('jsonwebtoken')

require('dotenv').config()

class usersMiddleware {
    validateUser(req, res, next) {
        const token = req.headers['x-access-token']
        const secret = process.env.jwtSecret

        if(!token) {
            return res.status(401).json({ error: 'Necessário token' })
        }
        
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    error: 'Token inválido ou expirado',
                    message: err.message
                }).end()
            }
            
            req.userId = decoded.id
            next()
        })
    }
}


module.exports = new usersMiddleware