import { useState, useEffect } from "react";
import "./index.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filter = ({ filterBillboards }) => {
    const [prices, setPrices] = useState([]);
    const [values, setValues] = useState([]);
    const [startValues, setStartValues] = useState([]);
    const handleChange = (values) => {
        setValues(values);
    };

    const fetchPrices = async () => {
        try {
            const response = await fetch('https://bord.azurewebsites.net/api/Bord/Get sorted cost list');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            setPrices(result);
            setValues([Math.min(...result), Math.max(...result)]);
            setStartValues([Math.min(...result), Math.max(...result)]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const marks = prices.reduce((acc, price) => {
        acc[price] = `${price}$`;
        return acc;
    }, {});

    return (
        <div className="filter_settings">
            <div className="slider_container">
                {startValues.length > 0 ? (
                    <Slider
                    range
                    min={startValues[0]}
                    max={startValues[1]}
                    step={null}
                    defaultValue={startValues}
                    onChange={handleChange}
                    marks={marks} // Use the marks object here
                />
                
                ) : (
                    <p>loading price slider...</p>
                )}

                <div className="price_range">
                    <p className="price_input">{values[0]}$</p>
                    <p className="price_input">{values[1]}$</p>
                </div>
            </div>
            <div className="bottom_section">
                <div className="apply_button" onClick={() => filterBillboards(values[0], values[1])}>apply</div>
            </div>
        </div>
    );
}

export default Filter;