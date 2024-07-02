import dotenv from "dotenv";
import client from "../config/database.js";

dotenv.config();

export default class Lesson {
  async testConnection() {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("lesson");

      if (collection) return "Connected successfully to collection";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async select() {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("course");

      const result = await collection.find({}).toArray();
      return result;
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async insert(body) {
    try {
      await client.connect();

      const collectionCourses = client.db(process.env.DATABASE).collection("course");
      const collection = client.db(process.env.DATABASE).collection("lesson");

      if (!body.name) return "Name not found";
      if (!body.description) return "Description not found";
      if (!body.duration) return "Duration not found";
      if (!body.order) return "Order not found";
      if (!body.course) return "Course not found";
      const allCourses = await collectionCourses.find({}).toArray();
      const owner = allCourses.find((course) => course.id === body.course);
      if (!owner) return "Course not exists";
      const date = Date.now().toString();
      body.id = `lesson_${body.course}_${date}`;

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

      const collection = client.db(process.env.DATABASE).collection("lesson");

      await collection.updateOne({ id: id }, { $set: body });

      return "Course successfully updated";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async recoursiveOrdenation(initialOrder, collection, course) {
    const filtredCollection = collection.filter((lesson) => lesson.course === course);

  }

  async delete(id) {
    if (!id) return "Id not found";

    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("lesson");

      await collection.deleteOne({ id: id });

      return "User successfully deleted";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
}
