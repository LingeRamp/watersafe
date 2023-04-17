import React, { useState, useEffect } from "react";
import "./index.css";
import GaugeChart from 'react-gauge-chart';

function Dashboard() {
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [turbidityValue, setTurbidityValue] = useState(0.86);
  const [eColiValue, setEcoliValue] = useState(0);
  const [enterococcusValue, setEnterococcusValue] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTurbidityValue(Math.random());
      setEcoliValue(Math.random());
      setEnterococcusValue(Math.random());
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  const handleSupplyClick = (supply) => {
    setSelectedSupply(supply);
    alert(`You selected ${supply}`);
  };
  
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Water Supplies</h2>
        <ul>
          <li onClick={() => handleSupplyClick("Supply 1")}>Supply 1</li>
          <li onClick={() => handleSupplyClick("Supply 2")}>Supply 2</li>
          <li onClick={() => handleSupplyClick("Supply 3")}>Supply 3</li>
          <li onClick={() => handleSupplyClick("Supply 4")}>Supply 4</li>
          <li onClick={() => handleSupplyClick("Supply 5")}>Supply 5</li>
          <li onClick={() => handleSupplyClick("Supply 6")}>Supply 6</li>
          <li onClick={() => handleSupplyClick("Supply 7")}>Supply 7</li>
          <li onClick={() => handleSupplyClick("Supply 8")}>Supply 8</li>
          <li onClick={() => handleSupplyClick("Supply 9")}>Supply 9</li>
          <li onClick={() => handleSupplyClick("Supply 10")}>Supply 10</li>
          
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
<div className="gauge-container" >
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>Turbidity</h3>
      <GaugeChart id="gauge-chart1" nrOfLevels={30} percent={turbidityValue} style={{ width: '400%', height: '100%' }} />
    </div>
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>E coli</h3>
      <GaugeChart id="gauge-chart2" nrOfLevels={30} percent={eColiValue} style={{ width: '400%', height: '100%' }} />
    </div>
    <div className="gauge-wrapper" style={{ width: '300px', height: '300px' }}>
      <h3>Enterococcus Bacteria</h3>
      <GaugeChart id="gauge-chart3" nrOfLevels={30} percent={enterococcusValue} style={{ width: '400%', height: '100%' }} />
    </div>

</div>

        </div>
      </div>
    </div>
  );
}


export default Dashboard;

