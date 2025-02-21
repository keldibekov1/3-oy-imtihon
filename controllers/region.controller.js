import Region from "../models/region.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";

async function FindAll(req, res) {
    try {
        const regions = await Region.findAll({
            include: [
                {
                    model: OquvMarkaz,
                    as: "OquvMarkazs",
                    attributes: ["id", "name", "photo", "address"],
                },
            ],
        });

        res.status(200).send({ data: regions });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    try {
        const { name } = req.body; // Adjust these fields based on your Region model definition.

        if (!name) {
            return res.status(400).send({ message: "Name is required" });
        }

        const newRegion = await Region.create({
            name
        });

        res.status(200).send({ data: newRegion, message: "Region created successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}


async function FindOne(req, res) {
    try {
        const id = req.params.id;
        const region = await Region.findByPk(id, {
            include: [
                {
                    model: OquvMarkaz,
                    as: "oquvMarkazlar",
                    attributes: ["id", "name", "photo", "address"],
                },
            ],
        });

        if (!region) {
            return res.status(404).send({ message: "Region not found" });
        }

        res.status(200).send({ data: region });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

async function Update(req, res) {
    try {
           const id = req.params.id;
            const region = await Region.findByPk(id);
    
            if (!region) {
                return res.status(404).send({ message: "Region not found" });
            }
    
            const updatedRegion = await region.update(req.body);
    
            res.status(200).send({ data: updatedRegion });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
    
}

async function Delete(req, res) {
    try {
        const id = req.params.id;
        const region = await Region.findByPk(id);

        if (!region) {
            return res.status(404).send({ message: "Region not found" });
        }

        await region.destroy();

        res.status(200).send({ message: "Region deleted" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export { FindAll, FindOne, Update ,create, Delete};