'use client'
import {useEffect} from 'react'
import Image from 'next/image'

import styles from '../../css/menu.module.css'
import HomeLogo from '../../../public/assets/imgs/HomeLogo.svg'
import CalenderLogo from '../../../public/assets/imgs/CalenderLogo.svg'
import TimetableLogo from '../../../public/assets/imgs/TimetableLogo.svg'
import MealPlanLogo from '../../../public/assets/imgs/MealPlanLogo.svg'

export default function Menu(props){

    useEffect(()=>{
        
    },[])

    return (
        <div className={styles.wrapper}>
            <div id="home" className={styles.home}>
                <Image src={HomeLogo} alt=''/>
            </div>
            <div id="timeTable" className={styles.timetable}>
                <Image src={TimetableLogo} alt=''/>
            </div>
            <div id="calender" className={styles.calender}>
                <Image src={CalenderLogo} alt=''/>
            </div>
            <div id="mealPlan" className={styles.mealPlan}>
                <Image src={MealPlanLogo} alt=''/>
            </div>
        </div>
    )
}