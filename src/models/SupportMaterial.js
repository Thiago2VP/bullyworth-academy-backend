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

  async selectByLesson(lesson, user) {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("supportmaterial");
      const usersCollection = client.db(process.env.DATABASE).collection("user");
      const lessonsCollection = client.db(process.env.DATABASE).collection("lesson");

      const allUsers = usersCollection.find({}).toArray();
      const specificUser = allUsers.filter((userI) => userI.email === user)[0];
      const allLessons = lessonsCollection.find({}).toArray();
      const specificLesson = allLessons.filter((lessonI) => lessonI.id === lesson)[0];

      if (specificUser.type === "student") {
        const subsCollection = client.db(process.env.DATABASE).collection("subscription");
        const allSubs = await subsCollection.find({}).toArray();
        const validSubs = allSubs.filter((sub) => sub.course === specificLesson.course && sub.student === user);
        if (!(validSubs.length > 0)) return "Student not subscripted.";
      } else {
        const courseCollection = client.db(process.env.DATABASE).collection("course");
        const allCourses = await courseCollection.find({}).toArray();
        const validShow = allCourses.filter((courseI) => courseI.teacher === user);
        let counter = 0;
        validShow.array.forEach(courses => {
          if (courses.id === specificLesson.course) counter += 1;
        });
        if (counter === 0) return "Course not owned.";
      }

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
