import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditProfileModal({
  show,
  setShow,
  title,
  inputLabels,
}) {
  const [length, setLength] = useState(0);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLength(newValue.length);
  };
  return (
    <>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {inputLabels.map((label, index) => (
              <div key={index} style={{ paddingBottom: "15px" }}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  rows={5}
                  type={label === "Username" ? "text" : "password"}
                  as={label === "Biography" ? "textarea" : "input"}
                  onChange={handleInputChange}
                  style={{ marginBottom: "5px" }}
                />
                {label === "Biography" && (
                  <span className={length > 1000 ? "char-limit-error" : ""}>
                    {length}/1000
                  </span>
                )}
              </div>
            ))}
          </Form>
          <div className="end-button">
            <Button
              variant="primary"
              onClick={() => setShow(!show)}
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
