import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import styled from 'styled-components';

// Styled components
const FormContainer = styled.form`
  max-width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #0069d9;
  }

  &:active {
    background-color: #005cbf;
  }
`;

const Option = styled.option`
  padding: 0.5rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const TimetableWrapper = styled.div`
  width: 50%;
  max-width: 1000px;
  margin: 2rem 0;
  overflow-x: auto;
`;

const TimetableGrid = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  gap: 1px;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
  min-width: 800px;
`;

const DayHeader = styled.div`
  padding: 1rem;
  background: #007bff;
  color: white;
  text-align: center;
  font-weight: bold;
  position: sticky;
  top: 0;
`;

const TimeHeader = styled(DayHeader)`
  background: #0056b3;
`;

const TimeSlot = styled.div`
  padding: 0.5rem;
  background: white;
  min-height: 80px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SubjectCard = styled.div`
  background: #e3f2fd;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  word-break: break-word;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #343a40;
`;

function Timetable() {
  const [subjects, setSubjects] = useState([]);
  const [timetableData, setTimetableData] = useState([]);
  const [formData, setFormData] = useState({ subjectId: '', day: '', time: '' });

  useEffect(() => {
    api.get('/subjects')
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
    
    api.get('/timetable')
      .then(res => setTimetableData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSubject = subjects.find(subject => subject._id === formData.subjectId);

    if (!selectedSubject) {
      alert('Subject not found!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/timetable', {
        subject: selectedSubject.name,
        day: formData.day,
        time: formData.time
      });
      alert('Timetable saved successfully!');
      setFormData({ subjectId: '', day: '', time: '' });
      const updatedData = await api.get('/timetable');
      setTimetableData(updatedData.data);
    } catch (err) {
      console.error(err);
      alert('Error saving timetable');
    }
  };

  const groupedData = timetableData.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = {};
    if (!acc[item.day][item.time]) acc[item.day][item.time] = [];
    acc[item.day][item.time].push(item);
    return acc;
  }, {});

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        {/* Form content remains the same */}
        <FormGroup>
          <Label>Subject:</Label>
          <Select name="subjectId" value={formData.subjectId} onChange={handleChange} required>
            <Option value="">Select Subject</Option>
            {subjects.map(subject => (
              <Option key={subject._id} value={subject._id}>{subject.name}</Option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Day:</Label>
          <Select name="day" value={formData.day} onChange={handleChange} required>
            {days.map(day => (
              <Option key={day} value={day}>{day}</Option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Time:</Label>
          <Input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </FormGroup>

        <Button type="submit">Save Timetable</Button>
      </FormContainer>

      <TimetableWrapper>
        <Title>Weekly Timetable</Title>
        <TimetableGrid>
          <TimeHeader>Time</TimeHeader>
          {days.map(day => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}

          {times.map(time => (
            <React.Fragment key={time}>
              <TimeSlot style={{ background: '#f8f9fa', fontWeight: 'bold' }}>{time}</TimeSlot>
              {days.map(day => (
                <TimeSlot key={`${day}-${time}`}>
                  {groupedData[day]?.[time]?.map((item, index) => (
                    <SubjectCard key={index}>
                      {item.subject}
                    </SubjectCard>
                  ))}
                </TimeSlot>
              ))}
            </React.Fragment>
          ))}
        </TimetableGrid>
      </TimetableWrapper>
    </PageContainer>
  );
}

export default Timetable;