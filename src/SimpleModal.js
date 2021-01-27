import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import useFirestoresec from './useFirestoresec';
import Uploadeditform from './Uploadeditform';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const {doct} = useFirestoresec('leaders');
  console.log(doct);
  var count=0;
 
 var UploadData=doct.map(doct=>(
    UploadData=(doct.name)

   ));
   console.log(UploadData)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  var propsData = {
    label : `${props.aboutPropsName}`,
    description : 'Child Component Description'
};
  const body = (
    <div style={modalStyle} className={classes.paper}>
      
      <Uploadeditform data={propsData}/>
     
    </div>
  );

  return (
    <div>
        
      <button type="button" class="btn btn-default" id="modelbtn" onClick={handleOpen}>
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
