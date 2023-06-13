
import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Container, Button, FormSelect } from 'react-bootstrap';
import { getMangas, totalItems } from '../../../service/Data.service';
import { Link, useSearchParams } from 'react-router-dom';
import "./styles.css";
import Pagination from '../../../components/pagination';


function LatestManga() {

    const [mangas, setMangas] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalMangas, setTotalMangas] = useState(0);
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [option, setOption] = useState(searchParams.get('option'));
    const itemPerPage = 8;

    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || 1));
        setOption(searchParams.get('option'));
    }, [searchParams]);

    useEffect(() => {
        callAPI();
    }, [option, page])

    const callAPI = async () => {
        let res = await getMangas(option, page, itemPerPage)
            .then((result) => {
                setMangas(result.data)
            })

        console.log("MANGAs", res)
    }



    //Pagination
    useEffect(() => {
        totalItems().then((response) => {
            setTotalMangas(response.data);
        });
    }, [page, itemPerPage]);

    const totalPages = Math.ceil(totalMangas / itemPerPage);


    return (
        <div>
            <div style={{ paddingTop: "50px" }}>
                <Row>
                    <Col>
                        <div className="Manga-Container-title">
                            <span>{option === 'latest-manga' ? 'Latest Manga' : 'Latest Chapter'}</span>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect
                            className='mb-4 w-100'
                            value={option}
                            onChange={(e) => setSearchParams({ option: e.target.value, page: '1' })}
                        >
                            <option value='latest-manga'>Latest Manga</option>
                            <option value='latest-chapter'>Latest Chapter</option>
                        </FormSelect>
                    </Col>
                </Row>
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
                    <Pagination page={page} totalPages={totalPages} setSearchParams={setSearchParams} option={option} />
                </div>
            </div>
        </div>
    );
}

export default LatestManga;



