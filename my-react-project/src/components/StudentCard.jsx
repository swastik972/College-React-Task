
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
      display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '18px', boxShadow: '0 4px 32px 0 rgba(44,62,80,0.18)', padding: '24px', minWidth: '220px', background: 'linear-gradient(135deg, #23243a 80%, #2e3192 100%)', color: '#fff', position: 'relative'
    }}>
      <h3 style={{fontSize: '1.4em', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '1px'}}>{student.name}</h3>
      <div style={{fontWeight: 'bold', color: '#b3b3ff', marginBottom: '8px'}}>Course: <span style={{color: '#fff'}}>{student.course}</span></div>
      <div className="grade-row" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
        <span className="grade-label" style={{fontWeight: 600, color: '#b3b3ff'}}>Grade:</span>
        <span className="grade-value" style={{fontSize: '1.2em', fontWeight: 'bold', color: '#fff'}}>{getGradeLetter(student.grade)}</span>
        {student.grade >= 90 && <span className="badge top-performer">Top Performer</span>}
      </div>
      <div className="badge-row" style={{marginBottom: '16px'}}>
        <span className={`badge ${student.isPresent ? 'present-badge' : 'absent-badge'}`}>{student.isPresent ? 'PRESENT' : 'ABSENT'}</span>
      </div>
      <div className="button-row" style={{display: 'flex', gap: '12px', marginTop: '10px'}}>
        <button className="button outline" style={{flex: 1, minWidth: '80px'}} disabled>
          Toggle Status
        </button>
        <button className="button danger" style={{flex: 1, minWidth: '80px'}} onClick={() => removeStudent(student.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;