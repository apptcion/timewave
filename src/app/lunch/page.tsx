'use client'

import * as THREE from 'three';
import { useRef, useEffect, useState} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {TextGeometry } from'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Image from 'next/image';

import Menu from '../menu/menu'
import Overlay from './overlay'
import styles from '../../css/lunch.module.css';
import LeftArrow from '../../../public/assets/imgs/toLeft.svg'
import RightArrow from '../../../public/assets/imgs/toRight.svg'
import TempLoading from '../../../public/assets/imgs/Temploading.gif'
// 커스텀 Rounded Box Geometry 함수 정의
function createRoundedBoxGeometry(width, height, radius) {
  const shape = new THREE.Shape();

  // shape.moveTo(-width/2, -height/2 + radius)
  // shape.lineTo(-width/2, height/2-radius)
  // shape.quadraticCurveTo(-width/2, height/2, -width/2 + radius, height/2)
  // shape.lineTo(width/2-radius, height/2)
  // shape.quadraticCurveTo(width/2, height/2, width/2, height/2-radius)
  // shape.lineTo(width/2, -height/2+radius)
  // shape.quadraticCurveTo(width/2, -height/2, width/2-radius, height/2)
  // shape.lineTo(-width/2+radius, height/2)
  // shape.quadraticCurveTo(-width/2, -height/2, -width/2, -height/2+radius)

  shape.moveTo(-width / 2 + radius, -height / 2);
  shape.lineTo(width / 2 - radius, -height / 2);
  shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
  shape.lineTo(width / 2, height / 2 - radius);
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  shape.lineTo(-width / 2 + radius, height / 2);
  shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
  shape.lineTo(-width / 2, -height / 2 + radius);
  shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

  const geometry = new THREE.ShapeGeometry(shape);
  geometry.center(); // 지오메트리를 중앙으로 이동

  return geometry;
}

function Radian(angle){
  console.log(angle)
  return angle * (Math.PI/180);
}

