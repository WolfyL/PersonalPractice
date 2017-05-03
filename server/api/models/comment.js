import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userPseudo: {
        type: String,
        required: true
    },
    comment: {
      type: String,
      required: true
    },
    like : [String],
    date: {
        type: Date,
        default: Date.now
    }
});


let model = mongoose.model('Comment', commentSchema);

export default class Comment {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, comments) => {
            if (err || !comments) {
                res.sendStatus(403);
            } else {
                res.json(comments);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, comment) => {
            if (err || !comment) {
                res.sendStatus(403);
            } else {
                res.json(comment);
            }
        });
    }

    create(req, res) {
        model.create(req.body,
            (err, comment) => {
                if (err || !comment) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        comment: comment,
                    });
                }
            });
    }

    update(req, res) {
        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, comment) => {
            if (err || !comment) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    success: true,
                    comment: comment,
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
