/* eslint-disable jsx-a11y/alt-text */
import "./styles.css";
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import china from '../../img/flag/China.png'
import japan from '../../img/flag/Japan.png'
import korea from '../../img/flag/Korea.png'
import england from '../../img/flag/England.png'
import vietnam from '../../img/flag/VietNam.png'


function MangasList(props) {
    const { header, data } = props;
    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;


    // Auto change pagination every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => {
                const totalPages = Math.ceil(data.length / itemsPerPage);
                const nextPage = prevPage === totalPages ? 1 : prevPage + 1;
                return nextPage;
            });
        }, 15000);

        return () => {
            // Clear the interval when component unmounts
            clearInterval(interval);
        };
    }, [data.length, itemsPerPage]);



    // Calculate current manga data for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentManga = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="Manga-Container">
            <div className="Manga-Container-title">
                <Row >
                    <Col md={6}>
                        <span>{header}</span>
                    </Col>
                    <Col md={4}>
                    </Col>
                    <Col md={2}>
                        <Link to={props.link}>
                            <Button className='btn btn-dark'> <i className="fa-sharp fa-solid fa-forward"></i></Button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <Row className="px-4 my-5">
                {currentManga.map((manga) => (
                    <div key={manga.id} className="col-md-3 col-lg-3">
                        <div>
                            <div className="proj-imgbx" >
                                <Image className="cover" src={manga.coverPath} />
                                <div className="proj-txtx">
                                    <Link to={`/Manga/${manga.id}`} className='card-link'>
                                        {manga.originalLanguage === "Japanese" && (
                                            <Image style={{ height: "30px", width: "30px" }} src={japan} />
                                        )}
                                        {manga.originalLanguage === "Korean" && (
                                            <Image style={{ height: "30px", width: "30px" }} src={korea} />
                                        )}
                                        {manga.originalLanguage === "English" && (
                                            <Image style={{ height: "30px", width: "30px" }} src={england} />
                                        )}
                                        <h4>{manga.originalTitle}</h4>
                                    </Link>
                                    <span className="text-limit">{manga.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Row>
            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            <Button
                                variant="btn btn-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {currentPage === index + 1 ? <i className="fa-solid fa-circle-dot"></i> : <i className="fa-regular fa-circle-dot"></i>}
                            </Button>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MangasList;


