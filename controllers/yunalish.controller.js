import Yonalish from "../models/yunalish.model.js";
import { Op } from "sequelize";

async function findAll(req, res) {
    try {
        const { page = 1, size = 10, sortBy = 'createdAt', filter } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        let queryOptions = {
            limit,
            offset,
        };

        if (filter) {
            queryOptions.where = {
                [Op.or]: [
                    { name: { [Op.like]: `%${filter}%` } }
                ]
            };
        }

        if (sortBy) {
            queryOptions.order = [[sortBy, 'ASC']];
        }

        let { rows, count } = await Yonalish.findAndCountAll(queryOptions);
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
        res.status(500).send({ message: error.message });
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
        res.status(201).send({ message:  "Yonalish created successfully" , newYonalish });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};


 async function Update (req, res) {
    try {
        const { id } = req.params;
        const { name, photo, faoliyatid } = req.body;

        const yonalish = await Yonalish.findByPk(id);
        if (!yonalish) {
            return res.status(404).json({ message: "Yonalish topilmadi" });
        }

        await yonalish.update({
            name: name || yonalish.name,
            photo: photo || yonalish.photo,
            faoliyatid: faoliyatid || yonalish.faoliyatid
        });

        res.status(200).json({ message: "Yonalish muvaffaqiyatli yangilandi", data: yonalish });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


async function remove(req, res) {
    try {
        const { id } = req.params; 

        const yonalish = await Yonalish.findByPk(id); 
        if (!yonalish) {
            return res.status(404).send({ message: "Yonalish topilmadi" });
        }

        await yonalish.destroy();
        res.status(200).send({ message: "Yonalish muvaffaqiyatli o‘chirildi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export{findAll, findOne, create ,Update ,remove};