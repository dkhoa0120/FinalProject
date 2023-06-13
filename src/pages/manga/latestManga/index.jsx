import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { getMangas, totalItems } from '../../../service/Data.service';
import { Link, useSearchParams } from 'react-router-dom';
import "./styles.css";
import Pagination from '../../../components/pagination';

function LatestManga() {


    const [mangas, setMangas] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalMangas, setTotalMangas] = useState(0);
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const itemPerPage = 1;
    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || 1));
    }, [searchParams]);

    useEffect(() => {
        latestManga();
    },)


    const latestManga = async () => {
        await getMangas("latest-manga", page, itemPerPage)
            .then((result) => {
                setMangas(result.data);
            });
    };

    //Pagination
    useEffect(() => {
        totalItems().then((response) => {
            setTotalMangas(response.data);
        });
    }, []);

    const totalPages = Math.ceil(totalMangas / itemPerPage);


    return (
        <div>
            <div style={{ paddingTop: "30px" }}>
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
                    <Pagination page={page} totalPages={totalPages} setSearchParams={setSearchParams} />
                </div>
            </div>
        </div>
    );
}

export default LatestManga;




