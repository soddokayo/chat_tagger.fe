import { React, useState, useEffect, Fragment, useRef } from "react";
import * as bootstrap from "bootstrap";
import ChatLoader from "./ChatLoader";

const FileUploader = () => {
  const [dump, setDump] = useState("");
  const [ext, setExt] = useState("");

  const fileInput = useRef(null);
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExt(file.name.split('.').slice(-1)[0]); // txt or json

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setDump(fileReader.result);
      };
      fileReader.readAsText(file);
    }
  };

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  }, [])
  
  return (
      <>
      <div className="card text-center mb-3" style={{width: '18 rem'}}>
      <div className="card-body">
        <h5 className="card-title font-weight-bold">Chat Tagger (디지털포렌식 조사 지원)</h5>
        <p className="card-text">카카오톡(.txt) 또는 텔레그램(.json) 대화 내역을 파일로 업로드해보세요.</p>
        <Fragment>
          <br /><button onClick={handleButtonClick} className="btn btn-primary" data-bs-toggle="popover" data-bs-title="파일 업로드" data-bs-content="카카오톡(.txt), 텔레그램(.json) 업로드">1. 파일 업로드</button>
          <input type="file"
            ref={fileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </Fragment>
        <br /><br /> 
        <ChatLoader dump={dump} ext={ext}/>
      </div>
    </div>
      </>
  )
};

export default FileUploader;