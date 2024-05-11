import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await fetch('http://localhost:4000/');
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      getData();
    }
  }

  return (
    <div>
      <h1 className='m-5 text-2xl'>This is the area to show the data</h1>
      <div className="grid grid-cols-3 gap-3 ml-2 mr-2">

        {data?.map((ele) => (
          <div key={ele._id} className="p-4 border border-gray-300 rounded">
            <h1 className="text-lg font-bold">Name: {ele.name}</h1>
            <h2 className="text-md">Email: {ele.email}</h2>
            <h3 className="text-md">Number: {ele.number}</h3>
            <h3 className="text-md">DOB: {ele.dob ? ele.dob.split('T')[0] : ''}</h3>
            {/* Add delete and edit buttons with styling */}
            <div className="flex justify-end mt-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleDelete(ele._id)}>Delete</button>
              <Link to={`/${ele._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
            </div>
          </div>
        ))}
        {data.length === 0 ? (
              <div className="text-2xl justify-center text-blue-800">No Data to display! </div>
            ) : null}
      </div>
    </div>
  );
};

export default Read;
