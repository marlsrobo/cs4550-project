import * as usersDao from "../database/users/users-dao.js";
import * as userFollowersDao from "../database/user-followers/user-followers-dao.js";

const usersController = (app) => {
    app.post('/api/signup', signup);
    app.post('/api/signin', signin);
    app.post('/api/signout', signout);
    app.post('/api/profile', profile);

    app.get('/api/users', findAllUsers)
    app.get('/api/users/:id', findUserById)
    app.get('/api/users/name/:name', findUsersByName)

    app.post('/api/users/:follower/follow/:userFollowed', followUser)
    app.delete('/api/users/:follower/unfollow/:userFollowed', unfollowUser)
    app.get('/api/users/:follower/usersFollowing', findFollowedUsersForUser)
    app.get('/api/users/:userFollowed/followers', findFollowersForUser)

    app.get('/api/users/:userId/criticsNotFollowing', findCriticsNotFollowingForUser)
    app.get('/api/users/:userId/listenersNotFollowing', findListenersNotFollowingForUser)

    // app.get('/api/users/email/:email', findUserByEmail)
    // app.post('/api/users/credentials', findUserByCredentials)
    // app.post('/api/users', createUser)
    app.delete('/api/users/:id', deleteUser)
    app.put('/api/users/:id', updateUser)
}

const findCriticsNotFollowingForUser = async (req, res) => {
    const userId = req.params.userId;
    const criticsNotFollowing = await userFollowersDao.findCriticsNotFollowing(userId);
    res.json(criticsNotFollowing);
}

const findListenersNotFollowingForUser = async (req, res) => {
    const userId = req.params.userId;
    const listenersNotFollowing = await userFollowersDao.findListenersNotFollowing(userId);
    res.json(listenersNotFollowing);
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers()
    res.json(users)
}
const findUserById = async (req, res) => {
    const userId = req.params['id']
    const user = await usersDao.findUserById(userId)
    res.json(user)
}

const findUsersByName = async (req, res) => {
    const userName = req.params['name']
    const users = await usersDao.findUsersByName(userName)
    res.json(users)
}

const findUserByEmail = async (req, res) => {
    const email = req.params.email
    const user = await usersDao.findUserByEmail(email)
    res.json(user)
}
const findUserByCredentials = async (req, res) => {
    const crendentials = req.body
    const email = crendentials.email
    const password = crendentials.password
    const user = await usersDao.findUserByCredentials(email, password)
    if(user) {
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
}
const createUser = async (req, res) => {
    const newUser = req.body
    const insertedUser = await usersDao.createUser(newUser)
    res.json(insertedUser)
}
const deleteUser = async (req, res) => {
    const userId = req.params.id
    const status = await usersDao.deleteUser(userId)
    res.json(status)
}
const updateUser = async (req, res) => {
    const userId = req.params.id
    const updatedUser = req.body
    const status = await usersDao.updateUser(
        userId,
        updatedUser
    )
    res.json(status)
}

const signup = async (req, res) => {
    const user = req.body;
    // const existingUser = await usersDao.findUserByEmail(user.email);
    const existingUser = false;
    if(existingUser) {
        res.sendStatus(403);
    } else {
        const actualUser = await usersDao.createUser(user);
        res.json(actualUser);
    }
};

const signin = async (req, res) => {
    const existingUser = await usersDao.findUserByCredentials(req.body.email, req.body.password);
    if (existingUser) {
        req.session['currentUser'] = existingUser;
        return res.sendStatus(200);
    } else {
        return res.sendStatus(503);
    }
};

const signout = async (req, res) => {
    req.session.destroy();
    res.send(200);
};

const profile = async (req, res) => {
    const currentUser = req.session['currentUser'];
    if(currentUser) {
        res.json(currentUser);
    } else {
        res.sendStatus(503);
    }

};

const followUser = async (req, res) => {
    const followerId = req.params.follower;
    const userFollowedId = req.params.userFollowed;
    const insertedFollow = await userFollowersDao.followUser(followerId, userFollowedId);
    res.json(insertedFollow);
}

const unfollowUser = async (req, res) => {
    const followerId = req.params.follower;
    const userFollowedId = req.params.userFollowed;
    const status = await userFollowersDao.unfollowUser(followerId, userFollowedId);
    res.send(status);
}

const findFollowedUsersForUser = async (req, res) => {
    const followerId = req.params.follower;
    const recordsInFollowedUsers = await userFollowersDao.findFollowedUsersForUser(followerId);
    let users = [];
    for (const record of recordsInFollowedUsers) {
        const user = await usersDao.findUserById(record.userFollowed);
        users.push(user);
    }
    res.json(users);
}

const findFollowersForUser = async (req, res) => {
    const userFollowedId = req.params.userFollowed;
    const recordsInFollowersForUser = await userFollowersDao.findFollowersForUser(userFollowedId);
    let users = [];
    for (const record of recordsInFollowersForUser) {
        const user = await usersDao.findUserById(record.follower);
        users.push(user);
    }
    res.json(users);
}

export default usersController;