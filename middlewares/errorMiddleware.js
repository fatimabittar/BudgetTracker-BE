const errorHandler=(err,req, res, next)=>{
    const code = res.statusCode ? res.statusCode : 500
    res.status(code)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
 
 }

 module.exports={
    errorHandler,
 }