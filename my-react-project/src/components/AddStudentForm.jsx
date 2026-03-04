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
    <form className="add-student-form" onSubmit={handleSubmit}>
      <div className="form-title">Add New Student</div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Course</label>
        <input
          type="text"
          name="course"
          placeholder="Enter course name"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          name="isPresent"
          checked={formData.isPresent}
          onChange={handleChange}
        />
        <span>Mark as Present</span>
      </label>

      {formData.isPresent ? (
        <div className="form-group">
          <label>Grade</label>
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
          />
        </div>
      ) : (
        <div className="form-group">
          <label>Reason for Absence</label>
          <input
            type="text"
            name="absentReason"
            placeholder="Why is this student absent?"
            value={formData.absentReason}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <button type="submit" className="form-submit-btn">
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;