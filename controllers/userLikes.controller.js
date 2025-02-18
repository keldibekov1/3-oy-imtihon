import UserLikes from "../models/userLikes.model.js";
import { Op } from "sequelize";

async function findAll(req, res) {
    try {
        const { page = 1, size = 10, sortBy, filter } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        let queryOptions = {
            limit,
            offset,
            order: [[sortBy, 'ASC']],
        };

        if (filter&&sortBy == "oquvmarkazId") {
            queryOptions.where = {
                [Op.and]: [
                    { oquvmarkazId: { [Op.like]: `%${filter}%` } },
                ],
            };
        
        }
        if (filter&&sortBy == "userId") {
            queryOptions.where = {
                [Op.and]: [
                    { userId: { [Op.like]: `%${filter}%` } },
                ],
            };
            
        }

        const { rows, count } = await UserLikes.findAndCountAll(queryOptions);
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
        let {id} = req.params
        let like = await UserLikes.findByPk(id); 
        if (!like) {
        return res.status(404).send({ message: "Data not found" });
        };

        res.status(200).send({message:like})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
};

async function create(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
        }

        const userId = req.user.id; // ✅ JWT token ichidan user ID olish
        const { oquvmarkazId } = req.body; 

        if (!oquvmarkazId) {
            return res.status(400).json({ message: "oquvmarkazId talab qilinadi" });
        }

        const newLike = await UserLikes.create({ userId, oquvmarkazId }); 
        res.status(201).json({ message: "Like muvaffaqiyatli qo‘shildi", data: newLike });
        
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(500).json({ message: "Serverda xatolik yuz berdi: " + error.message });
    }
};


async function update(req, res) {
    try {
        const { id } = req.params;
        const { userId, oquvmarkazId } = req.body; 

        const like = await UserLikes.findByPk(id);
        if (!like) {
            return res.status(404).send({ message: "Data not found" });
        }

        let updatedLike = await like.update({ userId, oquvmarkazId }); 
        res.status(201).send({ message: updatedLike });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
};

async function remove(req, res) {
    try {
        const { id } = req.params; 

        const like = await UserLikes.findByPk(id); 
        if (!like) {
            return res.status(404).send({ message: "Data not found" });
        }

        await like.destroy(); 
        res.status(200).send({ message: "Data removed successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
};

export{findAll, findOne, create ,update ,remove};