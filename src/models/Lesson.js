import dotenv from "dotenv";
import client from "../config/database.js";

dotenv.config();

export default class Lesson {
  async select() {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("lesson");

      const result = await collection.find({}).toArray();
      return result;
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async selectByCourse(course) {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("lesson");

      const allLessons = await collection.find({}).toArray();
      const result = allLessons.filter((lesson) => lesson.course === course);
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
      if (!body.content) return "Content not found";
      const allCourses = await collectionCourses.find({}).toArray();
      const owner = allCourses.find((course) => course.id === body.course);
      if (!owner) return "Course not exists";
      const date = Date.now().toString();
      body.id = `lesson_${date}_${body.course}`;

      const allLessons = await collection.find({}).toArray();
      if (allLessons.length === 0) {
        await collectionCourses.updateOne({ id: owner.id }, { $set: { lastLesson: body.order, duration: owner.duration + body.duration } });
      } else {
        const repitition = allLessons.filter((lesson) => lesson.order === body.order);
        if (repitition) {
          await collection.updateMany({ order: { $gt: body.order - 1 } }, { $inc: { order: 1 } });
          await collectionCourses.updateOne({ id: owner.id }, { $set: { lastLesson: owner.lastLesson + 1, duration: owner.duration + body.duration } });
        } else {
          if (owner.lastLesson < body.order) {
            await collectionCourses.updateOne({ id: owner.id }, { $set: { lastLesson: body.order, duration: owner.duration + body.duration } });
          }
        }
      }

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
      const collectionCourses = client.db(process.env.DATABASE).collection("course");

      const allLessons = await collection.find({}).toArray();
      const repetition = allLessons.filter((lesson) => lesson.order === body.order && lesson.id !== id);
      if (repetition.length > 0) return "Lesson order already exists";
      const lesson = allLessons.find((lesson) => lesson.id === id);
      const allCourses = await collectionCourses.find({}).toArray();
      const owner = allCourses.find((course) => course.id === lesson.course);

      await collection.updateOne({ id: id }, { $set: body });
      if (owner.lastLesson < body.order) {
        await collectionCourses.updateOne({ id: owner.id }, { $set: { lastLesson: body.order, duration: owner.duration - lesson.duration + body.duration } });
      } else {
        await collectionCourses.updateOne({ id: owner.id }, { $set: { duration: owner.duration - lesson.duration + body.duration } });
      }

      return "Lesson successfully updated";
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

      const collection = client.db(process.env.DATABASE).collection("lesson");
      const collectionCourses = client.db(process.env.DATABASE).collection("course");

      const allLessons = await collection.find({}).toArray();
      const lesson = allLessons.find((lesson) => lesson.id === id);
      const allCourses = await collectionCourses.find({}).toArray();
      const owner = allCourses.find((course) => course.id === lesson.course);

      await collection.deleteOne({ id: id });
      await collectionCourses.updateOne({ id: owner.id }, { $set: { duration: owner.duration - lesson.duration } });

      return "Lesson successfully deleted";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
}
