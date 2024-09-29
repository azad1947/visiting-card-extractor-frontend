import React, { useEffect, useState } from 'react';

import Constants from './Constants';
import DataPreview from './components/DataPreview';
import DragAndDrop from './components/DragAndDrop';
import SavedCards from './components/SavedCards';
import axios from 'axios';

const App = () => {
  const [data, set_data] = useState({ data: [], total: 0 });
  const [is_preview_visible, set_is_preview_visible] = useState(false);
  const [extracted_data, set_extracted_data] = useState({});
  const [file_preview, set_file_preview] = useState(null);

  const fetch_data = async () => {
    try {
      const option = {
        url: Constants.fetch_cards.url,
        method: Constants.fetch_cards.method,
        params: { page_no: 0 }
      }
      const { data: { data, total } } = await axios(option);
      set_data({ data, total });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handle_save = async (extracted_data) => {
    try {
      const option = {
        url: Constants.save_card.url,
        method: Constants.save_card.method,
        data: extracted_data
      }
      await axios(option);
      await fetch_data();
      set_is_preview_visible(false);
    } catch (err) {
      console.log('error occurred while saving the data --> ', err.message);
      set_is_preview_visible(false);
    }
  };

  const handle_cancel = () => {
    set_is_preview_visible(false);
    set_file_preview(null);
    set_extracted_data({});
  };

  useEffect(() => {
    fetch_data();
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Visiting Card Extractor</h1>

      {is_preview_visible ? (<DataPreview
        imagePreview={file_preview}
        extractedData={extracted_data}
        onSave={handle_save}
        onCancel={handle_cancel}
      />) : (<DragAndDrop
        set_extracted_data={set_extracted_data}
        set_file_preview={set_file_preview}
        set_upload_success={set_is_preview_visible}
      />)}

      <SavedCards data={data} />
    </div>
  );
};

export default App;
