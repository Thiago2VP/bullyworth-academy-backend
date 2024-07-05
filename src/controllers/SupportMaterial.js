import SupportMaterial from "../models/SupportMaterial.js";

class SupportMaterialController {
    async index(req, res) {
        try {
            const materials = new SupportMaterial();
            const result = await materials.select();
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async indexByLesson(req, res) {
        try {
            const materials = new SupportMaterial();
            const result = await materials.selectByLesson(req.params.lesson);
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async insert(req, res) {
        try {
            const materials = new SupportMaterial();

            const { name, file, lesson } = req.body;

            const result = await materials.insert({ name, file, lesson });

            res.status(201).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async update(req, res) {
        try {
            const materials = new SupportMaterial();

            const { name, file, lesson } = req.body;

            const result = await materials.update(
                { name, file, lesson },
                req.params.id,
            );

            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async delete(req, res) {
        try {
            const materials = new SupportMaterial();

            const result = await materials.delete(req.params.id);

            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new SupportMaterialController();
