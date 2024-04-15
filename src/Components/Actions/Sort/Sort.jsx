import { useState } from "react";
import Sort_by_icon from "../../../assets/sort_by.svg?react";
import "./index.css";

const Sort = ({sortBillboards}) => {
    const [selectedField, setSelectedField] = useState('price');
    const [direction, setDirection ] = useState('descending');
    const [sortOptions, setSortOptions] = useState(['rate', 'price']);

    const changeDirection = () =>{
        if(direction==='descending'){
            setDirection('ascending');
        }else{
            setDirection('descending');
        }
        sortBillboards(selectedField, direction);
    }

    const changeSortSetting = (e) =>{
        setSelectedField(e.target.value);
        sortBillboards(e.target.value, direction);
    }

    return (
        <div className="sort_settings">
            <div className="settings_container">
            <p>Sorting options:</p>
                <div className="sort_bar" onClick={()=>changeDirection()}>
                    <Sort_by_icon className="sort_icon"/>
                </div>
                <select onChange={changeSortSetting} value={selectedField} className="sort_option">
                    {sortOptions.map((option) => (
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