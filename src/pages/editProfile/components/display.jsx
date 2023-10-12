import { FormSelect } from "react-bootstrap";
import Select from "react-select";
import { languageOptions } from "../../../constants/languages";

export default function Display() {
  const themes = ["Light", "Dark"];

  return (
    <>
      <div className="edit-profile">
        <div className="edit-label">
          <b>Theme</b>
          <span>The theme of the site.</span>
        </div>
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
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Language Filter</b>
          <span>Show all the mangas with selected language.</span>
        </div>
        <Select options={languageOptions} />
      </div>
    </>
  );
}
