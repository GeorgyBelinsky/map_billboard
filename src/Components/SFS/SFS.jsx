import './index.css';
import { useState } from 'react';

import Search_icon from "../../assets/search.svg?react";
import Filter_icon from "../../assets/filter.svg?react";
import Sort_icon from "../../assets/sort.svg?react";
import Close_icon from "../../assets/close.svg?react";

import Search from "../SFS/Search/Search";

const SFS = (markers) => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const showComponent = (component) => {
        if(selectedComponent!=component){
        setSelectedComponent(component);
        }else{
            setSelectedComponent(null);
        }
    }

    return (
        <div className="sfs_container">
            <div className="result_field">
                    {selectedComponent === 'search' && <Search markers={markers}/>}
                    {selectedComponent === 'filter' && <Filter markers={markers}/>}
                    {selectedComponent === 'sort' && <Sort markers={markers}/>}
                    {selectedComponent === 'clearFields' && <ClearFields markers={markers}/>}

                    <div className='result_container'>
                        
                    </div>
            </div>

            <div className="toolbar">
                <div className={`toolbar_button ${selectedComponent==='search' ? 'selected' : ''}`}
                 onClick={()=>showComponent('search')}>
                    <Search_icon className={`toolbar_icon ${selectedComponent==='search' ? 'selected' : ''}`} />
                </div>
                <div className='toolbar_button' onClick={()=>showComponent('filter')}>
                    <Filter_icon className="toolbar_icon" />
                </div>
                <div className='toolbar_button' onClick={()=>showComponent('sort')}>
                    <Sort_icon className="toolbar_icon" />
                </div>
                <div className='toolbar_button' onClick={()=>showComponent('clear')}>
                    <Close_icon className="toolbar_icon" />
                </div>
            </div>
        </div>
    )
}

export default SFS;