import { useState } from "react";
import "./index.css";
import TEST_INCON from "../../../assets/picture.png";

const ResultElement = (billboard) => {
    const showMarker = () => {
        console.log(billboard);
    }

    return (
        <div className="result_field" onClick={showMarker}>
            <img className="billboard_image" src={TEST_INCON} />
            <div className="general_info">
                <div className="header_info">
                    <div className="price">{billboard?.marker.dayCost + "$"}</div>
                    <p className="address_text">{billboard?.marker.adress}</p>
                </div>
                <p className="description_result">{billboard?.marker.description}</p>
            </div>
        </div>
    );
}

export default ResultElement;