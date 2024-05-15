import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import stringifyDate from 'json-stringify-date';
import "./index.css"
import Buy_icon from "../../assets/buy.svg?react";
import BillboardRent from "../BillboardRent/BillboardRent";

const BuyForm = ({ selectedMarkers, setSelectedMarkers, markers, fetchData }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [filteredBySelected, setFilteredBySelected] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const navigate = useNavigate();

  function toLogin() {
    return navigate("/login");
  }

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
        if (localStorage.getItem('token')) {
          const response = await fetch('https://billboards-backend.azurewebsites.net/api/Bord/RentBoard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: jsonString,
          });

          if (!response.ok) {
            throw new Error('Network response was not ok, ' + await response.json());
          }

          setSelectedMarkers([]);
          await fetchData();
          closeForm();
          location.reload();
        } 
        else{
          toLogin();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    setFilteredBySelected(markers?.filter(item => selectedMarkers.includes(item.billboardId)));
  }, [selectedMarkers])

  return (
    <div className="buy_form">
      <button onClick={openForm} className="buy_button">
        <Buy_icon className="buy_icon_container" />Selected: {selectedMarkers.length}
      </button>

      {isFormVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-btn" onClick={closeForm}>&times;</span>
            <form className="form_container" onSubmit={handleSubmit}>
              <div className="form_content_container">
                {filteredBySelected?.map((board, index) =>
                  <BillboardRent board={board} key={index} selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
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