import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Col, Dropdown, Modal, Row } from "react-bootstrap";
import CommentSection from "../../../components/commentSection";
import { useParams } from "react-router-dom";

export default function Community() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const { chapterId } = useParams();

  const DropDownOptions = () => (
    <Dropdown as={"span"}>
      <Dropdown.Toggle variant="outline" className="manga-list-options-toggle">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Report</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <div className="community-container">
        <div className="community-info">
          <div>
            <img
              className="avatar"
              src={user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>
          <div>
            <span className="comment-name">{user.name} </span>
            <span className="comment-time"> 11 hours ago</span>
            <div className="text-limit-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Architecto consequatur eveniet explicabo laborum, veritatis optio
              nam inventore voluptas omnis cupiditate nisi pariatur facilis
              aspernatur quis repudiandae maxime tenetur iure fugit provident
              soluta eos. Temporibus quisquam aliquid minus iste sapiente
              expedita fugiat esse reiciendis praesentium sequi quibusdam nemo
              mollitia ipsa nostrum quaerat eius rem molestiae accusamus earum,
              quasi sunt! Consequatur quae a nam asperiores ipsam iure est
              incidunt, rem illum maiores. Magnam similique adipisci ipsa culpa
              a! Blanditiis ex vero aut esse, tempora doloribus impedit, nihil
              voluptates odit enim id eveniet adipisci sapiente fugiat nisi non
              nostrum soluta magni molestiae veniam?
            </div>
            <div className="post-footer">
              132
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-up" />
              </button>
              20
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-down" />
              </button>
              <button
                className="post-react-button"
                onClick={() => setShow(true)}
              >
                <i className="fa-regular fa-comment"></i>
              </button>
              <DropDownOptions />
            </div>
          </div>
        </div>
        <div className="post-image-container">
          <img src="/img/error/coverNotFound.png" alt="notFound" />
        </div>
        <div className="post-footer-mobile-view">
          132
          <button className="post-react-button">
            <i className="fa-regular fa-thumbs-up" />
          </button>
          20
          <button className="post-react-button">
            <i className="fa-regular fa-thumbs-down" />
          </button>
          <button className="post-react-button" onClick={() => setShow(true)}>
            <i className="fa-regular fa-comment"></i>
          </button>
          <DropDownOptions />
        </div>
      </div>
      {/* Comment Modal */}
      <Modal show={show} onHide={() => setShow(false)} size="xl">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className="modal-users-info-mobile-view">
                <img
                  className="avatar"
                  src={user.avatarPath || "/img/avatar/default.png"}
                  alt="Avatar"
                  style={{ margin: "10px 10px 10px 0" }}
                />
                <span className="comment-name">{user.name}</span>
                <span className="comment-time"> 11 hours ago</span>
              </div>
              <div className="modal-community-image">
                <img src="/img/error/coverNotFound.png" alt="notFound" />
              </div>
            </Col>
            <Col md={6}>
              <div className="community-info" style={{ paddingTop: "0" }}>
                <div>
                  <div className="modal-user-info">
                    <img
                      className="avatar"
                      src={user.avatarPath || "/img/avatar/default.png"}
                      alt="Avatar"
                      style={{ margin: "10px 10px 10px 0" }}
                    />
                    <span className="comment-name">{user.name}</span>
                    <span className="comment-time"> 11 hours ago</span>
                  </div>
                  <p style={{ marginBottom: "5px" }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Architecto consequatur eveniet explicabo laborum, veritatis
                    optio nam inventore voluptas omnis cupiditate nisi pariatur
                    facilis aspernatur quis repudiandae maxime tenetur iure
                    fugit provident soluta eos. Temporibus quisquam aliquid
                    minus iste sapiente expedita fugiat esse reiciendis
                    praesentium sequi quibusdam nemo mollitia ipsa nostrum
                    quaerat eius rem molestiae accusamus earum, quasi sunt!
                    Consequatur quae a nam asperiores ipsam iure est incidunt,
                    rem illum maiores. Magnam similique adipisci ipsa culpa a!
                    Blanditiis ex vero aut esse, tempora doloribus impedit,
                    nihil voluptates odit enim id eveniet adipisci sapiente
                    fugiat nisi non nostrum soluta magni molestiae veniam?
                  </p>
                  <div className="post-footer">
                    132
                    <button className="post-react-button">
                      <i className="fa-regular fa-thumbs-up" />
                    </button>
                    20
                    <button className="post-react-button">
                      <i className="fa-regular fa-thumbs-down" />
                    </button>
                    <DropDownOptions />
                  </div>
                  <hr style={{ margin: "0 0 20px" }} />
                  <CommentSection type="chapter" typeId={chapterId} />
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
