import { useState } from "react";
import sort_by_icon from "../../../assets/sort_by.svg";
import "./index.css";

const Sort = (markers) => {
    const [billboards, setBillboards] = useState(markers);
    const [selectedField, setSelectedField] = useState();
    const [searchOptions, setSearchOptions] = useState(['rate', 'price']);

    return (
        <div className="sort_settings">
            <div className="settings_container">
            <p>Sorting options:</p>
                <div className="sort_bar">
                    <img src={sort_by_icon} />
                </div>
                <select onChange={() => { }} value={selectedField} className="sort_option">
                    {searchOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Sort;