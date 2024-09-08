import Menu from '../menu/menu';
import Neis from './neis';
import Wave from '../home/wave'
import styles from '../../css/schedule.module.css';


export default function Schedule() {
  return (
    <div>
      <Neis></Neis>
      <div className={styles.main}>
        <Wave height="2"></Wave>
      </div>
      <Menu select="schedule"></Menu>
    </div>
  );
}
