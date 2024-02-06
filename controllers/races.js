const { response, request } = require('express');
const { randomUUID } = require('crypto');
let { races } = require('../models/races');

// POST /api/race/new
// Registra un nuevo usuario en la base de datos
const post_new_race = async(req, res) => {
    let data = req.body;

    const race = { id: randomUUID(), ...req.body };
    races.push(race);
    res
        .setHeader('Content-Type', 'application/json')
        .send(race);
}

// GET /api/race/:id
const get_race = async(req, res) => {
    const id = req.params.id;
    const race = races.find( item => item.id == id );
    if ( race ) {
        res
            .setHeader('Content-Type', 'application/json')    
            .status(200)
            .send(JSON.stringify( race ));
    } else {
        res.status(404).send();
    }
}

// GET /api/race/all
const get_race_all = async(req, res) => {
    res
        .setHeader('Content-Type', 'application/json') 
        .status(200)
        .send( JSON.stringify( races.map( ({id, name}) => {
            return {id, name};
        } )) );
}    

// GET /api/race/:id/:field
const get_race_id_field = async(req, res) => {
    const id = req.params.id;
    const field = req.params.field;
    const race = races.find( item => item.id == id );
    if (race) {
        let result = {id};
        result[field] = race[field];
        res
            .setHeader('Content-Type', 'application/json')    
            .status(200)
            .send(JSON.stringify( result ));
    } else {
        res.status(404).send();
    }
}

// DELETE /api/race/:id
const delete_race_id = async(req, res) => {
    const id = req.params.id;

    const race = races.find( item => item.id==id );

    if (!race) {
        res.status(404).send();
    } else {
        races = races.filter( item => item.id != id );
    
        res
            .setHeader('Content-Type', 'application/json')
            .status(200)
            .send();
    }
}

// PUT /api/race/:id
const put_race = async(req, res) => {
    const id = req.params.id;

    let raceIndex = races.findIndex( item => item.id==id );

    if (raceIndex<0) {
        res.status(404).send();
    } else {
        races[raceIndex] = { ...races[raceIndex], ...req.body };
        res.status(200).send(JSON.stringify(races[raceIndex]));
    }
}

module.exports = {
    post_new_race,
    delete_race_id,
    get_race_id_field,
    get_race_all,
    get_race,
    put_race
}