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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Modal from '@material-ui/core/Modal'

import ContentCard from './ContentCard'

import imgF from '../images/Folder.png';
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
  Menu: {
    
  },
  textField: {
    marginTop: 10
  }
}));

const ITEM_HEIGHT = 48;

export default function FolderCard ({folderData}){
  const classes = useStyles();
  const theme = useTheme();

  const[isOpen, setIsOpen] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [fileData, setFileData] = React.useState([]);
  
  const open = Boolean(isOpen);

  const folderMenu = (event) => {
    setIsOpen(event.currentTarget);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const openFolder = async () => {
    setIsOpen(false);
    const data = {
      fnc: "showFolder",
      name: folderData.name
    }
    await axios.post(SERVER, data).then( res => {
      setFileData(res.data);
    })
    .catch(err => {
      console.log(err);
    })

    setModalType("open");
    setIsModalOpen(true);
  }

  const showFolder = () => {
    setIsOpen(false);
    setModalType("show");
    setIsModalOpen(true);
  }

  const openFolderModal =  (
    <div className={classes.paper}>
    <h2>{folderData.name}</h2>
    <div>
    {fileData.map((file) => {
      return(
        <ContentCard fileData={file} />
      )
    })}
    </div>
  </div>
  );

  const showFolderModal = (
    <div className={classes.paper}>
    <h2>{folderData.name} 정보</h2>
    <TextField 
      className={classes.textField}
      fullWidth
      label="name"
      value={folderData.name}
      InputProps={{readOnly:true}}
    />
     <TextField 
      className={classes.textField}
      InputProps={{readOnly:true}}
      fullWidth
      label="count"
      value={folderData.count}
    />
  </div>
  );

  return(
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardMedia
          className={classes.cover} 
        >
          <img className={classes.image}src={imgF} alt="F"/>
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography>
            {folderData.name}
          </Typography>
        </CardContent>
        <IconButton
          className={classes.menuBtn}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={folderMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          className={classes.Menu}
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
          <MenuItem onClick={openFolder}>열기</MenuItem>
          <MenuItem onClick={showFolder}>정보 보기</MenuItem>
        </Menu>
        <Modal
          className={classes.modal}
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {(modalType === "show") ? showFolderModal : openFolderModal}
        </Modal>
      </div>
    </Card>
  )}