import React from 'react';
import MySpinner from 'react-bootstrap/Spinner';

const Spinner = () => {
  return (
    <div
      className="text-center mt-4"
      style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
    >
      <div style={{ height: 100 }}></div>
      <MySpinner
        animation="grow"
        variant="secondary"
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Spinner;
