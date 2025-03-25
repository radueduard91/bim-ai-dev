import React from "react";

const Header = () => {
    return (
        <header style={{ 
            backgroundColor: "#1e40af", 
            color: "white",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
            <h1 style={{ margin: 0, fontSize: "1.5rem" }}>BIM AI POC</h1>
        </header>
    );
};

export default Header;