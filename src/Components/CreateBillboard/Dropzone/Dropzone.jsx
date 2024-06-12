// ImageDropzone.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './index.css';

const ImageDropzone = ({ files, onDrop }) => {
    const handleDrop = useCallback((acceptedFiles) => {
        onDrop(acceptedFiles);
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*'
    });

    const backgroundImage = files.length > 0 ? `url(${files[0].preview})` : 'none';

    return (
        <div 
            {...getRootProps()} 
            className='dropzone' 
            style={{backgroundImage}}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the file here...</p>
            ) : (
                <p>Drag 'n' drop <br/> image of <br/> billboard</p>
            )}
        </div>
    );
};

export default ImageDropzone;
