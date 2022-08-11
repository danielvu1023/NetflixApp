import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `list/${type ? "?type=" + type : ""}${
            genre ? "&?genre" + genre : ""
          }`,
          {
            headers: {
              Authorization:
                "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWFjOWYzMDA3NTNhZDY5YWM0NmZiMCIsImlhdCI6MTY2MDE2MjE0MSwiZXhwIjoxNjYwMjQ4NTQxfQ.vqJaF_DqHkjJCe_-0hA1wGyrZQWWcSMvzfdb20wVKWw",
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
