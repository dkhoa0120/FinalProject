import React, { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CommentForm({ handleComment }) {
  const [showSubmit, setShowsSubmit] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    handleComment(data);
    reset();
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
          id="create-cmt-form"
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
                  setShowsSubmit(false);
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
                form="create-cmt-form"
              >
                Comment
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
