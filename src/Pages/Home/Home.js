import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav/Nav";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Nav userName={""} />
      <div className="home-wrapper">
        <h1>CODE EDITOR</h1>
        <h4>Welcome to Code Editor, where you can explore your skills !!!</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vitae
          totam voluptas! Animi aliquid voluptate fugiat iure pariatur at. Nulla
          eius fuga tempora labore ipsa. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Non, officiis! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Ipsa placeat quo, vitae itaque magnam
          recusandae error reiciendis modi commodi beatae?
        </p>
        <button
          className="cta-button cur-po"
          onClick={() => navigate("/editor")}
        >
          Let's Code <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
