import express from 'express';
import Music from '../models/music.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var music = new Music();

    //app.post('/login', music.connect);

    router.get('/', Auth.hasAuthorization, music.findAll);

    router.get('/:id', Auth.hasAuthorization, music.findById);

    router.post('/', music.create);

    router.put('/:id', Auth.hasAuthorization, music.update);

    router.delete('/:id', Auth.hasAuthorization, music.delete);

    app.use('/musics', router);

};
