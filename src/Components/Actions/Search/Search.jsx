import { useState } from "react";
import "./index.css";

const Search = ({searchBillboards}) =>{
    
    const [searchData, setSearchData] = useState('');

    return (
        <div className="search_settings">  
            <input className="search_bar" type="text" placeholder="Search data" value={searchData} 
            onChange={(e) => setSearchData(e.target.value)} />
            <button type="submit" className="search_button" onClick={()=>(searchBillboards(searchData))}>
                search
            </button>
        </div>
    );
}

export default Search;