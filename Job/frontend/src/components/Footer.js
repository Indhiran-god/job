import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaFileAlt, FaUser, FaSearch, FaBuilding, FaHome } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-center items-center">
        <nav className="flex space-x-8 text-white">
          <Link to="/" className="flex flex-col items-center hover:text-gray-400">
            <FaHome size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/jobs" className="flex flex-col items-center hover:text-gray-400">
            <FaBriefcase size={20} />
            <span className="text-xs mt-1">Jobs</span>
          </Link>
          <Link to="/resume" className="flex flex-col items-center hover:text-gray-400">
            <FaFileAlt size={20} />
            <span className="text-xs mt-1">Resume</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center hover:text-gray-400">
            <FaUser size={20} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center hover:text-gray-400">
            <FaSearch size={20} />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link to="/companies" className="flex flex-col items-center hover:text-gray-400">
            <FaBuilding size={20} />
            <span className="text-xs mt-1">Companies</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
