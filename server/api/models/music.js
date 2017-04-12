import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    group: String,
    title: String,
    date: {
        type: Date,
        default: Date.now
    }
});


let model = mongoose.model('Music', musicSchema);

export default class Music {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, musics) => {
            if (err || !musics) {
                res.sendStatus(403);
            } else {
                res.json(musics);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, music) => {
            if (err || !music) {
                res.sendStatus(403);
            } else {
                res.json(music);
            }
        });
    }

    create(req, res) {
        model.create(req.body,
            (err, music) => {
                if (err || !music) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        music: music,
                    });
                }
            });
    }

    update(req, res) {
      console.log("updating:", req.params.id, "[ body:", req.body);
        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, music) => {
            if (err || !music) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    success: true,
                    music: music,
                });
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
