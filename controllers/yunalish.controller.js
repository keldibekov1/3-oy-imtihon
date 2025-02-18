import Yonalish from "../models/yunalish.model.js";

async function findAll(req, res) {
    try {
        const { page = 1, size = 10 } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        let { rows, count } = await Yonalish.findAndCountAll({
            limit,
            offset,
        });
        const totalItems = count;  
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).send({
        message: "Success",
        data: rows,  
        pagination: {
        totalItems,
        totalPages,
        currentPage: parseInt(page),
        pageSize: limit,
      },
    });
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