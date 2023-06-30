import { useState } from "react";
import "./styles.css";
import { Form, InputGroup } from "react-bootstrap";

export default function MultiSelect({
  placeholder,
  initialSelectedOptions = {},
  onSearchOptions,
  onChangeOptions,
}) {
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [search, setSearch] = useState("");

  const handleInputChange = async (event) => {
    const nextSearch = event.target.value;
    setSearch(nextSearch);

    const nextOptions = await onSearchOptions(nextSearch);
    setOptions(nextOptions);
  };

  const handleSelectOption = (key) => {
    const nextSelectedOptions = { ...selectedOptions, [key]: options[key] };
    setSelectedOptions(nextSelectedOptions);

    // clear and close options dropdown
    setSearch("");
    setOptions({});

    onChangeOptions(Object.keys(nextSelectedOptions));
  };

  const handleRemoveOption = (key) => {
    const nextSelectedOptions = { ...selectedOptions };
    delete nextSelectedOptions[key];
    setSelectedOptions(nextSelectedOptions);

    onChangeOptions(Object.keys(nextSelectedOptions));
  };

  return (
    <div className="custom-input">
      {Object.entries(selectedOptions).map(([key, value]) => (
        <span className="selected-option" key={key}>
          {value}
          &nbsp; &nbsp;
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => handleRemoveOption(key)}
          ></i>
        </span>
      ))}
      <Form.Group>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={search}
          />
        </InputGroup>
      </Form.Group>
      {search &&
        (Object.keys(options).length === 0 ? (
          <div className="custom-dropdown">
            <p>No option found</p>
          </div>
        ) : (
          <div className="custom-dropdown">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="option">
                <p onClick={() => handleSelectOption(key)}>{value}</p>
              </label>
            ))}
          </div>
        ))}
    </div>
  );
}
