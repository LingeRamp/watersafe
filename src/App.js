import './App.css';
import Dashboard from './Dashboard';
import {useEffect, useState} from "react";
import{initializeApp, } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


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


function App(observer) {

    const [supplies, setSupplies] = useState(['demo']);


    async function getSuppliers (){

       const querySnapshot = await getDocs(collection(db, "suppliers"));

          let things = [];

querySnapshot.forEach((doc) => {

    let thing = doc.data()
    things.push(thing);
});

console.log(things)
    }


    useEffect(() => {
        getSuppliers().then(r =>{console.log('Donnee')} )
    },[]);



  return (
    <div className="App">
      <Dashboard />
      {/*  <h1 className={'text-white'}>{'Water things'}</h1>*/}
      {/*   <div className={'btn btn-success text-white container-fluid'} onClick={()=>{}}> click to add</div>*/}
      {/*  {*/}
      {/*      supplies.map((supply) => {*/}
      {/*          return (*/}
      {/*              <div className={'supply'}>*/}

      {/*                  <h2 className={'text-white'}> {`Supply ${supply}`}</h2>*/}
      {/*                  <div className={'status'}>*/}
      {/*                      <span className={'status-text text-danger'}>{'Safe'}</span>*/}
      {/*                  </div>*/}
      {/*              </div>*/}
      {/*          )*/}
      {/*      }*/}
      {/*  )*/}
      {/*  }*/}
    </div>
  );
}

export default App;
