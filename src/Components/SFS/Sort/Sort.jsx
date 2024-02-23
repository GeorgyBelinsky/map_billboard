import { useState } from "react";
import sort_by_icon from "../../../assets/sort_by.svg";
import "./index.css";

const Sort = (markers) => {
    const [billboards, setBillboards] = useState(markers);
    const [selectedField, setSelectedField] = useState();
    const [searchOptions, setSearchOptions] = useState(['description', 'address', 'price']);

    return (
        <div className="sfs_settings">
            <p>Sorting options:</p>
            <div className="settings_container">
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