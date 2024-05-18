import React, { useRef, useState, useEffect } from 'react';
import CoursesComp from "../components/CoursesComp";
import './courses.css';

const Courses = () => {
  const [modulesList, setModulesList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editModuleIndex, setEditModuleIndex] = useState(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [selectedFileName, setSelectedFileName] = useState(''); // State to store selected file name
  const [uploadedFileURL, setUploadedFileURL] = useState(''); // State to store uploaded file URL
  const [modulePopupOpen, setModulePopupOpen] = useState(false); // State to control module popup

  const add_down = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    add_down.current.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowPopup(true);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Set the selected file object
      setSelectedFileName(file.name); // Set the selected file name for display
    }
  };

  const handleAddModule = () => {
    if (newModuleTitle.trim() !== '') {
      const newModule = {
        title: newModuleTitle,
        open_module: newModuleTitle
      };
      setModulesList([...modulesList, newModule]);
      setNewModuleTitle('');
      setSelectedOption(null);
      setShowPopup(false);
    }
  };

  const handleAddModuleUpload = () => {
    if (selectedFile) {
      // Perform upload logic here using selectedFile
      // Simulate upload completion with a setTimeout (replace with actual upload logic)
      setTimeout(() => {
        const fileURL = '/' + selectedFileName; // Replace with actual URL from upload response
        setUploadedFileURL(fileURL); // Store the uploaded file URL
        const newModule = {
          title: selectedFileName,
          downloadURL: fileURL // Store download URL in module data
        };
        setModulesList([...modulesList, newModule]);
        setNewModuleTitle('');
        setSelectedOption(null);
        setShowPopup(false);
        setSelectedFile(null);
        setSelectedFileName('');
      }, 2000); // Simulate a 2-second delay for upload
    }
  };

  const handleAddModuleLink = () => {
    if (newModuleTitle.trim() !== '') {
      const newModule = {
        title: newModuleTitle,
        OpenURL: newModuleTitle
      };
      setModulesList([...modulesList, newModule]);
      setNewModuleTitle('');
      setSelectedOption(null);
      setShowPopup(false);
    }
  };

  const handleDeleteModule = (index) => {
    const updatedModules = [...modulesList];
    updatedModules.splice(index, 1);
    setModulesList(updatedModules);
  };

  const handleEditModule = (index) => {
    const moduleToEdit = modulesList[index];
    setEditModuleIndex(index);
    setEditModuleTitle(moduleToEdit.title);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editModuleIndex !== null && editModuleTitle.trim() !== '') {
      const updatedModules = [...modulesList];
      updatedModules[editModuleIndex].title = editModuleTitle;
      setModulesList(updatedModules);
      setEditModuleIndex(null);
      setEditModuleTitle('');
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditModuleIndex(null);
    setEditModuleTitle('');
    setIsEditing(false);
  };

  const handleDownloadModule = (downloadURL) => {
    // Implement download logic here
    fetch(selectedFileName).then((response) => {
      response.blob().then((blob) => {

        // Creating new object of PDF file
        const fileURL =
          window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = downloadURL;
        alink.download = selectedFileName;
        alink.click();
      });
    });
  };

  const handleOpenLink = (openUrl) => {
    let alink = document.createElement("a");
    alink.href = openUrl;
    alink.target = "_blank";
    alink.click();
  };

  const handleOpenModule = (open_module) => {
    // Set state to open the module popup
    setModulePopupOpen(true);
  };

  const handleModulePopupClose = () => {
    // Close module popup
    setModulePopupOpen(false);
  };

  const ModulePopup = () => {
    // Your module popup content here
    return (
      <div className="module-popup">
      <CoursesComp/>
        
        <img className="module_popup_close" src='/icons8-cross-48.png' alt="Close" onClick={handleModulePopupClose}/>
      </div>
    );
  };

  const Popup = ({ option }) => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleClosePopup = () => {
      setShowPopup(false);
      setSelectedOption(null);
    };

    const style = {
      position: 'absolute',
      top: '100px',
      left: '150px',
      backgroundColor: 'white',
      padding: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      zIndex: 999,
    };

    return (
      <div className="popup" style={style} ref={dropdownRef}>
        <img className="cross" src='/icons8-cross-48.png' alt="Close" onClick={handleClosePopup} />
        {option === 'Create' && (
          <>
            <h3>Create Module</h3>
            <p>Title:</p>
            <input
              type="text"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              ref={inputRef}
            />
            <button onClick={handleAddModule}>Add Module</button>
          </>
        )}
        {option === 'Link' && (
          <>
            <h3>Add Link Module</h3>
            <p>Link URL:</p>
            <input
              type="url"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              ref={inputRef}
            />
            <button onClick={handleAddModuleLink}>Add Module</button>
          </>
        )}
        {option === 'Upload' && (
          <>
            <h3>Upload Module</h3>
            <p>Selected File: {selectedFileName}</p>
            <input
              type="file"
              onChange={handleInputChange}
              ref={inputRef}
            />
            <button onClick={handleAddModuleUpload}>Add Module</button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className='container'>
      <header className="Heading">
        <p>Course Builder</p>
        <div className="add-file-container">
          <button className='add-file' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <img className='add-plus' src="/icons8-add-24 (1).png" alt="" />
            Add File
            {isOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleOptionClick('Create')}>
                  <img src="/icons8-create-50.png" alt="Create Module" /> Create Module
                </li>
                <li onClick={() => handleOptionClick('Link')}>
                  <img src="/icons8-link-24.png" alt="Add Link" /> Add Link
                </li>
                <li onClick={() => handleOptionClick('Upload')}>
                  <img src="/icons8-upload-32.png" alt="Upload" /> Upload
                </li>
              </ul>
            )}
            <img ref={add_down} className='add-down' src="/icons8-down-arrow-50.png" alt="" />
          </button>
        </div>
        {showPopup && selectedOption && <Popup option={selectedOption} />}
      </header>
      {modulePopupOpen && <ModulePopup />}
      <div className="module-list">
        {modulesList.map((module, index) => (
          <div key={index} className="module-item">
            {isEditing && editModuleIndex === index ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editModuleTitle}
                  onChange={(e) => setEditModuleTitle(e.target.value)}
                />
                <div>
                  <button className="save" onClick={handleSaveEdit}>Save</button>
                  <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3>{module.title}</h3>
                {module.downloadURL && (
                  <button className='download' onClick={() => handleDownloadModule(module.downloadURL)}>Download</button>
                )}
                {module.OpenURL && (
                  <button className='download' onClick={() => handleOpenLink(module.OpenURL)}>Open Url</button>
                )}
                {module.open_module && (
                  <button className='download' onClick={() => handleOpenModule(module.open_module)}>Open Module</button>
                )}
                <div>
                  <img
                    src="/icons8-delete-30.png"
                    alt=""
                    onClick={() => handleDeleteModule(index)}
                    className="delete-icon"
                  />
                  <img
                    src="/icons8-edit-50.png"
                    alt=""
                    onClick={() => handleEditModule(index)}
                    className="edit-icon"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
