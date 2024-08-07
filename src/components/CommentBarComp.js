// Style File --------------------------------------------------
import "./css/commentBarComp.css";
// From React and Redux ----------------------------------------
import React, { useState } from "react";
// Local Components --------------------------------------------
import ReatingComp from "./ReatingComp"; 
import ReatingReadOnly from "./ReatingReadOnly";
// Bootstrap Components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
// @Mui 
import SendIcon from "@mui/icons-material/Send";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DangerousIcon from "@mui/icons-material/Dangerous";
// ##############################################################
export default function CommentBarComp({
  comments,
  finalCommentValue,
  productID,
}) {
  const [newComment, setNewComment] = useState("");
  const [newReat, setNewReat] = useState("");
  const [show, setShow] = useState(false);

  const reatingValue = (reatingValue) => {
    setNewReat(reatingValue);
  };

  // on click on send the comment value to "details component"
  const sendCommentValue = () => {
    setShow(true);
    setTimeout(function () {
      setShow(false);
    }, 3000);
    if (newComment && newReat) {
      finalCommentValue(newComment, newReat);
      setTimeout(function () {
        setNewComment("");
        setNewReat("");
      }, 1000);
    }
  };

  const logicForAddComment = (comment) => {
    if (comment.id === productID) {
      return (
        <div
          key={comment.commentID}
          className="comment py-2 px-3 border-bottom border rounded"
        >
          <div className="d-flex flex-column gap-1">
            <h6 className="mb-0 mt-1">{comment.name}</h6>
            <ReatingReadOnly reat={comment.reat}></ReatingReadOnly>
          </div>
          <div className="px-2 mt-2">
            <p className="text-muted mb-0">{comment.comment}</p>
            <p className="text-black-50 m-0 date">{comment.date}</p>
          </div>
        </div>
      );
    }
  };

  const findSameComment = comments.find((comment) => comment.id === productID);

  return (
    <>
      <Card style={{ width: "100%" }} className="containerOfDetailsCard mb-5">
        <Card.Body className="pb-4 d-flex justify-content-between flex-column">
          <div className="d-flex flex-column gap-2">
            {findSameComment ? (
              comments.map((comment) => logicForAddComment(comment))
            ) : (
              <h5
                id={productID + "nocomment"}
                className="noComment text-center mt-4"
              >
                No Comments.
              </h5>
            )}
          </div>
          <div className="iamHere">
            {findSameComment === undefined ? (
              newComment === "" || newReat === "" ? (
                <Alert
                  show={show}
                  className=" py-2 px-3 commentAlert"
                >
                  <div className="m-0">
                    Please!, insert your comment and your reat{" "}
                    <DangerousIcon fontSize="small"></DangerousIcon>
                  </div>
                </Alert>
              ) : (null)
            ) : (
              <Alert
                show={show}
                className=" py-2 px-3 commentAlertdone"
              >
                <div className="m-0">
                <TaskAltIcon fontSize="small"></TaskAltIcon>{" "}
                  You commented
                </div>
              </Alert>
            )}
          </div>
          <div className="d-flex flex-column gap-2 pt-3 mt-1">
            <ReatingComp theReatingValue={reatingValue}></ReatingComp>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type Your Comment Here"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
              />
              <InputGroup.Text
                id="btnGroupAddon"
                className="btn btn-outline-light border"
                onClick={sendCommentValue}
              >
                <SendIcon color="primary" fontSize="small" />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
