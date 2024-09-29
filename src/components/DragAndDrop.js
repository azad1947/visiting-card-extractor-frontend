import './DragAndDrop.css';

import React, { useState } from 'react';

import Constants from '../Constants';
import Spinner from './Spinner';
import axios from 'axios';

const DragAndDrop = ({ set_file_preview, set_extracted_data, set_upload_success }) => {
    const [file, set_file] = useState(null);
    const [error_message, set_error_message] = useState('');
    const [is_processing, set_is_processing] = useState(false);

    const handle_drag_over = (event) => {
        event.preventDefault();
    };

    const handle_drop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        handle_file_upload(droppedFile);
    };

    const handle_file_upload = (selected_file) => {
        if (!selected_file) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(selected_file?.type)) {
            set_error_message('Only JPG and PNG files are allowed!');
            set_file(null);
            set_file_preview(null);
            return;
        }

        set_file(selected_file);
        set_error_message('');

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("File read completed. Updating preview...");
            set_file_preview(reader.result);
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            set_error_message('Error reading the file.');
        };

        reader.readAsDataURL(selected_file);
    };


    const handle_change = (event) => {
        const selected_file = event.target.files[0];
        handle_file_upload(selected_file);
    };

    const handle_submit = async (event) => {
        event.preventDefault();
        set_error_message('');
        if (!file) {
            set_error_message('Please upload a valid file.');
            return;
        }

        set_is_processing(true);

        const form_data = new FormData();
        form_data.append('file', file);

        try {
            const response = await axios.post(Constants.upload_file.url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            set_extracted_data(response.data.data);
            set_error_message('');
            set_upload_success(true);
        } catch (error) {
            if (error.response) {
                set_error_message(error.response.data.message);
            } else {
                set_error_message('An error occurred while uploading the file.');
            }
        } finally {
            set_is_processing(false);
        }
    };

    return (
        <div className="upload-container">
            <div
                className="drop-zone"
                onDragOver={handle_drag_over}
                onDrop={handle_drop}
            >
                <p>Drag and drop Visiting Card here <br /> or <br /> Click to upload</p>
                <input type="file" accept="image/png, image/jpeg" onChange={handle_change} />
            </div>

            {file && (
                <div className='file-name'>File selected: {file.name}</div>
            )}

            {error_message && (
                <div className='error-message'>{error_message}</div>
            )}

            {is_processing && <Spinner />}
            <button onClick={handle_submit} disabled={!file}>
                {is_processing ? 'Processing' : 'Upload'}
            </button>
        </div>

    );
};

export default DragAndDrop;
