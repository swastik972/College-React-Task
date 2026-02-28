import React, { useState } from 'react';


const AddStudentForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    grade: '',
    isPresent: true,
    absentReason: '',
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };


  // Convert grade letter to numeric value for storage
  const gradeLetterToNumber = (letter) => {
    switch (letter.toUpperCase()) {
      case 'A': return 95;
      case 'B': return 85;
      case 'C': return 75;
      case 'D': return 65;
      case 'F': return 50;
      default: return 0;
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.course && (formData.isPresent ? formData.grade : formData.absentReason)) {
      addStudent({
        ...formData,
        id: Date.now(),
        grade: formData.isPresent ? gradeLetterToNumber(formData.grade) : undefined,
        reason: !formData.isPresent ? formData.absentReason : undefined
      });
      setFormData({ name: '', course: '', grade: '', isPresent: true, absentReason: '' });
    }
  };

  return (
      <form className="add-student-form" onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', borderRadius: '14px', boxShadow: '0 2px 16px rgba(44,62,80,0.08)', padding: '24px', maxWidth: '400px', margin: '0 auto', marginBottom: '24px'
      }}>
        <label style={{fontWeight: 'bold', marginBottom: '4px'}}>Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px'}}
          />
        </label>
        <label style={{fontWeight: 'bold', marginBottom: '4px'}}>Course
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px'}}
          />
        </label>
        <label style={{fontWeight: 'bold', marginBottom: '4px'}}>
          <input
            type="checkbox"
            name="isPresent"
            checked={formData.isPresent}
            onChange={handleChange}
            style={{marginRight: '8px'}}
          /> Present
        </label>
        {formData.isPresent ? (
          <label style={{fontWeight: 'bold', marginBottom: '4px'}}>Grade
            <input
              type="text"
              name="grade"
              placeholder="Grade (A, B, C, D, F)"
              value={formData.grade}
              onChange={handleChange}
              maxLength={1}
              pattern="[AaBbCcDdFf]"
              title="Enter a grade letter: A, B, C, D, or F"
              required
              style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px'}}
            />
          </label>
        ) : (
          <label style={{fontWeight: 'bold', marginBottom: '4px'}}>Reason for Absence
            <input
              type="text"
              name="absentReason"
              placeholder="Reason for absence"
              value={formData.absentReason}
              onChange={handleChange}
              required
              style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px'}}
            />
          </label>
        )}
        <button type="submit" style={{background: 'linear-gradient(90deg, #a770ef 0%, #f6d365 100%)', color: '#23243a', fontWeight: 'bold', borderRadius: '10px', padding: '10px 0', border: 'none', fontSize: '1.1em', marginTop: '8px'}}>Add Student</button>
      </form>
  );
};

export default AddStudentForm;