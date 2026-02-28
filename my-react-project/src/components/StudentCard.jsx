
const StudentCard = ({ student, toggleStatus, removeStudent }) => {
  // Helper to convert numeric grade to alphabet
  const getGradeLetter = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="student-card unique-gradient-card" style={{
      display: 'flex', flexDirection: 'column', gap: '6px', borderRadius: '16px', boxShadow: '0 2px 12px 0 rgba(44,62,80,0.12)', padding: '14px 10px', minWidth: '180px', background: 'linear-gradient(120deg, #23243a 80%, #ffd200 100%)', color: '#fff', position: 'relative', border: '2px solid #00c6ff', transition: 'transform 0.2s', fontFamily: 'Poppins, Arial, sans-serif', alignItems: 'flex-start'
    }}>
      <h3 style={{fontSize: '1.1em', fontWeight: 'bold', marginBottom: '2px', letterSpacing: '0.5px', color: '#fff'}}>{student.name}</h3>
      <div style={{fontWeight: 'bold', color: '#b3b3ff', marginBottom: '2px', fontSize: '0.95em'}}>Course: <span style={{color: '#fff'}}>{student.course}</span></div>
      <div className="grade-row" style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px'}}>
        <span className="grade-label" style={{fontWeight: 600, color: '#b3b3ff', fontSize: '0.95em'}}>Grade:</span>
        <span className="grade-value" style={{fontSize: '1em', fontWeight: 'bold', color: '#fff'}}>{getGradeLetter(student.grade)}</span>
        {student.grade >= 90 && <span className="badge top-performer" style={{background: 'linear-gradient(90deg, #ffd200 0%, #f7971e 100%)', color: '#23243a', fontSize: '0.85em', padding: '2px 10px', borderRadius: '12px'}}>Top Performer</span>}
      </div>
      <span className={`badge ${student.isPresent ? 'present-badge' : 'absent-badge'}`} style={{fontSize: '0.85em', padding: '2px 10px', borderRadius: '12px', marginBottom: '2px'}}>{student.isPresent ? 'PRESENT' : 'ABSENT'}</span>
      <div className="button-row" style={{display: 'flex', gap: '8px', marginTop: '6px', width: '100%'}}>
        <button className="button outline" style={{flex: 1, minWidth: '60px', fontSize: '0.9em', padding: '6px 0'}} disabled>
          Toggle
        </button>
        <button className="button danger" style={{flex: 1, minWidth: '60px', fontSize: '0.9em', padding: '6px 0'}} onClick={() => removeStudent(student.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;