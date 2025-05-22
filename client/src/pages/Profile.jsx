// 3 : 09 : 03

import React, { useState } from 'react';
import { FaEdit, FaKey } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

const Profile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  // Dummy user data (Replace with actual user data via props or Redux)
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    image_url: 'https://img.freepik.com/premium-vector/cartoon-illustration-manager_272293-4622.jpg?semt=ais_hybrid&w=740',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user.image_url || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-gray-600 mt-2">{user.email}</p>

          <div className="flex gap-4 mt-6">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              onClick={() => setIsProfileOpen(true)}
            >
              <FaEdit /> Edit Profile
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
              onClick={() => setIsPasswordOpen(true)}
            >
              <FaKey /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Profile Update Dialog */}
      <Dialog open={isProfileOpen} onClose={() => setIsProfileOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">Update Profile</Dialog.Title>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Username" className="w-full border rounded-lg px-3 py-2" />
              <input type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2" />
              <input type="file" className="w-full" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Password Update Dialog */}
      <Dialog open={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">Change Password</Dialog.Title>
            <form className="space-y-4">
              <input type="password" placeholder="Current Password" className="w-full border rounded-lg px-3 py-2" />
              <input type="password" placeholder="New Password" className="w-full border rounded-lg px-3 py-2" />
              <input type="password" placeholder="Confirm New Password" className="w-full border rounded-lg px-3 py-2" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsPasswordOpen(false)} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                  Update
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Profile;
