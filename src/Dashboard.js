import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt, faEllipsisV, faClock, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Dashboard.css';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [widgets, setWidgets] = useState({});
  const [activeWidget, setActiveWidget] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const cloudAccountsData = {
    labels: ['Connected', 'Not Connected'],
    datasets: [
      {
        data: [2, 0],
        backgroundColor: ['#4CAF50', '#FFC107'],
        cutout: '70%',
      },
    ],
  };

  const riskAssessmentData = {
    labels: ['Failed', 'Warning', 'Not Evaluated', 'Passed'],
    datasets: [
      {
        data: [1680, 650, 120, 256],
        backgroundColor: ['#f44336', '#FF9800', '#9E9E9E', '#4CAF50'],
        cutout: '70%',
      },
    ],
  };

  const imageRiskAssessmentData = {
    labels: ['Total Vulnerabilities'],
    datasets: [
      {
        label: 'Critical',
        data: [50],
        backgroundColor: '#FF0000',
        borderRadius: 20,
      },
      {
        label: 'High',
        data: [75],
        backgroundColor: '#FF8C00',
        borderRadius: 20,
      },
      {
        label: 'Medium',
        data: [300],
        backgroundColor: '#FFD700',
        borderRadius: 20,
      },
      {
        label: 'Low',
        data: [1000],
        backgroundColor: '#008000',
        borderRadius: 20,
      },
    ],
  };

  const imageSecurityIssuesData = {
    labels: ['Total Issues'],
    datasets: [
      {
        label: 'Security Issue 1',
        data: [2],
        backgroundColor: '#FF0000',
        borderRadius: 20,
      },
      {
        label: 'Security Issue 2',
        data: [1],
        backgroundColor: '#008000',
        borderRadius: 20,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const handleAddWidgetClick = (key) => {
    setActiveWidget(key);
  };

  const handleSaveWidget = () => {
    setWidgets(prevWidgets => ({
      ...prevWidgets,
      [activeWidget]: { name: widgetName, text: widgetText },
    }));
    setWidgetName('');
    setWidgetText('');
    setActiveWidget(null);
  };

  const handleCloseWidget = (key) => {
    setActiveWidget(null);
    setWidgets(prevWidgets => {
      const updatedWidgets = { ...prevWidgets };
      delete updatedWidgets[key];
      return updatedWidgets;
    });
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>CNAPP Dashboard</h1>
        <div className="controls">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} />
            Add Widget
          </button>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <div className="btn-box">
            <button className="filter-btn"><FontAwesomeIcon icon={faClock} /></button>
            <div className="divider"></div>
            <select className="filter-dropdown">
              <option value="last-2-days">
                Last 2 days
              </option>
              {/* Add more filter options here */}
            </select>
          </div>
        </div>
      </div>

      {/* First row: Doughnut charts */}
      <div className="row">
        <h2>CEPM Executive Dashboard</h2>
        <div className="row-flex">
          <div className="box">
            {activeWidget === 'cloudAccounts' ? (
              <>
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
                <textarea
                  placeholder="Widget Text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                />
                <button onClick={handleSaveWidget}>Save Widget</button>
                <button onClick={() => setActiveWidget(null)} className="close-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <h3>Cloud Accounts</h3>
                <div className="graph-section">
                  <div className="doughnut-container">
                    <Doughnut
                      data={cloudAccountsData}
                      options={{
                        plugins: {
                          legend: {
                            display: true,
                            position: 'right',
                            labels: {
                              usePointStyle: true,
                              boxWidth: 10,
                            },
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="box">
            {activeWidget === 'riskAssessment' ? (
              <>
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
                <textarea
                  placeholder="Widget Text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                />
                <button onClick={handleSaveWidget}>Save Widget</button>
                <button onClick={() => setActiveWidget(null)} className="close-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <h3>Cloud Account Risk Assessment</h3>
                <div className="graph-section">
                  <div className="doughnut-container">
                    <Doughnut
                      data={riskAssessmentData}
                      options={{
                        plugins: {
                          legend: {
                            display: true,
                            position: 'right',
                            labels: {
                              usePointStyle: true,
                              boxWidth: 10,
                            },
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="box">
            {activeWidget === 'widget3' ? (
              <>
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
                <textarea
                  placeholder="Widget Text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                />
                <button onClick={handleSaveWidget}>Save Widget</button>
                <button onClick={() => setActiveWidget(null)} className="close-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleAddWidgetClick('widget3')}>Add Widget</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Second row: No data charts */}
      <div className="row">
        <h2>CWPP Dashboard</h2>
        <div className='row-flex'>
          <div className="box">
            <h3>Top Namespace Specific Alerts</h3>
            <p>No Graph data available!</p>
          </div>
          <div className="box">
            <h3>Workload Alerts</h3>
            <p>No Graph data available!</p>
          </div>
          <div className="box">
            {activeWidget === 'widget6' ? (
              <>
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
                <textarea
                  placeholder="Widget Text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                />
                <button onClick={handleSaveWidget}>Save Widget</button>
                <button onClick={() => setActiveWidget(null)} className="close-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleAddWidgetClick('widget6')}>Add Widget</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Third row: Horizontal stacked bar charts */}
      <div className="row">
        <h2>Registry Scan</h2>
        <div className="row-flex">
          <div className="box">
            <h3>Image Risk Assessment</h3>
            <div className='row-flex'>
              <p className='bold'>1430</p>
              <p>total vulnerabilities</p>
            </div>
            <div className="graph-section">
              <Bar
                data={imageRiskAssessmentData}
                options={barOptions}
              />
            </div>
          </div>

          <div className="box">
            <h3>Image Security Issues</h3>
            <div className='row-flex'>
              <p className='bold'>2</p>
              <p>images</p>
            </div>
            <div className="graph-section">
              <Bar
                data={imageSecurityIssuesData}
                options={barOptions}
              />
            </div>
          </div>

          <div className="box">
            {activeWidget === 'widget4' ? (
              <>
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
                <textarea
                  placeholder="Widget Text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                />
                <button onClick={handleSaveWidget}>Save Widget</button>
                <button onClick={() => setActiveWidget(null)} className="close-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleAddWidgetClick('widget4')}>Add Widget</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
