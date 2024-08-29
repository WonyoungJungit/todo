import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import Delete from "../utils/Delete";

const Home = () => {
  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_token")) {
        navigate("/");
      } else {
        fetch("http://localhost:4000/api/all/threads", {
          method: "POST",
          body: JSON.stringify({
            thread,
            //userId: localStorage.getItem("_id"),
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("_token"),
          },
        })
          .then((res) => res.json())
          .then((data) => setThreadList(data.threads))
          .catch((err) => console.error(err));
      }
    };
    checkUser();
  }, [navigate]);

  const createThread = () => {
    //fetch("http://localhost:4000/api/create/thread", {
    fetch("http://localhost:4000/api/todos", {
      method: "POST",
      body: JSON.stringify({
        thread,
        //userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setThreadList(data.threads);
        localStorage.setItem("_token", data.token);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //👇🏻 Calls the function
    createThread();
    setThread("");
  };

  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">ToDo List</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <label htmlFor="thread">ToDo</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="homeBtn">ADD</button>
        </form>

        <div className="thread__container">
          {threadList.map((thread) => (
            <div className="thread__item" key={thread.id}>
              <p>{thread.title}</p>
              <div className="react__container">
                <Likes
                  numberOfLikes={thread.likes.length}
                  threadId={thread.id}
                />
                <Comments threadId={thread.id} title={thread.title} />
                <Delete threadId={thread.id} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
