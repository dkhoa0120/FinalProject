import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Image } from 'react-bootstrap';
import { getMangas } from '../../service/Data.service';
import MangasList from '../../components/mangaList';
import banner from '../../img/banner/banner.png'
import "./styles.css";

function Home() {

    const [activeButton, setActiveButton] = useState('latest-manga');

    const handleButtonClick = (option) => {
        setActiveButton(option);
    };


    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        callAPI(activeButton, 1, 12);
    }, [activeButton])

    const callAPI = async (option, page, itemsPerPage) => {
        let res = await getMangas(option, page, itemsPerPage)
            .then((result) => {
                setMangas(result.data)
            })

        console.log("MANGAs", res)
    }

    return (
        <div>
            <div className="home-header" >
                <Container>
                    <Row>
                        <Col xs={12} md={6} xl={9}>

                            <div style={{ paddingTop: "30px" }}>
                                <span className="tagline">
                                    Welcome to the captivating world of manga!</span>
                                <p className='tagline-p '>
                                    Immerse yourself in an extraordinary assortment of manga.
                                    Action, adventure, fantasy, mystery, romance, and more—thousands of manga volumes for every fan!!</p>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={3}>

                            <div >
                                <Image style={{ width: "60%", height: "50%" }} src={banner} />
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
            &nbsp;
            <>
                <div style={{ display: 'flex' }}>
                    <Button
                        className='mb-4 w-100'
                        variant={activeButton === 'latest-manga' ? 'dark' : 'light'}
                        onClick={() => handleButtonClick('latest-manga')}
                    >
                        Latest Manga
                    </Button>
                    &nbsp;
                    <Button
                        className='mb-4 w-100'
                        variant={activeButton === 'latest-chapter' ? 'dark' : 'light'}
                        onClick={() => handleButtonClick('latest-chapter')}
                    >
                        Latest Chapter
                    </Button>
                    &nbsp;
                    <Button
                        className='mb-4 w-100'
                        variant={activeButton === 'random' ? 'dark' : 'light'}
                        onClick={() => handleButtonClick('random')}
                    >
                        Random
                    </Button>
                </div>
                <div>
                    {activeButton === 'latest-manga' && <MangasList header="Latest Updated Manga" link="/Manga/latest-manga" data={mangas} />}
                    {activeButton === 'latest-chapter' && <MangasList header="Latest Updated Chapter" data={mangas} />}
                    {activeButton === 'random' && <MangasList header="Random Manga" />}
                </div>
            </>
        </div>
    );
}

export default Home;

