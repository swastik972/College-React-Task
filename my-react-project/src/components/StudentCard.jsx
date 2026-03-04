
const StudentCard = ({ student, toggleStatus, removeStudent, index = 0 }) => {
  const getGradeLetter = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  return (
    <div
      className="student-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-header">
        <div>
          <h3 className="student-name">{student.name}</h3>
          <div className="card-detail">
            <span className="card-detail-label">Course:</span>
            <span className="card-detail-value">{student.course}</span>
          </div>
        </div>
        <div className="student-avatar">{getInitials(student.name)}</div>
      </div>

      <div className="card-detail">
        <span className="card-detail-label">Grade:</span>
        <span className="card-detail-value">{student.grade !== undefined ? getGradeLetter(student.grade) : '—'}</span>
      </div>

      <div className="badge-row">
        <span className={`badge ${student.isPresent ? 'present-badge' : 'absent-badge'}`}>
          {student.isPresent ? '● Present' : '● Absent'}
        </span>
        {student.grade >= 90 && (
          <span className="badge top-performer">⭐ Top Performer</span>
        )}
      </div>

      {student.reason && !student.isPresent && (
        <div className="card-detail">
          <span className="card-detail-label">Reason:</span>
          <span className="card-detail-value">{student.reason}</span>
        </div>
      )}

      <div className="button-row">
        <button className="card-action-btn toggle" onClick={() => toggleStatus(student.id)}>
          {student.isPresent ? 'Mark Absent' : 'Mark Present'}
        </button>
        <button className="card-action-btn delete" onClick={() => removeStudent(student.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;