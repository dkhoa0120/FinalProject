import { Button, Modal } from "react-bootstrap";
import * as postApi from "../../service/api.post";
import { toast } from "react-toastify";

export default function DeletePostModal({ post, close, updateDeletePost }) {
  const handleDeletePost = async () => {
    try {
      await postApi.deletePost(post?.id);
      close();
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
        <span>Are you sure want to delete it?</span>
        <div className="end-button">
          <Button variant="danger" onClick={handleDeletePost}>
            Confirm Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
