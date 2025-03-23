import './Admin.css';
import React, { useState } from 'react';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('flights');
  const [activeForm, setActiveForm] = useState('');
  const [displayData, setDisplayData] = useState(false);

  const showSection = (section) => {
    setActiveSection(section);
    setActiveForm('');
    setDisplayData(false);
  };

  const showForm = (form) => {
    setActiveForm(form);
    setDisplayData(false);
  };

  const handleDisplay = () => {
    setActiveForm('');
    setDisplayData(true);
  };

  return (
    <div>
      <div className="admin-header">
        <div className="left-buttons">
          <button onClick={() => showSection('flights')}>Manage Flights</button>
          <button onClick={() => showSection('trains')}>Manage Trains</button>
          <button onClick={() => showSection('buses')}>Manage Buses</button>
        </div>
        <button className="admin-logout-btn" onClick={() => window.location.href = 'logout.html'}>Logout</button>
      </div>

      {/* Section Component */}
      {['flight', 'train', 'bus'].map((section) => (
        <div key={section} className={`admin-content ${activeSection === section ? 'admin-active' : ''}`} id={section}>
          <h1>Manage {section.charAt(0).toUpperCase() + section.slice(1)}</h1>
          <button className="action-btn" onClick={() => showForm(`add${section.charAt(0).toUpperCase() + section.slice(1)}Form`)}>Add {section}</button>
          <button className="action-btn" onClick={() => showForm(`update${section.charAt(0).toUpperCase() + section.slice(1)}Form`)}>Update {section}</button>
          <button className="action-btn" onClick={() => showForm(`delete${section.charAt(0).toUpperCase() + section.slice(1)}Form`)}>Delete {section}</button>
          <button className="action-btn" onClick={handleDisplay}>Display {section}</button>

          {/* Forms */}
          {['add', 'update', 'delete'].map((action) => (
            <div key={`${action}${section}`} className={`admin-form-container ${activeForm === `${action}${section.charAt(0).toUpperCase() + section.slice(1)}Form` ? 'admin-active' : ''}`}>
              <h2>{action.charAt(0).toUpperCase() + action.slice(1)} {section}</h2>
              <form>
                {action !== 'delete' && <input type="text" placeholder={section === 'flights' ? 'Airline Name' : section === 'trains' ? 'Train Name' : 'Bus Name'} />}
                <input type="text" placeholder="Source" />
                <input type="text" placeholder="Destination" />
                {action !== 'delete' && (
                  <>
                    <input type="time" placeholder="Departure Time" />
                    <input type="time" placeholder="Arrival Time" />
                    <input type="date" placeholder="Travel Date" />
                    <input type="number" placeholder="Total Seats" />
                    <input type="number" step="0.01" placeholder="Price" />
                    <select>
                      {section === 'flights' ? (
                        ['ECONOMY', 'BUSINESS', 'FIRST_CLASS'].map(option => <option key={option} value={option}>{option}</option>)
                      ) : section === 'trains' ? (
                        ['FIRST_CLASS', 'SECOND_CLASS', 'SLEEPER', 'GENERAL'].map(option => <option key={option} value={option}>{option}</option>)
                      ) : (
                        ['SLEEPER', 'SEMI_SLEEPER', 'SEATER', 'AC', 'NON_AC'].map(option => <option key={option} value={option}>{option}</option>)
                      )}
                    </select>
                  </>
                )}
                <button type="submit">{action.charAt(0).toUpperCase() + action.slice(1)} {section}</button>
              </form>
            </div>
          ))}

          {/* Display Table */}
          {displayData && (
            <div className="admin-table-container">
              <h2>{section.charAt(0).toUpperCase() + section.slice(1)} Data</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Travel Date</th>
                    <th>Total Seats</th>
                    <th>Price</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample data rows */}
                  <tr>
                    <td>1</td>
                    <td>{section === 'flights' ? 'Indigo' : section === 'trains' ? 'Rajdhani Express' : 'RedBus'}</td>
                    <td>Delhi</td>
                    <td>Mumbai</td>
                    <td>10:00 AM</td>
                    <td>2:00 PM</td>
                    <td>2025-03-25</td>
                    <td>150</td>
                    <td>5000</td>
                    <td>{section === 'flights' ? 'BUSINESS' : section === 'trains' ? 'SLEEPER' : 'AC'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;
