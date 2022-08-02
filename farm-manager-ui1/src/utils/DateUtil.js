import React from 'react';
import { MenuItem } from '@mui/material';

import { isEmpty } from './StringUtil';


export function newDate() {
    //new Date(2018, 3, 20, 19, 30, 0)
    // console.log(new Date());
    // console.log(new Date().getHours());

    // console.log(new Date().getUTCHours());

    var date = new Date();
    // var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    //  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    //  date = new Date(now_utc);

    //  console.log('UTC? ', date.toUTCString());
    //  date = new Date(date.toUTCString());
    //  console.log(date);
    return date;
    // return new Date();
}

export function asShortStringDate(time) {
    if (time !== null) {
        return new Date(time).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "2-digit" })
    }
    return null;
}

export function asShortStringDateTime(time) {
    if (time !== null) {
        return new Date(time).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", })
    }
    return null;
}

export function asShortStringHour(time) {
    if (time !== null) {
        return new Date(time).toLocaleDateString('en-GB', { hour: "2-digit", minute: "2-digit", })

    }
    return null;
}

export function getStart(end, timeRange) {
    if (isEmpty(timeRange)) {
        return subtractMonths(newDate(), 1);
    }
    if (timeRange.endsWith('d')) {
        return subtractDays(end, Number(timeRange.replace('d', '')));
    }
    if (timeRange.endsWith('m')) {
        return subtractMonths(end, Number(timeRange.replace('m', '')));
    }
    if (timeRange.endsWith('y')) {
        const offSet = Number(timeRange.replace('y', ''));
        return new Date(newDate().getFullYear() - offSet, 0, 1)
    }
}

export function getEnd(end, timeRange) {
    if (isEmpty(timeRange)) {
        return newDate();
    }
    if (timeRange.endsWith('y')) {
        const offSet = Number(timeRange.replace('y', ''));
        return new Date(newDate().getFullYear() - offSet, 11, 31)
    }
    return end;
}

export function subtractYear(date, years) {
    const val = years ? years : 1;
    const d = new Date(date.getTime());
    d.setYear(d.getFullYear() - val);
    return d;
}


export function getLastDayOfPreviousMonth(){
    var d = new Date();
    d.setDate(0);
    return d;
}

export function getFirstDayOfPreviousMonth(){
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setDate(1);
    return d;
}

export function addYear(date) {
    const d = new Date(date.getTime());
    d.setYear(d.getFullYear() + 1);
    return d;
}

export function subtractMonths(date, months) {

    const d = new Date(date.getTime());
    d.setMonth(d.getMonth() - months)
    return d;
}

export function subtractDays(date, days) {

    const d = new Date(date.getTime());
    d.setDate(d.getDate() - days);
    return d;
}

export function getCurrentYear() {
    return newDate().getFullYear();
}

export function asLocalDate(date, hyphen) {
    if (date && date instanceof Date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = date.getDate().toString();
        const space = hyphen ? "-" : "";
        return yyyy + space + (mm[1] ? mm : "0" + mm[0]) + space + (dd[1] ? dd : "0" + dd[0]);
    } else {
        return date;
    }
}

export function asLocalHour(hour) {
    if(hour && hour.includes && !hour.includes(':')){
        const output = hour.substr(0, 2) + ":" + hour.substr(2);

        //console.log('asLocalHour' ,output)
        return output;
    }
    return hour;
}

export function getYearOptions(size) {
    let options = [];
    let year = newDate().getFullYear() + 2;
    for (var i = 0; i < size; i++) {
        options.push({ value: Number(year - i), label: (year - i), key: Number(year - i), id: Number(year - i) })
    }
    return options;
}

export function getYearSelectOptions(size) {
    let options = [];
    let year = newDate().getFullYear() + 1;

    for (var i = 0; i < size; i++) {
        options.push(year - i);
    }
    if (options) {
        return (
            options.map(element => (
                <MenuItem key={element} value={element}>{element}</MenuItem>
            )))
    }
    return options;
}

export function getIndexSelectOptions(size) {
    let options = [];
    for (var i = 1; i < size+1; i++) {
        options.push(i);
    }
    if (options) {
        return (
            options.map(element => (
                <MenuItem key={element} value={element}>{element}</MenuItem>
            )))
    }
    return options;
}

export function calcAge(val, maxDate){
    return (diffInDays( new Date(val), maxDate ? new Date(maxDate) : newDate()) / 365).toFixed(1);
}

export function getDateYear(time) {
    if (time instanceof Date) {
        return time.getFullYear();
    }
    if (time !== null) {
        return new Date(time).getFullYear();
    }
}
export function getDateMonth(time) {
    if (time instanceof Date) {
        return time.getMonth() + 1;
    }
    if (time !== null) {
        return new Date(time).getMonth() + 1;
    }
}



export function getDomainYear(domain) {
    if (domain.year) {
        return domain.year;
    }
    else {
        return getDateYear(domain.plant);
    }
}

export function daysPassed(time, end) {
    
    if (!end) {
        end = newDate().getTime();
    }
    var timeDifference = Math.abs(end - time);
    return Math.ceil(timeDifference / (1000 * 3600 * 24));//ms * seconds * hours
}


export function diffInDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (start && end) {
        var diffDays = 1 + parseInt((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
            diffDays = 0;
        }

        return diffDays;

    }
    return 0;
}

export function toUTCDate(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), 0, 0) / 1000;//minutes,seconds,milliseconds
}

export function fromUDCDate(date) {
    const result = new Date(date * 1000);
    return result;
}

export  function getDaysInMonth(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  };
