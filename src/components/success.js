import React from 'react';
import Lottie from 'lottie-react';
import SuccessImage from '../assets/img/success.json';

const SuccessComponent = ({ text }) => {
  return (
    <div
      className="text-center"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Lottie
        className="text-center"
        animationData={SuccessImage}
        loop={false}
        style={{ alignSelf: 'center', width: 100, height: 100 }}
      />
      <h6 className="pt-1 text-center">{text}</h6>
    </div>
  );
};

export default SuccessComponent;
