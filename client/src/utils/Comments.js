import React from "react";
import { useNavigate } from "react-router-dom";

const Comments = ({ threadId }) => {
  const navigate = useNavigate();

  const handleAddComment = () => {
    navigate(`/${threadId}/replies`);
  };

  return (
    <div className="likes__container">
      <button onClick={handleAddComment}>
        <p style={{ color: "#434242" }}>Update</p>
      </button>
    </div>
  );
};

export default Comments;
