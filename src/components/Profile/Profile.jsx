import React from "react";
import ProfileSVG from "./profile.svg";

export default function Profile() {
  return (
    <div>
      Profile
      <img src={ProfileSVG} alt="Profile" height="300px" width="250px" />
    </div>
  );
}
