'use client';

import React, { useState } from "react";
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
  const [school, setSchool] = useState('단원고등학교');
  const [grade, setGrade] = useState('1');
  const [classNumber, setClassNumber] = useState('5');
  const [weekSchedule, setWeekSchedule] = useState([[], [], [], [], [], [], []]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [atptCode, setAtptCode] = useState('J10');
  const [schoolCode, setSchoolCode] = useState('');

  const fetchSchool = async () => {
    setLoading(true);
    setError(null);

    const neisKey = '9ed4dfd6ef7c413fbb7224277417ab12';

    let neis_school_url = `https://open.neis.go.kr/hub/schoolInfo?KEY${neisKey}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${school}`;

    try {
      let response = await fetch(neis_school_url);
      let data = await response.json();
      setSchoolCode(data.schoolInfo[1].row[0].SD_SCHUL_CODE);
      setAtptCode(data.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE);
    } catch (e) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setSchoolCode('');
    } finally {
      fetchSchedule();
    }
  };

  const fetchSchedule = async () => {
    setError(null);

    const neisKey = '9ed4dfd6ef7c413fbb7224277417ab12';

    let today = new Date();
    let weekRange = getWeekRange(today);
    
    let neisUrl = `https://open.neis.go.kr/hub/hisTimetable?KEY=${neisKey}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${atptCode}&SD_SCHUL_CODE=${schoolCode}&AY=${today.getFullYear()}&GRADE=${grade}&CLASS_NM=${classNumber}&TI_FROM_YMD=${weekRange.monday}&TI_TO_YMD=${weekRange.friday}`;

    try {
      let response = await fetch(neisUrl);
      let data = await response.json();
      if (data.hisTimetable) {
        let schedule = data.hisTimetable[1].row;
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
        <table className={styles.main}>
          <thead>
            <tr className={styles.thead}>
              <th scope='col'></th>
              <th scope='col'>월</th>
              <th scope='col'>화</th>
              <th scope='col'>수</th>
              <th scope='col'>목</th>
              <th scope='col'>금</th>
            </tr>
          </thead>
          <tbody>
            {weekSchedule.map((day, index) => (
              <tr className={styles.sche_tr} key={index}>
                <th className={styles.sche_th_row}>{index + 1}교시</th>
                {[...Array(5)].map((_, dayIndex) => (
                  <th className={styles.sche_th} key={dayIndex}>
                    {day[dayIndex] || ''}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Menu />
    </div>
  );
}
