import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const handleUpload = (e) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios.post("https://image-upload-wcls.vercel.app/upload", formData)
        .then((res) => console.log(res))
        .catch((error) => console.error("Upload Error:", error));
    } else {
      console.error("No file selected for upload.");
    }
  };

  useEffect(() => {
    axios.get("https://image-upload-wcls.vercel.app/getImage")
      .then((res) => {
        if (res.data.length > 0) {
          setImage(res.data[0].image);
        } else {
          console.error("No image found.");
        }
      })
      .catch((error) => console.error("Fetch Image Error:", error));
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {image && <img src={"https://image-upload-wcls.vercel.app/Images/" + image} alt="" />}
    </div>
  );
}

export default App;
