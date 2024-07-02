import Subscription from "../models/Subscription";

class SubscriptionController {
    async index(req, res) {
        try {
            const subscriptions = new Subscription();
            const result = await subscriptions.select();
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async indexByStudent(req, res) {
        try {
            const subscriptions = new Subscription();
            const result = await subscriptions.selectByStudent(req.params.student);
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async indexByCourse(req, res) {
        try {
            const subscriptions = new Subscription();
            const result = await subscriptions.selectByCourse(req.params.course);
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async insert(req, res) {
        try {
            const subscriptions = new Subscription();

            const { student, course } = req.body;

            const result = await subscriptions.insert({ student, course });

            res.status(201).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async update(req, res) {
        try {
            const subscriptions = new Subscription();

            const { student, course } = req.body;

            const result = await subscriptions.update(
                { student, course },
                req.params.id,
            );

            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }

    async delete(req, res) {
        try {
            const subscriptions = new Subscription();

            const result = await subscriptions.delete(req.params.id);

            res.status(200).send(result);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new SubscriptionController();
