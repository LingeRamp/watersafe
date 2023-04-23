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

    function handleSetCurrent(item){
            setCurrent(sups[0]);
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
    return (
        <div className="gauge-container" >
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>Turbidity</h3>
      <GaugeChart id="gauge-chart1" nrOfLevels={30} percent={1-item.turbidity/100} style={{ width: '400%', height: '100%' }} />
    </div>
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>E coli</h3>
      <GaugeChart id="gauge-chart2" nrOfLevels={30} percent={1-item.turbidity/100} style={{ width: '400%', height: '100%' }} />
    </div>
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>Water Quality</h3>
      <GaugeChart id="gauge-chart3" nrOfLevels={30} percent={item.turbidity/100} style={{ width: '400%', height: '100%' }} colors={[ "#FF0000","#00ff00"]} />
    </div>

</div>
    )
}

useEffect(()=>{
    // getSuppliers().then((value)=>{
    //     setSups(value)
    // });
    initListener()
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
    <div className="container">
      <div className="sidebar">
        <h2>Water Supplies</h2>
        <ul>

            {sups.map((item,index)=><Supplier item={item} key={index} index={index}/>)}
</ul>

      </div>
      <div className="main">
        <h1 className="title">WaterSafe</h1>
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
        
        <p>Map goes here</p>
      </div>
      <div className="bottom-border">
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <GuageContainer  item = {current}/>

        </div>
      </div>
    </div>
  );
}


export default Dashboard;

