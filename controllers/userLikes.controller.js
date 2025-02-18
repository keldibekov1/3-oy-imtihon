import UserLikes from "../models/userLikes.model.js";

async function findAll(req, res) {
    try {
        const { page = 1, size = 10 } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        let { rows, count } = await UserLikes.findAndCountAll({
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
        const { userId, oquvmarkazId } = req.body; 
        if (!userId || !oquvmarkazId) {
            return res.status(400).send({ message: "userId and oquvmarkazId are required" });
        }

        const newLike = await UserLikes.create({ userId, oquvmarkazId }); 
        res.status(201).send({ message: newLike });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
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