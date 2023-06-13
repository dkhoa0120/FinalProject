import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createManga, getLanguage } from '../../../../service/Data.service';
import { toast } from 'react-toastify';

function CreateManga(props) {

    const [originalTitle, setOriginalTitle] = useState('');
    const [coverPath, setCoverPath] = useState(null);
    const [alternativeTitles, setAlternativeTitles] = useState('');
    const [originalLanguage, setOriginalLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [publishYear, setPublishYear] = useState('');


    const handleSave = async () => {
        const formData = new FormData();
        formData.append("originalTitle", originalTitle);
        formData.append("coverImage", coverPath);
        formData.append("alternativeTitles", alternativeTitles);
        formData.append("originalLanguage", originalLanguage);
        formData.append("description", description);
        formData.append("publishYear", publishYear);

        try {
            await createManga(formData);
            props.handleClose();
            setOriginalTitle("");
            setCoverPath(null);
            setAlternativeTitles("");
            setOriginalLanguage("");
            setDescription("");
            setPublishYear("");
            toast.success("A manga has been created");
            props.getMangas();
        } catch (error) {
            toast.error("All fields are required!");
        }
    };

    const [languageOptions, setLanguageOptions] = useState([]);
    useEffect(() => {
        const fetchLanguageOptions = async () => {
            try {
                const response = await getLanguage()
                setLanguageOptions(response.data);
            } catch (error) {
                console.error('Error fetching language options:', error);
            }
        };

        fetchLanguageOptions();
    }, []);


    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Manga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xl={8}> <Form.Label>Original Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={originalTitle}
                                onChange={(e) => setOriginalTitle(e.target.value)}
                                required
                            />
                        </Col>
                        <Col xl={4}> <Form.Label>Cover</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setCoverPath(e.target.files[0])}
                                required
                            />
                        </Col>
                    </Row> &nbsp;
                    <Row>
                        <Col>  <Form.Label>Publish Year</Form.Label>
                            <Form.Control
                                type="number"
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                                required
                            />
                        </Col>
                        <Col> <Form.Label>Alternative Titles</Form.Label>
                            <Form.Control
                                type="text"
                                value={alternativeTitles}
                                onChange={(e) => setAlternativeTitles(e.target.value)}
                            />
                        </Col>
                        <Col> <Form.Label>Original Language</Form.Label>
                            <Form.Control
                                as="select"
                                value={originalLanguage}
                                onChange={(e) => setOriginalLanguage(e.target.value)}
                                required
                            >
                                <option value="">Select Language</option>
                                {languageOptions.map((language, index) => (
                                    <option key={index} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col> &nbsp;
                        <Row>
                            <Col>  <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Row>
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="success" onClick={handleSave}>
                        Add New
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateManga;