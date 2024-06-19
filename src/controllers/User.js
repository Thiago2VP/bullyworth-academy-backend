import User from "../models/User.js";

class UserController {
  async testConnection(req, res) {
    try {
      const users = new User();
      const result = await users.testConnection();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async index(req, res) {
    try {
      const users = new User();
      const result = await users.select();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async insert(req, res) {
    try {
      const users = new User();

      const { name, email, password, type } = req.body;

      const result = await users.insert({ name, email, password, type });

      res.status(201).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      const users = new User();

      const { name, email, biography, media, photo } = req.body;

      const result = await users.update(
        { name, email, biography, media, photo },
        req.params.email,
      );

      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async updatePassword(req, res) {
    try {
      const users = new User();

      const { password } = req.body;

      const result = await users.updatePassword(
        { password },
        req.params.email,
      );

      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const users = new User();

      const result = await users.delete(req.params.email);

      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
