import React, { useState, useEffect } from "react";
import { callApi } from "./main";
import { useParams } from "react-router-dom";
import "./addstudent.css";
import axios from 'axios';

function SUpdateForm() {
    const { regNo } = useParams(); // Extracting regNo using useParams hook
    const [student, setStudent] = useState({
        regNo: regNo,
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        contactNo: "",
        parentContactNo: "",
        email: "",
        year: "",
        semester: "",
        branch: "",
        cgpa: "",
    });

    
    
    useEffect(() => {
        axios.get(`http://localhost:5000/studentdetails/${regNo}`)
            .then(res => {
                setStudent({
                    ...student,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    gender: res.data.gender,
                    dob: res.data.dob,
                    bloodGroup: res.data.bloodGroup,
                    contactNo: res.data.contactNo,
                    parentContactNo: res.data.parentContactNo,
                    email: res.data.email,
                    year: res.data.year,
                    semester: res.data.semester,
                    branch: res.data.branch,
                    cgpa: res.data.cgpa
                });
            })
            .catch(err => console.log(err));
    }, [regNo]); // Depend on 'regNo'  
    
    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setStudent({ ...student, [fieldName]: fieldValue });
    };
    
    
    

    const handleError = (errorMessage) => {
        console.error("Error:", errorMessage);
        // Handle error, for example, show an error message to the user
    };

    
    const handleSuccess = (responseData) => {
        console.log("Student details updated successfully:", responseData);
        // You can add any further handling logic here, such as showing a success message to the user
    };

    const updateDetails = (event) => {
        event.preventDefault();
        const data = JSON.stringify(student);
        const url = `http://localhost:5000/updatestudent/${regNo}`;
        alert("Student Details Updated Successfully");
        callApi("PUT", url, data, handleSuccess, handleError);
    };
    const handleBackButtonClick = () => {
        window.location.href='/updatestudent';
    };
    return (
        <div>
            <button onClick={handleBackButtonClick} className="back-button">Back</button>
            <div className="mpcontent-container">
                <h2 className="mpcontent-heading">Update Student</h2>
                <form onSubmit={updateDetails} className="form-grid-layout">
                    {/* Left Column */}
                    <div className="left-column">
                        <input type="text" name="regNo" value={student.regNo} placeholder="Registration Number" className="input-field" readOnly />
                        <input type="text" name="firstName" value={student.firstName} onChange={handleInputChange} placeholder="First Name" className="input-field" required />
                        <input type="text" name="lastName" value={student.lastName} onChange={handleInputChange} placeholder="Last Name" className="input-field" required />
                        <select name="gender" value={student.gender} onChange={handleInputChange} className="select-field" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="date" name="dob" value={student.dob} onChange={handleInputChange} placeholder="Date of Birth" className="input-field" max={(new Date()).toISOString().split('T')[0]} required />
                        <select name="bloodGroup" value={student.bloodGroup} onChange={handleInputChange} className="select-field" required>
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        
                        <input type="email" name="email" value={student.email} onChange={handleInputChange} placeholder="Email" className="input-field" required />
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                    <input type="text" name="contactNo" pattern="[6789][0-9]{9}" value={student.contactNo} onChange={handleInputChange} placeholder="Contact Number" className="input-field" required />
                        <input type="tel" name="parentContactNo" pattern="[6789][0-9]{9}" value={student.parentContactNo} onChange={handleInputChange} placeholder="Parent's Contact Number" className="input-field" required />
                        <input type="number" name="year" value={student.year} onChange={handleInputChange} placeholder="Current Academic Year" className="input-field" required />
                        <select name="semester" value={student.semester} onChange={handleInputChange} className="select-field" required>
                            <option value="">Select Semester</option>
                            <option value="even">Even</option>
                            <option value="odd">Odd</option>
                        </select>
                        <select name="branch" value={student.branch} onChange={handleInputChange} className="select-field" required>
                            <option value="">Select Branch</option>
                            <option value="CSE(H)">CSE(H)</option>
                            <option value="CSE(R)">CSE(R)</option>
                            <option value="CS&IT">CS&IT</option>
                            <option value="EEE">EEE</option>
                            <option value="ECE">ECE</option>
                            <option value="CE">CE</option>
                            <option value="ME">ME</option>
                        </select>
                        <input type="number" name="cgpa" value={student.cgpa} onChange={handleInputChange} placeholder="CGPA" className="input-field" required />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">Update Details</button>
                </form>
            </div>
        </div>
    );
}

export default SUpdateForm;
