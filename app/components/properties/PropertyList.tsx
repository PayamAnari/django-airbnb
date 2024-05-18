"use client"


import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";


const PropertyList = () => {
  const [properties, setProperties] = useState([]);


  const getProperties = async () => {
    const url = "http://localhost:8000/api/properties/";
    
    await fetch(url, {
      method: "GET",
    })
    .then(response => response.json())
    .then((json) => {
      console.log("json", json);

      setProperties(json.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
  };

  useEffect(() => {
    getProperties();
  }, []);
  return (
    <>
     <PropertyListItem />
     <PropertyListItem />
     <PropertyListItem />
    </>
  )
}

export default PropertyList;