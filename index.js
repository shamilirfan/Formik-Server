const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { json } = require('express')
const { stringify } = require('querystring')
const { body, check, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.get("/users", (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data);
        res.send(JSON.stringify(allData.users))
    });
});
app.post("/signup",
    // check('name')
    //     .isLength({ min: 5 })
    //     .withMessage('must be at least 5 chars long'),
    // check('email')
    //     .isEmail()
    //     .withMessage('must be a valid email address'),
    // check('password')
    //     .isLength({ min: 5 })
    //     .withMessage('must be at least 5 chars long')
    //     .matches(/\d/)
    //     .withMessage('must contain a number'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        fs.readFile("database", 'utf8', (err, data) => {
            const allData = JSON.parse(data);
            const userData = req.body;
            userData.id = allData.users.length + 1;
            allData.users.push(userData)
            fs.writeFile('database', JSON.stringify(allData), () => { });
            res.send(`${req.body.name}`)
        });
    });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




