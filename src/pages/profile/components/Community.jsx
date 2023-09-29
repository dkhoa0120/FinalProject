import { Container, Dropdown, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

export default function Community() {
  const [dropDownComment, setDropDownComment] = useState(false);
  const [postDescription, setPostDescription] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <>
      <Container fluid className="post-container">
        <div className="community-container d-flex gap-3">
          <div>
            <img
              className="avatar"
              src={user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>

          <div className="post-content">
            <div>
              <Link to={`/profile/${user.id}`} className="card-link">
                <span className="comment-name">{user.name} </span>
              </Link>
              <span className="comment-time"> Today</span>
            </div>

            <div className={postDescription ? "text-limit-3" : ""}>
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
            <button
              className="btn-resize-description"
              onClick={() => setPostDescription(!postDescription)}
            >
              {postDescription ? "<More>" : "<Less>"}
            </button>

            <br />
            <div className="post-footer">
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-up" />
              </button>
              132K
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-down" />
              </button>
              2K
              <button
                className="post-react-button"
                onClick={() => setDropDownComment(!dropDownComment)}
              >
                <i className="fa-regular fa-comment"></i>
              </button>
            </div>
            {dropDownComment && (
              <p>nhét commentForm vào tại tụi t k bik nhét =))</p>
            )}
          </div>

          {/* <Dropdown>
            <Dropdown.Toggle
                  variant="outline"
                  className="comment-options-toggle"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Item>
                        <div onClick={() => setShow(true)}>Report</div>
                        <Modal show={showModal} onHide={() => setShow(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Report</Modal.Title>
                          </Modal.Header>
                          <ModalBody>
                            {comment.content}
                            <hr></hr>
                            <div>
                              <input
                                type="text"
                                className="form-control mr-3"
                                placeholder="..."
                              ></input>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <button
                              style={{
                                borderWidth: "0",
                                backgroundColor: "white",
                                fontSize: "15px",
                                color: "#730000",
                              }}
                              onClick={setShow(false)}
                            >
                              Accept
                            </button>
                          </ModalFooter>
                        </Modal>
                      </Dropdown.Item>
            </Dropdown> */}
        </div>
      </Container>
      <Container fluid className="post-container">
        <div className="community-container d-flex gap-3">
          <div>
            <img
              className="avatar"
              src={user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>

          <div className="post-content">
            <div>
              <Link to={`/profile/${user.id}`} className="card-link">
                <span className="comment-name">{user.name} </span>
              </Link>
              <span className="comment-time"> Today</span>
            </div>

            <div className={postDescription ? "text-limit-3" : ""}>
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

            <button
              className="btn-resize-description"
              onClick={() => setPostDescription(!postDescription)}
            >
              {postDescription ? "<More>" : "<Less>"}
            </button>

            <br />
            <div className="post-footer">
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-up" />
              </button>
              132K
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-down" />
              </button>
              2K
              <button
                className="post-react-button"
                onClick={() => setDropDownComment(!dropDownComment)}
              >
                <i className="fa-regular fa-comment"></i>
              </button>
            </div>
            {dropDownComment && (
              <p>nhét commentForm vào tại tụi t k bik nhét =))</p>
            )}
          </div>
          <div className="image-container">
            <img src="/img/error/coverNotFound.png" alt="notFound" />
          </div>
          {/* <Dropdown>
            <Dropdown.Toggle
                  variant="outline"
                  className="comment-options-toggle"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Item>
                        <div onClick={() => setShow(true)}>Report</div>
                        <Modal show={showModal} onHide={() => setShow(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Report</Modal.Title>
                          </Modal.Header>
                          <ModalBody>
                            {comment.content}
                            <hr></hr>
                            <div>
                              <input
                                type="text"
                                className="form-control mr-3"
                                placeholder="..."
                              ></input>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <button
                              style={{
                                borderWidth: "0",
                                backgroundColor: "white",
                                fontSize: "15px",
                                color: "#730000",
                              }}
                              onClick={setShow(false)}
                            >
                              Accept
                            </button>
                          </ModalFooter>
                        </Modal>
                      </Dropdown.Item>
            </Dropdown> */}
        </div>
      </Container>
    </>
  );
}
