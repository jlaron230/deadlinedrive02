import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
// Define the UserAccount component
export default function UserAccount() {
    return (
        <Router>
          <div className="container mx-auto p-6">
            <div className="bg-white p-10 pb-16 rounded shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">User Account</h2>
                <p className="text-gray-500">Manage your account settings and preferences.</p>
              </div>
    
              {/* Separator */}
              <div className="bg-gray-200 h-[1px] w-full mb-8"></div>
    
              <div className="flex flex-col lg:flex-row lg:space-x-12">
                <nav className="flex flex-col space-y-4 lg:w-1/4">
                  <NavLink
                    end
                    to="/profile"
                    className={({ isActive }) => `py-2 px-4 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    end
                    to="/account-settings"
                    className={({ isActive }) => `py-2 px-4 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Account Settings
                  </NavLink>
                  <NavLink
                    end
                    to="/appearance"
                    className={({ isActive }) => `py-2 px-4 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Appearance
                  </NavLink>
                  <NavLink
                    end
                    to="/notifications"
                    className={({ isActive }) => `py-2 px-4 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Notifications
                  </NavLink>
                  <NavLink
                    end
                    to="/display"
                    className={({ isActive }) => `py-2 px-4 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Display
                  </NavLink>
                </nav>
    
                <div className="flex-1 lg:ml-12">
                  <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    <Route path="/appearance" element={<Appearance />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/display" element={<Display />} />
                    <Route path="/" element={<Profile />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </Router>
      );
}