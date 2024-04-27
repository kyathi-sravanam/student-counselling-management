import React from 'react'
import './home.css'
import {callApi, errorResponse,getSession,setSession } from './main';

export function loadMenu(res)
{
    var data = JSON.parse(res);
    var menuitems = "";
   
    for(var x in data)
    {
        menuitems += `<li >
                        <label id='${data[x].mid}L' style='color: black;  font-size: 16px; font-family: Poppins, sans-serif; text-align: left; ' >${data[x].mtitle} <i class="dropdown-icon"></i> </label>
                        <div id='${data[x].mid}' class='smenu' ></div>
                      </li>`;
    }

    menuitems += `
        <li>
            <label id='logoutL' style='color: black; font-size: 16px; font-family: Poppins, sans-serif; text-align: center; padding-right: 70%;'>Logout <i class="logout-icon"></i></label>
            
        </li>`;
    var mlist = document.getElementById('mlist');
    mlist.innerHTML = menuitems;
    

    document.getElementById('logoutL').addEventListener('click', function () {
        setSession("sid", "", -1);
        window.location.replace("/");
    });

    for(x in data)
    {
        document.getElementById(`${data[x].mid}L`).addEventListener("click", showSMenu.bind(null, data[x].mid));
    }
}



 export function showSMenu(mid) {
    var surl = "http://localhost:5000/studenthome/studentmenus";
    var ipdata = JSON.stringify({
        mid: mid
    });

    // Close any open submenus with animation
    var openSubmenus = document.querySelectorAll('.smenu');
    openSubmenus.forEach(smenu => {
        if (smenu.id !== mid && smenu.classList.contains('active')) {
            smenu.style.maxHeight = '0'; // Ensure the menu is closed
            setTimeout(() => {
                smenu.classList.remove('active'); // Remove active class after closing
            }, 900); // Adjust the timeout to match transition duration
        }
    });

    // Check if the clicked menu is already active
    var clickedMenu = document.getElementById(mid);
    if (clickedMenu.classList.contains('active')) {
        clickedMenu.style.maxHeight = '0'; // Close the submenu
        setTimeout(() => {
            clickedMenu.classList.remove('active'); // Remove active class after closing
        }, 900); // Adjust the timeout to match transition duration
    } else {
        // Show loading indicator while fetching submenu data
        var smenu = document.getElementById(mid);

        callApi("POST", surl, ipdata, function(res) {
            loadSMenu(res);
            // After loading submenu data, open the submenu with animation
            setTimeout(() => {
                smenu.style.maxHeight = smenu.scrollHeight + 'px'; // Set max-height to show the menu
                smenu.classList.add('active'); // Add active class after opening
            }, 100); // Add a small delay before adjusting max-height
        }, errorResponse);
    }
}




export function loadSMenu(res)
{
    var data = JSON.parse(res);
    var smenuitems = "";
    for(var x in data)
    {
        smenuitems += `<label id='${data[x].smid}' style='color: black;  font-size: 16px; font-family: Poppins, sans-serif; padding-right: 20%;'>${data[x].smtitle} </label>`;
    }
    var smenu = document.getElementById(`${data[x].mid}`);
    smenu.innerHTML = smenuitems;

    for(x in data)
    {
        document.getElementById(`${data[x].smid}`).addEventListener("click", loadModule.bind(null, data[x].smid));
    }
}


export function loadModule(smid)
{
   var titlebar = document.getElementById('titlebar');
   var module = document.getElementById('module');

   switch(smid)
   {
        case "10302":
            
             module.src = "/schangepassword";
             titlebar.innerText = "Change Password";
              break;

        case "10301":
            
              module.src = "/smyprofile";
              titlebar.innerText = "My Profile";
               break;
        case "10201":
            
               module.src = "/smycounsellor";
               titlebar.innerText = "My Counsellor Details";
               break;

        case "10202":
            
               module.src = "/studentbookappointment";
               titlebar.innerText = "Schedule Appointment";
               break;

        case "10203":
            
               module.src = "/smyappointments";
               titlebar.innerText = "My Appointment History";
               break;
        
        default:
            module.src = "";
            titlebar.innerText = "";
   }
   module.className = 'module-' + smid;
}

class StudentHome extends React.Component
{

    constructor()
    {
        super()
        this.sid =getSession("sid");
        //alert(this.sid);
        if(this.sid ==="")
            window.location.replace("/");

        var url = "http://localhost:5000/studenthome/uname";
        var data = JSON.stringify({

            regNo : this.sid 
        });
        callApi("POST",url,data,this.loadUname,errorResponse);


         url = "http://localhost:5000/studenthome/studentmenu";
        callApi("POST", url, "", loadMenu, loadMenuError);

        
    }

   


    loadUname(res)  
    {
    var data =JSON.parse(res);
    var HL1 = document.getElementById("HL1");
    HL1.innerText = `${data[0].regNo}`
    } 
    
    logout()
    {   setSession("sid","",-1);
        window.location.replace("/");
    }
            

    render()
    {
        return(
            <div className='full-height'>
                <div className='firstheader' style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <div style={{ fontSize: '20px', textAlign: 'center' }}>Welcome &nbsp; <label id ='HL1' className='HS4'></label>
             </div>
            </div>
                <div className='secondheader' style={{ color: 'white' }}>
                <div className='scrolling-text'  style={{ fontSize: '20pt' }}>Student Counselling Management System</div>
                
                </div>
            
                <div className='content'>
                    <div className='menubar'>
                    <div className='menu'>
                            <nav><ul id='mlist' className='mlist'></ul></nav>
                        </div>
                        </div>
                    <div className='outlet'>
                    <div id='titlebar'></div>
                        <iframe id='module' src="" title="Module iframe"></iframe> 
                    </div>
                    </div>
                
                
                <div className='footer'>
                
                </div>
            </div>
        );
    }
}

export default StudentHome;
export function loadMenuError(res) {
    
    console.error("Error occurred while loading menu:", res);
}