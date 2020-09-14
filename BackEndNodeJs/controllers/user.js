const db = require('../models/index');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, password, name } = req.body;
    const targetUser = await db.User.findOne({
        where: {
            username: username
        }
    });
    if (targetUser) {
        res.status(400).send({ message: "This Email Has Already Been Taken!" })
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        await db.User.create({
            username: username,
            password: hashedPassword,
            name: name
        });

        res.status(201).send({ message: "User Created" })
    }

}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username: username } });
    if (!targetUser) {
        res.status(400).send({ message: "username or password is incorrect." })
    } else {
        const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password);
        if (isCorrectPassword) {
            const payload = {
                username: targetUser.username,
                name: targetUser.name,
                id: targetUser.id
            }
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 })

            res.status(200).send({
                token: token,
                message: "Log in Successful",
            });
        } else {
            res.status(400).send({ message: "username or password is incorrect." })
        }
    }
}

const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const targetUser = await db.User.findOne({ where: { username: username } });
    const isCorrectPassword = bcryptjs.compareSync(oldPassword, targetUser.password);
    if (isCorrectPassword) {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(newPassword, salt);
        await targetUser.update({
            password: hashedPassword,
        });
        res.status(200).send({ message: " Password Updated " })
    } else {
        res.status(400).send({ message: " Old Password Incorrect" })
    }
}

const getUserInfo = async (req, res) => {
    const userInfo = await db.User.findOne({ where: { id: req.user.id } });
    res.status(200).send(userInfo);
}


module.exports = {
    registerUser,
    loginUser,
    changePassword,
    getUserInfo
}