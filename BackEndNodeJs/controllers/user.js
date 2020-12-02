const db = require('./index')
const user_db = db.collection('user');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, password, name } = req.body;
    const snapshot = await user_db.where('username', '==', username).get();
    if (!snapshot.empty) {
        res.status(400).send({ message: "This Email Has Already Been Taken!" })
    }
    else {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        await user_db.add({
            username: username,
            password: hashedPassword,
            name: name
        })

        res.status(201).send({ message: "user created" })
    }

}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const snapshot = await user_db.where('username', '==', username).get();
    if (snapshot.empty) {
        res.status(400).send({ message: "username or password is incorrect." })
    } else {
        snapshot.forEach(doc => {
            const isCorrectPassword = bcryptjs.compareSync(password, doc.data().password);
            if (isCorrectPassword) {
                const payload = {
                    username: doc.data().username,
                    name: doc.data().name,
                    id: doc.id
                }
                const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 })

                res.status(200).send({
                    token: token,
                    message: "Log in Successful",
                });
            } else {
                res.status(400).send({ message: "username or password is incorrect." })
            }
        })

    }
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const snapshot = await user_db.doc(req.user).get();
    const isCorrectPassword = bcryptjs.compareSync(oldPassword, snapshot.data().password);
    if (isCorrectPassword) {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(newPassword, salt);
        await user_db.doc(req.user).update({
            password: hashedPassword,
        });
        res.status(200).send({ message: " Password Updated " })
    } else {
        res.status(400).send({ message: " Old Password Incorrect" })
    }

}

const getUserInfo = async (req, res) => {
    const snapshot = await user_db.doc(req.user).get()
    res.status(200).send(snapshot.data());
}


module.exports = {
    registerUser,
    loginUser,
    changePassword,
    getUserInfo
}