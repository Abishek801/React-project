import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  border: 10px solid #ccc;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin: 15px 0 5px;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background-color: #ff4d4d;
  color: white;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6666;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${(props) => (props.success ? 'green' : 'red')};
  font-weight: bold;
`;

const BloodDonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    gender: '',
    lastDonationDate: '',
  });

  const [isEligible, setIsEligible] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const lastDonationDate = new Date(formData.lastDonationDate);
    const diffTime = Math.abs(today - lastDonationDate);
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

    if (diffMonths <= 6) {
      setIsEligible(false);
      setMessage('You are not eligible to donate blood yet.');
    } else {
      setIsEligible(true);
      setMessage('Thank you! Your application has been accepted.');

      // Log the data being submitted
      console.log('Submitting form data:', formData);

      // Send the form data to the JSON server
      try {
        const response = await axios.post('http://localhost:3000/applications', formData);
        console.log('Form data successfully posted to server:', response.data);
        setMessage('Application submitted successfully!');
      } catch (error) {
        console.error('Error posting form data:', error.response ? error.response.data : error.message);
        setMessage('Error submitting form. Please try again later.');
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Label>Age:</Label>
        <Input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <Label>Blood Group:</Label>
        <Select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </Select>
        <Label>Gender:</Label>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
        <Label>Last Date of Donation:</Label>
        <Input
          type="date"
          name="lastDonationDate"
          value={formData.lastDonationDate}
          onChange={handleChange}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
      {message && <Message success={isEligible}>{message}</Message>}
    </FormContainer>
  );
};

export default BloodDonationForm;
