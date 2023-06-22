import { useState } from "react";
import "./styles.css";
import { Form, InputGroup } from "react-bootstrap";

export default function MultiSelect({
  placeholder,
  initialSelectedOptions,
  getOptions,
  exportOptions,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = async (event) => {
    // check search input
    var inputValue = event.target.value;
    setSearchValue(inputValue);
    if (!inputValue) {
      setIsOpen(false);
      return;
    }

    // call api
    const rawOptions = await getOptions(inputValue);
    if (!rawOptions) {
      setOptions(null);
      return;
    }
    const cleanOptions = rawOptions.reduce((acc, value) => {
      acc[value.id] = value.name;
      return acc;
    }, {});
    Object.keys(selectedOptions).forEach((key) => {
      delete cleanOptions[key];
    });

    setOptions(cleanOptions);
    setIsOpen(true);
  };

  const handleSelectOption = (key) => {
    const selectedOptionsCopy = { ...selectedOptions };
    selectedOptionsCopy[key] = options[key];
    setSelectedOptions(selectedOptionsCopy);

    setSearchValue("");
    setOptions({});
    setIsOpen(false);

    exportOptions(Object.keys(selectedOptionsCopy));
  };

  const handleRemoveOption = (key) => {
    const selectedOptionsCopy = { ...selectedOptions };
    delete selectedOptionsCopy[key];
    setSelectedOptions(selectedOptionsCopy);

    exportOptions(Object.keys(selectedOptionsCopy));
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
            value={searchValue}
          />
        </InputGroup>
      </Form.Group>
      {isOpen &&
        (!options ? (
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
