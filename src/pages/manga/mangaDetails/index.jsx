import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import CommentSection from "../../../components/commentSection";
import {
  getChapterByMangaIdForUser,
  getMangaByIdForUser,
} from "../../../service/api.manga";
import MangaBanner from "./components/MangaBanner";
import ChapterSection from "./components/ChapterSection";
import {
  deleteRating,
  getCurrentUserRating,
  postRating,
  putRating,
} from "../../../service/api.rating";
import {
  deleteFollow,
  getCurrentUserFollow,
  postFollow,
} from "../../../service/api.follow";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteComment,
  getUserComment,
  postComment,
  putComment,
} from "../../../service/api.comment";
import { UserContext } from "../../../context/UserContext";

export default function MangaDetail() {
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [totalCommentPages, setTotalCommentPages] = useState(0);
  const [totalChapterPages, setTotalChapterPages] = useState(0);
  const [commentPage, setCommentPage] = useState(1);
  const [chapterPage, setChapterPage] = useState(1);
  const { mangaId } = useParams();
  const [rate, setRate] = useState(false);
  const [follow, setFollow] = useState(null);
  const [comments, setComments] = useState(null);
  const { user } = useContext(UserContext);

  const handleSelectRate = async (eventKey) => {
    const formData = new FormData();
    formData.append("inputRating", eventKey);
    try {
      if (!rate) {
        await postRating(mangaId, formData);
      } else {
        await putRating(mangaId, formData);
      }
      setRate(Number(eventKey));
      getMangaDetail(mangaId);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to rate!", {
          theme: "colored",
        });
      } else {
        console.error(error);
      }
    }
  };

  const handleRemoveRate = async () => {
    if (rate !== null) {
      try {
        await deleteRating(mangaId);
        setRate(null);
        getMangaDetail(mangaId);
      } catch {
        console.error("Something went wrong!");
      }
    }
  };

  const handleFollow = async () => {
    try {
      if (!follow) {
        await postFollow(mangaId);
        setFollow(true);
      } else {
        await deleteFollow(mangaId);
        setFollow(false);
      }
      getMangaDetail(mangaId);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to follow!", {
          theme: "colored",
        });
      } else {
        console.error(error);
      }
    }
  };

  const handleChangeComment = (pageNum) => {
    setCommentPage(pageNum);
  };

  const handleChangeChapter = (pageNum) => {
    setChapterPage(pageNum);
  };

  const fetchUserRating = async (mangaId) => {
    try {
      const response = await getCurrentUserRating(mangaId);
      const userRating = response.data;
      if (userRating) {
        setRate(userRating);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  const getMangaDetail = async (id) => {
    try {
      const result = await getMangaByIdForUser(id);
      setManga(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setManga(null);
      }
    }
  };

  const fetchUserComments = async (id, page) => {
    const result = await getUserComment(id, { page });
    setComments(result.data.itemList);
    setTotalCommentPages(result.data.totalPages);
  };

  const getChaptersByPage = async (id, page) => {
    try {
      const result = await getChapterByMangaIdForUser(id, { page });
      const groupedChapters = result.data.itemList.reduce((result, chapter) => {
        const { number } = chapter;
        if (!result[number]) {
          result[number] = [];
        }
        result[number].push(chapter);
        return result;
      }, {});
      setChapters(groupedChapters);
      setTotalChapterPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapters(null);
      }
    }
  };

  const fetchUserFollow = async (mangaId) => {
    try {
      const response = await getCurrentUserFollow(mangaId);
      console.log(response.data);
      setFollow(response.data);
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  const addComment = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    let res = await postComment(manga.id, formData);
    res.data.user = { name: user.name, id: user.id };
    setComments([res.data, ...comments]);
    console.log("data", res.data);
  };

  const editComment = async (commentId, data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("id", commentId);
    await putComment(commentId, formData);
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: data.content }
          : comment
      )
    );
  };

  const removeComment = async (commentId) => {
    await deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  useEffect(() => {
    getMangaDetail(mangaId);
    fetchUserRating(mangaId);
    getChaptersByPage(mangaId, chapterPage);
    fetchUserFollow(mangaId);
    fetchUserComments(mangaId, commentPage);
  }, [mangaId, commentPage, chapterPage]);

  return (
    <>
      <ToastContainer />
      <MangaBanner
        manga={manga}
        rate={rate}
        handleSelectRate={handleSelectRate}
        handleRemoveRate={handleRemoveRate}
        follow={follow}
        handleFollow={handleFollow}
      />
      <ChapterSection
        chapters={chapters}
        page={chapterPage}
        totalPages={totalChapterPages}
        onPageChange={handleChangeChapter}
      />
      <CommentSection
        manga={manga}
        editComment={editComment}
        addComment={addComment}
        removeComment={removeComment}
        comments={comments}
        page={commentPage}
        totalPages={totalCommentPages}
        onPageChange={handleChangeComment}
      />
    </>
  );
}
