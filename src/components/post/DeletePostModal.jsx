import { Button, Modal } from "react-bootstrap";
import * as postApi from "../../service/api.post";
import { toast } from "react-toastify";

export default function DeletePostModal({
  post,
  close,
  updateDeletePost,
  closeDetailModal,
}) {
  console.log(post);

  const handleDeletePost = async () => {
    try {
      await postApi.deletePost(post?.id);
      close();
      closeDetailModal();
      toast.success("Your post has been deleted");
      updateDeletePost(post?.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={post} onHide={close} onClick={(e) => e.stopPropagation()}>
      <Modal.Header closeButton>
        <Modal.Title>Delete a post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure want to delete it?</p>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button variant="danger" onClick={handleDeletePost}>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
