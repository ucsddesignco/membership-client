import React from 'react';

const Loading = () => {
  return (
    <div className="load">
      <div className="ring-2">
        <div className="ball-holder">
          <div className="ball"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;