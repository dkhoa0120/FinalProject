import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { CategoryContext } from "../../../../context/CategoryContext";
import { excludedColourStyles, includedColourStyles } from "./colorStyles";
import { handleAuthorOptions } from "../../../admin/manageManga/components/SelectOptions";
import { useEffect } from "react";
import * as authorApi from "../../../../service/api.author";
import { languageOptions } from "../../../../constants/languages";

export default function FilterModal({
  show,
  close,
  searchParams,
  setSearchParams,
}) {
  const animatedComponents = makeAnimated();
  const { categoryOptions } = useContext(CategoryContext);

  // states for category select
  const [includedCate, setIncludedCate] = useState([]);
  const [excludedCate, setExcludedCate] = useState([]);
  //states for language select
  const [languages, setLanguages] = useState([]);
  const [author, setAuthor] = useState(null);

  const includedCategoryIds = searchParams.get("included") || null;
  const excludedCategoryIds = searchParams.get("excluded") || null;
  const selectedLanguages = searchParams.get("languages") || null;
  const selectedAuthorId = searchParams.get("author") || null;

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const result = await authorApi.getAuthorByID(selectedAuthorId);
        setAuthor({ value: result.data.id, label: result.data.name });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAuthor(null);
        }
      }
    };

    if (selectedAuthorId) {
      getAuthor();
    }
  }, [selectedAuthorId]);

  // prepare for default value in multi-select
  const initialIncludedOptions = includedCategoryIds?.split(",").map((id) => {
    return categoryOptions.find((cate) => cate.value.startsWith(id));
  });
  const initialExcludedOptions = excludedCategoryIds?.split(",").map((id) => {
    return categoryOptions.find((cate) => cate.value.startsWith(id));
  });
  const initialLanguageOptions = selectedLanguages?.split(",").map((id) => {
    return languageOptions.find((lang) => lang.value.startsWith(id));
  });

  // filter options to not show included options in excluded options and vice versa
  const filteredOptionsForIncluded = categoryOptions.filter(
    (option) => !excludedCate.includes(option.value)
  );
  const filteredOptionsForExcluded = categoryOptions.filter(
    (option) => !includedCate.includes(option.value)
  );

  const handleApplyFilter = () => {
    setSearchParams((params) => {
      if (!includedCate || includedCate.length === 0) {
        params.delete("included");
        params.set("page", 1);
      } else {
        const modifiedCateIds = includedCate
          .map((id) => id.slice(0, 5))
          .join(",");
        params.set("included", modifiedCateIds);
      }
      if (!excludedCate || excludedCate.length === 0) {
        params.delete("excluded");
        params.set("page", 1);
      } else {
        const modifiedCateIds = excludedCate
          .map((id) => id.slice(0, 5))
          .join(",");
        params.set("excluded", modifiedCateIds);
      }
      if (!languages || languages.length === 0) {
        params.delete("languages");
        params.set("page", 1);
      } else {
        const modifiedLangIds = languages.map((id) => id).join(",");
        params.set("languages", modifiedLangIds);
      }
      if (!author) {
        params.delete("author");
        params.set("page", 1);
      } else {
        params.set("author", author.value);
      }
      params.set("page", 1);
      return params;
    });
  };

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
              isClearable
              cacheOptions
              defaultOptions
              defaultValue={author}
              loadOptions={handleAuthorOptions}
              onChange={(selectedOption) => {
                setAuthor(selectedOption);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Original Language </Form.Label>
            <Select
              isMulti
              options={languageOptions}
              defaultValue={initialLanguageOptions}
              components={animatedComponents}
              onChange={(selectedOptions) => {
                const selectedLangIds = (selectedOptions || []).map(
                  (option) => option.value
                );
                setLanguages(selectedLangIds);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Included Categories</Form.Label>
            <Select
              isMulti
              cacheOptions
              defaultOptions
              styles={includedColourStyles}
              components={animatedComponents}
              defaultValue={initialIncludedOptions}
              options={filteredOptionsForIncluded}
              onChange={(selectedOptions) => {
                const selectedCategoryIds = (selectedOptions || []).map(
                  (option) => option.value
                );
                setIncludedCate(selectedCategoryIds);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Excluded Categories</Form.Label>
            <Select
              isMulti
              cacheOptions
              defaultOptions
              styles={excludedColourStyles}
              components={animatedComponents}
              defaultValue={initialExcludedOptions}
              options={filteredOptionsForExcluded}
              onChange={(selectedOptions) => {
                const selectedCategoryIds = (selectedOptions || []).map(
                  (option) => option.value
                );
                setExcludedCate(selectedCategoryIds);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            handleApplyFilter();
            close();
          }}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
