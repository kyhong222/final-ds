import React from 'react'
import{makeStyles} from '@material-ui/core/styles'
import axios, {post} from 'axios';
import ContentCard from './Component/ContentCard';
import {
  colors, 
  Divider, 
  Button,
  TextField
} from "@material-ui/core"
import Modal from '@material-ui/core/Modal'
import { blue } from '@material-ui/core/colors';

const SERVER = 'http://192.168.0.5:9090/test';
axios.defaults.baseURL = SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: 25,
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
  Button: {
    marginTop: 25,
  }
}));

function App() {

  const classes = useStyles();

  const [selectedFile, setSelectedFile] = React.useState(null)
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState("");

  const [contentData, setContentData] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setTags("");
  }

  const createHandler = async () => {
    // TODO : post to server
    const data = {
      fnc: "uploadContent",
      name: name,
      description: description,
      tags: tags
    }

    console.log("post")

    await axios.get(SERVER, data)
    .then( async res => {
      console.log(res);
      // 전체목록 초기화
      const data = {
        fnc: "showAllContent",
      };
      await axios.get(SERVER, data).then(res => {
        console.log(res);
        setContentData(res.data);
      })
    })
    .catch(err => {
      console.log(err);
    })

    // modal 초기화
    setName("");
    setDescription("");
    setTags("");
    // modal close
  }

  const createInputNameHandler = event => {
    setName(event.target.value);
  }
  const createInputDescriptionHandler = event => {
    setDescription(event.target.value);
  }
  const createInputTagsHandler = event => {
    setTags(event.target.value);
  }

  const createModal = (
    <div className={classes.paper}>
    <TextField 
      fullWidth
      label="Name" 
      onChange={createInputNameHandler}
    />
    <TextField 
      fullWidth
      label="Description" 
      onChange={createInputDescriptionHandler}
    />
    <TextField 
      fullWidth
      label="Tags" 
      onChange={createInputTagsHandler}
    />
    <Button
      className={classes.Button}
      margin = 'normal'
      variant="contained" 
      color="primary" 
      onClick={createHandler}
    >
      파일 생성
    </Button>
    </div>
  );

  return (
    <>
    <div>
      {/* <input type='img' onChange={e => handleFileInput(e)}/> */}
      <Button 
      variant="contained" 
      color="primary" 
      onClick={handleOpen}>
        파일 생성
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       {createModal}
      </Modal>
    </div>

    <Divider 
    className={classes.divider}
    lignt={true}
    />

    {(contentData.length) &&
    <div>
      {contentData.map((content, i) => {
        return(
          <ContentCard fileData = {content}/>
        )
      })}
       {/* <ContentCard fileData = {fileStorage[0]}/> */}
    </div>
    }
    
    
    </>
  );
}

export default App;
