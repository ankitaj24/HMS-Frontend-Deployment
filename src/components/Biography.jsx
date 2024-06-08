import React from 'react'

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            At ZEE CARE Hospital, we are dedicated to providing exceptional healthcare services tailored to meet the diverse needs of our patients. With a commitment to excellence, compassion, and innovation, we strive to deliver comprehensive medical care of the highest quality. Our team of experienced healthcare professionals, supported by state-of-the-art technology and modern facilities, ensures that every patient receives personalized attention and the best possible treatment outcomes. Whether it's preventive care, diagnostic services, or specialized treatments, ZEE CARE Hospital is your trusted partner in health and wellness. Your well-being is our priority, and we are honored to be a part of your journey to better health.
          </p>
          <p>Caring for you, every step of the way.</p>
          <p>Where compassion meets excellence in healthcare.</p>
          <p>
          We're dedicated to providing personalized attention and comprehensive healthcare solutions. Your health and well-being are our top priorities, and we're honored to be your trusted healthcare partner.
          </p>
          <p>Your health, our mission.</p>
          <p>Empowering wellness, one patient at a time.</p>
        </div>
      </div>
    </>
  );
}

export default Biography