import React from "react";

const Delete = ({ threadId }) => {
  const handleDeleteFunction = () => {
    fetch("http://localhost:4000/api/todos", {
      method: "Delete",
      body: JSON.stringify({
        threadId,
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
      <button onClick={handleDeleteFunction}>Del</button>
      <p style={{ color: "#434242" }}></p>
    </div>
  );
};

export default Delete;
