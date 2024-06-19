import Course from "../models/Course.js";

class CourseController {
  async testConnection(req, res) {
    try {
      const courses = new Course();
      const result = await courses.testConnection();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async index(req, res) {
    try {
      const courses = new Course();
      const result = await courses.select();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async indexByTeacher(req, res) {
    try {
      const courses = new Course();
      const result = await courses.selectByTeacher(req.params.teacher);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async insert(req, res) {
    try {
      const courses = new Course();

      const { name, description, teacher, photo } = req.body;

      const result = await courses.insert({ name, description, teacher, photo });

      res.status(201).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      const courses = new Course();

      const { name, description, teacher, photo } = req.body;

      const result = await courses.update(
        { name, description, teacher, photo },
        req.params.id,
      );

      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const courses = new Course();

      const result = await courses.delete(req.params.id);

      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new CourseController();
