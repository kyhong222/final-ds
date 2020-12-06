import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios';
import ContentCard from './Component/ContentCard';
import FolderCard from './Component/FolderCard';
import {
  Divider,
  Button,
  TextField
} from "@material-ui/core"
import Modal from '@material-ui/core/Modal'

// cors 이슈 처리를 위한 헤더 설정
const SERVER = '/';
//const SERVER = 'http://192.168.0.5:9090';
axios.defaults.baseURL = SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

// CSS
const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: '15px',
    marginBottom: 25,
    backgroundColor: "black",
    width: "100%",
    height: 2,
  },
  modal: {
    top: '50%',
    left: '50%'
  },
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  Button2: {
    margin: '10px 10px',

  },
  Button: {
    marginTop: 25,
  }
}));

function App() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [contentData, setContentData] = React.useState([]);
  const [folderData, setFolderData] = React.useState([]);
  const [viewMode, setViewMode] = React.useState("file");
  const [searchWord, setSearchWord] = React.useState("");
  const [modalType, setModalType] = React.useState("");

  // 파일생성 핸들러
  const handleOpen = () => {
    setModalType("create");
    setOpen(true);
  }

  // 파일생성 닫기 핸들러
  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setTags("");
  }

  // 전체 파일 요청 핸들러
  const refreshHandler = async () => {
    setViewMode("file");

    const data = {
      fnc: "showAllContent",
    };
    await axios.post(SERVER, data).then(res => {
      console.log(res);
      if (res.data === "") {
        setContentData(null);
      }
      else {
        setContentData(res.data);
      }
    })
  }

  // 파일생성 전송 핸들러
  const createHandler = async () => {
    // TODO : post to server
    const data = {
      fnc: "uploadContent",
      name: name,
      description: description,
      tags: tags
    }

    console.log("post")

    await axios.post(SERVER, data)
      .then(async res => {
        console.log(res);
        // 전체목록 초기화
        const data = {
          fnc: "showAllContent",
        };
        await axios.post(SERVER, data).then(res => {
          console.log(res);
          setContentData(res.data);
        })
      })
      .catch(err => {
        console.log(err);
      })
    // modal close
    handleClose();
  }

  // 전체 폴더 요청 핸들러
  const folderView = async() => {
    const data = {
      fnc: "showAllFolder",
    }
    await axios.post(SERVER, data).then(res=>{
      console.log("folder", res.data);
      setFolderData(res.data)
      setViewMode("folder");
    })
    .catch(err => {
      console.log(err);
    })
  
  }

  // 검색 모달 열기 핸들러
  const searchModalOpen = () => {
    setModalType("search");
    setOpen(true);
  }

  // 검색 요청 핸들러
  const submitSearchHandler = async() => {
    const data = {
      fnc: "search",
      searchWord: searchWord
    }
    await axios.post(SERVER, data)
    .then(res => {
      console.log("search data", res.data);
      // setContentData(null);
      setContentData(res.data);
      setOpen(false);
      setViewMode("file");
    })
    .catch(err=> {
      console.log(err);
    })
  }

  // 검색어 입력 핸들러
  const searchWordHandler = event => {
    setSearchWord(event.target.value);
  }

  // 파일생성 - name 입력 핸들러
  const createInputNameHandler = event => {
    setName(event.target.value);
  }

  // 파일생성 - description 입력 핸들러
  const createInputDescriptionHandler = event => {
    setDescription(event.target.value);
  }

  // 파일생성 - tags 입력 핸들러
  const createInputTagsHandler = event => {
    setTags(event.target.value);
  }

  // 파일생성 모달
  const createModal = (
    <div className={classes.paper}>
      <TextField
        fullWidth
        required
        label="Name"
        placeholder="Type file name"
        onChange={createInputNameHandler}
      />
      <TextField
        fullWidth
        label="Description"
        placeholder="Type description of file"
        onChange={createInputDescriptionHandler}
      />
      <TextField
        fullWidth
        label="Tags"
        placeholder="ex) tag1 tag2 tag3 ..."
        onChange={createInputTagsHandler}
      />
      <Button
        className={classes.Button}
        margin='normal'
        variant="contained"
        color="primary"
        onClick={createHandler}
      >
        파일 생성
    </Button>
    </div>
  );

  // 파일검색 모달
  const searchModal = (
    <div className={classes.paper}>
       <TextField
        fullWidth
        label="Search"
        onChange={searchWordHandler}
      />
      <Button
        className={classes.Button}
        margin='normal'
        variant="contained"
        color="primary"
        onClick={submitSearchHandler}
      >
        Search
    </Button>
    </div>
  );

  return (
    <>
      <div>
        <Button
          className={classes.Button2}
          variant="contained"
          color="primary"
          onClick={handleOpen}>
          파일 생성
        </Button>
        <Button
          className={classes.Button2}
          margin='normal'
          variant="contained"
          color="primary"
          onClick={refreshHandler}
        >
          전체 보기
        </Button>
        <Button
          className={classes.Button2}
          margin='normal'
          variant="contained"
          color="primary"
          onClick={folderView}
        >
          폴더 보기
        </Button>
        <Button
          className={classes.Button2}
          margin='normal'
          variant="contained"
          color="primary"
          onClick={searchModalOpen}
        >
          검색
        </Button>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {(modalType === "create") ? createModal : searchModal}
        </Modal>
      </div>
      <Divider
        className={classes.divider}
        lignt={true}
      />
      {(viewMode === "file") && (contentData) &&
        <div>
          {contentData.map((content) => {
            return (
              <ContentCard fileData={content} />
            )
          })}
        </div>
      }
      {(viewMode === "folder") && (folderData) &&
        <div>
          {folderData.map((folder) => {
            return (
              <FolderCard folderData={folder} />
            )
          })}
        </div>
      }
    </>
  );
}

export default App;
