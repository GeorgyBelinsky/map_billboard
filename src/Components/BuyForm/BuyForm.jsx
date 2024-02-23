import { useEffect, useState } from "react";
import stringifyDate from 'json-stringify-date';
import "./index.css"
import buy_img from "../../assets/buy.svg";
import BillboardRent from "../BillboardRent/BillboardRent";

const BuyForm = ({ selectedMarkers,setSelectedMarkers, markers, fetchData }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [filteredBySelected, setFilteredBySelected] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [summ, setSumm] = useState(0);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    selectedDates.map(async (element) => {
      const jsonString = stringifyDate.stringify(element, (key, value) => {
        if (typeof value === 'string' && value.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
          // Convert string to a custom string format without time zone offset
          const dateWithoutOffset = value.slice(0, -6);
          return dateWithoutOffset;
        }
        return value;
      });
    
      try {
        const response = await fetch('https://bord.azurewebsites.net/api/Bord/RentBoard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonString,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok, ' + await response.json() );
        }
        
        setSelectedMarkers([]);
        await fetchData();
        closeForm();
        location.reload();
      } catch (error) {
        console.log(error);
      } 
    });
  };

  useEffect(() => {
    setFilteredBySelected(markers?.filter(item => selectedMarkers.includes(item.billboardId)));
  }, [selectedMarkers])

  return (
    <div className="buy_button">
      <button onClick={openForm} className="button_content">
        <img src={buy_img} className="buy_icon_container" />Selected: {selectedMarkers.length}
      </button>

      {isFormVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-btn" onClick={closeForm}>&times;</span>
            <form className="form_container" onSubmit={handleSubmit}>
              <div className="form_content_container">
                {filteredBySelected?.map((board, index) =>
                  <BillboardRent board={board} key={index} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                )}
              </div>
              <div className="submit_area">
                {/* <p className="summary">{summ}$</p> */}
                <button className="confirm_button" type="submit">rent</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>)
};
export default BuyForm;