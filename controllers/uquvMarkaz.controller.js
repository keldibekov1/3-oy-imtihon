import UquvMarkaz from "../models/uquvMarkaz.model.js";
import Filial from "../models/filiallar.model.js";
import { Sequelize,Op } from "sequelize";
import { logger } from "../services/logger.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import UserLikes from "../models/userLikes.model.js";
import Region from "../models/region.model.js";

async function findAll(req, res) {
    try {
        const { page = 1, size = 10, sortBy, filter } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        logger.info(`Oquv markazlar royxati sorovi: page=${page}, size=${size}, sortBy=${sortBy}, filter=${filter}`);

        let queryOptions = {
            limit,
            offset,
            order: sortBy
                ? (sortBy === "region"
                    ? [[Sequelize.literal("`name`"), "ASC"]]
                    : [[sortBy, "ASC"]])
                : [["createdAt", "DESC"]],
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
                            attributes: ["id", "name", "surname", "email"], // Foydalanuvchining name, surname va emailini olish
                        },
                    ],
                },
                {
                    model: UserLikes,
                    as: "likes",
                    attributes: ["id", "userId"],
                },
                {
                    model: Region,
                    as: "region",
                    attributes: ["name"],
                    required: !!filter, // Agar filter mavjud bo'lsa, region sharti qo'llanadi
                },
            ],
        };

        // Filtrlash uchun shartlar qo'shish
        if (filter) {
            queryOptions.where = {};
            if (sortBy === "name") {
                queryOptions.where.name = { [Op.like]: `%${filter}%` };
            }
            if (sortBy === "region") {
                const regionInclude = queryOptions.include.find((i) => i.as === "region");
                if (regionInclude) {
                    regionInclude.where = { name: { [Op.like]: `%${filter}%` } };
                }
            }
        }

        const { rows, count } = await UquvMarkaz.findAndCountAll(queryOptions);
        logger.info(`Jami oquv markazlar: ${count}`);

        const responseData = rows.map(markaz => ({
            ...markaz.toJSON(),
            likeCount: markaz.likes ? markaz.likes.length : 0, // likes mavjudligini tekshirish
        }));

        res.status(200).send({
            message: "Success",
            data: responseData,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                pageSize: limit,
            },
        });
    } catch (error) {
        logger.error(`Oquv markazlarni olishda xatolik: ${error.message}`);
        res.status(500).send({ message: error.message });
    }
}






async function findOne(req, res) {
    try {
        const { id } = req.params;

        const uquvMarkaz = await UquvMarkaz.findByPk(id, {
            include: [
                {
                    model: Filial,
                    as: "filials",
                },
                {
                    model: Comment,
                    as: "comments",
                    include: [
                        {
                            model: User,
                            as: "user",
                        }
                    ]
                },
                {
                    model: UserLikes,
                    as: "likes",
                    include: [
                        {
                            model: User,
                            as: "user",
                        }
                    ]
                }
            ],
        });

        if (!uquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }

        res.status(200).send({ data: uquvMarkaz });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    try {
        const { name, photo, regionId, address } = req.body;
        const createdBy = req.user.id;

        if (!name || !regionId || !address) {
            return res.status(400).send({ message: "All fields are required" });
        }
        let region = await Region.findByPk(regionId);
        if(!region){
            return res.status(404).send({message:"region topilmadi"});
        }

        const newUquvMarkaz = await UquvMarkaz.create({
            name,
            photo,
            regionId,
            address,
            createdBy,
        });

        res.status(201).send({ message: "Created successfully", data: newUquvMarkaz });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, photo, regionId, address } = req.body;
        const userId = req.user.id;
        const userType = req.user.type;

        if (userType === "user") {
            return res.status(403).send({ message: "Access denied" });
        }

        const uquvMarkaz = await UquvMarkaz.findByPk(id);

        if (!uquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }

        if (userType !== "admin" && uquvMarkaz.createdBy !== userId) {
            return res.status(403).send({ message: "Permission denied" });
        }

        if (name !== undefined) uquvMarkaz.name = name;
        if (photo !== undefined) uquvMarkaz.photo = photo;
        if (regionId !== undefined) uquvMarkaz.regionId = regionId;
        if (address !== undefined) uquvMarkaz.address = address;

        await uquvMarkaz.save();

        res.status(200).send({ message: "Updated successfully", data: uquvMarkaz });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userType = req.user.type;

        if (userType === "user") {
            return res.status(403).send({ message: "Access denied" });
        }

        const uquvMarkaz = await UquvMarkaz.findByPk(id);

        if (!uquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }

        if (userType !== "admin" && uquvMarkaz.createdBy !== userId) {
            return res.status(403).send({ message: "Permission denied" });
        }

        await uquvMarkaz.destroy();

        res.status(200).send({ message: "Removed successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { findAll, findOne, create, update, remove };
