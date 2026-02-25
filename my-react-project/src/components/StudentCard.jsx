
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
    <div className="student-card unique-gradient-card">
      <h3>{student.name}</h3>
      <div style={{fontWeight: 'bold', color: '#b3b3ff', marginBottom: '8px'}}>Course: <span style={{color: '#fff'}}>{student.course}</span></div>
      <div className="grade-row">
        <span className="grade-label">Grade:</span>
        <span className="grade-value">{getGradeLetter(student.grade)}</span>
        {student.grade >= 90 && <span className="badge top-performer">Top Performer</span>}
      </div>
      <div className="badge-row">
        <span className={`badge ${student.isPresent ? 'present-badge' : 'absent-badge'}`}>{student.isPresent ? 'PRESENT' : 'ABSENT'}</span>
      </div>
      <div className="button-row">
        <button className="button outline" disabled>
          Toggle Status
        </button>
        <button className="button danger" onClick={() => removeStudent(student.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;