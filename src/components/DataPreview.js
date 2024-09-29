import React, { useState } from 'react';

const DataPreview = ({ imagePreview, extractedData, onSave, onCancel }) => {
    const [edited_data, set_edited_data] = useState(extractedData);
    const [email_error, set_email_error] = useState(null);
    const [name_error, set_name_error] = useState(null);
    const handle_change = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            set_name_error(null);
        }

        if (name === 'email') {
            set_email_error(null);
        }

        set_edited_data({
            ...edited_data,
            [name]: value,
        });
    };

    const handle_save = async () => {
        if (!edited_data.name) {
            set_name_error('required');
            return;
        }

        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // only allowing validation if email is provided otherwise not
        if (edited_data.email && !email_regex.test(edited_data.email)) {
            set_email_error('invalid email')
            return;
        }

        await onSave(edited_data);
    };

    return (
        <div style={{ width: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Image Preview</h3>
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
            </div>
            <div>
                <h3 style={{ textAlign: 'center' }}>Extracted Data</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td style={{ border: name_error && '2px red solid' }}>
                                <input
                                    type="text"
                                    name="name"
                                    value={edited_data.name || ''}
                                    onChange={handle_change}
                                    style={{ width: '200px' }}
                                />
                                {name_error && <small style={{ display: 'block', color: 'red' }}>{name_error}</small>}
                            </td>
                        </tr>
                        <tr>
                            <td>Company</td>
                            <td>
                                <input
                                    type="text"
                                    name="company"
                                    value={edited_data.company || ''}
                                    onChange={handle_change}
                                    style={{ width: '200px' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Job Title</td>
                            <td>
                                <input
                                    type="text"
                                    name="job_title"
                                    value={edited_data.job_title || ''}
                                    onChange={handle_change}
                                    style={{ width: '200px' }}
                                />
                            </td>
                        </tr>
                        <tr >
                            <td>Email</td>
                            <td style={{ border: email_error && '2px solid red' }}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    value={edited_data.email || ''}
                                    onChange={handle_change}
                                    style={{ width: '200px' }}
                                />
                                {email_error && <small style={{ display: 'block', color: 'red' }}>{email_error}</small>}
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>
                                <input
                                    type="text"
                                    name="phone"
                                    value={edited_data.phone || ''}
                                    onChange={handle_change}
                                    style={{ width: '200px' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                <input
                                    type="text"
                                    name="address"
                                    value={edited_data.address || ''}
                                    onChange={handle_change}
                                    style={{ width: '200px' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handle_save} style={{ marginTop: '20px' }}>Save</button>
                <button onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
            </div>
        </div>
    );
};

export default DataPreview;
