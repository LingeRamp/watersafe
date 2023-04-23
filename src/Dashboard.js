import React, { useState, useEffect } from "react";
import "./index.css";
import GaugeChart from 'react-gauge-chart';
import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore, query, onSnapshot} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAuIzuiB34_M5owAkU3hkHlvvc1oPr54Wc",
  authDomain: "water-monitor-3a119.firebaseapp.com",
  projectId: "water-monitor-3a119",
  storageBucket: "water-monitor-3a119.appspot.com",
  messagingSenderId: "537692839891",
  appId: "1:537692839891:web:b324a0cf7cf7af63f9d926"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

    async function getSuppliers (){

       const querySnapshot = await getDocs(collection(db, "suppliers"));

          let things = [];

querySnapshot.forEach((doc) => {

    let thing = doc.data()
    things.push(thing);
});

console.log(things)
        return things;
    }


const items = [
    {
        name:'example',
        isActive:true,
        turbidity:90/100,
    },
     {
        name:'goat',
        isActive:true,
           turbidity:99/100,
    },
     {
        name:'Pow',
        isActive:true,
           turbidity:98/100,
    },
     {
        name:'Bang',
        isActive:true,
           turbidity:80/100,
    },
     {
        name:'Boom',
        isActive:true,
         turbidity:90/100,
    },

]



function Dashboard() {

        const [current, setCurrent] = useState(items[1])

    const [sups, setSups] = useState([])

    function handleSetCurrent(index){
            setCurrent(sups[index]);
    }

    function initListener(){
            const q = query(collection(db, "suppliers"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const sups = [];
  querySnapshot.forEach((doc) => {
      sups.push(doc.data());
  });
  setSups(sups);
  console.log(` Cool stuff${sups}`)
});
    }

    function GuageContainer(props){
    let item = props.item;
    let waterQuality = item.turbidity;
    let turbidity = 100-waterQuality;
    let ecoli=0;

    if(waterQuality>85){
        ecoli =0;
    }
    else{

        let random_value = Math.floor(Math.random() * 10);
        if (random_value%2==0){
            random_value = -random_value;
        }
       ecoli = (1/2)*turbidity+ random_value;
    }
    return (
        <div className="gauge-container" >
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>Turbidity</h3>
      <GaugeChart id="gauge-chart1" nrOfLevels={30} percent={turbidity/100} style={{ width: '400%', height: '100%' }} />
    </div>
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>E coli</h3>
      <GaugeChart id="gauge-chart2" nrOfLevels={30} percent={ecoli/100} style={{ width: '400%', height: '100%' }} />
    </div>
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>Water Quality</h3>
      <GaugeChart id="gauge-chart3" nrOfLevels={30} percent={waterQuality/100} style={{ width: '400%', height: '100%' }} colors={[ "#FF0000","#00ff00"]} />
    </div>

</div>
    )
}

useEffect(()=>{
    getSuppliers().then((value)=>{
        setSups(value)
    });
    // initListener()
},[])

function Supplier(props){
    let item = props.item;
    let index = props.index;
    return (
        <li onClick={()=>handleSetCurrent(index)}>{item.name} <span className="red">{item.isActive?'InActive':'Active'}</span></li>
    )
}



  useEffect(() => {


  }, []);
  
  const handleSupplyClick = (supply) => {
    // setSelectedSupply(supply);
    alert(`You selected ${supply}`);
  };
  

  function getStatusText(turbidityValue) {
    if (turbidityValue < 0.3) {
      return "Safe";
    } else if (turbidityValue < 0.5) {
      return "Advisory";
    } else {
      return "Unsafe";
    }
  }
  
  
  
  return (
    <div className="container-fluid p-0 m-0 d-flex">
      <div className="sidebar container-fluid w-25%">
        <h2>Water Supplies</h2>
        <ul>

            {sups.map((item,index)=><Supplier item={item} key={index} index={index}/>)}
</ul>

      </div>
      <div className="container-fluid p-0 m-0">
        <h1 className="title">{current.name}</h1>
        <div className="status-labels" style={{ display: "flex", justifyContent: "center" }}>
  <div className="status-label">
    <span className="green-label">Safe: n</span>
  </div>
  <div className="status-label">
    <span className="orange-label">Advisory: n</span>
  </div>
  <div className="status-label">
    <span className="red-label">Unsafe: n</span>
  </div>
</div>

        <div className="border"></div>

          <div className={'container-fluid m-0 p-0 h-100'}>
              <iframe
          id="myMap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9378.13630336011!2d28.097337280458493!3d-26.102802956570933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950d539f33d86d%3A0xba9789de8bd1fbb3!2sAlexandra%2C%202014!5e0!3m2!1sen!2sza!4v1682169831343!5m2!1sen!2sza"
          title="Google Maps"
          width="100%"
          height="47%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
>       </iframe>

          </div>
        

      </div >
      <div className="bottom-border">
        <div className={'container-fluid m-0 p-0 h-25'}>

            <GuageContainer  item = {current}/>

        </div>
      </div>
    </div>
  );
}


export default Dashboard;

