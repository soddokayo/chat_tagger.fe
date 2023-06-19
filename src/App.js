import React from 'react';
import { useState } from 'react';
import FileUploader from './FileUploader';

const App = () => {
  const [fname, setFname] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="App">
      <FileUploader />
    </div>
  );
}

export default App;
