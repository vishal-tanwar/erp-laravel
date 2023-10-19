import React from "react";
import './bounceLoader.scss';

const BounceLoader = ():React.JSX.Element => {
    return (
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default BounceLoader;