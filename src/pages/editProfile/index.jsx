import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Account from "./components/account";

export default function EditProfile() {
  const sortOptions = ["Account"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  useEffect(() => {
    document.title = "Edit Profile - 3K Manga";
  }, []);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <div style={{ paddingBottom: "20px" }}>
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={sortOption === option ? "dark" : "light"}
              onClick={() => setSortOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="general-container" style={{ padding: "10px" }}>
          {sortOption === "Account" && <Account />}
          {/* {sortOption === "Display" && <Display />} */}
        </div>
      </div>
    </>
  );
}
