import "./index.css";
import TEST_INCON from "../../../assets/picture.png";

const ResultElement = ({billboard, openPopup}) => {
    return (
        <div className="result_field">
            <img className="billboard_image" src={TEST_INCON} onClick={()=>openPopup(billboard?.billboardId)}/>
            <div className="general_info">
                <div className="header_info">
                    <div className="price">{billboard?.dayCost + "$"}</div>
                    <p className="address_text">{billboard?.adress}</p>
                </div>
                <p className="description_result">{billboard?.description}</p>
            </div>
        </div>
    );
}

export default ResultElement;
