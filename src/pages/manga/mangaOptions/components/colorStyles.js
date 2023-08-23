export const includedColourStyles = {
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#28a745",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "#28a745",
      color: "#dc3545",
    },
  }),
};

export const excludedColourStyles = {
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#dc3545",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "#dc3545",
      color: "#28a745",
    },
  }),
};
