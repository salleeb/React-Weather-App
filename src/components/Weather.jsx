/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import './Weather.css'

export function Weather({current, city, forecast: {forecastday}}) {
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [time, setTime] = useState("");
    const [unit, setUnit] = useState([]);

    const unitConverter = () => {
        setUnit(!unit)
    }
    
    const curDateAndTime = newDate + " " + time;

    useEffect(() => {
        let todayDate = new Date(),
        year = todayDate.getFullYear(),
        month = "" + (todayDate.getMonth() + 1),
        date = "" + todayDate.getDate();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (date.length < 2) {
            date = "0" + date;
        }
        setNewDate([year, month, date].join("-"));

        const curTime = Date().toString().slice(16, -43);
        setTime(curTime);

        const curDay = forecastday[0].hour;
        const nextDay = forecastday[1].hour;
        const curHours = [...curDay, ...nextDay];

        setHourlyForecast(curHours);
        
    }, [forecastday]);

    return (
        <>
            <div>
                <div key={current} id={current} className='bg bg-cyan-600 rounded-lg opacity-80'>
                    <div className='flex justify-end pt-2'>
                        <button type="button" onClick={unitConverter}><span className='btn-text hover:bg-slate-400 py-1 hover:text-black rounded'>C&deg; |  F&deg;</span></button>
                    </div>
                    <div className='current'>
                        <h1 className='h1'>{city}</h1>
                        <b className='curTemp'>{unit ? current.temp_c + "°C" : current.temp_f + "°F"}</b>
                        <img src={current.condition.icon} alt={current.condition.text} className='curImage'/>
                        <h3 className='curText'>{current.condition.text}</h3>
                        <div className=''>
                        <div className='curForecast flex justify-center'>
                            <div className='sunrise flex justify-center items-center'>
                            <Icon icon="wi:sunrise" className='icon'/>
                            <p>Sunrise: {forecastday[0].astro.sunrise}</p>
                            </div>
                            <div className='sunset flex justify-center items-center'>
                            <Icon icon="wi:sunset" className='icon'/>
                            <p>Sunset: {forecastday[0].astro.sunset}</p>
                            </div>
                        </div>
                        <div className='curForecast flex justify-center'>
                            <div className='wind flex justify-center items-center'>
                                <Icon icon="ph:wind" className='smallIcon'/>
                                <p className='text'>Wind speed {current.wind_kph} km/h</p>
                            </div>
                            <div className='flex justify-center items-center'>
                                <Icon icon="material-symbols:humidity-mid" className='smallIcon'/>
                                <p className='text'>Humidity {current.humidity}%</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div className='flex justify-center flex-wrap'>
                    {hourlyForecast.map((hour) => {
                        const curTime = hour.time;
                        const hours = curTime.toString().slice(11);
                        if (curTime > curDateAndTime) {
                            return (
                                <div key={hour.time} id={hour.time} className='w-36 mx-2 my-5'>
                                    <b className='hours'>{hours}</b><br/>
                                    <b className='hoursTemp'>{unit ? hour.temp_c + "°C" : hour.temp_f + "°F"}</b><br/>
                                    <img src={hour.condition.icon} alt={hour.condition.text} className='img'/>
                                    <h3 className='h3'>{hour.condition.text}</h3><br/>
                                        <div className='flex justify-center items-center'>
                                            <Icon icon="ph:wind" className='smallIcon'/>
                                            <p>{hour.wind_kph} km/h</p><br/>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <Icon icon="material-symbols:humidity-mid" className='smallIcon'/>
                                            <p>{hour.humidity}%</p>
                                        </div>
                                        <div>
                                            <p>{}</p>
                                        </div>
                                </div>
                            );
                        }
                        })}
                    </div>

                    <h2 className='forecast'>Forecast for {city}</h2>
                    {forecastday.map((diffDate) => (
                    <div key={diffDate.date} id={diffDate.date} className='forecastDays'>
                        <b className='dates'>{diffDate.date}</b>
                        <div className='daysForecast flex justify-center items-center'>
                            <div>
                                <img src={diffDate.day.condition.icon} alt={diffDate.day.condition.text} className='bigImg'/>
                            </div>
                            <div>
                            <b className='daysTemp'>{unit ? "Max: " + diffDate.day.maxtemp_c + "°C " + "Min: " + diffDate.day.mintemp_c + "°C" : "Max: " + diffDate.day.maxtemp_f + "°F " + "Min: " + diffDate.day.mintemp_f + "°F" }</b>
                                <div>
                                <div className='flex justify-center'>
                                    <Icon icon="ph:wind" className='smallIcon'/>
                                    <p>Wind speed {diffDate.day.maxwind_kph} km/h</p>
                                </div>
                                <div className='flex justify-center'>
                                    <Icon icon="material-symbols:humidity-mid" className='smallIcon'/>
                                    <p>Humidity {diffDate.day.avghumidity}%</p>
                                </div>
                                <div className='flex justify-center'>
                                    <Icon icon="wi:sunrise" className='smallIcon'/>
                                    <p>{diffDate.astro.sunrise}</p>
                                </div>
                                <div className='flex justify-center'>
                                    <Icon icon="wi:sunset" className='smallIcon'/>
                                    <p>{diffDate.astro.sunset}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Weather