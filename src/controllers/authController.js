const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middleware/jwt-validate");
const User = require("../models/User");
const objectId = require("mongoose/lib/types/objectid");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ error: null, users });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    if (req.body.mail && req.body.name && req.body.password) {
      if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
        res
          .status(400)
          .json({ success: false, message: "Incorrect mail format" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const {
        name,
        age,
        gender,
        lookingFor,
        bio,
        image,
        distance,
        interests,
        mail,
        password,
      } = req.body;
      const saltedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        name: name,
        age: age,
        gender: gender,
        lookingFor: lookingFor,
        bio: bio,
        image: image,
        distance: distance,
        interests: interests,
        mail: mail,
        password: saltedPassword,
      };

      const addedUser = await User.create(newUser);
      //users.push(newUser);
      return res.status(200).json({ success: true, addedUser });
    } else {
      return res.status(400).json({
        success: false,
        message: "Missing values (required: mail, name, password)",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      // duplicate user error
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }
};

const login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail }).lean();
    if (!user) {
      return res.status(400).json({ status: 'error', error: 'Invalid username/password' });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Crear el token
    const token = jwt.sign(
      {
        name: user.name,
        mail: user.mail,
      },
      TOKEN_SECRET
    );

    res.status(200).json({
      error: null,
      data: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

//Deprecated due MongoDb ID
const idMaker = length => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  register,
  login,
  getUsers,
};