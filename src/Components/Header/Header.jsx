import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [sidetoggle, setSideToggle] = useState(false);
  const [role, setRole] = useState(null); // State to store user role
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // Load the role from sessionStorage when component mounts

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    window.location.href = '/login'; // Redirect to the login page
  };

  const isActive = (path) => location.pathname.startsWith(path);
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <h2>Bank App Admin Panel</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <div className="logout" onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>

        <div className={`rightNav ${sidetoggle ? 'active' : ''}`}>
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''}>
              <Link to="/dashboard" onClick={handletoggleBtn}>
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </li>
            {/* Links visible to admin */}
            {role === 'Admin' && (
              <>
                <li className={isActive('/all-pending-task-admin') ? 'active' : ''}>
                  <Link to="/all-pending-task-admin" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-layer-group"></i> All Pending Task
                  </Link>
                </li>
                <li className={isActive('/all-complete-task') ? 'active' : ''}>
                  <Link to="/all-complete-task" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-layer-group"></i> All Complete Task
                  </Link>
                </li>
                <li className={isActive('/all-backend-users') ? 'active' : ''}>
                  <Link to="/all-backend-users" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-user"></i> All Backend Users
                  </Link>
                </li>
                <li className={isActive('/all-field-users') ? 'active' : ''}>
                  <Link to="/all-field-users" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-user"></i> All Field Users
                  </Link>
                </li>

              </>
            )}

            {/* Links visible to backend users */}
            {role === 'Backend' && (
              <>
                <li className={isActive('/all-task') || isActive('/add-task') ? 'active' : ''}>
                  <Link to="/all-task" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-tag"></i> Create Task
                  </Link>
                </li>
                <li className={isActive('/all-unverify-task') ? 'active' : ''}>
                  <Link to="/all-unverify-task" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-layer-group"></i> All Unverify Task
                  </Link>
                </li>
              </>
            )}

            {/* Links visible to team leader */}
            {role === 'Team Leader' && (
              <>
                <li>
                  <Link to="/all-pending-task-backend" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-layer-group"></i> All Task
                  </Link>
                </li>

                <li>
                  <Link to="/all-pending-task" onClick={handletoggleBtn}>
                    <i className="fa-solid fa-layer-group"></i> All Draft Task
                  </Link>
                </li>
              </>
            )}

            <button className="logout mb-5" onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
