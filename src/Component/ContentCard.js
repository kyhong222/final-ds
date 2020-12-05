import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CardContent, 
  Card, 
  CardMedia, 
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import imgP from '../images/Photo.png';

const options = [
  '파일 열기',
  '파일 삭제',
  '이름 바꾸기',
  '정보 보기',
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: 260,
    height: 56,
  },
  details: {
    display: 'flex',
    border: "3px solid black"
  },
  content: {
    flex: '1 0 auto',
    textAlign: "center",
  },
  cover: {
  },
  image: {
    height: 50,
    width: 50,
    borderRight: "3px solid black"
  },
  menuBtn:{

  }
});

const ITEM_HEIGHT = 48;

export default function ContentCard ({fileData}){
  
  const classes = useStyles();
  const theme = useTheme();

  console.log("fileData", fileData)

  const[isOpen, setIsOpen] = React.useState(null);
  const open = Boolean(isOpen);

  const handleClick = (event) => {
    console.log(123);
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
      <CardMedia
        className={classes.cover}
        // image={imgP}
        title="Live from space album cover"
        
      >
      {/* <img src={imgA}/> */}
        <img className={classes.image}src={imgP} alt="P"/>
      </CardMedia>
        <CardContent 
        className={classes.content}>
          <Typography
          >
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
        <MoreVertIcon />
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
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      </div>
    </Card>
  )
}