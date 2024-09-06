'use client'

import Image from 'next/image'
import {useEffect} from 'react' 

import styles from '../../css/search.module.css'
import timewave from '../../../public/assets/imgs/timewave.svg'
import searchSVG from '../../../public/assets/imgs/search.svg'
import { cookies } from 'next/headers'
import { Cookie } from 'next/font/google'

// interface schoolInfo {
//     ATPT_OFCDC_SC_CODE : string,
//     ATPT_OFCDC_SC_NM : string,
//     COEDU_SC_NM : string,
//     DGHT_SC_NM : string,
//     ENE_BFE_SEHF_SC_NM : string
//     ENG_SCHUL_NM : string,
// FOAS_MEMRD
// : 
// "20120501"
// FOND_SC_NM
// : 
// "공립"
// FOND_YMD
// : 
// "20120301"
// HMPG_ADRES
// : 
// "http://www.guahm.hs.kr"
// HS_GNRL_BUSNS_SC_NM
// : 
// "일반계"
// HS_SC_NM
// : 
// "일반고"
// INDST_SPECL_CCCCL_EXST_YN
// : 
// "N"
// JU_ORG_NM
// : 
// "서울특별시교육청"
// LCTN_SC_NM
// : 
// "서울특별시"
// LOAD_DTM
// : 
// "20230615"
// ORG_FAXNO
// : 
// "02-879-1981"
// ORG_RDNDA
// : 
// "(봉천동/구암고등학교)"
// ORG_RDNMA : string
// ORG_RDNZC : string
// ORG_TELNO : string
// SCHUL_KND_SC_NM : string
// SCHUL_NM : string
// SD_SCHUL_CODE : string
// SPCLY_PURPS_HS_ORD_NM : null
// }

export default function Search(){

    useEffect(() => {
        function search() {
            const keyword: HTMLInputElement = document.querySelector(`.${styles.input}`);
            fetch(
                `https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=100&SCHUL_NM=${keyword.value}&KEY=${process.env.NEXT_PUBLIC_apiKEY}`
            ).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok');
                })
                .then((result) => {
                    console.log(result.schoolInfo[1])
                    return result.schoolInfo[1].row
                })
                .then((schoolData) => {
                    let result = []
                    schoolData.forEach((Data) => {
                        let Info = {
                            locate : Data.LCTN_SC_NM,
                            name  : Data.SCHUL_NM,
                            code : Data.SD_SCHUL_CODE
                        }
                        result.push(Info)
                    })
                    return result;
                })
                .then((SchoolInfo)=>{
                    let table = document.querySelector(`.${styles.body}`);
                    table.innerHTML = ''
                    SchoolInfo.forEach((Info)=>{
                        let tr = document.createElement('div');
                        let tdLocate = document.createElement('div');
                        let tdName = document.createElement('div');

                        tr.className = `${styles.tr}`
                        tdLocate.className = `${styles.tdLocate}`
                        tdName.className = `${styles.tdName}`

                        tdLocate.innerHTML = Info.locate
                        tdName.innerHTML = Info.name

                        function setSchool(){
                            document.cookie = `school=${Info.code}; path=/;`;
                            location.href='/lunch'
                        }

                        tr.appendChild(tdLocate)
                        tr.appendChild(tdName)
                        tr.addEventListener('click', setSchool)
                        table.appendChild(tr)
                    })
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        }
    
        const ButtonElement = document.querySelector(`.${styles.searchBtn}`);
        ButtonElement?.addEventListener('click', search);
    
        const inputElement = document.querySelector(`.${styles.input}`)
        inputElement?.addEventListener('keypress', (e: KeyboardEvent) => {
            if(e.key  === 'Enter'){
                search()
            }
        })

        return () => {
            ButtonElement?.removeEventListener('click', search);
        };
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.imgWrap}>
                <Image src={timewave} alt=''/>
            </div>
            <div className={styles.Wrap}>
                {/*search*/}
                <div className={styles.searchWrap}>
                    <input placeholder='검색할 학교명을 입력해주세요' className={styles.input}></input>
                    <div className={styles.searchBtn}><Image src={searchSVG} alt=''/></div>    
                </div>
                {/*show list */}
                <div className={styles.list}>
                    {/* header */}
                    <div className={styles.header}>
                        <div className={styles.locate}>지역</div>
                        <div className={styles.schoolname}>학교명</div>
                    </div>
                    {/* body */}
                    <div className={styles.body}></div>
                </div>
            </div>
        </main>
    )
}