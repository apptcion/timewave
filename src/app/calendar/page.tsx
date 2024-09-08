'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from '../../css/calendar.module.css'
import bottomArrow from '../../../public/assets/imgs/bottomArrow.svg'
import Wave from './wave'
import Menu from '../menu/menu'

function lastDate(date: Date){
    if((date.getMonth()+1) == 2){
        if(date.getFullYear()%4 == 0){
            if(date.getFullYear()%100 == 0){
                if(date.getFullYear()%400 == 0){
                    return 29
                }else{
                    return 28
                }
            }else{
                return 29
            }
        }else{
            return 28
        }

    }else{
        if((date.getMonth()+1) <= 7){
            if((date.getMonth()+1)%2) return 31
            else return 30
        }else{
            if((date.getMonth()+1)%2) return 30
            else return 31
        }
    }
}

function createDate(Start:Date, DomElement:HTMLDivElement){

    if(Start.getDate() == 1){
        let tempLastDate = new Date(Start);
        tempLastDate.setMonth(tempLastDate.getMonth()-1)
        for(let i = lastDate(tempLastDate) - Start.getDay()  + 1;i <= lastDate(tempLastDate);i++){

            let tempDate = new Date(Start)
            tempDate.setMonth(tempDate.getMonth() -1)
            tempDate.setDate(i);

            let date = document.createElement('div')
            date.id = `lDate${i}`
            date.className = `${styles.dateNum} ${styles.lastMonth}`
            if(tempDate.getDay() == 0){
                date.className += ` ${styles.sun}`
            }else if(tempDate.getDay() == 6){
                date.className += ` ${styles.sat}`
            }

            date.innerHTML = `${tempDate.getDate()}`
            DomElement.appendChild(date)
        }

        for(let i = 1; i <= (7-Start.getDay()); i++){
            let tempDate = new Date(Start)
            tempDate.setDate(i);

            let date = document.createElement('div')
            date.id = `nDate${i}`
            date.className = `${styles.dateNum} ${styles.nowMonth}`
            if(tempDate.getDay() == 0){
                date.className += ` ${styles.sun}`
            }else if(tempDate.getDay() == 6){
                date.className += ` ${styles.sat}`
            }

            date.innerHTML = `${tempDate.getDate()}`
            DomElement.appendChild(date)
        }
    }else if(Start.getDate()+7  > lastDate(Start)){
        //console.log("Last, start : ", Start.getDate(), "to ", lastDate(Start), " months : ", Start.getMonth())
        for(let i = Start.getDate(); i <= lastDate(Start); i++){
            let tempDate = new Date(Start)
            tempDate.setDate(i);

            let date = document.createElement('div')
            date.id = `nDate${i}`
            date.className = `${styles.dateNum} ${styles.nowMonth}`
            if(tempDate.getDay() == 0){
                date.className += ` ${styles.sun}`
            }else if(tempDate.getDay() == 6){
                date.className += ` ${styles.sat}`
            }

            date.innerHTML = `${tempDate.getDate()}`
            DomElement.appendChild(date)
        }
        let tempLength = DomElement.children.length;
        for(let i = 1; i <= 7 - (tempLength); i++){
            let tempDate = new Date(Start)
            tempDate.setMonth(tempDate.getMonth() +1)
            tempDate.setDate(i);

            let date = document.createElement('div')
            date.id = `neDate${i}`
            date.className = `${styles.dateNum} ${styles.nextMonth}`
            if(tempDate.getDay() == 0){
                date.className += ` ${styles.sun}`
            }else if(tempDate.getDay() == 6){
                date.className += ` ${styles.sat}`
            }

            date.innerHTML = `${tempDate.getDate()}`
            DomElement.appendChild(date)
        }
    }else{
        for(let i = Start.getDate(); i <= Start.getDate()+6; i++){

            let tempDate = new Date(Start)
            tempDate.setDate(i)

            let date = document.createElement('div');
            date.id = `nDate${i}`
            date.className = `${styles.dateNum} ${styles.nowMonth}`
            if(tempDate.getDay() == 0){
                date.className += ` ${styles.sun}`
            }else if(tempDate.getDay() == 6){
                date.className += ` ${styles.sat}`
            }

            date.innerHTML = `${tempDate.getDate()}`
            DomElement.appendChild(date)
        }
    }

}

