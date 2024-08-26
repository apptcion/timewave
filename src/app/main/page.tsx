'use client'
import styles from '../../css/main.module.css'
import React, { useEffect, useState} from 'react'

function Main(){

    const [ nowSubject, setNowSubject ] = useState('야간 자율학습 1타임')

    const startTime = "7시 50분"
    const endTime = "9시 10분"

    useEffect(()=> {
        
    }, [])

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.miniTime}`}>
                <div className={`${styles.timeBox}`}>
                    <p className={`${styles.nowSubjectTitle}`}>현재 과목</p>
                    <p className={`${styles.nowSubject}`}>{nowSubject}</p>
                    <div className={`${styles.graphWrap}`}>
                        <div className={`${styles.graph}`} />
                        <div className={`${styles.progress}`} />
                        <p className={`${styles.StartTime}`}>{startTime}</p>
                        <p className={`${styles.EndTime}`}>{endTime}</p>
                    </div>
                </div>
                <button className={`${styles.button}`}>전체 시간표 보기</button>
            </div>
            <div className={`${styles.miniLunch}`} />
        </div>
    )
}

export default Main