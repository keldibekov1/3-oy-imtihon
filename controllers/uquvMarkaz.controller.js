import UquvMarkaz from "../models/uquvMarkaz.model.js";

async function findAll(req, res) {
    try {

        const { page = 1, size = 10 } = req.query;
        const limit = parseInt(size);
        const offset = (parseInt(page) - 1) * limit;

        let { rows, count } = await UquvMarkaz.findAndCountAll(
            {limit,
            offset,}
        );
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
};

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
        const { name, photo, region, address, createdBy } = req.body;
        if (!name || !region || !address || !createdBy) {
            return res.status(400).send({ message: "Required all areas" });
        }
        let newUquvMarkaz = await UquvMarkaz.create({ name, photo, region, address, createdBy });
        res.status(201).send({ message: newUquvMarkaz });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, photo, region, address } = req.body;
        let uquvMarkaz = await UquvMarkaz.findByPk(id);
        if (!uquvMarkaz) {
            return res.status(404).send({ message: "Not found data" });
        }
        await uquvMarkaz.update({ name, photo, region, address });
        res.status(200).send({ message: uquvMarkaz });
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
