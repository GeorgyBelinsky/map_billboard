import './index.css';
import cart_img from "../../assets/cart.svg";
import { useEffect, useState } from 'react';

const PopUpContent = ({ marker, img, setSelectedMarkers }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
    if (!isChecked) {
      setSelectedMarkers(prev => [...prev, marker.billboardId]);
    }
    if (isChecked) {
      setSelectedMarkers(prev => {
        return prev.filter(item => item !== marker.billboardId)
      });
    }
  }

  return (
    <div className="marker_popup">
      <h3 className="title">{marker.adress}</h3>
      <img className="photo" src={img} />
      <p className="description"> {marker.description}</p>
      <div className="buy_zone">
        <p className="price">{marker.dayCoast}$/day</p>
        <label className="add_to_cart" onChange={handleCheckboxChange}>
          <input type="checkbox" className="is_selected" />
          <img className="cart_img" src={cart_img} />
        </label>
      </div>
    </div>
  );
}
export default PopUpContent;