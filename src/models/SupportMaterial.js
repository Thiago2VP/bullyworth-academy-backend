import dotenv from "dotenv";
import client from "../config/database.js";

dotenv.config();

export default class SupportMaterial {
  async select() {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("supportmaterial");

      const result = await collection.find({}).toArray();
      return result;
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async selectByLesson(lesson) {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("supportmaterial");

      const allMaterials = await collection.find({}).toArray();
      const result = allMaterials.filter((material) => material.lesson === lesson);
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

      const collectionLessons = client.db(process.env.DATABASE).collection("lesson");
      const collection = client.db(process.env.DATABASE).collection("supportmaterial");

      if (!body.name) return "Name not found";
      if (!body.file) return "File not found";
      if (!body.lesson) return "Duration not found";
      const allLessons = await collectionLessons.find({}).toArray();
      const owner = allLessons.find((lesson) => lesson.id === body.lesson);
      if (!owner) return "Lesson not exists";
      const date = Date.now().toString();
      body.id = `supportMaterial_${date}_${body.lesson}`;

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

      const collection = client.db(process.env.DATABASE).collection("supportmaterial");
      const collectionLessons = client.db(process.env.DATABASE).collection("lesson");

      const allLessons = await collectionLessons.find({}).toArray();
      const owner = allLessons.find((lesson) => lesson.id === body.lesson);
      if (!owner) return "Lesson not exists";

      await collection.updateOne({ id: id }, { $set: body });

      return "Material successfully updated";
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

      const collection = client.db(process.env.DATABASE).collection("supportmaterial");

      await collection.deleteOne({ id: id });

      return "Material successfully deleted";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
}
