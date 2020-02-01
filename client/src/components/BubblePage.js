import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { useDispatch, useSelector } from "react-redux";
import { Fetch } from "../actions/ApiCalls";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axioswithauth";

const BubblePage = () => {
  // const dispatch = useDispatch();
  const [colorList, setColorList] = useState([]);
  // const colorList = useSelector(state => state.colorList);
  const isloading = useSelector(state => state.isloading);
  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then(response => {
        console.log(response);
        setColorList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // set that data to the colorList state property

  return (
    <>
      {isloading && (
        <Loader
          type='BallTriangle'
          color='#00BFFF'
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      {colorList && !isloading && (
        <>
          <ColorList colors={colorList} updateColors={setColorList} />
          <Bubbles colors={colorList} />
        </>
      )}
    </>
  );
};

export default BubblePage;
