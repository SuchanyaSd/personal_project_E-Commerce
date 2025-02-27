import React from 'react'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-3xl font-bold text-gray-900 mb-8 text-center">
          <Title text1={"CONTACT"} text2={"US"} />
        </div>
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <img src={assets.contact_img} alt="Contact Us" className="rounded-lg shadow-md w-full" />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Store</h2>
              <p className="text-gray-700">54709 Willms Station<br />Suite 350, Washington, USA</p>
              <p className="text-gray-700 mt-2">Tel: (415) 555-0132</p>
              <p className="text-gray-700">Email: admin@forever.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Careers at Forever</h2>
              <p className="text-gray-700 mb-4">Learn more about our teams and job openings.</p>
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contact
