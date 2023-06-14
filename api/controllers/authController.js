import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../modals/user.js";

// @desc Register new User
// @route POST /auth/register
// @acess Public
const register = async (req, res) => {
  try {
    const { username, email, password, occupation } = req.body;
    if (!username || !email || !password) {
      return res.status(404).json({ message: "Missing field" });
    }

    const exisitingEmail = await User.findOne({ email });

    if (exisitingEmail) {
      return res.status(409).json({ message: "Email already exist!" });
    }

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      occupation: occupation || "",
      password: hashPassword,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: `Your account has been successfully created!` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Something Went Wrong!" });
  }
};

// @desc Login
// @route POST /auth/register
// @acess Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "Missing Value",
      });
    }

    const exisitingEmail = await User.findOne({ email });

    if (!exisitingEmail) {
      return res.status(404).json({ message: "Email not found!" });
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      exisitingEmail.password
    );

    if (!doesPasswordMatch) {
      return res.status(403).json({ message: "Invalid Password!" });
    }

    const user = {
      username: exisitingEmail.username,
      email: exisitingEmail.email,
    };

    const token = jwt.sign({ id: exisitingEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).json({
      token,
      user,
    });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
};

export { register, login };
