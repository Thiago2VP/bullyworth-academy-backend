import dotenv from "dotenv";
import client from "../config/database.js";
import bcryptjs from "bcryptjs";

dotenv.config();

export default class User {
  async select() {
    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("users");

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

      const collection = client.db(process.env.DATABASE).collection("users");

      const date = Date.now().toString();
      if (!body.email) return "Email not found";
      const allUseers = await collection.find({}).toArray();
      const repetition = allUseers.find((user) => user.email === body.email);
      if (repetition) return "Email already registered";
      if (!body.name) body.name = `user_${date}`;
      if (body.password) {
        body.password = await bcryptjs.hash(body.password, 8);
      } else {
        return "Password not found";
      }
      if (!body.type) return "Type not found";

      await collection.insertOne(body);

      return "Inserted successfully";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async update(body, email) {
    if (!email) return "Email not found";

    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("users");

      const allUseers = await collection.find({}).toArray();
      const repetition = allUseers.find((user) => user.email === body.email && user.email !== email);
      if (repetition) return "Email already registered";

      const date = Date.now().toString();
      if (!body.name) body.name = `user_${date}`;

      await collection.updateOne({ email: email }, { $set: body });

      return "User successfully updated";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async updatePassword(body, email) {
    if (!email) return "Email not found";

    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("users");

      if (body.password) {
        body.password = await bcryptjs.hash(body.password, 8);
      } else {
        return "Password not found";
      }

      await collection.updateOne({ email: email }, { $set: body });

      return "User successfully updated";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  async delete(email) {
    if (!email) return "Email not found";

    try {
      await client.connect();

      const collection = client.db(process.env.DATABASE).collection("users");

      await collection.deleteOne({ email: email });

      return "User successfully deleted";
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
}
