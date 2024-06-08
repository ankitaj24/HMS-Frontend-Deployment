import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
const AppointmentForm = ({amount,checkoutHandler}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [symptoms, setSymptoms]=useState("");
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo=useNavigate();


  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://hms-backend-deployment-alpj.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "https://hms-backend-deployment-alpj.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      checkoutHandler(amount);
      toast.success(data.message);
      navigateTo("/");
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSymptoms=async(e)=>{
    e.preventDefault();
    try{
      const val=document.querySelector("#symptoms");
      const text=val.options[val.selectedIndex].text;
      if(text==="Select Symptoms")
        throw "Select Symptoms";
      if(text==="Fever or cough and cold of children"){
        toast.success("Pediatric");
      }else if(text==="Bone fractures or Joint related issues"){
        toast.success("Orthopedic");
      }else if(text==="Chest pain or heart related issues"){
        toast.success("Cardiology");
      }else if(text==="Seizures or headaches"){
        toast.success("Neurology");
      }else if(text==="Unexplained lumps or cancer"){
        toast.success("Oncology");
      }else if(text==="Need for diagnostic imaging"){
        toast.success("Radiology");
      }else if(text==="Chronic pain or mobility issues"){
        toast.success("Physical Therapy");
      }else if(text==="Skin related issues like rashes,moles,etc"){
        toast.success("Dermatology");
      }else if(text==="Ear,Nose and Throat issues"){
        toast.success("ENT");
      }
    }catch(err){
      toast.error(err);
    }
    //setSymptoms("");
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Symptoms</h2>
        <form>
          <select placeholder="Select Symptoms" id="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)}>
            <option value="Select Symptoms">Select Symptoms</option>
            <option value="Pediatric">Fever or cough and cold of children</option>
            <option value="Orthopedic">Bone fractures or Joint related issues</option>
            <option value="Cardiology">Chest pain or heart related issues</option>
            <option value="Neurology">Seizures or headaches</option>
            <option value="Oncology">Unexplained lumps or cancer</option>
            <option value="Radiology">Need for diagnostic imaging</option>
            <option value="Physical Therapy">Chronic pain or mobility issues</option>
            <option value="Dermatology">Skin related issues like rashes,moles,etc</option>
            <option value="ENT">Ear,Nose and Throat issues</option>
          </select>
          <button onClick={handleSymptoms} style={{ margin: "0 auto" }}>CHOOSE DEPARTMENT</button>
        </form>
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button /*onClick={()=>checkoutHandler(amount)}*/ style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
