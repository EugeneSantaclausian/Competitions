import React from 'react';
import Lottie from 'lottie-react';
import ErrorImage from '../assets/img/error.json';

const ErrorComponent = ({ text }) => {
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
        animationData={ErrorImage}
        loop={false}
        style={{ alignSelf: 'center', width: 100, height: 100 }}
      />
      <h6 className="pt-1 text-center">{text}</h6>
    </div>
  );
};

export default ErrorComponent;
