import React from 'react'
import "./myresume.css"
const MyResume = () => {
  const onButtonClick = () => {
     
    // using Java Script method to get PDF file
    fetch("/Vaibhav Rajput Resume .pdf").then((response) => {
        response.blob().then((blob) => {
         
            // Creating new object of PDF file
            const fileURL =
                window.URL.createObjectURL(blob);
                 
            // Setting various property values
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "/Vaibhav Rajput Resume .pdf";
            alink.click();
        });
    });
};
return (
    <>
        <div className='resume'>
           
            <h3>
                Download my resume
            </h3>
            <button className='resume-btn' onClick={onButtonClick}>
                Download PDF
            </button>

           <img className='resume-img' src="/_Vaibhav Rajput Resume _page-0001.jpg" alt="" />
        </div>
    </>
);
}

export default MyResume
