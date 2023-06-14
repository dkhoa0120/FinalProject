import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../../context/UserContext';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { getMangaList } from '../../../service/Data.service';
import { Image } from 'react-bootstrap';
import { useContext } from 'react';
import CreateManga from './components/CreateManga';
import { ToastContainer } from 'react-toastify';
import EditManga from './components/EditManga';
import DeleteManga from './components/DeleteManga';

function ManageManga() {

    const navigate = useNavigate();
    const [mangas, setMangas] = useState([]);
    const { user } = useContext(UserContext);

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [dataEdit, setDataEdit] = useState({})

    useEffect(() => {
        if (user && user.auth === false && user.roles !== "Admin") {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        getMangas();
    }, [])

    const getMangas = async () => {
        await getMangaList()
            .then((result) => {
                setMangas(result.data)
            })
    }


    const handleEdit = (mangas) => {
        setDataEdit(mangas)
        handleShowEdit();
    }
    const handleDelete = (mangas) => {
        setDataEdit(mangas)
        handleShowDelete();
    }



    return (
        <div className='manage-manga'>
            <ToastContainer />
            <Button variant="success" onClick={handleShowCreate}> <i className="fa-solid fa-circle-plus"></i> Create </Button>
            <div className='manage-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cover</th>
                            <th>Original Title</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mangas ?
                                mangas.map((item, index) => {
                                    const createdAt = new Date(item.createdAt);
                                    const formattedDate = createdAt.toLocaleDateString();
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td><Image src={item.coverPath} style={{ width: "100px" }} /></td>
                                            <td>{item.originalTitle}</td>
                                            <td>{item.originalLanguage}</td>
                                            <td className="description-cell">{item.description}</td>
                                            <td>{formattedDate}</td>
                                            <td colSpan={2}>
                                                <Button onClick={() => handleEdit(item)}> <i className="fa-solid fa-pen-to-square"></i> Edit </Button>
                                                &nbsp;
                                                <Button variant="danger" onClick={() => handleDelete(item)}> <i className="fa-solid fa-trash"></i> Delete</Button>
                                            </td>
                                        </tr>

                                    )
                                })
                                :
                                'Loading...'
                        }

                    </tbody>
                </Table>

            </div>
            <CreateManga show={showCreate} handleClose={handleCloseCreate} getMangas={getMangas} />
            <EditManga show={showEdit} handleClose={handleCloseEdit} dataEdit={dataEdit} getMangas={getMangas} />
            <DeleteManga show={showDelete} handleClose={handleCloseDelete} dataEdit={dataEdit} getMangas={getMangas} />
        </div>



    );
}

export default ManageManga;