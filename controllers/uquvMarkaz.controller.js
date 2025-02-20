import UquvMarkaz from "../models/uquvMarkaz.model.js";
import Filial from "../models/filiallar.model.js"; // Filialni import qilish
import { Op } from "sequelize";
import { logger } from "../services/logger.js";
import User from "../models/user.model.js"; // Foydalanuvchi ismini olish uchun
import Comment from "../models/comment.model.js"; 

async function findAll(req, res) {
    try {
        const { page = 1, size = 10, sortBy, filter } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        logger.info(`O‘quv markazlar ro‘yxati so‘rovi: page=${page}, size=${size}, sortBy=${sortBy}, filter=${filter}`);

        let queryOptions = {
            limit,
            offset,
            order: sortBy ? [[sortBy, 'ASC']] : [['createdAt', 'DESC']],
            include: [
                {
                    model: Filial,
                    as: "filials",
                    attributes: ["id", "name", "photo", "region", "phone", "address"],
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id", "desc", "star", "createdAt"],
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "name"], // Komment yozgan foydalanuvchini qo‘shamiz
                        }
                    ]
                }
            ],
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
        logger.info(`Jami o‘quv markazlar: ${count}`);

        res.status(200).send({
            message: "Success",
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                pageSize: limit,
            },
        });
    } catch (error) {
        logger.error(`O‘quv markazlarni olishda xatolik: ${error.message}`);
        res.status(500).send({ message: error.message });
    }
}





async function findOne(req, res) {
    try {
        const { id } = req.params;
        logger.info(`O‘quv markazni olish so‘rovi: ID=${id}`);

        let uquvMarkaz = await UquvMarkaz.findByPk(id);
        if (!uquvMarkaz) {
            logger.warn(`O‘quv markaz topilmadi: ID=${id}`);
            return res.status(404).send({ message: "Not found data" });
        }
        res.status(200).send({ message: uquvMarkaz });
    } catch (error) {
        logger.error(`O‘quv markazni olishda xatolik: ${error.message}`);
        res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    try {
        if (!req.user || !req.user.id) {
            logger.warn("Foydalanuvchi avtorizatsiya qilinmagan.");
            return res.status(401).send({ message: "Avtorizatsiya talab qilinadi" });
        }

        const { name, photo, region, address } = req.body;
        const createdBy = req.user.id;
        logger.info(`Yangi o‘quv markaz yaratish urinish: name=${name}, region=${region}, createdBy=${createdBy}`);

        if (!name || !region || !address) {
            logger.warn("O‘quv markaz yaratishda yetarli ma’lumotlar berilmagan.");
            return res.status(400).send({ message: "Barcha maydonlar talab qilinadi" });
        }

        let newUquvMarkaz = await UquvMarkaz.create({ name, photo, region, address, createdBy });
        logger.info(`O‘quv markaz yaratildi: ID=${newUquvMarkaz.id}`);

        res.status(201).send({ message: "O‘quv markaz muvaffaqiyatli yaratildi", data: newUquvMarkaz });
    } catch (error) {
        logger.error(`O‘quv markaz yaratishda xatolik: ${error.message}`);
        res.status(500).send({ message: "Serverda xatolik yuz berdi: " + error.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, photo, region, address } = req.body;
        logger.info(`O‘quv markazni yangilash urinish: ID=${id}`);

        let oquvMarkaz = await UquvMarkaz.findByPk(id);
        if (!oquvMarkaz) {
            logger.warn(`O‘quv markaz topilmadi: ID=${id}`);
            return res.status(404).send({ message: "Not found data" });
        }

        if (name !== undefined) oquvMarkaz.name = name;
        if (photo !== undefined) oquvMarkaz.photo = photo;
        if (region !== undefined) oquvMarkaz.region = region;
        if (address !== undefined) oquvMarkaz.address = address;

        await oquvMarkaz.save();
        logger.info(`O‘quv markaz yangilandi: ID=${id}`);

        res.status(200).send({ message: "Updated successfully", data: oquvMarkaz });
    } catch (error) {
        logger.error(`O‘quv markazni yangilashda xatolik: ${error.message}`);
        res.status(500).send({ message: error.message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        logger.info(`O‘quv markazni o‘chirish urinish: ID=${id}`);

        let uquvMarkaz = await UquvMarkaz.findByPk(id);
        if (!uquvMarkaz) {
            logger.warn(`O‘quv markaz topilmadi: ID=${id}`);
            return res.status(404).send({ message: "Not found data" });
        }
        await uquvMarkaz.destroy();
        logger.info(`O‘quv markaz o‘chirildi: ID=${id}`);

        res.status(200).send({ message: "Data removed successfully" });
    } catch (error) {
        logger.error(`O‘quv markazni o‘chirishda xatolik: ${error.message}`);
        res.status(500).send({ message: error.message });
    }
}

export { findAll, findOne, create, update, remove };
