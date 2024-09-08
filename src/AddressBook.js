import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, updateAddress, deleteAddress } from './features/addressBookSlice';
import { v4 as uuidv4 } from 'uuid';

const AddressBook = () => {
  const addresses = useSelector((state) => state.addressBook.addresses);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateAddress({ id: editId, name, address }));
      setIsEditing(false);
      setEditId(null);
    } else {
      dispatch(addAddress({ id: uuidv4(), name, address }));
    }
    setName('');
    setAddress('');
  };

  const handleEdit = (id, name, address) => {
    setIsEditing(true);
    setEditId(id);
    setName(name);
    setAddress(address);
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="p-6 mx-auto bg-white rounded-lg shadow-md  w-[60%]">
        <h1 className="mb-4 text-2xl font-bold text-center">Address Book</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            {isEditing ? 'Update Address' : 'Add Address'}
          </button>
        </form>
        <ul className="divide-y divide-gray-200">
          {addresses.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-4">
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-gray-500">{item.address}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(item.id, item.name, item.address)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddressBook;
