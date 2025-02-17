import UquvMarkaz from "../models/uquvMarkaz.model.js";

async function findAll(req, res) {
    try {
        let uquvMarkazlar = await UquvMarkaz.findAll();
        res.status(200).send({data:uquvMarkazlar});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({data:error.message});
    }
};

async function findOne(req, res) {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({data:error.message});
    }
};

async function create(req, res) {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({data:error.message});
    }
};

async function update(req, res) {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({data:error.message});
    }
};

async function remove(req, res) {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({data:error.message});
    }
};

export{findAll, findOne, create ,update ,remove};