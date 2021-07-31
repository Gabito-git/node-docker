const Post = require("../models/postModel");

const getAllPosts = async ( req, res ) => {

    try {
        const posts = await Post.find();

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail"
        })
    }    

}

const getOnePost = async( req, res ) => {

    try {

        const post = await Post.findById( req.params.id );

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
        
    } catch (error) {
        
    }

}

const createPost = async( req, res ) => {

    try {

        const post = new Post( req.body );
        await post.save();

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
        
    } catch (error) {
        console.log(error)
    }

}


const updatePost = async( req, res ) => {

    try {

        const post = await Post.findByIdAndUpdate( req.params.id, req.body,{
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
        
    } catch (error) {
       console.log( error ) 
    }

}

const deletePost = async( req, res ) => {

    try {

        const post = await Post.findByIdAndDelete( req.params.id );

        res.status(200).json({
            status: 'success'           
        })
        
    } catch (error) {
       console.log(error) 
    }

}

module.exports={
    getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost
}