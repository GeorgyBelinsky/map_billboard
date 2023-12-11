import { useState } from "react";
import "./index.css"
import buy_img from "../../assets/buy.svg";

const BuyForm = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // ...
    // After submission, close the form
    closeForm();
  };

  const selected_amount = "59388";

  return (
    <div className="buy_form">
      <button onClick={openForm} className="buy_button">
        <img src={buy_img} className="buy_icon_container" />Selected: {selected_amount}
      </button>

      {isFormVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-btn" onClick={closeForm}>&times;</span>
            <h2>Popup Form</h2>
            <form onSubmit={handleSubmit}>
              {/* Your form fields go here */}
              <label>
                Name:
                <input type="text" />
              </label>
              {/* Add more form fields as needed */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>)
};
export default BuyForm;