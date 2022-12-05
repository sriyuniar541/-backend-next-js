const { response } = require('../middleware/common');
const  ModelComment = require('../models/comment')

const CommentController = {
    
    getComment : (req,res,next) => {
        ModelComment.selectDataComment()
        .then(result => response(res,200,true,result.rows,'get data sukses'))
        .catch(err => response(res,401,false,err,'get data fail'))
    },
     
     insert : (req,res,next) => {
        ModelComment.insertDataComment(req.body)
        .then(result => response(res,200,true,result.rows,'insert data sukses'))
        .catch(err => response(res,401,false,err,'insert data fail'))
    },
}


exports.CommentController = CommentController

