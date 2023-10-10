import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Report from "../../pages/admin/manageReport";
import About from "../../pages/about";
import Error from "../../pages/error/error404";
import Manga from "../../pages/manga/mangaOptions";
import MangaDetail from "../../pages/manga/mangaDetails";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import ManageUser from "../../pages/admin/manageUser";
import ManageManga from "../../pages/admin/manageManga";
import Home from "../../pages/home";
import ManageCategory from "../../pages/admin/manageCategory";
import ManageAuthor from "../../pages/admin/manageAuthor";
import ChapterPage from "../../pages/manga/chapter";
import Profile from "../../pages/profile";
import Upload from "../../pages/upload/createChapter";
import ManageChapter from "../../pages/upload/manageChapter";
import Edit from "../../pages/upload/editChapter";
import Group from "../../pages/groupProfile";
import MangaListGroup from "../../pages/profile/components/MangaListGroup";
import ManageMembers from "../../pages/groupProfile/components/ManageMembers";
import CommunityFeeds from "../../pages/communityFeed";
import FollowUsers from "../../pages/follows/followUsers";
import FollowedManga from "../../pages/follows/followMangas";

export default function Body() {
  return (
    <div id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage/mangas" element={<ManageManga />} />
        <Route path="/manage/users" element={<ManageUser />} />
        <Route path="/manage/reports" element={<Report />} />
        <Route path="/manage/categories" element={<ManageCategory />} />
        <Route path="/manage/authors" element={<ManageAuthor />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mangas/:mangaId" element={<MangaDetail />} />
        <Route path="/mangas" element={<Manga />} />
        <Route path="/followed-mangas" element={<FollowedManga />} />
        <Route path="/followed-users" element={<FollowUsers />} />
        <Route path="/community" element={<CommunityFeeds />} />
        <Route path="*" element={<Error />} />
        <Route path="/chapters/:chapterId" element={<ChapterPage />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/upload/:mangaId" element={<Upload />} />
        <Route path="/upload/edit/:chapterId" element={<Edit />} />
        <Route path="/upload/chapters" element={<ManageChapter />} />
        <Route path="/groups/:groupId" element={<Group />} />
        <Route
          path="/manage/group/members/:groupId"
          element={<ManageMembers />}
        />
        <Route path="/manga-lists/:listId" element={<MangaListGroup />} />
      </Routes>
    </div>
  );
}
