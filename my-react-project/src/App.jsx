
import React, { useState } from 'react';
import './App.css';
import StudentCard from './components/StudentCard';
import AddStudentForm from './components/AddStudentForm';


const App = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPresent, setFilterPresent] = useState(null); // null = all, true = present, false = absent
  const [showAbsentModal, setShowAbsentModal] = useState(false);
  const [absentDetails, setAbsentDetails] = useState({});
  // Get absent students
  const absentStudents = students.filter(s => !s.isPresent);

  // Handle absent details change
  const handleAbsentDetailChange = (id, field, value) => {
    setAbsentDetails(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  // Save absent details to students
    const saveAbsentDetails = () => {
    setStudents(prev => prev.map(s => {
      if (!s.isPresent && absentDetails[s.id]) {
        const details = { ...absentDetails[s.id] };
        // If contact is undefined, remove it from the student object
        if ('contact' in details && details.contact === undefined) {
          const { contact, ...rest } = s;
          delete details.contact;
          return { ...rest, ...details };
        }
          // Remove reason if undefined
          if ('reason' in details && details.reason === undefined) {
            const { reason, ...rest } = s;
            delete details.reason;
            s = { ...rest };
          }
        return { ...s, ...details };
      }
      return s;
    }));
    setShowAbsentModal(false);
  };

  // Discard changes and close modal
  const discardAbsentDetails = () => {
    setAbsentDetails({});
    setShowAbsentModal(false);
  };

  // Save students to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const toggleStudentStatus = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, isPresent: !student.isPresent } : student
      )
    );
  };

  const removeStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  // Filter and search logic
  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = String(student.grade).toLowerCase().includes(search.toLowerCase());
    const matchesPresent =
      filterPresent === null ? true : student.isPresent === filterPresent;
    return (matchesName || matchesGrade) && matchesPresent;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="gradient-title">Student Directory</h1>
        <div className="search-bar-row">
          <input
            type="text"
            placeholder="Search by name or grade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-bar"
          />
          <div className="present-filter-group">
            <button
              className={`filter-btn${filterPresent === null ? ' active' : ''}`}
              onClick={() => setFilterPresent(null)}
            >All</button>
            <button
              className={`filter-btn${filterPresent === true ? ' active' : ''}`}
              onClick={() => setFilterPresent(true)}
            >Present</button>
            <button
              className={`filter-btn${filterPresent === false ? ' active' : ''}`}
              onClick={() => setFilterPresent(false)}
            >Absent</button>
          </div>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide Form' : 'Add Student'}
          </button>
          <button className="add-btn" style={{marginLeft: 10}} onClick={() => setShowAbsentModal(true)} disabled={absentStudents.length === 0}>
            Show Absent List
          </button>
        </div>
      </header>
      {showForm && <AddStudentForm addStudent={addStudent} />}
      <div className="student-list">
        {filteredStudents.length === 0 ? (
          <p>No students found. Add a student to get started!</p>
        ) : (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              toggleStatus={toggleStudentStatus}
              removeStudent={removeStudent}
            />
          ))
        )}
      </div>

      {/* Absent Students Modal */}
      {showAbsentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Absent Students</h2>
            {absentStudents.length === 0 ? (
              <p>No absent students.</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); saveAbsentDetails(); }}>
                {absentStudents.map(student => (
                  <div key={student.id} className="absent-detail-row">
                    <div><b>{student.name}</b></div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <input
                        type="text"
                        placeholder="Reason for absence"
                        value={absentDetails[student.id]?.reason !== undefined
                          ? absentDetails[student.id].reason
                          : (student.reason || '')}
                        onChange={e => handleAbsentDetailChange(student.id, 'reason', e.target.value)}
                        className="absent-input"
                        style={{flex: 1}}
                      />
                      {(absentDetails[student.id]?.reason !== undefined
                        ? absentDetails[student.id].reason
                        : (student.reason || '')) && (
                        <button
                          type="button"
                          className="button outline"
                          style={{padding: '4px 10px', fontSize: '0.9em'}}
                          onClick={() => handleAbsentDetailChange(student.id, 'reason', undefined)}
                        >Unsave</button>
                      )}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <input
                        type="text"
                        placeholder="Contact info (optional)"
                        value={absentDetails[student.id]?.contact !== undefined
                          ? absentDetails[student.id].contact
                          : (student.contact || '')}
                        onChange={e => handleAbsentDetailChange(student.id, 'contact', e.target.value)}
                        className="absent-input"
                        style={{flex: 1}}
                      />
                      {(absentDetails[student.id]?.contact !== undefined
                        ? absentDetails[student.id].contact
                        : (student.contact || '')) && (
                        <button
                          type="button"
                          className="button outline"
                          style={{padding: '4px 10px', fontSize: '0.9em'}}
                          onClick={() => handleAbsentDetailChange(student.id, 'contact', undefined)}
                        >Unsave</button>
                      )}
                    </div>
                  </div>
                ))}
                <div style={{marginTop: 18, textAlign: 'right'}}>
                  <button className="button outline" type="button" onClick={discardAbsentDetails} style={{marginRight: 10}}>Discard Changes</button>
                  <button className="button primary" type="submit">Save</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
