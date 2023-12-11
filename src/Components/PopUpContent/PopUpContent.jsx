import './index.css';
import cart_img from "../../assets/cart.svg";

const PopUpContent = ({ title, img, description }) => {
    return (
        <div className="marker_popup">
            <h4 className="title">{title}</h4>
            <img className="photo" src={img} />
            <p className="description"> {description}</p>
            <div className="add_to_cart">
                <input type="checkbox" className="is_selected" />
                <img className="cart_img" src={cart_img} />
            </div>
        </div>
    );
}
export default PopUpContent;