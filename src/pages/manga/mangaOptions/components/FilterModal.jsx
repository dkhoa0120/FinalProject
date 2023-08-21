import { Button, Form, Modal } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {
  handleAuthorOptions,
  handleCateOptions,
} from "../../../admin/manageManga/components/SelectOptions";
import makeAnimated from "react-select/animated";
import { excludedColourStyles, includedColourStyles } from "./colorStyles";
import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";

export default function FilterModal({ show, close }) {
  const animatedComponents = makeAnimated();

  const { languageOptions } = useContext(LanguageContext);
  const language = languageOptions.map((lang) => ({
    value: lang,
    label: lang,
  }));

  return (
    <Modal show={show} onHide={close} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Authors</Form.Label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              components={animatedComponents}
              loadOptions={handleAuthorOptions}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Original Language </Form.Label>
            <Select
              isMulti
              components={animatedComponents}
              options={language}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Inclusion Categories</Form.Label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              styles={includedColourStyles}
              components={animatedComponents}
              loadOptions={handleCateOptions}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Exclusion Categories</Form.Label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              styles={excludedColourStyles}
              components={animatedComponents}
              loadOptions={handleCateOptions}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={close}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
