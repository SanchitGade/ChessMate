import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="content">
        <div className="button-box">
          <h1>Play Chess Online On Universe #1 Site</h1>
          <Button
            onClick={() => navigate("/Game")}
            className="play-now-btn"
          >
            PLAY NOW
          </Button>
        </div>
      </div>
    </div>
  );
}