import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CommentForm({
  handleComment,
  isEditing = false,
  reply = false,
  comment,
  setIsEditing,
  setReply,
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { content: isEditing ? comment.content : "" },
  });

  const [showSubmit, setShowsSubmit] = useState(false);

  // const [value, setValue] = useState("");
  // const onInput = (e) => setValue(e.target.value);

  const onSubmit = async (data) => {
    if (isEditing) {
      handleComment(comment.id, data);
      setIsEditing(false);
    } else if (setReply) {
      handleComment(data);
      setReply(false);
      reset();
    } else {
      handleComment(data);
      reset();
    }
  };

  return (
    <>
      <div className="d-flex flex-row mt-3 mb-3">
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          width="38"
          alt="avatar"
        />
        &nbsp;
        <Form
          style={{ width: "100%" }}
          id={
            isEditing
              ? "edit-cmt-form"
              : reply
              ? "reply-cmt-form"
              : "create-cmt-form"
          }
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Control
            type="text"
            className="custom-input"
            placeholder="Add comment"
            // value={value}
            // onInput={onInput}
            onFocus={() => setShowsSubmit(true)}
            {...register("content", {
              required: "This field is required",
              maxLength: {
                value: 2000,
                message: "This field must be no more than 100 characters",
              },
            })}
          />
        </Form>
        &nbsp;
      </div>
      <span>
        {errors.content && (
          <p style={{ color: "red" }}>{errors.content.message}</p>
        )}
      </span>
      {showSubmit ? (
        <>
          <div id="showOption" style={{ textAlign: "right" }}>
            <Button
              variant="outline-dark"
              className="rounded"
              onClick={() => {
                setIsEditing
                  ? setIsEditing(false)
                  : setReply
                  ? setReply(false)
                  : setShowsSubmit(false);
                reset();
              }}
            >
              Cancel
            </Button>
            &nbsp;
            <Button
              variant="outline-dark"
              className="rounded"
              type="submit"
              // disabled={!value}
              form={
                isEditing
                  ? "edit-cmt-form"
                  : reply
                  ? "reply-cmt-form"
                  : "create-cmt-form"
              }
            >
              {isEditing ? "Edit" : "Comment"}
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
