import React, { useState, useEffect } from 'react';
import logo from './images/logo.png';
import ReCAPTCHA from "react-google-recaptcha";
import { callApi, setSession } from './main';


const styles = {
  popupWindow: {
    width: '600px',
    height: '450px',
    background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
    borderRadius: '8px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  leftColumn: {
    width: '50%',
    padding: '20px',
    borderRight: '1px solid #d0d0d0',
  },
  rightColumn: {
    width: '50%',
    padding: '20px',
  },
  logostyle: {
    width: '5px',
    height: '5px',
    margin: '0 auto',
    display: 'block',
  },
  
};

const aboutpopupwindowstyle = {
  width: '600px',
  height: '230px',
  background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
  borderRadius: '10px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)',
  overflow: 'hidden',
  position: 'relative',
};



function Login() {
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAboutUsPopupVisible, setAboutUsPopupVisible] = useState(false);
  const [userType, setUserType] = useState('student');
  const [loginError, setLoginError] = useState(false);


  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isPopupVisible && !document.getElementById('popupwindow').contains(event.target)) {
        setPopupVisible(false);
        window.location.reload();
      }
      if (isAboutUsPopupVisible && !document.getElementById('aboutUsPopupWindow').contains(event.target)) {
        setAboutUsPopupVisible(false);
      }
      
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isPopupVisible, isAboutUsPopupVisible]);

  const handleCaptchaVerification = () => {
    setCaptchaVerified(true);
    // Reset captcha error if user successfully completes reCAPTCHA
    setCaptchaError(false);
  };

  const handleLoginClick = () => {
    setPopupVisible(true);
    setLoginError(false);
  };

  const handleAboutUsClick = () => {
    setAboutUsPopupVisible(true);
  };

  

  const handleLogin = async () => {
    if (!isCaptchaVerified) {
      // Display error message or prevent login process
      setCaptchaError(true);
      return;
    }
    const username = document.getElementById('T1').value;
    const password = document.getElementById('T2').value;
    try {
      let bodyData;
      let endpoint;

      if (userType === 'student') {
        endpoint = `http://localhost:5000/login/student`;
        bodyData = { regNo: username, pass: password };
      } else if (userType === 'counsellor') {
        endpoint = `http://localhost:5000/login/counsellor`;
        bodyData = { counselorId: username, cpass: password };
      } else if (userType === 'admin') {
        endpoint = `http://localhost:5000/login/admin`;
        bodyData = { username, password };
      }

      callApi(
        'POST',
        endpoint,
        JSON.stringify(bodyData),
        function (response) {
          const data = JSON.parse(response);
          if (data.success) {
            // Handle successful login and redirection
            const sessionKey = userType === 'student' ? 'sid' : userType === 'counsellor' ? 'cid' : 'aid';
            setSession(sessionKey, username, (24 * 60));
            window.location.href = `/${userType}home`;
          } else {
            setLoginError(true);
          }
        },
        function (error) {
          setLoginError(true);
        }
      );
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  

  
  return (
    <div className='full-height'>
      <div id='header' className='loginheader'>
        <div style={{ float: 'left', paddingLeft: '10px' , color: 'white', fontSize: '24px', paddingTop: '10px'}}>Student Counselling Management System</div>
        <div className='btn1' style={{ textAlign: 'center', marginRight: '100px', paddingTop: '10px' }} onClick={handleLoginClick}>
          <span>Login</span>
          
        </div>
        
        
      </div>
      <div id='content' className='logincontent'>
        {isPopupVisible && (
          <div id='popup' className='popup'>
            <div id='popupwindow' className='popupwindow' style={styles.popupWindow}>
              <div className='leftColumn' style={styles.leftColumn}>
                <div className='loginstyle1'>Login</div>
                <div style={{ margin: '0 auto', display: 'block' }}>
                  <img src={logo} alt='' style={{ width: '130%', height: '130%'}} />
                </div>
              </div>
              <div className='rightColumn' style={styles.rightColumn}>
                <div>
                <div>User Type*</div>
                  <select onChange={handleUserTypeChange} value={userType} className="loginselect">
                    <option value="student">Student</option>
                    <option value="counsellor">Counsellor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div style={{ height: '10px' }}></div>
                  <div>Username*</div>
                  <div>
                    <input type='text' id='T1' className='txtbox' />
                  </div>
                  <div style={{ height: '10px' }}></div>
                  <div>Password*</div>
                  <div>
                    <input
                      type='password' 
                      id='T2'
                      className='txtbox'
                      
                    />
                  </div>
                  <div style={{ height: '10px' }}></div>
                  {loginError && (
                    <div style={{ color: 'red', textAlign: 'center' }}>
                      Incorrect username or password..
                    </div>
                  )}
                  <div style={{ height: '10px' }}></div>
                  <div>
                    <ReCAPTCHA
                      sitekey='6Le_L2EpAAAAAO4l95O7jHSxB4JcgOv8OD94cjQA'
                      onChange={handleCaptchaVerification}
                      style={{ transform: 'scale(0.9)', marginRight: '10px' }}
                    />
                    {captchaError && (
                      <div style={{ color: 'red', textAlign: 'center' }}>
                         CAPTCHA Verification Failed...!! 
                      </div>
                    )}
                    <button className='btn' onClick={handleLogin}>
                      Sign In
                    </button>
                    <div style={{ height: '10px' }}></div>
                    <label className='linklabel'>Forgot Password?</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isAboutUsPopupVisible && (
          <div id='aboutUsPopup' className='popup'>
            <div id='aboutUsPopupWindow' className='aboutpopupwindow' style={aboutpopupwindowstyle}>
              <div className='loginstyle1' style={{ textAlign: 'center' }}>About Us</div>
              <div className='loginstyle4'>
               Welcome to the Student Counselling Management System, your trusted partner in academic and personal guidance. Our mission is to empower students to navigate their educational journey with confidence and achieve their fullest potential.<br></br><br></br>

Our system provides comprehensive support and resources to students, helping them manage the challenges they may encounter during their academic journey. Whether it's academic advising, career counseling, or personal development, we are dedicated to fostering a positive and supportive environment for students.<br></br><br></br>

Our experienced counselors are here to guide you through any academic or personal concerns you may have. We believe in personalized support and strive to create a safe and inclusive space for students to seek assistance and grow.
              </div>
            </div>
          </div>
        )}
      <div className='btn2' style={{ position: 'absolute', bottom: 50, right: 5 }} onClick={handleAboutUsClick}>
        About Us
    </div>
      </div>
      <div id='footer' className='loginfooter'>
       
      </div>
    </div>
  );
}

export default Login;
