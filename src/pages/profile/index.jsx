import { useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

export default function Profile() {
  const profileOptions = [
    "Uploaded Chapter",
    "Uploaded Manga",
    "Group",
    "Manga List",
    "Community",
    "About",
  ];

  const [profleOption, setProfileOption] = useState(profileOptions[0]);

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center mx-4 mb-3"
        id="profile-option"
      >
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            style={{ width: "150px" }}
            alt=""
          ></img>
          <p style={{ paddingLeft: "10px", fontSize: "30px" }}>User Name</p>
        </div>
        <Button variant="outline-dark" style={{ float: "right" }}>
          Follow me
        </Button>
      </div>
      <div className="general-container">
        <div className="profile-option-container">
          {profileOptions.map((option, index) => (
            <Button
              key={index}
              variant={profleOption === option ? "dark" : "light"}
              onClick={() => setProfileOption(option)}
            >
              {toLabel(option)}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
