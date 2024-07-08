import Lesson from "../models/Lesson.js";

class LessonController {
    async index(req, res) {
        try {
            const lessons = new Lesson();
            const result = await lessons.select();
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async indexByCourse(req, res) {
        try {
            const lessons = new Lesson();
            const result = await lessons.selectByCourse(req.params.course, req.params.user);
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async insert(req, res) {
        try {
            const lessons = new Lesson();

            const { name, description, duration, order, course, content } = req.body;

            const result = await lessons.insert({ name, description, duration, order, course, content });

            res.status(201).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async update(req, res) {
        try {
            const lessons = new Lesson();

            const { name, description, duration, order, content } = req.body;

            const result = await lessons.update(
                { name, description, duration, order, content },
                req.params.id,
            );

            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async delete(req, res) {
        try {
            const lessons = new Lesson();

            const result = await lessons.delete(req.params.id);

            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new LessonController();
