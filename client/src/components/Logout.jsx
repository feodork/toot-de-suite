import React from "react";

const Logout = (props) => {
  const handleClick = async () => {
    const res = await fetch("/logout", {
      method: "POST",
    });
    props.handleLogout();
  };

  return (
    <button onClick={handleClick} className="login-logout-btn">
      Logout
    </button>
  );
};

export default Logout;
