import { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CommentForm({
  handleComment,
  isEditing = false,
  comment,
  setIsEditing,
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

  const onSubmit = async (data) => {
    if (isEditing) {
      handleComment(comment.id, data);
      setIsEditing(false);
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
          id={isEditing ? "edit-cmt-form" : "create-cmt-form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Control
            type="text"
            className="custom-input"
            placeholder="Add comment"
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
        {" "}
        {errors.content && (
          <p style={{ color: "red" }}>{errors.content.message}</p>
        )}
      </span>
      {showSubmit ? (
        <>
          <Collapse in={showSubmit}>
            <div id="showOption" style={{ textAlign: "right" }}>
              <Button
                variant="outline-dark"
                className="rounded"
                onClick={() => {
                  setIsEditing ? setIsEditing(false) : setShowsSubmit(false);
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
                form={isEditing ? "edit-cmt-form" : "create-cmt-form"}
              >
                {isEditing ? "Edit" : "Comment"}
              </Button>
            </div>
          </Collapse>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
