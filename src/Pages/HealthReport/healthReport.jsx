import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Axios from 'axios'
import API from '../../Utils/api';
import "./healthReport.css"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { Col, Row } from 'react-bootstrap';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const HealthReport = () => {
    const [systolicPressure, setSystolicPressure] = useState([]);
    const [diastolicPressure, setDiastolicPressure] = useState([]);
    const [restingHeartRate, setRestingHeartRate] = useState([]);
    const [error, setError] = useState({status: false, msg :''})
    const {id} = useParams()


    const fetchHealthData = async()=>{
        
            const options = {
                url: `${API}/health/${id}/health-assessment`,
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json;charset=UTF-8"
                }
            }
            const result = await Axios(options)
            
            const {response, healthAssessment} = result.data
           
            if(response == 'Success'){
                setRestingHeartRate(healthAssessment)
                setSystolicPressure(healthAssessment)
                setDiastolicPressure(healthAssessment)
            }else if(response == 'Fail'){
                setError({status : true, msg : "Fialed to fetch timeline posts"})
                return setTimeout(()=>{
                    setError({status : false, msg :''})
            }, 4000)
            }
            
        }
    
    
    useEffect(()=>{
        fetchHealthData()
    },[])
    
    

  const SystolicPressureChart = ({ data }) => {
    const chartData = {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Systolic Pressure',
          data: data.map(entry => entry.systolicPressure),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Dates',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Systolic Pressure',
          },
          suggestedMin: 0,
          suggestedMax: 150,
        },
      },
    };

    return <Line data={chartData} options={chartOptions} />;
  };


  const DiastolicPressureChart = ({ data }) => {
    const chartData = {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Diastolic Pressure',
          data: data.map(entry => entry.diastolicPressure),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Dates',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Diastolic Pressure',
          },
          suggestedMin: 0,
          suggestedMax: 150,
        },
      },
    };

    return <Line data={chartData} options={chartOptions} />;
  };


  const RestingHeartRateChart = ({ data }) => {
    const chartData = {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Resting Heart Rate',
          data: data.map(entry => entry.restingHeartRate),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Dates',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Resting Heart Rate',
          },
          suggestedMin: 0,
          suggestedMax: 150,
        },
      },
    };

    return <Line data={chartData} options={chartOptions} />;
  };

  

  return (
    <div className='health-report' >
      <div className="chart-container">
        <div className="header">Systolic Pressure Chart</div>
        {systolicPressure && <SystolicPressureChart data={systolicPressure} />}
      </div>
      <div className="chart-container">
        <div className="header">Diastolic Pressure Chart</div>
        {diastolicPressure && <DiastolicPressureChart data={diastolicPressure} />}
      </div>
      <div className="chart-container">
        <div className="header">Resting Heart Rate Chart</div>
        {restingHeartRate && <RestingHeartRateChart data={restingHeartRate} />}
      </div>
    </div>
  );
};

export default HealthReport;