function create2dText(message, fontPath, size, position, scene, onLoadCallBack = () => {}){

  const fontLoader = new FontLoader();
  fontLoader.load(fontPath, (font) => {
    const textGeometry = new TextGeometry(message, {
      font: font,
      size: size,
      depth: 0,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.x = position[0];
    textMesh.position.y = position[1];
    textMesh.position.z = position[2];
    
    scene.add(textMesh)
    onLoadCallBack()
    return textMesh;
  })
  
}

export default function Lunch() {
  const canvasRef = useRef(null);
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {

    //////////////////////TEMP/////////////////////////
let lunch = '-물/비빔반반냉면\n\
- 후리카케주먹밥\n\
- 추가밥\n\
- 소떡소떡꼬치\n\
- 양상추샐러드&과일\n\
- 꼬들단무지무침\n\
- 열무김치'

let morning = '- 오징어야채볶음\n\
- 쌀밥\n\
- 소고기배추국\n\
- 포자만두찜&초간장\n\
- 춘식이도시락김\n\
- 오이김치\n\
- 모듬과일\n\
- 시리얼2종\n\
- 우유,저지방우유,두유,과채주스2종1택\n\
- 유산균'


let dinner = '- 타워함박스테이크\n\
- 기장밥\n\
- 쌀밥\n\
- 참치김치찌개\n\
- 야채계란찜\n\
- 상추겉절이\n\
- 깍두기\n\
- 수제딸기바나나스무디\n\
- 비빔코너'


    const currentRef = canvasRef.current;

    // Three.js 기본 요소 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      105,
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setClearColor('white')
    currentRef.appendChild(renderer.domElement);
///////////////////////////////////////////////////////////////////////////
    let Showing = []

    //지역공간 생성
    const BoardSpace = new THREE.Object3D();
    BoardSpace.position.y = 0;
    scene.add(BoardSpace)

    // const tempCircleGeo = new THREE.CircleGeometry(3)
    // const tempCircleMaterial = new THREE.MeshBasicMaterial({color : 'red'})
    // const tempCircle = new THREE.Mesh(tempCircleGeo, tempCircleMaterial)
    // tempCircle.rotation.x = Radian(-90);

    //scene.add(tempCircle)

    //아침 메뉴판 공간 생성
    const MorningSpace = new THREE.Object3D();
    MorningSpace.position.set(-7/2, 0, -0.5);
    //MorningSpace.rotation.y = Radian(240)

    //아침 보드 추가
    const morningBoardGeometry = createRoundedBoxGeometry(3,9/2,0.1);
    const morningBoardMaterial = new THREE.MeshBasicMaterial({color : '#D8EBFC', side: THREE.DoubleSide, transparent: true, opacity: 0.5})
    const morningBoard = new THREE.Mesh(morningBoardGeometry, morningBoardMaterial)
  

    MorningSpace.add(morningBoard)

    //아침 텍스트 추가
    create2dText('아침', '/assets/fonts/Pretendard Medium_Regular.json', 0.2, [-1.2, 1.7, 0.1], MorningSpace)
    create2dText(morning, '/assets/fonts/Pretendard Medium_Regular.json', 0.13, [-1.2, 1.3, 0.1], MorningSpace)

    BoardSpace.add(MorningSpace)
    Showing.push(MorningSpace)

    //점심 메뉴판 공간 생성
    const LunchSpace = new THREE.Object3D();
    LunchSpace.position.set(0, -1, 1)

    //점심 보드 추가
    const lunchBoardGeometry = createRoundedBoxGeometry(3,9/2,0.1)
    const lunchBoardMaterial = new THREE.MeshBasicMaterial({color: '#D8EBFC', side: THREE.DoubleSide, transparent: true, opacity: 0.5})
    const lunchBoard = new THREE.Mesh(lunchBoardGeometry, lunchBoardMaterial);

    LunchSpace.add(lunchBoard)
    Showing.push(LunchSpace)

    //점심 텍스트 추가
    create2dText('점심', '/assets/fonts/Pretendard Medium_Regular.json', 0.2, [-1.2, 1.7, 0.1], LunchSpace)
    create2dText(lunch, '/assets/fonts/Pretendard Medium_Regular.json', 0.13, [-1.2, 1.3, 0.1], LunchSpace)

    BoardSpace.add(LunchSpace)

    //저녁 메뉴판 공간 생성
    const DinnerSpace = new THREE.Object3D();
    DinnerSpace.position.set(7/2,0,-0.5)
    //DinnerSpace.rotation.y = Radian(120)

    //저녁 보드 추가
    const dinnerBoardGeometry = createRoundedBoxGeometry(3,9/2,0.1);
    const dinnerBoardMaterial = new THREE.MeshBasicMaterial({color : '#D8EBFC', side: THREE.DoubleSide, transparent: true, opacity: 0.5})
    const dinnerBoard = new THREE.Mesh(dinnerBoardGeometry, dinnerBoardMaterial);

    DinnerSpace.add(dinnerBoard)


    //저녁 텍스트 추가
    create2dText('저녁', '/assets/fonts/Pretendard Medium_Regular.json', 0.2, [-1.2, 1.7, 0.1], DinnerSpace)
    create2dText(dinner, '/assets/fonts/Pretendard Medium_Regular.json', 0.13, [-1.2, 1.3, 0.1], DinnerSpace, () => {
      setLoading(false)
      console.log("로딩 완료")
    })

    BoardSpace.add(DinnerSpace)
    Showing.push(DinnerSpace)

/////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //평면좌표 추가
    // const axesHelper = new THREE.AxesHelper(2); // 크기 2의 AxesHelper 생성
    // scene.add(axesHelper);

    // 카메라 위치 설정
    camera.position.z = 4.4;
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 3;
    controls.maxDistance = 5;
    controls.maxPolarAngle = Radian(180)
    controls.maxAzimuthAngle = Radian(90)
    controls.minAzimuthAngle = Radian(-90)
    //BoardSpace.rotation.y += Radian(240)
    // 애니메이션 루프
    

    let running = false;
    const animate = function () {
      requestAnimationFrame(animate);
      if(!running){
        Showing[0].position.set(-7/2, 0, -0.5)
        Showing[1].position.set(0, -1, 1)
        Showing[2].position.set(7/2, 0, -0.5)
      }

      controls.update()
      renderer.render(scene, camera);
    };

    animate();

    function toLeft(){
      running = true
      //왼 : -7/2, 0, -0.5
      //가 :    0, 0,    1
      //오 :  7/2, 0, -0.5

      // //왼 to 오 => 7
      // Showing[0].position.set(7/2,0,-0.5)
      
      //가 to 왼 : 0,0,1 => 루트 12.5 => 3.5
      //Showing[1].position.set(-7/2,0,-0.5)

      //오 to 가 => 루타 12.5 => 3.5
      // Showing[2].position.set(0,0,1)
      let timer1 = setInterval(()=>{
        //왼 to 오
        Showing[0].position.x += 0.35;

        //가 to 왼
        Showing[1].position.x -= 0.175;
        Showing[1].position.z -= 0.075;
        Showing[1].position.y += 0.05;

        //오 to 가
        Showing[2].position.x -= 0.175;
        Showing[2].position.z += 0.075;
        Showing[2].position.y -= 0.05;
      },10)
      setTimeout(()=>{
        clearInterval(timer1)
        
      running = false
      let tempShowing  = [Showing[1], Showing[2], Showing[0]]
      Showing = tempShowing
      },200)

    }

    function toRight(){
      running = true
      //왼 : -7/2, 0, -0.5
      //가 :    0, 0,    1
      //오 :  7/2, 0, -0.5

      // //왼 to 오 => 7
      // Showing[0].position.set(7/2,0,-0.5)
      
      //가 to 왼 : 0,0,1 => 루트 12.5 => 3.5
      //Showing[1].position.set(-7/2,0,-0.5)

      //오 to 가 => 루타 12.5 => 3.5
      // Showing[2].position.set(0,0,1)
      let timer1 = setInterval(()=>{
        //오 to 왼
        Showing[2].position.x -= 0.35;

        //왼 to 가
        Showing[0].position.x += 0.175;
        Showing[0].position.z += 0.075;
        Showing[0].position.y -= 0.05;

        //가 to 오
        Showing[1].position.x += 0.175;
        Showing[1].position.z -= 0.075;
        Showing[1].position.y += 0.05;
      },10)
      setTimeout(()=>{
        clearInterval(timer1)
        running = false
      let tempShowing  = [Showing[2], Showing[0], Showing[1]]
      Showing = tempShowing
      },200)

    }

    document.querySelector('#toLeft').addEventListener('click', toLeft)
    document.querySelector('#toRight').addEventListener('click', toRight)

    const resizeHandler = () =>{ 
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      renderer.render(scene, camera);
    }
    
    window.addEventListener('resize', resizeHandler)

    // 정리 함수 추가
    return () => {
      renderer.dispose();
      currentRef.removeChild(renderer.domElement);
      window.removeEventListener('resize', resizeHandler)
    };
  }, []);

  return (
    <div>
      {isLoading && <Image className={styles.loading} src={TempLoading} alt='' unoptimized/>}
      <Overlay></Overlay>
      <div
        className={styles.canvas}
        ref={canvasRef}
      >
      </div>
      <div className={styles.arrow}>
        <a id="toLeft" className={styles.leftArrow}><Image src={LeftArrow} alt="" width={30} height={71}/></a>
        <a id="toRight" className={styles.rightArrow}><Image src={RightArrow} alt="" width={30} height={71}/></a>
      </div>
      <Menu></Menu>
    </div>
  );
}