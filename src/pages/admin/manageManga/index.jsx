import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addManga, deleteManga, getMangaById, getMangas, updateManga } from '../../../service/Data.service';

function ManageManga() {

    const [originalTitle, setOriginalTitle] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [description, setDescription] = useState('')

    const [editId, setEditId] = useState('')
    const [editOriginalTitle, setEditOriginalTitle] = useState('')
    const [editPublishYear, setEditPublishYear] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    //Get data from API to Show all mangas
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await getMangas()
            .then((result) => {
                setData(result.data)
            }).catch((error) => {
                toast.error(error);
            })
    }


    //Delete data
    const handleDelete = async (id) => {
        if (
            window.confirm("Are sure to delete this manga") === true
        ) {
            await deleteManga(id)
                .then((result) => {
                    if (result.status === 204) {
                        toast.success('Manga has been deleted', {
                            theme: "dark"
                        })
                        getData();
                    }
                }).catch((error) => {
                    toast.error(error);
                })
        }
    }

    //Edit manga
    const handleEdit = async (id) => {
        handleShow();
        await getMangaById(id)
            .then((result) => {
                setEditOriginalTitle(result.data.originalTitle);
                setEditPublishYear(result.data.publishYear);
                setEditDescription(result.data.description);
                setEditId(id);

            }).catch((error) => {
                toast.error(error);
            })
    }
    const handleUpdate = async () => {
        const data = {
            "id": editId,
            "originalTitle": editOriginalTitle,
            "publishYear": editPublishYear,
            "description": editDescription
        }
        await updateManga(editId, data).then((result) => {
            getData();
            clear();
            toast.success('Manga has been updated', {
                theme: "colored"
            })
        }).catch((error) => {
            toast.error(error);
        })

    }


    //Add more data 
    const handleSave = async () => {
        const data = {
            "originalTitle": originalTitle,
            "publishYear": publishYear,
            "description": description
        }
        addManga(data).then((result) => {
            getData();
            clear();
            toast.success('Manga has been added', {
                theme: "colored"
            })
        }).catch((error) => {
            toast.error(error);
        })
    }
    const clear = () => {
        setOriginalTitle('');
        setPublishYear('');
        setDescription('');
        setEditOriginalTitle('');
        setEditPublishYear('');
        setEditDescription('');
        setEditId('')
    }






    return (

        <div>
            <Container>
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter Titile" value={originalTitle} onChange={(e) => setOriginalTitle(e.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Year" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} /></Col>
                    <Col>
                        <button className='btn btn-primary' onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data ?
                            data.map((item, index) => {
                                const descriptionLimit = 20; // Set the desired word limit for the description
                                const truncatedDescription = item.description.split(' ').slice(0, descriptionLimit).join(' ');
                                const isTruncated = item.description.split(' ').length > descriptionLimit;
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.originalTitle}</td>
                                        <td>{item.publishYear}</td>
                                        <td>
                                            {isTruncated ? (
                                                <>
                                                    {truncatedDescription}...
                                                </>
                                            ) : (
                                                item.description
                                            )}
                                        </td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.id)}> Edit </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>

                                )
                            })
                            :
                            'Loading...'
                    }

                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Manga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Titile" value={editOriginalTitle} onChange={(e) => setEditOriginalTitle(e.target.value)} /></Col>
                        <Col><input type="text" className="form-control" placeholder="Enter Year" value={editPublishYear} onChange={(e) => setEditPublishYear(e.target.value)} /></Col>
                        <Col><input type="text" className="form-control" placeholder="Enter Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} /></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>



    );
}

export default ManageManga;