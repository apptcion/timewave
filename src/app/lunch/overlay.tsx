import Image from 'next/image'

import styles from '../../css/overlay.module.css'
import SchoolLogo from '../../../public/assets/imgs/school.svg'
import SchoolArrowLogo from '../../../public/assets/imgs/SchoolArrow.svg'

export default function Overlay(){
    return (
        <div className={styles.back}>
            <div className={styles.message}>
            <p className={styles.ment}>현재 학교 정보가 등록되어 있지 않아요🥲</p>
            <p className={styles.ment}>원활한 서비스 이용을 위해 학교 정보를 등록해주세요!</p>
            </div>

            <div className={styles.button}>
                <Image className={styles.SchoolLogo} src={SchoolLogo} alt='' />
                <p className={styles.btn_msg}>학교 정보 등록하기</p>
                <Image className={styles.SchoolArrowLogo} src={SchoolArrowLogo} alt=''/>
            </div>
        </div>
    )
}