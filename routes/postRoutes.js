const { Router } = require('express');
const { getAllPosts, createPost, deletePost, updatePost, getOnePost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = Router();

router.use( protect )

router.route('/').get( getAllPosts ).post( createPost );

router.route('/:id').get( getOnePost ).patch( updatePost ).delete( deletePost );


module.exports = router;

