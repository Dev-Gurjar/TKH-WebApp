const User = require("../utils/db_models/User");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "this user already exist" });
    }

    const createduser = await User.create({ username, email, phone, password });
    console.log(createduser);

    res.status(201).json({
      msg: "Ja Ho gya tu register lomde",
      token: await createduser.generateToken(),
      userId: createduser._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.json({ msg: "invalid credentials" });
    }

    const isPassvalid = await userExist.comparePassword(password);

    if (!isPassvalid) {
      return res.json({ msg: "invalid login password" });
    } else {
      res.status(200).json({
        msg: "Login Succesfully",
        Token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
  } catch (error) {
    console.log("Internal Server Error");
  }
};

module.exports = { home, register, login };
