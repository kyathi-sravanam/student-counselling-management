import React from 'react';
import ReactDOM from 'react-dom';
import './login.css';
import Login from './login';
import StudentHome from './StudentModule';
import CounsellorHome from './CounsellorModule';
import AdminHome from './AdminModule';
import AddStudent from './AddStudent';
import ViewStudent from './StudentViewing'
import ViewCounsellor from './CounsellorViewing'
import DeleteCounsellor from './CounsellorDeletion'
import AddCounsellor from './CounsellorAdding';
import DeleteStudent from './StudentDeletion';

import SChangePassword from './SPswdChange';
import CChangePassword from './CPswdChange';
import SMyProfile from './SProfile';
import CMyProfile from './CProfile';

import AssignCounsellor from './CounsellorAllotment';
import UpdateStudent from './StudentUpdation';
import SUpdateForm from './SUpdation';
import CUpdateForm from './CUpdation';
import UpdateCounsellor from './CounsellorUpdation';
import StudentBookAppointment from './SbookAppoints';
import SMyCounsellor from './SCounsellor';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SMyAppointments from './SAppoints';
import CMyStudents from './CStudents';
import CounsellorAppointments from './CounsellorAppoints';


function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
          <Route path="/studenthome" element={<StudentHome/>} />
          <Route path="/counsellorhome" element={<CounsellorHome/>} />
          <Route path="/adminhome" element={<AdminHome/>} />
          
          <Route path="/addstudent" element={<AddStudent/>}/>
          <Route path="/viewstudent" element={<ViewStudent/>}/>
          <Route path="/deletecounsellor" element={<DeleteCounsellor/>}/>
          <Route path="/deletestudent" element={<DeleteStudent/>}/>
          <Route path="/updatestudent" element={<UpdateStudent/>}/>
          <Route path="/viewcounsellor" element={<ViewCounsellor/>}/>
          <Route path="/addcounsellor" element={<AddCounsellor/>}/>
          <Route path="/schangepassword" element={<SChangePassword/>}/>
          <Route path="/cchangepassword" element={<CChangePassword/>}/>
          <Route path="/smyprofile" element={<SMyProfile/>}/>
          <Route path="/cmyprofile" element={<CMyProfile/>}/>
          <Route path="/assigncounsellor" element ={<AssignCounsellor/>}/>
          <Route path="/supdateform/:regNo" element={<SUpdateForm />}/> 
          <Route path="/cupdateform/:counselorId" element={<CUpdateForm />}/> 
          <Route path="/updatecounsellor" element={<UpdateCounsellor/>}/>
          <Route path="/studentbookappointment" element={<StudentBookAppointment/>}/>
          <Route path="/smyappointments" element={<SMyAppointments/>}/>
          <Route path='/smycounsellor' element={<SMyCounsellor/>}/>
          <Route path='/cmystudents' element={<CMyStudents/>}/>
          <Route path='/counsellorappointment' element={<CounsellorAppointments/>}/>
          
          
          
      </Routes>
    </BrowserRouter>

    
  );
}

ReactDOM.render(<Website/>, document.getElementById('root'));