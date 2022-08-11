import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import express from "express";
import verifyToken from "../middleware/authJWT.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({ message: "User Registered Successfully" });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ accessToken: null, message: "Invalid Password!" });
    }
    const {password, ...info} = user._doc;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      { expiresIn: 86400 }
    );
    res.status(200).json({
      user: {
        ...info
      },
      message: "Login Successful",
      accessToken: token,
    });
  });
  //
});


export default router;
