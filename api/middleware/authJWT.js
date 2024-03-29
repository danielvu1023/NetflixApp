import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decode) {
        if (err) res.status(403).json("Token is not valid");
        User.findOne({
          _id: decode.id,
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            req.user = user;
            next();
          }
        });
      }
    );
  } else {
    res.status(401).json("You are not authenticated");
  }
};

export default verifyToken;