export default function Calendar(){

    const [showDate, setShowDate] = useState(new Date())
    async function createWeeks(){
        const nowDate = new Date(showDate)
        nowDate.setDate(1)
        let weeks = []

        let rows = 5;
        if((nowDate.getMonth()+1) != 2){
            if(lastDate(nowDate) == 31){
                if(nowDate.getDay() == 5 || nowDate.getDay() == 6) rows = 6;
            }else{
                if(nowDate.getDay() == 6) rows = 6;
            }

        }else{
            if(nowDate.getDay() == 0) rows = 4;
        }

        //init
        document.querySelector('#date').innerHTML = ''


        let firstWeek = document.createElement('div')
        firstWeek.id = '1'
        firstWeek.className = `${styles.week}`
        let tempStartDate = new Date(nowDate);
        tempStartDate.setDate(1)
        createDate(tempStartDate,firstWeek)

        weeks.push(firstWeek)

        for(var i = 2; i <= rows-1; i++ ){
            let week = document.createElement('div')
            week.id = `${i}`
            week.className = `${styles.week}`
            let temp = new Date(nowDate);
            temp.setDate((i-2)*7 + (7 - temp.getDay()) + 1)
            createDate( temp ,week)
            weeks.push(week)
        }

        let lastWeek = document.createElement('div');
        lastWeek.id = String(rows)
        lastWeek.className = `${styles.week}`
        let tempStartDate2 = new Date(nowDate)
        tempStartDate2.setDate((rows-2)*7 + (7 - tempStartDate2.getDay()) + 1)
        createDate(tempStartDate2, lastWeek)

        weeks.push(lastWeek)

        weeks.forEach((week) => {
            week.style.height = `calc( 100% / ${rows})`
            document.querySelector('#date').appendChild(week)
        })

    }

    function createMonthSelector(){
        let DateList = []
        let now = new Date()
        console.log("Test")
        try{
            console.log(showDate)
        document.querySelector(`.${styles.selected}`).classList.remove(`${styles.selected}`)
        }catch(e){
            
        }

        for(let year = now.getFullYear(); year <= now.getFullYear() + 3; year++){
            for(let month = 1; month <= 12; month++){
                let date = document.createElement('div');
                date.className = `${styles.dateList}`
                const clickHandler = () => {
                    let newDate = new Date()
                    newDate.setFullYear(year)
                    newDate.setMonth(month -1)
                    setShowDate(newDate)
                }

                date.addEventListener('click' , clickHandler);
                date.innerHTML = `${year}.`
                if(month%10 == month) date.innerHTML += '0'
                date.innerHTML += `${month}`
                if(month == showDate.getMonth()+1 && year == showDate.getFullYear()){
                    date.className += ` ${styles.selected}`
                }
                DateList.push(date)
            }
        }
        DateList.forEach((date) => {
            document.querySelector(`.${styles.dateListWrap}`).appendChild(date)
        })
    }
    useEffect(() => {

        function scrollHandler (){
            setTimeout(() => {
                const nowSelect : HTMLOptionElement = document.querySelector(`.${styles.selected}`)
                if (nowSelect) {
                    document.querySelector(`.${styles.dateListWrap}`).scrollTo({
                        top: nowSelect.offsetTop - 45
                    });
                }
            }, 0)

        }

        document.querySelector(`.${styles.arrow}`).addEventListener('click', scrollHandler)

        setTimeout(()=>{
            createWeeks();
            createMonthSelector();

            //display date
            let result = ''
            result += String(showDate.getFullYear()) + '.'
            if(showDate.getMonth() +1 < 10){
                result += '0'
            }
            result += String(showDate.getMonth() + 1)
            document.querySelector(`.${styles.selectedDate}`).innerHTML = result;
           
            let inputBox:HTMLInputElement = document.querySelector('#inputBox')
            inputBox.checked = false;
            
        },0)
        
    }, [showDate])

    return (
        <div className={styles.wrap}>
        <meta name="format-detection" content="telephone=no, date=no, address=no"></meta>
            <div className={styles.selectDate}>
                <input id="inputBox" className={styles.checkbox} type='checkbox' />
                <div className={styles.shown}>                            
                    <label htmlFor='inputBox' className={styles.label}>
                        <div className={styles.arrow}><Image src={bottomArrow} className={styles.bottomArrow}alt='' /></div>
                    </label>
                    <div className={styles.selectedDate}></div>
                </div>
                <div className={styles.dateListWrap}></div>
             </div>
            <div className={styles.calendar} id='calendar'>
                <div className={styles.days}>
                    <div className={`${styles.day} ${styles.sun}`}>일</div>
                    <div className={`${styles.day} ${styles.mon}`}>월</div>
                    <div className={`${styles.day} ${styles.tue}`}>화</div>
                    <div className={`${styles.day} ${styles.wed}`}>수</div>
                    <div className={`${styles.day} ${styles.thu}`}>목</div>
                    <div className={`${styles.day} ${styles.fri}`}>금</div>
                    <div className={`${styles.day} ${styles.sat}`}>토</div>
                </div>
                <div className={styles.date} id='date'></div>
            </div>
            <Wave height='2'></Wave>
            
            <Menu select="Mcalendar"></Menu>
        </div>
    )
}