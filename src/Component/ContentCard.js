import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CardContent, 
  Card, 
  CardMedia, 
  Typography,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Button
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Modal from '@material-ui/core/Modal'

import imgP from '../images/Photo.png';
import axios from 'axios';

const SERVER = '/';
//const SERVER = 'http://192.168.0.5:9090/test';
axios.defaults.baseURL = SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: 260,
    height: 56,
    border: "3px solid black",
    margin: '5px 5px'

  },
  details: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
    textAlign: "center",
    width: 120,
    borderLeft: "3px solid black",
  },
  cover: {
  },
  image: {
    height: 50,
    width: 50,
  },
  menuBtn:{

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
  modal: {
    top: '50%',
    left: '50%'
  },
  Button: {
    marginTop: 25,
  },
  textField: {
    marginTop: 10
  }
}));

const ITEM_HEIGHT = 48;

export default function ContentCard ({fileData}){
  
  const classes = useStyles();
  const theme = useTheme();

  const[isOpen, setIsOpen] = React.useState(null);
  const[isModalOpen, setIsModalOpen] = React.useState(false);

  const open = Boolean(isOpen);

  const handleClick = (event) => {
    setIsOpen(event.currentTarget);
  };

  const [name, setName] = React.useState(fileData.name);
  const [description, setDescription] = React.useState(fileData.description);
  const [tags, setTags] = React.useState(fileData.tags);

  const [currentModal, setCurrentModal] = React.useState("");

  const handleClose = () => {
    setIsOpen(null);
  }
  const updateInputDescriptionHandler = event => {
    console.log(event.target.value)
    setDescription(event.target.value);
  }
  const updateInputTagsHandler = event => {
    setTags(event.target.value);
  }

  const handleShow = async() => {
    const data = {
      fnc: "showContentDetail",
      name: `${fileData.name}`,
    }
    await axios.post(SERVER, data)
    .then(res => {
      console.log(res);
      // MODAL 띄우기
      setCurrentModal("show");
      setIsModalOpen(true);
      setName(res.data.name);
      setDescription(res.data.description);
      setTags(res.data.tags);
      setIsOpen(null);
    })
  }
  const handleUpdate = () => {
    setCurrentModal("update");
    setIsOpen(null);
    setIsModalOpen(true);
  }

  const handleUpdateModal = async () => {
    const data = {
      fnc: "updateContent",
      name: `${fileData.name}`,
      description: description,
      tags: tags
    }
    await axios.post(SERVER, data)
    .then(res => {
      console.log(res);
      setIsModalOpen(false);
    })
  }
  const handleDelete = async () => {
    const data = {
      fnc: "deleteContent",
      name: `${fileData.name}`,
    }
    await axios.post(SERVER, data)
    .then(res => {
      console.log(res);
      setIsOpen(null);
    })
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

 const showModal = 
 (
  <div className={classes.paper}>
  <h2>파일 정보</h2>
  <TextField 
    className={classes.textField}
    fullWidth
    label="name"
    value={fileData.name}
    InputProps={{readOnly:true}}
  />
  <TextField
    className={classes.textField} 
    InputProps={{readOnly:true}}
    fullWidth
    value={fileData.description === ""? " " : fileData.description}
    label="description"
  />
  <TextField 
    className={classes.textField} 
    InputProps={{readOnly:true}}
    fullWidth
    label="tags"
    value={fileData.tags}
  />
   <TextField 
    className={classes.textField} 
    InputProps={{readOnly:true}}
    fullWidth
    label="uploaded time"
    value={fileData.uploaded}
  />
   <TextField 
    className={classes.textField} 
    InputProps={{readOnly:true}}
    fullWidth
    label="last used time"
    value={fileData.used}
  />
</div>
  );

 const updateModal = (
  <div className={classes.paper}>
  <h2>{fileData.name} 수정</h2>
  <TextField 
    fullWidth
    placeholder={fileData.description === ""? " " : fileData.description}
    label="description"
    onChange={updateInputDescriptionHandler}
  />
  <TextField 
    fullWidth
    label="tags"
    placeholder={fileData.tags}
    onChange={updateInputTagsHandler}
  />
  <Button
  className={classes.Button}
  margin = 'normal'
  variant="contained" 
  color="primary" 
  onClick={handleUpdateModal}
>
  Update
</Button>
</div>
 );

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardMedia
          className={classes.cover}
        >
        <img className={classes.image}src={imgP} alt="P"/>
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography>
            {fileData.name}
          </Typography>
        </CardContent>
        <IconButton
          className={classes.menuBtn}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={isOpen}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleShow} >정보 보기</MenuItem>
          <MenuItem onClick={handleUpdate}>정보 수정</MenuItem>
          <MenuItem onClick={handleDelete}>파일 삭제</MenuItem>
        </Menu>
        <Modal
          className={classes.modal}
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {currentModal==="show" ? showModal : updateModal}
        </Modal>
      </div>
    </Card>
  )
}