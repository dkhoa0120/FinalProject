import { Button, Dropdown, FormSelect } from "react-bootstrap";

export default function Display() {
  const themes = ["Light", "Dark"];
  const languages = ["Vietnamese", "English"];
  return (
    <>
      <b>Theme</b>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span style={{ maxWidth: "70%" }}>The theme of the site.</span>
        <div>
          <FormSelect value={themes}>
            {themes.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </FormSelect>
        </div>
      </div>
      <b>Language Filter</b>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span style={{ maxWidth: "70%" }}>
          Show all the mangas with selected language.
        </span>
        <div>
          <FormSelect value={languages}>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </FormSelect>
        </div>
      </div>
    </>
  );
}
