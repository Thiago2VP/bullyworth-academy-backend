class Home {
  async index(req, res) {
    try {
      res.status(200).send("Connection exists");
    } catch (err) {
      res.status(404).json(err);
    }
  }
}

export default new Home();
