import React, { useEffect, useState } from 'react';

import Constants from '../Constants';
import axios from 'axios';

const SavedCards = ({ data: _data }) => {
    const [data, set_data] = useState(_data.data);
    const [current_page, set_current_page] = useState(1);
    const items_per_page = 5;
    const [total_items, set_total_items] = useState(_data.total);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const option = {
                    url: Constants.fetch_cards.url,
                    method: Constants.fetch_cards.method,
                    params: { page_no: current_page }
                }
                const { data: { data, total } } = await axios(option);
                set_data(data);
                set_total_items(total);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetch_data();
    }, [current_page, _data.total]);

    const handle_page_change = (page) => {
        set_current_page(page);
    };

    const total_pages = Math.ceil(total_items / items_per_page);

    const start_page = Math.max(1, current_page - 2);
    const end_page = Math.min(total_pages, current_page + 2);

    const index_of_last_item = current_page * items_per_page;
    const index_of_first_item = index_of_last_item - items_per_page;

    if (data.length < 1) {
        return (<></>)
    }

    return (
        <div style={{ width: '800px', margin: '0 auto' }}>
            <hr style={{ marginTop: 30 }} />
            <h3>Cards</h3>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index_of_first_item + index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.company}</td>
                            <td>{item.job_title}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {total_items > items_per_page && <div>
                {/* Previous Button */}
                {current_page > 1 && (
                    <button onClick={() => handle_page_change(current_page - 1)} style={{ marginRight: '5px' }}>
                        Previous
                    </button>
                )}

                {/* Page Numbers */}
                {Array.from({ length: end_page - start_page + 1 }, (_, index) => (
                    <button
                        key={start_page + index}
                        onClick={() => handle_page_change(start_page + index)}
                        disabled={current_page === start_page + index}
                        style={{ margin: '0 5px' }}
                    >
                        {start_page + index}
                    </button>
                ))}

                {/* Next Button */}
                {current_page < total_pages && (
                    <button onClick={() => handle_page_change(current_page + 1)} style={{ marginLeft: '5px' }}>
                        Next
                    </button>
                )}
            </div>}

        </div>
    );
};

export default SavedCards;
