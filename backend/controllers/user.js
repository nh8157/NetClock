const { User, validate } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.handleSignup = async (req, res) => {
    try {
        // first we validate the request with joi
        const { error } = validate(req.body);
        // error code 400: bad request
        if (error) return res.status(400).send(error.details[0].message);

        const { firstName, lastName, username, email, password } = req.body;
        // might want to put this function into the database file
        oldUser = await User.findOne({ email: email });
        if (oldUser)
            // error code 409: conflict
            res.status(409).send("User already exists, please login");

        // hash user's password and destroy plaintext
        // every future login has to validate the password with the same hash function
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt);

        // might want to put this function into the database file
        let user = await User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        // create a jsonwebtoken with user's credentials
        // sign with token secret key
        // set its expiration date to 10 minutes
        const token = jwt.sign(
            { userId: user._id, email },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: '10min' }
        );
        user.token = token;

        // success code 201: created
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

exports.handleSignin = async (req, res) => {
    // verify that necessary fields are filled out
    try {
        const { username, password } = req.body;
        if (!(username && password)) return res.status(400).send("Please fill out all fields");

        // check if user exists
        // hash password, verify the password is the same as stored
        // might want to put this function into the database file
        const user = await User.findOne({ username: username });
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("Password match");
            // create user token
            const email = user.email;
            const token = jwt.sign(
                { userId: user._id, email },
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: '10min' }
            );
            user.token = token;

            res.status(200).send(user);
        } else {
            // return password not match
            res.status(400).send("Username and password don't match. Please try again.");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}