import UquvMarkaz from "../models/uquvMarkaz.model.js";
import { Op } from "sequelize";

async function findAll(req, res) {
    try {
        const { page = 1, size = 10, sortBy = 'name', filter } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        let queryOptions = {
            limit,
            offset,
            order: [[sortBy, 'ASC']],
        };

        if (filter && sortBy) {
            queryOptions.where = {};
        
            if (sortBy === "name") {
                queryOptions.where.name = { [Op.like]: `%${filter}%` };
            }
        
            if (sortBy === "region") {
                queryOptions.where.region = { [Op.like]: `%${filter}%` };
            }
        }

        const { rows, count } = await UquvMarkaz.findAndCountAll(queryOptions);
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
        res.status(500).send({ message: error.message });
    }
}


async function findOne(req, res) {
    try {
        const { id } = req.params;
        let uquvMarkaz = await UquvMarkaz.findByPk(id);
        if (!uquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }
        res.status(200).send({ message: uquvMarkaz });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "Avtorizatsiya talab qilinadi" });
        }

        const { name, photo, region, address } = req.body;
        const createdBy = req.user.id; 
        if (!name || !region || !address) {
            return res.status(400).send({ message: "Barcha maydonlar talab qilinadi" });
        }

        let newUquvMarkaz = await UquvMarkaz.create({ name, photo, region, address, createdBy });

        res.status(201).send({ message: "O‘quv markaz muvaffaqiyatli yaratildi", data: newUquvMarkaz });
    } catch (error) {
        console.error("Server xatosi:", error);
        res.status(500).send({ message: "Serverda xatolik yuz berdi: " + error.message });
    }
}


async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, photo, region, address } = req.body;
        let oquvMarkaz = await UquvMarkaz.findByPk(id);

        if (!oquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }

        // Faqat kiritilgan maydonlarni yangilash
        if (name !== undefined) oquvMarkaz.name = name;
        if (photo !== undefined) oquvMarkaz.photo = photo;
        if (region !== undefined) oquvMarkaz.region = region;
        if (address !== undefined) oquvMarkaz.address = address;

        await oquvMarkaz.save();
        res.status(200).send({ message: "Updated successfully", data: oquvMarkaz });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


async function remove(req, res) {
    try {
        const { id } = req.params;
        let uquvMarkaz = await UquvMarkaz.findByPk(id);
        if (!uquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }
        await uquvMarkaz.destroy();
        res.status(200).send({ message: "data removed successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { findAll, findOne, create, update, remove };
