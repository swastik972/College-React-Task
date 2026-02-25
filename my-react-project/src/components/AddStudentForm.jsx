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
    <form className="add-student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />
      <label style={{marginRight: '8px', marginLeft: '8px'}}>
        <input
          type="checkbox"
          name="isPresent"
          checked={formData.isPresent}
          onChange={handleChange}
        /> Present
      </label>
      {formData.isPresent ? (
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
      ) : (
        <input
          type="text"
          name="absentReason"
          placeholder="Reason for absence"
          value={formData.absentReason}
          onChange={handleChange}
          required
        />
      )}
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;