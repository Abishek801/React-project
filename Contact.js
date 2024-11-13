import React, { useState } from 'react';
import styled from 'styled-components';

const MainContent = styled.div`
  flex: 1;
  padding: 40px 20px;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  text-align: center;
  color: #ff4d4d;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ success: false, message: 'Please fill in all fields.' });
      return;
    }

    // Simulate a successful submission
    setSubmitStatus({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
    
    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <MainContent>
      <Title>Contact Us</Title>
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
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Label>Message:</Label>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
          <Button type="submit">Send Message</Button>
        </form>
        {submitStatus && (
          <Message success={submitStatus.success}>
            {submitStatus.message}
          </Message>
        )}
      </FormContainer>
    </MainContent>
  );
};

export default Contact;