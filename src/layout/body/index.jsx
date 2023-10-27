import "./styles.css";
import { Route, Routes } from "react-router-dom";
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
import CommunityFeeds from "../../pages/communityFeed";
import FollowUsers from "../../pages/follows/followUsers";
import FollowedManga from "../../pages/follows/followMangas";
import EditProfile from "../../pages/editProfile";
import ManageGroup from "../../pages/manageGroupMembers";
import Requests from "../../pages/request";
import ManageRequest from "../../pages/admin/manageRequest";

export default function Body() {
  return (
    <div id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage/mangas" element={<ManageManga />} />
        <Route path="/manage/users/:selectedOption" element={<ManageUser />} />
        <Route path="/manage/categories" element={<ManageCategory />} />
        <Route path="/manage/authors" element={<ManageAuthor />} />
        <Route
          path="/manage/requests/:selectedOption"
          element={<ManageRequest />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mangas/:mangaId" element={<MangaDetail />} />
        <Route path="/mangas" element={<Manga />} />
        <Route path="/mangas/random" />
        <Route path="/followed-mangas" element={<FollowedManga />} />
        <Route path="/followed-users" element={<FollowUsers />} />
        <Route path="/community" element={<CommunityFeeds />} />
        <Route path="*" element={<Error />} />
        <Route path="/chapters/:chapterId" element={<ChapterPage />} />
        <Route path="/profile/:userId/:selectedOption" element={<Profile />} />
        <Route path="/upload/:mangaId" element={<Upload />} />
        <Route path="/upload/edit/:chapterId" element={<Edit />} />
        <Route path="/upload/chapters" element={<ManageChapter />} />
        <Route path="/groups/:groupId/:selectedOption" element={<Group />} />
        <Route
          path="/manage/group/members/:groupId"
          element={<ManageGroup />}
        />
        <Route path="/manga-lists/:listId" element={<MangaListGroup />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/requests/:selectedOption" element={<Requests />} />
      </Routes>
    </div>
  );
}
