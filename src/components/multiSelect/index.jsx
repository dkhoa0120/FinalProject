import { useState } from "react";

export default function MultiSelect({
  placeholder,
  getOptions,
  exportOptions,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchValue, setSearchValue] = useState("");

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

  const inputUI = (
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleGetData}
      value={searchValue}
    />
  );

  const optionsUI =
    options.length === 0 ? (
      <p>No option found</p>
    ) : (
      Object.entries(options).map(([key, value]) => (
        <button key={key} onClick={() => selectOption(key)}>
          {value}
        </button>
      ))
    );

  const selectedOptionsUI =
    selectedOptions.length === 0 ? (
      <p>No option selected</p>
    ) : (
      <ul>
        {Object.entries(selectedOptions).map(([key, value]) => (
          <li key={key}>
            {value}
            <button onClick={() => removeOption(key)}>X</button>
          </li>
        ))}
      </ul>
    );

  return (
    <>
      {inputUI}
      {optionsUI}
      {selectedOptionsUI}
    </>
  );
}
