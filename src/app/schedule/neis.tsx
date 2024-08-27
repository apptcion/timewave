'use client';

import React, { useEffect, useState } from "react";
import Menu from '../menu/menu';
import styles from '../../css/schedule.module.css';
import { userAgentFromString } from "next/server";

function getWeekRange(date) {
  let inputDate = new Date(date);
  let dayOfWeek = inputDate.getDay();
  let mondayDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  let fridayDiff = dayOfWeek === 0 ? 4 : 5 - dayOfWeek;
  
  let mondayDate = new Date(inputDate);
  mondayDate.setDate(inputDate.getDate() + mondayDiff);
  
  let fridayDate = new Date(inputDate);
  fridayDate.setDate(inputDate.getDate() + fridayDiff);

  let formatDate = (d) => d.toISOString().split('T')[0].replace(/-/g, '');
  
  return {
    monday: formatDate(mondayDate),
    friday: formatDate(fridayDate)
  };
}

export default function Neis() {
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [weekSchedule, setWeekSchedule] = useState([[], [], [], [], [], [], []]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [atptCode, setAtptCode] = useState('J10');
  let schoolCode = '';
  let schoolType = '';

  const fetchSchool = async () => {
    setLoading(true);
    setError(null);

    const neisKey = '9ed4dfd6ef7c413fbb7224277417ab12';

    let neis_school_url = `https://open.neis.go.kr/hub/schoolInfo?KEY${neisKey}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${school}`;

    try {
      let response = await fetch(neis_school_url);
      let data = await response.json();
      schoolCode = data.schoolInfo[1].row[0].SD_SCHUL_CODE;
      schoolType = data.schoolInfo[1].row[0].SCHUL_NM.includes('고등학교') ? 'hi' : data.schoolInfo[1].row[0].SCHUL_NM.includes('중학교') ? 'mi' : 'el';
      console.log(schoolType);
      setAtptCode(data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE);
      fetchSchedule();
    } catch (e) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      schoolCode = '';
      fetchSchedule();
    }
  };

  const fetchSchedule = async () => {
    setError(null);

    const neisKey = '9ed4dfd6ef7c413fbb7224277417ab12';

    let today = new Date();
    let weekRange = getWeekRange(today);
    
    let neisUrl = `https://open.neis.go.kr/hub/${schoolType}sTimetable?KEY=${neisKey}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schoolCode}&AY=${today.getFullYear()}&GRADE=${grade}&CLASS_NM=${classNumber}&TI_FROM_YMD=${weekRange.monday}&TI_TO_YMD=${weekRange.friday}`;

    console.log(neisUrl);
    try {
      let response = await fetch(neisUrl);
      let data = await response.json();
      let data_timeTable;

      if (schoolType == 'hi')
        data_timeTable = data.hisTimetable;
      else if (schoolType == 'mi')
        data_timeTable = data.misTimetable;
      else 
        data_timeTable = data.elsTimetable;

      if (data_timeTable) {
        let schedule = data_timeTable[1].row;

        let newWeekSchedule = [[], [], [], [], [], [], []];

        schedule.forEach(e => {
          newWeekSchedule[e.PERIO - 1].push(e.ITRT_CNTNT);
        });

        setWeekSchedule(newWeekSchedule);
      } else {
        setError('시간표 데이터를 찾을 수 없습니다.');
      }
    } catch (e) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchSchool();
  };

  useEffect(() => {
    fetchSchool();
  }, []);

  return (
    <div>
      <h3 className={styles.title}>주간 시간표</h3>
      학교
      <input
        type="text"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      학년
      <input
        type="text"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      반
      <input
        type="text"
        value={classNumber}
        onChange={(e) => setClassNumber(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {loading && <p>시간표를 불러오는 중...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className={styles.table}>
          <div className={styles.table_row}>
            <div className={styles.table_header}></div>
            <div className={styles.table_header}>월</div>
            <div className={styles.table_header}>화</div>
            <div className={styles.table_header}>수</div>
            <div className={styles.table_header}>목</div>
            <div className={styles.table_header}>금</div>
          </div>
          {
            weekSchedule.map((day, index) => (
              <div className={styles.table_row} key={index}>
                <div className={styles.table_row_head}>{index + 1}교시</div>
                {[...Array(5)].map((_, dayIndex) => (
                  <div className={styles.table_cell} key={dayIndex}>
                    {day[dayIndex] || ''}
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
