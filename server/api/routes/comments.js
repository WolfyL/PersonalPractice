import express from 'express';
import Comment from '../models/comment.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var comment = new Comment();

    router.get('/', Auth.hasAuthorization, comment.findAll);

    router.get('/:id', Auth.hasAuthorization, comment.findById);

    router.post('/', comment.create);

    router.put('/:id', Auth.hasAuthorization, comment.update);

    router.delete('/:id', Auth.hasAuthorization, comment.delete);

    app.use('/comments', router);

};
