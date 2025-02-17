import Yonalish from "../models/yunalish.model.js";

async function findAll(req, res) {
    try {
        let yunalishlar = await Yonalish.findAll();
        res.status(200).send({message:yunalishlar});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
};

async function findOne(req, res) {
    try {
        let {id} = req.params
        const yunalish = await Yonalish.findByPk(id); 
        if (!yunalish) {
            return res.status(404).send({ message: "Yonalish not found" });
        }
        res.status(200).send({ message: yunalish });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};


async function create(req, res) {
    try {
        const { name, photo, faoliyatid } = req.body;
        if (!name || !faoliyatid) {
            return res.status(400).send({ message: "name and faoliyatid are required" });
        }

        const newYonalish = await Yonalish.create({ name, photo, faoliyatid }); 
        res.status(201).send({ message: newYonalish, message: "Yonalish created successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};


async function update(req, res) {
    try {
        const { id } = req.params; 
        const { name, photo, faoliyatid } = req.body; 
        const yunalish = await Yonalish.findByPk(id); 
        if (!yunalish) {
            return res.status(404).send({ message: "Yonalish not found" });
        }

        const updatedYonalish = await yunalish.update({ name, photo, faoliyatid }); 
        res.status(200).send({ message: updatedYonalish, message: "Yonalish updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};


async function remove(req, res) {
    try {
        const { id } = req.params; 

        const yunalish = await Yonalish.findByPk(id); 
        if (!yunalish) {
            return res.status(404).send({ message: "Yonalish not found" });
        }

        res.status(200).send({ message: "Yonalish deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}


export{findAll, findOne, create ,update ,remove};