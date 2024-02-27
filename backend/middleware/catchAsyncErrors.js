
// module.exports = (theFunc)=>(req,res,next)=>{
//     Promise.resolve(theFunc(req,res,next)).catch(next);
// };

const theFunc = (theFunc)=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
}
module.exports = theFunc