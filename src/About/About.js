import React from 'react';
import logo from '../logo.svg';
import './About.css';
import {Button} from "semantic-ui-react";
import {WEATHER_API_KEY} from "../secrets";

const API ={
    key: WEATHER_API_KEY,
    base: 'http://api.openweathermap.org/data/2.5/'
}

const dateBuilder = (d) =>{
        let months = [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
}

class About extends React.Component {
    render() {
        return (
            <div className="App">
            <main>
                <div className="search-box">
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        />
                </div>
                <div className='location-box'>
                    <div className='location'>Charlotte, NC</div>
                    <div className='date'>{dateBuilder(new Date())}</div>
                </div>
                <div className='weather-box'>
                    <div classsName='temp'>
                        26°C
                    </div>
                <div className='weather'>Sunny</div>
                </div>
            </main>
            </div>

        );
    }
}

export default About;
