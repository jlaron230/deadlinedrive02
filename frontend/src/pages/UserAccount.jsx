import React, { useState } from 'react';

export default function UserAccount() {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col bg-white shadow-xl w-full max-w-screen-md">
        <div className="flex items-center h-16 pl-10 pr-6 border-b border-gray-200">
          <span className="font-medium">Settings</span>
          <button className="ml-auto h-6 w-6 flex items-center justify-center hover:bg-gray-100">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="h-2/3 max-h-full flex">
          <div className="flex flex-shrink-0 flex-col w-60 p-6">
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 ${activeTab === 'general' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => handleTabClick('general')}
              href="#"
            >
              General
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 ${activeTab === 'appearance' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => handleTabClick('appearance')}
              href="#"
            >
              Appearance
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 ${activeTab === 'profile' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => handleTabClick('profile')}
              href="#"
            >
              Profile
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 ${activeTab === 'security' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => handleTabClick('security')}
              href="#"
            >
              Security
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 ${activeTab === 'account' ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => handleTabClick('account')}
              href="#"
            >
              Account
            </a>
          </div>
          <div className="h-96 py-10 flex-grow">
            {activeTab === 'general' && (
              <>
                <h4 className="text-sm font-medium">General Settings</h4>
                <div className="flex mt-8">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_1" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_1"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">Lorem ipsum dolor sit amet.</span>
                </div>
                <div className="flex mt-4">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_2" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_2"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                </div>
              </>
            )}
            {activeTab === 'appearance' && (
              <>
                <h4 className="text-sm font-medium">Appearance Settings</h4>
                <div className="flex mt-8 w-full">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_3" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_3"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">Lorem ipsum dolor sit amet, consectetur.</span>
                </div>
                <div className="flex w-full flex-col mt-4">
                  <label className="text-xs font-medium" htmlFor="">
                    Label
                  </label>
                  <input type="text" className="w-1/2 py-1 border border-gray-300 mt-1" />
                  <span className="text-xs mt-1">Lorem ipsum dolor.</span>
                </div>
                <div className="flex w-full flex-col mt-4">
                  <label className="text-xs font-medium" htmlFor="">
                    Label
                  </label>
                  <input type="text" className="w-1/2 py-1 border border-gray-300 mt-1" />
                  <span className="text-xs mt-1">Lorem ipsum dolor.</span>
                </div>
              </>
            )}
            {activeTab === 'profile' && (
              <>
                <h4 className="text-sm font-medium">Profile Settings</h4>
                <div className="flex mt-8">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_4" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_4"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                  </span>
                </div>
                <div className="flex mt-4">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_5" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_5"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
                <div className="flex w-full flex-col mt-4">
                  <label className="text-xs font-medium" htmlFor="">
                    Label
                  </label>
                  <input type="text" className="w-1/2 py-1 border border-gray-300 mt-1" />
                  <span className="text-xs mt-1">Lorem ipsum dolor.</span>
                </div>
              </>
            )}
            {activeTab === 'security' && (
              <>
                <h4 className="text-sm font-medium">Security Settings</h4>
                <div className="flex mt-8">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_6" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_6"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                  </span>
                </div>
                <div className="flex mt-4">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_7" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_7"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </>
            )}
            {activeTab === 'account' && (
              <>
                <h4 className="text-sm font-medium">Account Settings</h4>
                <div className="flex mt-8">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_8" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_8"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                  </span>
                </div>
                <div className="flex mt-4">
                  <div>
                    <input className="hidden" type="checkbox" id="toggle_9" value="1" />
                    <label
                      className="flex items-center justify-start w-10 border border-black h-6 p-1 rounded-full cursor-pointer"
                      htmlFor="toggle_9"
                    >
                      <span className="w-4 h-4 bg-black rounded-full"></span>
                    </label>
                  </div>
                  <span className="text-xs ml-4 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}