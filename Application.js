import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const FormContainer = styled.div`

  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #ff4d4d;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin: 15px 0 5px;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff4d4d;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff4d4d;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 1.1em;
  text-align: center;
  margin-top: 20px;
`;

// Tooltip for helper text
const Tooltip = styled.span`
  font-size: 0.8em;
  color: #777;
  margin-left: 5px;
`;

// Main Component
const BloodDonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    gender: '',
    lastDonationDate: '',
  });

  const [isEligible, setIsEligible] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = 'Name is required';
    if (!formData.age || formData.age <= 0) errors.age = 'Valid age is required';
    if (!formData.bloodGroup) errors.bloodGroup = 'Blood group is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.lastDonationDate) errors.lastDonationDate = 'Last donation date is required';

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        const today = new Date();
        const lastDonationDate = new Date(formData.lastDonationDate);
        const diffTime = Math.abs(today - lastDonationDate);
        const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

        setIsEligible(diffMonths > 6);
        setIsLoading(false);
      }, 1000); // Simulate form submission delay
    }
  };

  return (
    <FormContainer>
      <Title>Blood Donation Application</Title>
      <form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <Label>Age:</Label>
        <Input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
        />
        {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}

        <Label>Blood Group:</Label>
        <Select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
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
        {errors.bloodGroup && <ErrorMessage>{errors.bloodGroup}</ErrorMessage>}

        <Label>Gender:</Label>
        <Select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
        {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}

        <Label>
          Last Date of Donation:
          <Tooltip>(Minimum 6 months required)</Tooltip>
        </Label>
        <Input
          type="date"
          name="lastDonationDate"
          value={formData.lastDonationDate}
          onChange={handleChange}
          error={errors.lastDonationDate}
        />
        {errors.lastDonationDate && (
          <ErrorMessage>{errors.lastDonationDate}</ErrorMessage>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

      {isEligible === false && (
        <ErrorMessage>You are not eligible to donate blood yet.</ErrorMessage>
      )}
      {isEligible === true && (
        <SuccessMessage>Thank you! Your application has been accepted.</SuccessMessage>
      )}
    </FormContainer>
  );
};

export default BloodDonationForm;
