import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const Update = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [dob, setDOB] = useState('');

    const [error, setError] = useState('');
    const  {id}  = useParams();

    const navigate = useNavigate();

    const getString = async () => {

        const response = await fetch(`http://localhost:4000/${id}`)
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            setError("");
            console.log(result);
            setName(result.name);
            setEmail(result.email);
            setNumber(result.number);
            setDOB(result.dob);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

    const UpdateUser = { name, email, number, dob };

    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(UpdateUser),
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      }
    });

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setNumber("");
      setDOB("");
      navigate('/add');
    }
    }
    
    useEffect(()=>{
        getString();
    },[]);

    return (
        <div className="max-w-lg mx-auto mt-8">
            <div className="text-cyan-500 text-2xl ml-20 m-6">Here U can Update the data</div>
            {error && <div className="alert alert-primary rounded-lg text-white bg-cyan-400 m-2 w-full">{error}</div>}
            <form onSubmit={handleEdit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div>
                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div>
                    <label htmlFor="number" className="block">Number:</label>
                    <input type="number" id="number" name="number" value={number} onChange={(e) => setNumber(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div>
                    <label htmlFor="dob" className="block">DOB:</label>
                    <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDOB(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
            </form>
        </div>
    )
}

export default Update;