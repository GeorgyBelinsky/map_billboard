import { useState } from "react";
import "./index.css";

const Search = (markers) =>{
    const [billboards, setBillboards] = useState(markers);
    const [selectedField, setSelectedField] = useState();
    const [searchOptions, setSearchOptions] = useState(['description','address','price']);

    return (
        <div className="sfs_settings">  
            <input className="search_bar" type="text" placeholder="Search data">
                
            </input>
            <select onChange={()=>{}} value={selectedField} className="search_option">
            {searchOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}    
            </select>
        </div>
    );
}

export default Search;