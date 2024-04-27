import React from "react";
import './addstudent.css';
import { callApi } from "./main";

class AddStudent extends React.Component {
    constructor() {
        super();
        this.state = {
            regNo: "",
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
            pass: this.generatePassword(),

        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        
    }
    generatePassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        const length = 8;
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify(this.state);
        const url = "http://localhost:5000/registration/signup";
        alert("Student Added Successfully");
        callApi("POST", url, data, this.handleSuccess, this.handleError);
    }

    handleError(errorMessage) {
        console.error("Error:", errorMessage);
        // Handle error, for example, show an error message to the user
    }

    handleSuccess(response) {
        alert("Student Added Successfully");
        console.log("Success:", response);
    
        // Reset state to its initial values
        this.setState({
            regNo: "",
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
            pass: this.generatePassword()
        });
    }
    

    render() {
        return (
            <div className="mpcontent-container">
                <h2 className="mpcontent-heading">Add Student</h2>
                <form onSubmit={this.handleSubmit} className="form-grid-layout">
                    {/* Left Column */}
                    <div className="left-column">
                        <input type="text" name="regNo" className="input-field" value={this.state.regNo} onChange={this.handleChange} placeholder="Registration Number" required />
                        <input type="text" name="lastName" className="input-field" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" required />
                        <select name="gender" className="select-field" value={this.state.gender} onChange={this.handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="date" name="dob" className="input-field" value={this.state.dob} onChange={this.handleChange} required />
                        <input type="text" name="contactNo" className="input-field" pattern="[6789][0-9]{9}" value={this.state.contactNo} onChange={this.handleChange} placeholder="Contact Number" required />
                        <input type="email" name="email" className="input-field" value={this.state.email} onChange={this.handleChange} placeholder="Email" required />
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        <input type="text" name="firstName" className="input-field" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" required />
                        <select name="bloodGroup" className="select-field" value={this.state.bloodGroup} onChange={this.handleChange} required>
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
                        <input type="tel" name="parentContactNo" className="input-field" pattern="[6789][0-9]{9}" value={this.state.parentContactNo} onChange={this.handleChange} placeholder="Parent's Contact Number" required />
                        <input type="number" name="year" className="input-field" value={this.state.year} onChange={this.handleChange} placeholder="Current Academic Year" required />
                        <select name="semester" className="select-field" value={this.state.semester} onChange={this.handleChange} required>
                            <option value="">Select Semester</option>
                            <option value="even">Even</option>
                            <option value="odd">Odd</option>
                        </select>
                        <select name="branch" className="select-field" value={this.state.branch} onChange={this.handleChange} required>
                            <option value="">Select Branch</option>
                            <option value="CSE(H)">CSE(H)</option>
                            <option value="CSE(R)">CSE(R)</option>
                            <option value="CS&IT">CS&IT</option>
                            <option value="EEE">EEE</option>
                            <option value="ECE">ECE</option>
                            <option value="CE">CE</option>
                            <option value="ME">ME</option>
                        </select>
                        
                    </div>
                    <input type="number" name="cgpa" className="input-field" value={this.state.cgpa} onChange={this.handleChange} placeholder="CGPA" required />
                    {/* Submit Button */}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddStudent;
