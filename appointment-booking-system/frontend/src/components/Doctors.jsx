import React, { useState, useEffect } from "react";
import "../styles/doctor.css"; 
import { Link, useNavigate } from "react-router-dom";
import Images from '../assets/assets';
import { getDoctors } from "../services/myApi";
import Navbar from "./Nav";

function Doctors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [doctors,setDoctors]=useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [error,setError]=useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchdocs() {
      try{
        const result=await getDoctors();
        if(result.error)throw new error(result.error)
          console.log(result)
        setDoctors(result)
        setFilteredDocs(result)
      }catch(err){
        setError(err.message || "failed to fetch")
      }}
      fetchdocs();
  },[])

  useEffect(()=>{
    console.log("a")
    if (selectedSpecialty === "All") {
      setFilteredDocs(doctors);
    } else {
      setFilteredDocs(
        doctors.filter((doctor) => {
          return doctor.specialization === selectedSpecialty})
      );
    }
},[selectedSpecialty,doctors])



  function handleDocClick(doc){
        navigate(`/appointment/${doc.id}`,{ state:{doc}});
  }


  return (
    <>
    <Navbar/>

    <div className="doctor-container" >
      
        <div className="filter-section" >
            <h3>Browse through the doctors</h3>
            <select onChange={(e) => setSelectedSpecialty(e.target.value)}>
                <option value="All">All Specialties</option>
                <option value="neurology">neurology</option>
                <option value="orthopedics">orthopedics</option>
                <option value="dermatology">dermatology</option>
                <option value="pediatrics">pediatrics</option>               
            </select>
        </div>


    <div className="doctor-list">
      {error&&<p>{error}</p>}

        {filteredDocs.map((doctor) => {
          const dimg=Images[doctor.name];
          return(
          
          <div key={doctor.id} className="doctor-card" onClick={() => handleDocClick(doctor)} style={{ "cursor": "pointer" }}>
                <img src={dimg } alt={doctor.name}/>
                <h6 className="availability" >
                    <ul style={{"margin":"0px","paddingLeft":"15px"}}>
                            <li>Available</li>
                    </ul>
                </h6> 
                <h4>Dr.{doctor.name.charAt(0).toUpperCase()+doctor.name.slice(1)}</h4>
                <p>{doctor.specialization.charAt(0).toUpperCase()+doctor.specialization.slice(1)}</p>
          </div>
          
          )
          })} 

      </div>
    </div>
    </>
  );
}

export default Doctors;
