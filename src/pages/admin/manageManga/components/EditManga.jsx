import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createManga, getLanguage } from '../../../../service/Data.service';
import { toast } from 'react-toastify';

function EditManga(props) {

    const [originalTitle, setOriginalTitle] = useState('');
    const [coverPath, setCoverPath] = useState(null);
    const [alternativeTitles, setAlternativeTitles] = useState('');
    const [originalLanguage, setOriginalLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [publishYear, setPublishYear] = useState('');


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

    const handleSave = () => {

    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Manga</Modal.Title>
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
                                {languageOptions.map((language) => (
                                    <option key={language.id} value={language.id}>
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditManga;