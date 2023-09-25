import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import * as commentApi from "../../service/api.comment";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

export function CommentForm({
  value,
  placeholder = "Add a comment...",
  saveButtonLabel = "Comment",
  showButtons = true,
  autoFocus = false,
  onFocus,
  onSave,
  onCancel,
  onInput,
}) {
  const textAreaRef = useRef(null);
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const { user } = useContext(UserContext);

  return (
    <>
      <div className="d-flex gap-3">
        <img
          className="avatar"
          src={user?.avatarPath || "/img/avatar/default.png"}
          width="38px"
          alt="avatar"
        />
        <div className="flex-grow-1">
          <textarea
            className="custom-textarea"
            placeholder={placeholder}
            value={value}
            onInput={onInput}
            onFocus={onFocus}
            autoFocus={autoFocus}
            ref={textAreaRef}
          />
          {showButtons && (
            <div className="d-flex align-items-center justify-content-between mt-2">
              <p className={value.length > 2000 ? "char-limit-error" : ""}>
                {value.length}/2000
              </p>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-dark"
                  className="rounded"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-dark"
                  className="rounded"
                  type="submit"
                  disabled={!value || value.length > 2000}
                  onClick={onSave}
                >
                  {saveButtonLabel}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function AddCommentForm({ type, typeId, addCommentToState }) {
  const [showButtons, setShowButtons] = useState(false);
  const [value, setValue] = useState("");
  const { user } = useContext(UserContext);

  const handleSave = async () => {
    try {
      // use type and typeId to call to api
      const formData = new FormData();
      formData.append("content", value);
      let res = await commentApi.postComment(type, typeId, formData);

      // handle api result
      let comment = res.data;
      comment.user = {
        name: user.name,
        id: user.id,
        avatarPath: user.avatarPath,
      };
      addCommentToState(comment);
      handleCancel();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to comment!");
      }
    }
  };

  const handleCancel = () => {
    setShowButtons(false);
    setValue("");
  };
  const handleFocus = () => !showButtons && setShowButtons(true);
  const handleInput = (e) => setValue(e.target.value);

  return (
    <CommentForm
      value={value}
      onSave={handleSave}
      onCancel={handleCancel}
      onFocus={handleFocus}
      onInput={handleInput}
      showButtons={showButtons}
    />
  );
}

export function EditCommentForm({ comment, editCommentInState, stopEdit }) {
  const [value, setValue] = useState(comment.content);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("content", value);
    formData.append("id", comment.id);
    await commentApi.putComment(comment.id, formData);

    // handle api result
    editCommentInState(comment.id, value);
    stopEdit();
  };

  const handleInput = (e) => setValue(e.target.value);

  return (
    <CommentForm
      value={value}
      autoFocus={true}
      saveButtonLabel="Edit"
      onSave={handleSave}
      onInput={handleInput}
      onCancel={stopEdit}
    />
  );
}

export function ReplyCommentForm({ comment, addReplyInState, stopReply }) {
  const [value, setValue] = useState("");
  const { user } = useContext(UserContext);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("content", value);
      let res = await commentApi.postReply(comment.id, formData);

      // handle api result
      let reply = res.data;
      reply.user = {
        name: user.name,
        id: user.id,
        avatarPath: user.avatarPath,
      };
      addReplyInState(reply);
      stopReply();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to reply!");
      }
    }
  };

  const handleInput = (e) => setValue(e.target.value);

  return (
    <CommentForm
      value={value}
      autoFocus={true}
      saveButtonLabel="Reply"
      placeholder="Add a reply..."
      onSave={handleSave}
      onInput={handleInput}
      onCancel={stopReply}
    />
  );
}
