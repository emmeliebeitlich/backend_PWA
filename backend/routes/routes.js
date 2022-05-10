const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');
const webpush = require('web-push');


/**
 * Push Notifications
 *
 */


const vapidKeys = {
    "publicKey": "BGN198g_25a8YR1G9fpxp2dhFyHbPZrfWM8UWOSgVebwUAfCQb9aQBRExDBF_5HKEWVqH-6oAEfHMCyH6Tfa080",
    "privateKey": "8lIagNaeuvtj1991Fw534dStLH1Kojt6oLmaCG6JTvQ"
}

webpush.setVapidDetails(
    'mailto:finn.owe.freiheit@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const tempDataBase = [];

router.post('/subscription',(req, res) => {
    //ToDO Safe in MongoDB
    tempDataBase.push(req.body)
    console.log(req.body);
    res.send(tempDataBase);
});

router.post('/sendNotification', (req, res) => {
    const notificationPayload = {
        notification: {
            title: 'Neue Notification',
            body: 'Das ist der Inhalt der Notification'
        },
    }
    const promises = []
    tempDataBase.forEach(subscription => {
        promises.push(
            webpush.sendNotification(
                subscription,
                JSON.stringify(notificationPayload)
            )
        )
    })
    Promise.all(promises)
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => console.log('Push Error: ',err));
});





/**
 * GET Methods
 */


// get all users
router.get('/users', async(req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
});

// get user by id
router.get('/users/id/:id', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(user);
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});



// get username of user by id
router.get('/users/id/:id/username', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(user.username);
    } catch {
        res.status(404);
        res.send({
            error: "Username does not exist!"
        });
    }
});

// get password of user by id
router.get('/users/id/:id/password', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(user.password);
    } catch {
        res.status(404);
        res.send({
            error: "Password does not exist!"
        });
    }
});

// get pictureID of user by id
router.get('/users/id/:id/pictureId', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(user.pictureId);
    } catch {
        res.status(404);
        res.send({
            error: "pictureID does not exist!"
        });
    }
});

// get all comments
router.get('/comments', async(req, res) => {
    const allComments = await Comment.find();
    console.log(allComments);
    res.send(allComments);
});

// get comment by id
router.get('/comments/:id', async(req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(comment);
    } catch {
        res.status(404);
        res.send({
            error: "Comment does not exist!"
        });
    }
});

// get username of comment by id
router.get('/comments/:id/username', async(req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(comment.username);
    } catch {
        res.status(404);
        res.send({
            error: "Username does not exist!"
        });
    }
});

// get message of comment by id
router.get('/comments/:id/message', async(req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(comment.message);
    } catch {
        res.status(404);
        res.send({
            error: "Message does not exist!"
        });
    }
});

// get all posts
router.get('/posts', async(req, res) => {
    const allPosts = await Post.find();
    console.log(allPosts);
    res.send(allPosts);
});

// get post by id
router.get('/posts/:id', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(post);
    } catch {
        res.status(404);
        res.send({
            error: "Post does not exist!"
        });
    }
});

// get caption of post by id
router.get('/posts/:id/caption', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(post.caption);
    } catch {
        res.status(404);
        res.send({
            error: "Caption does not exist!"
        });
    }
});

// get picture of post by id
router.get('/posts/:id/picture', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(post.picture);
    } catch {
        res.status(404);
        res.send({
            error: "Picture does not exist!"
        });
    }
});

// get geoloc of post by id
router.get('/posts/:id/geoloc', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(post.geoloc);
    } catch {
        res.status(404);
        res.send({
            error: "Geoloc does not exist!"
        });
    }
});

// get all likes
router.get('/likes', async(req, res) => {
    const allLikes = await Like.find();
    console.log(allLikes);
    res.send(allLikes);
});

// get like by id
router.get('/like/:id', async(req, res) => {
    try {
        const like = await Like.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(like);
    } catch {
        res.status(404);
        res.send({
            error: "Like does not exist!"
        });
    }
});

// get userID of like by id
router.get('/like/:id/userId', async(req, res) => {
    try {
        const like = await Like.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(like.userId);
    } catch {
        res.status(404);
        res.send({
            error: "UserID does not exist!"
        });
    }
});

// get pictureID of like by id
router.get('/like/:id/pictureId', async(req, res) => {
    try {
        const like = await Like.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(like.pictureId);
    } catch {
        res.status(404);
        res.send({
            error: "PictureID does not exist!"
        });
    }
});




/**
 * POST Methods
 */

// post one user
router.post('/users', async(req, res) => {
    const newUser = new User({
        _id: req.params.id,
        username: req.body.username,
        password: req.body.password,
        pictureId: req.body.pictureId,
    })
    await newUser.save();
    res.send(newUser);
});

// post one comment
router.post('/comments', async(req, res) => {
    const newComment = new Comment({
        _id: req.params.id,
        message: req.body.message,
        username: req.body.pictureId,
    })
    await newComment.save();
    res.send(newComment);
});

// post one post
router.post('/posts', async(req, res) => {
    const newPost = new Post({
        _id: req.params.id,
        caption: req.body.caption,
        picture: req.body.picture,
        geoloc: req.body.geoloc,
    })
    await newPost.save();
    res.send(newPost);
});

// post one like
router.post('/likes', async(req, res) => {
    const newLike = new Post({
        _id: req.params.id,
        userId: req.body.userId,
        pictureId: req.body.pictureId,
        
    })
    await newLike.save();
    res.send(newLike);
});


/**
 * PATCH Methods
 */

// update one user
router.patch('/users/:id', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (req.body.username) {
            user.username = req.body.username
        }

        if (req.body.password) {
            user.password = req.body.password
        }

        await User.updateOne({ _id: req.params.id }, user);
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

// update one post
router.patch('/post/:id', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })

        if (req.body.caption) {
            post.caption = req.body.caption
        }

        await Post.updateOne({ _id: req.params.id }, post);
        res.send(post)
    } catch {
        res.status(404)
        res.send({ Post: "User does not exist!" })
    }
});


/**
 * DELETE Methods
 */

// delete one user by id
router.delete('/users/:id', async(req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

// delete one comment by id
router.delete('/comments/:id', async(req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Comment does not exist!" })
    }
});

// delete one post by id
router.delete('/posts/:id', async(req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});

// delete one like by id
router.delete('/likes/:id', async(req, res) => {
    try {
        await Like.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Like does not exist!" })
    }
});


// login 
// searching for user by username and password, if there's one user with this data, login is successfull, if not error 

router.get('/users/login', async(req, res) => {
    try {
        const user = await User.findOne({ 
            username: req.body.username,
            password: req.body.password,
        });
        console.log('login request');
        res.send(user.id);
    } catch {
        res.status(401);
        res.send({
            error: "Username or password wrong!"
        });
    }
});

module.exports = router;