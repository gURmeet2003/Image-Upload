import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    axios
      .post(`${window.location.origin}/upload`, formdata)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(`${window.location.origin}/getImage`)
      .then((res) => setImage(res.data[1].image))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <img src={`${window.location.origin}/Images/` + image} alt="" />
    </div>
  );
}

export default App;
