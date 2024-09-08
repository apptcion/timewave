'use client'
import {useEffect} from 'react'
import Image from 'next/image'

import styles from '../../css/menu.module.css'
import HomeLogo from '../../../public/assets/imgs/HomeLogo.svg'
import CalenderLogo from '../../../public/assets/imgs/CalendarLogo.svg'
import TimetableLogo from '../../../public/assets/imgs/TimetableLogo.svg'
import MealPlanLogo from '../../../public/assets/imgs/MealPlanLogo.svg'

export default function Menu(props){

    useEffect(()=>{
        if( document.querySelector(`#${props.select}`)?.className ){
            document.querySelector(`#${props.select}`).className += ` ${styles.selected}`
        }
    },[])

    return (
        <div className={styles.wrapper}>
            <a href='/'><div id="home" className={styles.home}>
                <Image className={styles.Logos} src={HomeLogo} alt=''/>
            </div></a>
            <a href='/schedule'><div id="schedule" className={styles.timetable}>
                <Image className={styles.Logos} src={TimetableLogo} alt=''/>
            </div></a>
            <a href='/calendar'><div id="Mcalendar" className={styles.calendar}>
                <Image className={styles.Logos} src={CalenderLogo} alt=''/>
            </div></a>
            <a href='/lunch'><div id="lunch" className={styles.mealPlan}>
                <Image className={styles.Logos} src={MealPlanLogo} alt=''/>
            </div></a>
        </div>
    )
}