import React from 'react'
import axios, {post} from 'axios';
import ContentCard from './Component/ContentCard';

function App() {
  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log(selectedFile);

    const url = 'http://localhost:3000';
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return post(url, formData, config);
  }

  return (
    <>
    <div>
      <input type='file' name='file' onChange={e => handleFileInput(e)}/>
      <button type="button" onClick={handlePost}>
        전송
      </button>
    </div>
    <div>
      <ContentCard/>
    </div>
    
    
    </>
  );
}

export default App;
