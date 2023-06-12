import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { getMangas, totalItems } from '../../../service/Data.service';
import { Link, useParams } from 'react-router-dom';
import "./styles.css";

function LatestManga() {
    const { page } = useParams();
    const [mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMangas, setTotalMangas] = useState(0);
    const itemPerPage = 4;

    useEffect(() => {
        setCurrentPage(parseInt(page));
    }, [page]);

    useEffect(() => {
        latestManga();
    }, [currentPage]);

    const latestManga = async () => {
        await getMangas("latest-manga", currentPage, itemPerPage)
            .then((result) => {
                setMangas(result.data);
            });
    };

    useEffect(() => {
        totalItems().then((response) => {
            setTotalMangas(response.data);
        });
    }, []);


    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(totalMangas / itemPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];

        const addPageNumber = (i) => {
            pageNumbers.push(
                <Link key={i} to={`/Manga/latest-manga/${i}`}>
                    <Button
                        variant={`btn ${currentPage === i ? 'btn-dark' : 'btn-light'}`}
                        onClick={() => changePage(i)}
                    >
                        {i}
                    </Button>
                </Link>
            );
        };

        const dot = () => {
            pageNumbers.push(

                <Button variant="btn btn-light" disabled >
                    ...
                </Button>

            );
        };


        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                addPageNumber(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 1; i <= 4; i++) {
                    addPageNumber(i);
                }
                dot();
            } else if (currentPage >= totalPages - 1) {
                dot();
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    addPageNumber(i);
                }
            } else {
                dot();
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    addPageNumber(i);
                }
                dot();
            }
        }

        return pageNumbers;
    };


    return (
        <div>
            <div className="Manga-Container-title">
                <span>Lastest Updated Manga</span>
            </div>
            {mangas ? (
                mangas.map((manga, index) => (
                    <React.Fragment key={index}>
                        <Container>
                            <div className='wrapper'>
                                <Card style={{ position: "relative" }}>
                                    <Row>
                                        <Col xl={2}>
                                            <Card.Img variant="top" src={manga.coverPath} className='coverI' />
                                        </Col>
                                        <Col xl={10} style={{ padding: "20px" }}>

                                            <Link to={`/Manga/${manga.id}`} className='card-link'>
                                                <Card.Title>{manga.originalTitle}</Card.Title>
                                            </Link>
                                            <Card.Text>{manga.description}</Card.Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Container>
                    </React.Fragment>
                ))
            ) : (
                'Loading...'
            )}
            &nbsp;
            <div className="d-flex justify-content-center">
                <div className="pagination">
                    <Link to={`/Manga/latest-manga/1`}>
                        <Button variant='btn btn-dark'><i className="fa-solid fa-angles-left"></i></Button>
                    </Link>
                    &nbsp;
                    {currentPage > 1 ? (
                        <Link to={`/Manga/latest-manga/${currentPage - 1}`}>
                            <Button variant='btn btn-dark'><i className="fa-solid fa-angle-left"></i></Button>
                        </Link>
                    ) : (
                        <Button variant='btn btn-dark' disabled><i className="fa-solid fa-angle-left"></i></Button>
                    )}
                    &nbsp;
                    {renderPageNumbers()}
                    &nbsp;
                    {currentPage < totalPages ? (
                        <Link to={`/Manga/latest-manga/${currentPage + 1}`}>
                            <Button variant='btn btn-dark'><i className="fa-solid fa-angle-right"></i></Button>
                        </Link>
                    ) : (
                        <Button variant='btn btn-dark' disabled>
                            <i className="fa-solid fa-angle-right"></i>
                        </Button>
                    )}
                    &nbsp;
                    <Link to={`/Manga/latest-manga/${totalPages}`}>
                        <Button className='btn btn-dark'><i className="fa-solid fa-angles-right"></i></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LatestManga;




