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
                        <div id='${data[x].mid}' class='smenu'></div>
                      </li>`;
    }
    menuitems += `
        <li>
            <label id='logoutL' style='color: black; font-size: 16px; font-family: Poppins, sans-serif; text-align: center; padding-right: 70%;'>Logout <i class="logout-icon"></i></label>
            
        </li>`;


    var mlist = document.getElementById('mlist');
    mlist.innerHTML = menuitems;
   

    document.getElementById('logoutL').addEventListener('click', function () {
        setSession("cid", "", -1);
        window.location.replace("/");
    });
    for ( x in data) {
        var menuLabel = document.getElementById(`${data[x].mid}L`);
        menuLabel.addEventListener("click", function (mid) {
            return function () {
                var dropdownIcon = this.querySelector('.dropdown-icon');
                dropdownIcon.classList.toggle('rotated');
                showSMenu(mid);
            };
        }(data[x].mid));
    }
}



 export function showSMenu(mid) {
    var surl = "http://localhost:5000/counsellorhome/counsellormenus";
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

            // Reset rotation for the dropdown icon in closed submenu
            var menuLabel = document.getElementById(`${smenu.id}L`);
            if (menuLabel) {
                var dropdownIcon = menuLabel.querySelector('.dropdown-icon');
                dropdownIcon.classList.remove('rotated');
            }
        }
    });

    // Check if the clicked menu is already active
    var clickedMenu = document.getElementById(mid);
    if (clickedMenu.classList.contains('active')) {
        clickedMenu.style.maxHeight = '0'; // Close the submenu
        setTimeout(() => {
            clickedMenu.classList.remove('active'); // Remove active class after closing
        }, 900); // Adjust the timeout to match transition duration

        // Reset rotation for the dropdown icon in closed submenu
        var menuLabel = document.getElementById(`${mid}L`);
        if (menuLabel) {
            var dropdownIcon = menuLabel.querySelector('.dropdown-icon');
            dropdownIcon.classList.remove('rotated');
        }
    } else {
        // Show loading indicator while fetching submenu data
        var smenu = document.getElementById(mid);

        callApi("POST", surl, ipdata, function(res) {
            loadSMenu(res);
            // After loading submenu data, open the submenu with animation
            setTimeout(() => {
                smenu.style.maxHeight = smenu.scrollHeight + 'px'; // Set max-height to show the menu
                smenu.classList.add('active'); // Add active class after opening

                // Rotate the dropdown icon for the opened submenu
                var menuLabel = document.getElementById(`${mid}L`);
                if (menuLabel) {
                    var dropdownIcon = menuLabel.querySelector('.dropdown-icon');
                    dropdownIcon.classList.add('rotated');
                }
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
        smenuitems += `<label id='${data[x].smid}' style='color: black;  font-size: 16px; font-family: Poppins, sans-serif; padding-right: 20%;' >${data[x].smtitle}  </label>`;
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
    case "20301":
            
        module.src = "/cmyprofile";
        titlebar.innerText = "My Profile";
        break;        
 
    case "20302":
            
        module.src = "/cchangepassword";
        titlebar.innerText = "Change Password";
        break; 

    case "20201":
            
        module.src = "/cmystudents";
        titlebar.innerText = "My Counselling Students";
        break; 

    case "20202":
            
        module.src = "/counsellorappointment";
        titlebar.innerText = "Pending Appointments";
        break; 

    default:
        module.src = "";
        titlebar.innerText = "";
   }
   module.className = 'module-' + smid;
}

class CounsellorHome extends React.Component
{

    constructor()
    {
        super()
        this.cid =getSession("cid");
        //alert(this.cid);
        if(this.cid ==="")
            window.location.replace("/");

        var url = "http://localhost:5000/counsellorhome/uname";
        var data = JSON.stringify({

                
        counselorId: this.cid 
        });
        callApi("POST",url,data,this.loadUname,errorResponse);


        url = "http://localhost:5000/counsellorhome/counsellormenu";
        callApi("POST", url, "", loadMenu, loadMenuError);

        
    }


    loadUname(res)
    {
    var data =JSON.parse(res);
    var HL1 = document.getElementById("HL1");
    HL1.innerText = `${data[0].firstName} ${data[0].lastName}`
    }
      
    logout()
    {   
        setSession("cid","",-1);
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
                © Copyright 2024 by K L Deemed to be University. All Rights Reserved
                </div>
            </div>
        );
    }
}

export default CounsellorHome;
export function loadMenuError(res) {
    
    console.error("Error occurred while loading menu:", res);
}