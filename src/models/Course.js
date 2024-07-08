import dotenv from "dotenv";
import client from "../config/database.js";
import Subscription from "./Subscription.js";

dotenv.config();

export default class Course {
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

  async selectByTeacher(teacher) {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("course");

      const allCourses = await collection.find({}).toArray();
      const teacherCourses = allCourses.filter((course) => course.teacher === teacher);
      return teacherCourses;
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async selectByStudent(student) {
    try {
      await client.connect();

      const subscriptions = new Subscription();
      const studentSubs = subscriptions.selectByStudent(student);
      const studentCourses = [];

      const collection = client.db(process.env.DATABASE).collection("course");
      const courses = await collection.find({}).toArray();
      studentSubs.array.forEach(sub => {
        const selectedCourse = courses.filter((course) => course.id === sub.course);
        if (selectedCourse[0]) studentCourses.push(selectedCourse[0]);
      });

      return studentCourses;
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
      const collection = client.db(process.env.DATABASE).collection("course");

      if (!body.name) return "Name not found";
      if (!body.description) return "Description not found";
      if (!body.teacher) return "Teacher not found";
      const allUseers = await collectionUsers.find({}).toArray();
      const owner = allUseers.find((user) => user.email === body.teacher);
      if (!owner) return "Teacher not exists";
      if (!owner.type) return "User type not specified";
      if (owner.type !== "teacher") return "User is not a teacher";
      const date = Date.now().toString();
      body.id = `course_${date}`;
      body.duration = 0;
      body.lastLesson = 0;

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

      const collection = client.db(process.env.DATABASE).collection("course");

      await collection.updateOne({ id: id }, { $set: body });

      return "Course successfully updated";
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

      const collection = client.db(process.env.DATABASE).collection("course");

      await collection.deleteOne({ id: id });

      return "Course successfully deleted";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
}
