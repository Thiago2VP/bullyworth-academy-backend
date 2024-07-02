import dotenv from "dotenv";
import client from "../config/database.js";

dotenv.config();

export default class Subscription {
    async select() {
        try {
            await client.connect();

            const collection = client.db(process.env.DATABASE).collection("subscription");

            const result = await collection.find({}).toArray();
            return result;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }

    async selectByStudent(student) {
        try {
            await client.connect();

            const collection = client.db(process.env.DATABASE).collection("subscription");

            const allSubscriptions = await collection.find({}).toArray();
            const studentSubs = allSubscriptions.filter((sub) => sub.student === student);
            return studentSubs;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }

    async selectByCourse(course) {
        try {
            await client.connect();

            const collection = client.db(process.env.DATABASE).collection("subscription");

            const allSubscriptions = await collection.find({}).toArray();
            const courseSubs = allSubscriptions.filter((sub) => sub.course === course);
            return courseSubs;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }

    async insert(body) {
        try {
            await client.connect();

            const collectionUsers = client.db(process.env.DATABASE).collection("users");
            const collectionCourse = client.db(process.env.DATABASE).collection("course");
            const collection = client.db(process.env.DATABASE).collection("subscription");

            if (!body.student) return "Student not found";
            const allUseers = await collectionUsers.find({}).toArray();
            const owner = allUseers.find((user) => user.email === body.student);
            if (!owner) return "Student not exists";
            if (!owner.type) return "User type not specified";
            if (owner.type !== "student") return "User is not a student";
            if (!body.course) return "Course not found";
            const allCourses = await collectionCourse.find({}).toArray();
            const course = allCourses.find((course) => course.id === body.course);
            if (!course) return "Course not exists";
            const repetition = await collection.find({ student: body.student, course: body.course }).toArray();
            if (repetition.length > 0) return "Subscription already exists";
            const date = Date.now().toString();
            body.id = `subscription_${date}`;
            body.creationDate = date;
            body.modifiedDate = date;

            await collection.insertOne(body);

            return "Inserted successfully";
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }

    async update(body, id) {
        if (!id) return "Id not found";

        try {
            await client.connect();

            const collection = client.db(process.env.DATABASE).collection("subscription");

            body.modifiedDate = Date.now().toString();

            await collection.updateOne({ id: id }, { $set: body });

            return "Subscription successfully updated";
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }

    async delete(id) {
        if (!id) return "Id not found";

        try {
            await client.connect();

            const collection = client.db(process.env.DATABASE).collection("subscription");

            await collection.deleteOne({ id: id });

            return "Subscription successfully deleted";
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }
}
