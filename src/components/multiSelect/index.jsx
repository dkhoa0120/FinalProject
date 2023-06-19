import { useEffect, useState } from "react";
import "./styles.css";
import { Form, InputGroup } from "react-bootstrap";

export default function MultiSelect({
  placeholder,
  getOptions,
  exportOptions,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleGetData = async (event) => {
    // get value from input and set searchValue state with that
    // if input is null, do not call api
    var inputValue = event.target.value;
    setSearchValue(inputValue);
    if (!inputValue) {
      return;
    }

    // getOptions from API, transform it to associative array
    // and remove already selected option
    const rawOptions = await getOptions(inputValue);
    const cleanOptions = rawOptions.reduce((acc, value) => {
      acc[value.id] = value.name;
      return acc;
    }, {});
    Object.keys(selectedOptions).forEach((key) => {
      delete cleanOptions[key];
    });

    setOptions(cleanOptions);
  };

  const selectOption = (key) => {
    const selectedOptionsCopy = { ...selectedOptions };
    selectedOptionsCopy[key] = options[key];
    setSelectedOptions(selectedOptionsCopy);

    setSearchValue("");
    setOptions({});

    exportOptions(Object.keys(selectedOptionsCopy));
  };

  const removeOption = (key) => {
    const selectedOptionsCopy = { ...selectedOptions };
    delete selectedOptionsCopy[key];
    setSelectedOptions(selectedOptionsCopy);

    exportOptions(Object.keys(selectedOptionsCopy));
  };

  // show select box logi
  const handleValueClick = (key) => {
    selectOption(key);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchValue]);

  return (
    <div className="custom-input">
      {Object.entries(selectedOptions).map(([key, value]) => (
        <span className="selected-option" key={key}>
          {value}
          &nbsp;
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => removeOption(key)}
          ></i>
        </span>
      ))}
      <Form.Group>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={placeholder}
            onChange={handleGetData}
            value={searchValue}
          />
        </InputGroup>
      </Form.Group>
      {isOpen &&
        (options.length === 0 ? (
          <div className="custom-dropdown">
            <p>No option found</p>
          </div>
        ) : (
          <div className="custom-dropdown">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="option">
                <p onClick={() => handleValueClick(key)}>{value}</p>
              </label>
            ))}
          </div>
        ))}
    </div>
  );
}
