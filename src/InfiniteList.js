import React, { useState, useEffect } from 'react';
import useFirestoretask from './useFirestoretask.js'
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }));
  


export default function InfiniteList(props) {

  const [loadMore, setLoadMore] = useState(true);
  const {docp} = useFirestoretask('task');
  var index=0;
  const classes = useStyles();
  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById('list')
    if(props.scrollable) {   
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });  
    } else {  
      // list has auto height  
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById('list');

    if(list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);


  const getData = (load) => {
    if (load) {
      fetch(`${docp}/5`)
        .then(res => {
          return !res.ok 
          ? res.json().then(e => Promise.reject(e)) 
          : res.json();
        })
        .then(res => {
          props.setState([...props.docp, ...res.message]);
        });
    }
  };

  return (
      <div>

     <div>
        
    <ul id='list'>
   
      <div>
      { docp.map(docp => (
            <div className="data-wrap"  key={docp.id}style={{textAlign:"center"}} >
              <p style={{fontSize:"11px"}}><b>{docp.Title}</b></p>
             <div style={{textAlign:"left",paddingLeft:"20px"}}>
               <Link to={{pathname:"/Edittask",
               aboutPropsName:[index]}}>
                  <Button value={index++} variant="contained"  color="primary"  className={classes.button} endIcon={<EditIcon />}>
                      Edit
                  </Button>
               </Link>
            
              <Button  variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />}>
              Delete
            </Button>
             </div>
              
            </div>
          ))}
      </div>

    </ul>
    </div>

      </div>
   
  );
};