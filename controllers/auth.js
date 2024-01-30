const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const {users} = require('../models/users');

const JWT_SECRET = "P@ssw0rd"

const post_login = async(req, res) => {
    let { username, pass } = req.body;

    let user = users.find( item => item.username==username && item.pass==pass);
    if (user) {
        const token = jwt.sign({
            username: user.username,
            rol: user.rol,
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
        }, JWT_SECRET);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .send(JSON.stringify( {
                username,
                token
            } ));
    } else {
        res.status(401).send();
    }
};

const get_token = async(req, res) => {
    // Authorization header
    // const old_token = req.headers.authorization;

    try {
        // const payload = jwt.verify(old_token, JWT_SECRET);
        const payload = verify_token(req.headers.authorization);
        
        console.log(payload);
        const token = jwt.sign({
            username: payload.username,
            rol: payload.rol,
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
        }, JWT_SECRET);
        console.log('--');
        console.log(token);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .send(JSON.stringify( {
                username: payload.username,
                token
            } ));
    } catch {
        console.log("No se ha verificado el token");
        res
            .status(401)
            .setHeader('Content-Type', 'application/json')
            .send( JSON.stringify( { msg: "Token no válido" } ));
    }
    // res.status(200).send("NO IMPLEMENTADO");
}

const verify_token = (token) => {
    try {
        const payload = jwt.verify(token, "P@ssw0rd");
        console.log(payload);
        return payload;
    } catch {
        return false;
    }
}


module.exports = {
    post_login,
    get_token
}