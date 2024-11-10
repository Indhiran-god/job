import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    jobTitle: "",
    company: "",
    skills: "",
    location: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleDeletePic = () => {
    setData((prev) => ({
      ...prev,
      profilePic: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, name, jobTitle, company, skills, location } = data;

    if (!email || !password || !confirmPassword || !name || !jobTitle || !company || !skills || !location) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must match.");
      return;
    }

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Error during signup.");
      console.error("Signup error:", error);
    }
  };

  return (
    <section id='signup' className='bg-gray-50 min-h-screen flex items-center justify-center'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto border border-gray-200 shadow-md'>
          <div className='w-24 h-24 mx-auto relative rounded-full overflow-hidden border-2 border-gray-300'>
            {data.profilePic ? (
              <div className="relative w-full h-full">
                <img src={data.profilePic} alt="Profile" className="w-full h-full object-cover" />
                <button
                  className="absolute top-1 right-1 bg-gray-600 text-white p-1 rounded-full hover:bg-gray-800"
                  onClick={handleDeletePic}
                >
                  <FaTrash />
                </button>
              </div>
            ) : (
              <label className="w-full h-full flex items-center justify-center cursor-pointer bg-gray-200 hover:bg-gray-300">
                <div className="text-center">
                  <span className="text-sm text-gray-600">Upload Photo</span>
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            )}
          </div>

          <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='grid'>
              <label className="text-gray-700">Email:</label>
              <input
                type='email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='Enter your email'
              />
            </div>

            <div className='grid'>
              <label className="text-gray-700">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className='grid'>
              <label className="text-gray-700">Confirm Password:</label>
              <input
                type='password'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='Confirm your password'
              />
            </div>

            <div className='grid'>
              <label className="text-gray-700">Full Name:</label>
              <input
                type='text'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='Enter your full name'
              />
            </div>

            <div className='grid'>
              <label className="text-gray-700">Job Title:</label>
              <input
                type='text'
                name='jobTitle'
                value={data.jobTitle}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='Your current job title'
              />
            </div>

            <div className='grid'>
              <label className="text-gray-700">Company:</label>
              <input
                type='text'
                name='company'
                value={data.company}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='Company you work for'
              />
            </div>

            <div className='grid'>
              <label className="text-gray-700">Skills:</label>
              <input
                type='text'
                name='skills'
                value={data.skills}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='e.g., JavaScript, React, Node.js'
              />
            </div>

            <div className='grid'>
              <label className="text-gray-700">Location:</label>
              <input
                type='text'
                name='location'
                value={data.location}
                onChange={handleOnChange}
                required
                className='w-full bg-gray-100 p-2 outline-none border border-gray-300'
                placeholder='Your current location'
              />
            </div>

            <button className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 rounded' type='submit'>
              Sign Up
            </button>

            <p className='text-center mt-4 text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='text-gray-700 underline hover:text-gray-900'>
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
