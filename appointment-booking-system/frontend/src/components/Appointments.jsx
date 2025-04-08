import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctors } from "../services/myApi";
import Images from "../assets/assets";
import "../styles/appointment.css"; 
import Navbar from "./Nav";
import { io } from "socket.io-client";



function AppointmentPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const socket = io("http://localhost:3000");
  const [Selected,setSelected]=useState(false)

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const doctors = await getDoctors();
        const doc = doctors.find((doc) => doc.id.toString() === id);
        if (!doc) {
          throw new Error("Doctor not found");
        }
        setDoctor(doc);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchDoctor();
  }, [id]);
  




  useEffect(() => {
    socket.on("slotBooked",(data) => {
      if (doctor && data.doctorId === doctor.id) {
        setDoctor((prev) => ({
          ...prev,available_slots: data.available_slots,
        }));
      }
    })}, [doctor]);

  
  async function handleBooking(){
    if (!selectedSlot) {
      alert("Please select a available slot before booking");
      return;
    }
  
    const confirm = window.confirm(`Confirm booking with Dr. ${doctor.name} on ${new Date(selectedSlot).toLocaleTimeString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit' })}?`);
    if (!confirm) return;
  
    try {
      const res = await fetch("http://localhost:3000/appointment/newAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          doctorId:id,
          slot: selectedSlot,
          userId:localStorage.getItem('userId')
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("appointment booked successfully");
      }else{
        alert(data.message || "Failed to book appointment");
      }
  
    }catch(err) {
      console.error(err);
      alert("Error booking appointment");
    }
  };
  

  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!doctor) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const docImage = Images[doctor.name];

  return (
    <>
      <Navbar />
      <div className="appointment-container">
        <div className="aside">
          <img src={docImage} alt={doctor.name} />
        </div>
        <div className="main">
          <h2 style={{marginBottom:"0px"}}>Dr.{doctor.name.charAt(0).toUpperCase()+doctor.name.slice(1)}</h2>
          <p className="specialization" style={{margin:"0px"}}>MBBS - {doctor.specialization.charAt(0).toUpperCase()+doctor.specialization.slice(1)} 2 Years</p>
          
          <div className="slots-section">
            <h3>Available Slots</h3>
            <div className="slots">

              {doctor. available_slots && doctor.available_slots.length > 0?
              (
                
                doctor.available_slots.map((slot, index) => (
          
                <button key={index}  className={`slot-button ${selectedSlot===slot?"selected":""}`}   onClick={() => setSelectedSlot(slot)} >
                  {new Date(slot).toLocaleTimeString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit' })}
                  {console.log(slot)};
                </button>
                
                ))
              )
              :(
                <p>No available slots</p>
              )}
            </div>
          </div>
          <button  className="book-button" onClick={handleBooking}>Book an Appointment </button>

          {/* <button className="book-button">Book an Appointment</button> */}
        </div>
      </div>
    </>
  );
}

export default AppointmentPage;
