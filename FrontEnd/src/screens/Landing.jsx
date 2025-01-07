import React from "react";
import "./Landing.css";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div class="landing-container">
        <div class="content">
          <div class="button-box">
            <h1>Play Chess Online On Universe #1 Site</h1>

            <Button
              onClick={() => {
                navigate("/Game");}}class="play-now-btn">PLAY NOW</Button>


          </div>
        </div>
      </div>
    </>
  );
}
