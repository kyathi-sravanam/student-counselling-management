import React from "react";
import { callApi } from "./main";
import "./viewstudent.css"; // Import CSS file for styling

class ViewStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            searchQuery: "",
            sortBy: null,
            sortAsc: true
        };
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents() {
        const url = "http://localhost:5000/viewstudent/details";
        callApi("GET", url, null, this.handleSuccess, this.handleError);
    }

    handleSuccess = (response) => {
        const data = JSON.parse(response);
        this.setState({ students: data });
    };

    handleError = (error) => {
        console.error("Error fetching student details:", error);
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSort = (column) => {
        const { sortBy, sortAsc } = this.state;
        if (sortBy === column) {
            this.setState({ sortAsc: !sortAsc });
        } else {
            this.setState({ sortBy: column, sortAsc: true });
        }
    };

    render() {
        const { students, searchQuery, sortBy, sortAsc } = this.state;
        let sortedStudents = [...students];
        
        if (sortBy) {
            sortedStudents.sort((a, b) => {
                const comparison = a[sortBy].localeCompare(b[sortBy]);
                return sortAsc ? comparison : -comparison;
            });
        }

        const filteredStudents = sortedStudents.filter(student =>
            student.regNo.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className='full-height'>
                <div className="vscontent">
                <div className="header">
                    <h2>View Students </h2>
                    <input
                        type="text"
                        placeholder="Search by Registration Number"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="search-input"
                    />
                    </div>
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th onClick={() => this.handleSort("regNo")} style={{ cursor: 'pointer' }}>Registration Number</th>
                                <th onClick={() => this.handleSort("firstName")} style={{ cursor: 'pointer' }}>Full Name</th>
                                
                               
                                <th onClick={() => this.handleSort("contactNo")} style={{ cursor: 'pointer' }}>Contact No.</th>
                                <th onClick={() => this.handleSort("parentContactNo")} style={{ cursor: 'pointer' }}>Parent Contact No.</th>
                                <th onClick={() => this.handleSort("email")} style={{ cursor: 'pointer' }}>Email</th>
                                <th onClick={() => this.handleSort("year")} style={{ cursor: 'pointer' }}>Current Year</th>
                                
                                <th onClick={() => this.handleSort("branch")} style={{ cursor: 'pointer' }}>Branch</th>
                                <th onClick={() => this.handleSort("cgpa")} style={{ cursor: 'pointer' }}>Cgpa</th>
                                <th>Counsellor ID</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.regNo}</td>
                                    <td>{student.firstName} {student.lastName}</td>
                                
                                    <td>{student.contactNo}</td>
                                    <td>{student.parentContactNo}</td>
                                    <td>{student.email}</td>
                                    <td>{student.year}</td>
                               
                                    <td>{student.branch}</td>
                                    <td>{student.cgpa}</td>
                                    <td>{}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewStudent;
