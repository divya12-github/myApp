import React,{ useEffect,useState }  from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"
import * as firebase from 'firebase';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { Label } from "@material-ui/icons";
import useFirestorenews from "./useFirestorenews";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import RoomIcon from '@material-ui/icons/Room';
import Googlemap from "./Googlemap";



const Googlemapnews =(props)=> {
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  var count=22.7777;
  var lngcount= 83.69633;

  const {newsdata} = useFirestorenews("news");

  const { compose } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
  const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");




  
  const MyMapComponent= compose(
 
    withProps(
      {
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCiE7Yq4cUl0n0J-PLyB_LbzuYgo_xXlz0&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
     
      
    }
     
    ),
   
    withScriptjs,
    withGoogleMap,
    
  )
   ( (props) =>
   <GoogleMap
   defaultZoom={8}
   defaultCenter={{ lat: 22.3458, lng:  82.69633  }}
   onClick={props.mapclicked}
 >
   {/*
 {props.isMarkerShown && <Marker position={{ lat: 22.3458, lng:  82.69633 }} onClick={props.onMarkerClick} onMouseOver={mouseOver}onMouseOut={mouseOut}>
 {showInfoWindow && (
                    <InfoWindow>
                       <p>ghghjjjk</p>
                       
                    </InfoWindow>
                )}
   </Marker>}*/}

 {newsdata && newsdata.map(newsdata=>(
  <div className="wrap" style={{marginTop:"10px"}}> {props.isMarkerShown && <Marker   position={{ lat: count++, lng:  lngcount++ }} onClick={props.onMarkerClick} 
 />}
 

</div>

))}

 

 
 </GoogleMap>
  )



  

const isMarkerShown=()=>{

}

 const mouseOut=(e)=>{

  
 }
const mouseOver=(e)=>{
  console.log("mouseover")
  
  setShowInfoWindow(true)
}
  
 const handleMarkerClick = () => {
   
   
  
  
  }
 


  
    return (
      <div>
        
         <MyMapComponent
         Label={newsdata.Title}
        isMarkerShown={isMarkerShown}
      mouseOut={mouseOut}
      mouseOver={mouseOver}
        onMarkerClick={handleMarkerClick} >
         
      </MyMapComponent>
  {/*   {docp && docp.map(docp=>(
       <b> <RoomIcon style={{color:"red"}} /></b>
     )

     )}
     */}
      </div>
     
    )
  }


export default Googlemapnews;