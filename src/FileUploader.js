import { React, useState, useEffect, Fragment, useRef } from "react";
import * as bootstrap from "bootstrap";
import ChatLoader from "./ChatLoader";

const FileUploader = () => {
  const [lines, setLines] = useState([]);

  const fileInput = useRef(null);
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    //console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const dump = fileReader.result;
      setLines(dump.split('\r\n'));
    };
    fileReader.readAsText(file);
  };

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  })
  
  return (
      <>
      <div class="card text-center mb-3" style={{width: '18 rem'}}>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">Chat Tagger (디지털포렌식 조사 지원)</h5>
        <p class="card-text">카카오톡 또는 텔레그램 대화 내역을 txt파일로 업로드해보세요.</p>
        <Fragment>
          <button onClick={handleButtonClick} class="btn btn-primary" data-bs-toggle="popover" data-bs-title="파일 업로드" data-bs-content="카카오톡 또는 텔레그램 대화 내역을 txt파일로 업로드해보세요.">파일 업로드</button>
          <input type="file"
            ref={fileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </Fragment>
        <br /><br /><br /> <button type="button" class="btn btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
        <br /><br /><br /> 
        <ChatLoader lines={lines}/>
      </div>
    </div>
      </>
  )
};

export default FileUploader;