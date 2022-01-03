const jwt=require('jsonwebtoken');
const SECRET_KEY = "secretkey123456herbolario";

module.exports ={
 verifyToken(req,res,next){
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({auth:false,message:"No token provided."});
    }

    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(500).send({auth:false,message:'Falló la autenticación. Error: '+err})
        }
        req.userId=decoded;
        next()
    });
 }                       
}