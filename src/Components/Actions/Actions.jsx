import './index.css';
import { useEffect, useState } from 'react';

import Search_icon from "../../assets/search.svg?react";
import Filter_icon from "../../assets/filter.svg?react";
import Sort_icon from "../../assets/sort.svg?react";
import Close_icon from "../../assets/close.svg?react";

import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import ResultElement from "./ResultElement/ResultElement";

const Actions = ({markers, openPopup}) => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [billboardsSelected, setBillboardsSelected] = useState(null);

    const showComponent = (component) => {
        if (selectedComponent != component) {
            setSelectedComponent(component);
        } else {
            setSelectedComponent(null);
        }
    }

    const searchBillboards = async (address) => {
        try {
            const response = await fetch(`https://billboards-backend.azurewebsites.net/api/Bord/FindBoards?adress=${address}`);
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const result = await response.json();
            setBillboardsSelected(result);
          } catch (error) {
            console.log(error);
          }
    }

    const filterBillboards = async (min_value, max_value) =>{
        try {
            const response = await fetch(`https://billboards-backend.azurewebsites.net/api/Bord/GetFilteredBoards?minCost=${min_value}&maxCost=${max_value}`);
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const result = await response.json();
            setBillboardsSelected(result);
          } catch (error) {
            console.log(error);
          }
    }

    const sortBillboards = async (field,direction) =>{
        try {
            var response = await fetch(`https://billboards-backend.azurewebsites.net/api/Bord/BoardCostSort?sortParam=${direction === 'descending' ? true : false}`);
            if(field==='rate'){
                response = await fetch(`https://billboards-backend.azurewebsites.net/api/Bord/BoardSortPopularity`);
            }
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const result = await response.json();
            setBillboardsSelected(result);
          } catch (error) {
            console.log(error);
          }
    }

    const clearSettings = () => {
        setBillboardsSelected(markers);
        setSelectedComponent(null);
    }

    useEffect(() => {
        setBillboardsSelected(markers);
    }, [markers]);

    return (
        <div className="actions_container">
            <div className="toolbar">
                <div className={`toolbar_button ${selectedComponent === 'search' ? 'selected' : ''}`}
                    onClick={() => showComponent('search')}>
                    <Search_icon className={`toolbar_icon ${selectedComponent === 'search' ? 'selected' : ''}`} />
                </div>
                <div className={`toolbar_button ${selectedComponent === 'filter' ? 'selected' : ''}`}
                    onClick={() => showComponent('filter')}>
                    <Filter_icon className={`toolbar_icon ${selectedComponent === 'filter' ? 'selected' : ''}`} />
                </div>
                <div className={`toolbar_button ${selectedComponent === 'sort' ? 'selected' : ''}`}
                    onClick={() => showComponent('sort')}>
                    <Sort_icon className={`toolbar_icon ${selectedComponent === 'sort' ? 'selected' : ''}`} />
                </div>
                <div className='toolbar_button' onClick={() => clearSettings()}>
                    <Close_icon className="toolbar_icon" />
                </div>
            </div>
            <div className="results_field">
                {selectedComponent === 'search' && <Search searchBillboards={searchBillboards}/>}
                {selectedComponent === 'filter' && <Filter filterBillboards = {filterBillboards}/>}
                {selectedComponent === 'sort' && <Sort sortBillboards={sortBillboards}/>}
                {selectedComponent === null && <></>}

                <div className={`result_container ${selectedComponent ? selectedComponent : ''}`}>
                    {billboardsSelected?.map((marker) => (
                        <ResultElement billboard={marker} openPopup={openPopup} key={marker.billboardId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Actions;