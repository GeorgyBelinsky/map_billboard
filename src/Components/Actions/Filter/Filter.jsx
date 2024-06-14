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
            const response = await fetch('https://billboards-backend.azurewebsites.net/api/Bord/GetFilteredCostList');

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

    // Compute even positions for the prices
    const marks = {};
    const numberOfPrices = prices.length;
    if (numberOfPrices > 1) {
        prices.forEach((price, index) => {
            const position = Math.round(index * (100 / (numberOfPrices - 1)));
            marks[position] = `${price}$`;
        });
    }

    return (
        <div className="filter_settings">
            <div className="slider_container">
                {startValues.length > 0 ? (
                    <Slider
                        range
                        min={0}
                        max={100}
                        step={null}
                        defaultValue={[0, 100]}
                        onChange={(newValues) => {
                            const minValueIndex = Math.round(newValues[0] * (numberOfPrices - 1) / 100);
                            const maxValueIndex = Math.round(newValues[1] * (numberOfPrices - 1) / 100);
                            setValues([prices[minValueIndex], prices[maxValueIndex]]);
                        }}
                        marks={marks}
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
