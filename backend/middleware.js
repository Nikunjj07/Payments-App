const jwt = require("jsonwebtoken");
const zod = require("zod");
const  {JWT_SECRET}  =  require("./config")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({})
    }
    const token = authHeader.split(" ")[1]; //selects the token after Bearer
    
    //
    try{
        const decoded = jwt.verify(token,JWT_SECRET);

        req.userId = decoded.userId;

        next();
    }catch(err){

        res.status(403).json({err})
    }
}

module.exports = {authMiddleware}