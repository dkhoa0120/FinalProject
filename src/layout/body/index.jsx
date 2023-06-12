import React from 'react';
import "./styles.css";
import { Route, Routes } from 'react-router-dom';
import Report from '../../pages/admin/manageReport';
import About from '../../pages/about';
import LatestManga from '../../pages/manga/latestManga';
import MangaDetail from '../../pages/manga/mangaDetails';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
import ManageUser from '../../pages/admin/manageUser';
import ManageManga from '../../pages/admin/manageManga';
import Home from '../../pages/home';



function Body() {



    return (
        <div className='Body'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manage/Manga" element={<ManageManga />} />
                <Route path="/manage/User" element={<ManageUser />} />
                <Route path="/manage/report" element={<Report />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Manga/:mangaId" element={<MangaDetail />} />
                <Route path="/Manga/latest-manga" element={<LatestManga />} />
            </Routes>
        </div>

    );
}

export default Body;