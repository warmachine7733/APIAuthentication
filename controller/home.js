module.exports = {
  home: async (req, res, next) => {
    try {
      res.status(200).json("Authentication Api");
    } catch (err) {
      res.status(404).json("not found");
    }
  }
};
