import React from "react";

const Form = ({ title, handleAddUser, subtitle, children }) => {
  return (
    <div className="createForm">
      <h3>{title}</h3>
        <p>{subtitle}</p>
      <form action="" onSubmit={handleAddUser}>
        {children}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
