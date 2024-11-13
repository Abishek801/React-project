import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Animation for the form container
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  background: url('https://wallpapercave.com/wp/wp4323463.jpg') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff4d4d;
`;

const Label = styled.label`
  margin-top: 15px;
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: #ff4d4d;
    outline: none;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 10px;
  top: 35%;
  background: none;
  border: none;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6666;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ToggleLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #ff4d4d;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${(props) => (props.success ? 'green' : 'red')};
  font-weight: bold;
`;

const PasswordStrengthIndicator = styled.div`
  height: 5px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: ${(props) => props.color || 'gray'};
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 77, 77, 0.3);
  border-top: 4px solid #ff4d4d;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoginPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const { strength, color } = checkPasswordStrength(value);
      setPasswordStrength({ strength, color });
    }
  };

  const checkPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*]/.test(password);
    
    const criteriaMet = [lengthCriteria, upperCaseCriteria, numberCriteria, specialCharCriteria].filter(Boolean).length;

    switch (criteriaMet) {
      case 4: return { strength: 'Strong', color: 'green' };
      case 3: return { strength: 'Moderate', color: 'orange' };
      case 2:
      case 1: return { strength: 'Weak', color: 'red' };
      default: return { strength: '', color: 'gray' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await axios.get(`http://localhost:3000/users?email=${formData.email}&password=${formData.password}`);
        if (response.data.length > 0) {
          onLoginSuccess();
          setMessage('Login successful!');
          navigate('/');
        } else {
          setMessage('Invalid email or password. Please try again.');
        }
      } else {
        const userResponse = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
        if (userResponse.data.length > 0) {
          setMessage('Email already exists. Please use a different email.');
          return;
        }

        await axios.post(`http://localhost:3000/users`, formData);
        setMessage('Signup successful! You can now log in.');
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage('Error signing up. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </>
          )}
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Label htmlFor="password">Password:</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <EyeButton type="button" onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </EyeButton>
          </PasswordContainer>
          {passwordStrength && (
            <>
              <PasswordStrengthIndicator color={passwordStrength.color} />
              <Message>{passwordStrength.strength}</Message>
            </>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : (isLogin ? 'Login' : 'Sign Up')}
          </Button>
        </form>
        {message && <Message success={message.includes('successful')}>{message}</Message>}
        <ToggleLink onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </ToggleLink>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
