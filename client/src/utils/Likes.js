import React from "react";

const Likes = ({ numberOfLikes, threadId }) => {
  const handleDoneFunction = () => {
    fetch("http://localhost:4000/api/thread/like", {
      method: "POST",
      body: JSON.stringify({
        threadId,
        //userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          localStorage.setItem("_token", data.token);
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="likes__container">
      <button onClick={handleDoneFunction}>
        <p style={{ color: "#434242" }}>
          {numberOfLikes === 0 ? "Not Yet" : "Done"}
        </p>
      </button>
    </div>
  );
};

export default Likes;
