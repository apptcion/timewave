import Image from 'next/image'

import Wave from './wave'
import Menu from '../menu/menu'
import message from '../../../public/assets/imgs/message.svg'
import logo from '../../../public/assets/imgs/logo.svg'
import googlePlay from '../../../public/assets/imgs/googlePlay.png'
import appStore from '../../../public/assets/imgs/appstore.png'

import styles from '../../css/home.module.css'



export default function Home(){

    return (
    <div>
        <div className={styles.main}>
            <div className={styles.left}>
                {/* <Image className={styles.message} src={message} alt=''></Image> */}
                <p className={styles.welcome}>Welcom To TimeWave</p>
                <p className={styles.slogun}>어지러운 시간의 파도에서<br />편히 헤엄치도록</p>
                <p className={styles.summary}>타임웨이브에서 우리 학교에 대한 다양한 정보를 찾아봐요</p>
                <div className={styles.downloads}>
                    <div className={`${styles.download_Btn} ${styles.googlePlay}`}>
                        <Image src={googlePlay} alt='' className={styles.appLogo}/> 앱 다운로드
                    </div>
                    <div className={`${styles.download_Btn} ${styles.appStore}`}>
                        <Image src={appStore} alt='' className={styles.appLogo}/> 앱 다운로드
                    </div>
                </div>
            </div>
            <div className={styles.right}>            
                <Image className={styles.logo} src={logo} alt=''/>
            </div>
        </div>
        <Menu select="home"></Menu>
        <Wave height="2"></Wave>
    </div>
)   
}