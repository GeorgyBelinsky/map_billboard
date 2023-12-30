import { useEffect, useState } from "react";
import stringifyDate from 'json-stringify-date';
import "./index.css"
import buy_img from "../../assets/buy.svg";

import 'react-datepicker/dist/react-datepicker.css';
import BillboardRent from "../BillboardRent/BillboardRent";

const BuyForm = ({ selectedMarkers, markers }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [filteredBySelected, setFilteredBySelected] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [summ, setSumm] = useState(0);

  const [responseMessage, setResponseMessage] = useState(null);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //var stringifyDate = require('json-stringify-date');
    try {
      console.log(selectedDates);
      const response = await fetch('https://bord.azurewebsites.net/api/Bord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedDates),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponseMessage(result.message); // Adjust based on your API response structure
      console.log(responseMessage);
    } catch (error) {
      console.log(error);
    }
    closeForm();
  };

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates])

  useEffect(() => {
    setFilteredBySelected(markers?.filter(item => selectedMarkers.includes(item.billboardId)));
  }, [selectedMarkers])


  return (
    <div className="buy_form">
      <button onClick={openForm} className="buy_button">
        <img src={buy_img} className="buy_icon_container" />Selected: {selectedMarkers.length}
      </button>

      {isFormVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-btn" onClick={closeForm}>&times;</span>
            <form className="form_container" onSubmit={handleSubmit}>
              <div className="form_content_container">
                {filteredBySelected.map((board, index) =>
                  <BillboardRent board={board} key={index} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                )}
              </div>
              <div className="submit_area">
                <p className="summary">{summ}$</p>
                <button className="confirm_button" type="submit">rent</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>)
};
export default BuyForm;