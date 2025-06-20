import "./Upload.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Sample from "./Sample";
import ChatBot from "./ChatBot"

function Upload() {
  const [chatAnswer, setChatAnswer] = useState(
    "Your answer will appear here.."
  );
  const [question, setQuestion] = useState("");
  const [threadId, setThreadId] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableUploadPdf, setEnableUploadPdf] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  //const [docUploading, setdocUploading] = useState(true);
  // If file is valid, trigger loading animation and set file data
  //  function startUpload(): void {
  //   this.uploading = true;
  //   this.uploadProgress = 0;
  //   this.uploaded = false;

  //   this.setFileInfo(file);

  //   // Simulate loading time
  //   this.uploadInterval = setInterval(() => {
  //     this.uploadProgress += 10;
  //     if (this.uploadProgress >= 100) {
  //       clearInterval(this.uploadInterval);
  //       this.uploading = false;
  //       this.uploaded = true;
  //     }
  //   }, 300);
  // }

  const postQuestion = () => {
    // setLoading(true)
    axios
      .post("http://localhost:3000/chat", {
        threadId,
        assistantId,
        message: question,
      })
      .then((res) => {
        console.log("resp ui..", res);
        setChatAnswer(res.data.messages[0][0].text.value);
        //  setLoading(false)
      })
      .catch((err) => console.log(err));
  };
  const uploadPdf = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = () => {
      let files = Array.from(input.files);
      console.log("---", files[0]);
      setUploadedFile(files[0]);
      setLoading(true);
      setInterval(() => {
        setUploadProgress(uploadProgress + 100);
        if (uploadProgress >= 100) {
          clearInterval(this.uploadInterval);
          this.uploading = false;
          this.uploaded = true;
        }
      }, 300);
      const dataForm = new FormData();
      dataForm.append("file", files[0]);
      setEnableUploadPdf(false);
      axios
        .post("http://localhost:3000/upload", dataForm)
        .then((res) => {
          console.log("resp ui", res);
          setThreadId(res.data.threadId);
          setAssistantId(res.data.assistantId);
          setEnableUploadPdf(false);
          setLoading(false);
        })
        .catch((err) => console.log(err));

      // postQuestion();
    };
    input.click();
  };
  return (
    <React.Fragment>
      <div>
        {enableUploadPdf && !loading && (
          <div className="upload-page">
            <Card
              style={{ width: "350px", padding: "20px", cursor: "pointer" }}
              onClick={uploadPdf}
            >
              <div className="upload-page-img-wrapper">
                <Card.Img
                  className="upload-page-img"
                  variant="top"
                  src="upload.svg"
                />
              </div>
              <Card.Body>
                <Card.Title>Upload PDF to start chatting</Card.Title>
                <Card.Text>Click or drag and drop your file here</Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>

      {!enableUploadPdf && (
        <div style={{ display: "flex", height: "100vh" , overflow:"hidden" }}>
          <div className="upload-bar">
            {loading ? (
              <div>
                <div
                  style={{
                    width: "60%",
                    paddingBottom: "8px",
                    display: "inline-flex",
                    marginTop: "35px",
                  }}
                >
                  <Spinner
                    style={{
                      width: " 1.5rem",
                      height: " 1.5rem",
                      display: "inline",
                      float: "left",
                      marginRight: "7px",
                    }}
                    animation="border"
                    role="status"
                    variant="primary"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <div
                    style={{
                      marginLeft: "2px",
                      marginBottom: "2px",
                      color: "blue",
                      fontWeight: "600",
                      width: "86%",
                    }}
                  >
                    Uploading File
                  </div>
                  <div style={{ color: "blue", fontWeight: "600" }}>
                    {uploadProgress + "%"}
                  </div>
                </div>
                <div
                  style={{
                    width: "60%",
                    textAlign: "center",
                    display: "inline-flex",
                    height: "57px",
                  }}
                >
                  <ProgressBar
                    style={{ width: "100%" }}
                    animated
                    now={uploadProgress}
                  />
                </div>
              </div>
            ) : (
              <div>
                {!enableUploadPdf && (
                  // <div style={{ width: "50%" }}>
                  //   <div>
                  //     Ask your question here
                  //     <input
                  //       type="text"
                  //       value={question}
                  //       onChange={(e) => setQuestion(e.target.value)}
                  //     />
                  //     <button type="button" onClick={postQuestion}>
                  //       Ask AI!
                  //     </button>
                  //   </div>
                  //   <div>{chatAnswer}</div>
                  // </div>
                  <ChatBot/>

                )}
              </div>
            )}
          </div>

          <div style={{ width: "50%" ,maxHeight: '620px', overflowY: 'scroll'}}>
            {uploadedFile && <Sample uploadedPdf={uploadedFile}></Sample>}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Upload;
