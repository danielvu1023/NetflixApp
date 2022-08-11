import Movie from "../models/Movie.js";
import express from "express";
import verifyToken from "../middleware/authJWT.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("You must be an admin to create new movies");
  }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You must be an admin to update a movie!");
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Movie has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You do not have the authority to delete this movie!");
  }
});

// GET RANDOM MOVIE
router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  let movieCount;
  let randomNumber;
  let randomMovie;
  try {
    if (type === "series") {
      movieCount = await Movie.find({ isSeries: true }).count();
      randomNumber = Math.floor(Math.random() * movieCount);
      randomMovie = await Movie.findOne({ isSeries: true }).skip(randomNumber);
    } else {
      movieCount = await Movie.find({ isSeries: false }).count();

      randomNumber = Math.floor(Math.random() * movieCount);
      randomMovie = await Movie.findOne({ isSeries: false }).skip(randomNumber);
    }
    res.status(200).json(randomMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET 
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie === null) {
      res.status(200).json("Movie does not exist in the database");
    } else {
      res.status(200).json(movie);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET all
router.get("/", verifyToken, async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie.reverse());
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
