import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';


const About = () => {
  return (
    <div className="about-us-container">
      <div className="content-wrapper">
        <div className="text-2xl text-center pt-8 border-t mb-5">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>
        <div className="flex gap-8">
          <div className="image-container">
            <img src={assets.about_img} alt="About Us" className="about-us-image" />
          </div>
          <div className="flex flex-col gap-10">
            <p className="text-content">
              Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online.
              Our journey began with a simple idea: to provide a platform where customers can easily discover, explore,
              and purchase a wide range of products from the comfort of their homes.
            </p>
            <p className="text-content">
              Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that
              cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer
              an extensive collection sourced from trusted brands and suppliers.
            </p>
            <h2 className="text-xl">Our Mission</h2>
            <p className="text-content">
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to
              providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default About
