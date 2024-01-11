import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';


function Header({ onClick }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [username, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(`${user.firstname} ${user.lastname}`);
  }, []);

  const logout = () => {

    Swal.fire({
      title: "Do you want to logout?",
      icon: 'question',
      showCloseButton: false,
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(res => {
      if (res.isConfirmed) {
        axios.post('/logout').then(res => {
          Swal.fire({
            toast: true,
            title: "Success!",
            icon: 'success',
            text: res.data.message,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          }).then( () => {
            localStorage.removeItem("user");
            localStorage.removeItem("X-Auth-Token");
            navigate('/')
          });
        })
      }
    })

  }

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600"
              aria-controls="sidebar"
              onClick={onClick}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* <div>
              <button
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3 ${
                  searchModalOpen && 'bg-slate-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchModalOpen(true);
                }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="fill-current text-slate-500 dark:text-slate-400"
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    className="fill-current text-slate-400 dark:text-slate-500"
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg>
              </button>
              <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            </div> */}
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            
            <div className="inline-flex justify-center items-center group">
              {/* <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" /> */}
              <div className="flex items-center truncate">
                <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{username}</span>
              </div>
            </div>
            <Link
              className="font-medium text-sm hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"

              onClick={logout}
            >
              <MdLogout />
              <span> Sign Out </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
