import React from 'react';

const NotFound = () => {
    function changeBackground(color) {
        document.getElementById("theNavbar").style.display = color;
    }

    window.addEventListener("load", function () {
        changeBackground('none')
    });
    return (
        <div id="notfound" className="d-flex vstack vh-100 justify-content-center bg-light align-items-center">
            <h1 className="">404</h1>
            <p className="text-muted"> Ooops! this page doesn't exist try going back to the app</p>
        </div>
    );
};

export default NotFound;