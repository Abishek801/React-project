import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for profile layout and design
const ProfileContainer = styled.div`
  padding: 40px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ProfileCard = styled.div`
  background-color: white;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8em;
  color: #ff4d4d;
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.p`
  font-weight: bold;
  color: #333;
`;

const Value = styled.p`
  color: #555;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6666;
  }
`;

const HistorySection = styled.div`
  background-color: #fff4f4;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const DonationRecord = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const NoHistory = styled.p`
  color: #999;
  font-style: italic;
`;

const EligibilityMessage = styled.p`
  text-align: center;
  color: ${(props) => (props.isEligible ? 'green' : 'red')};
  font-weight: bold;
  margin-top: 20px;
`;

// Mocked user data (for demonstration purposes)
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bloodGroup: 'A+',
  gender: 'Male',
  lastDonationDate: '2024-03-15',
  donationHistory: [
    { date: '2024-03-15', location: 'Red Cross Center' },
    { date: '2023-10-10', location: 'Hospital Donation Drive' },
  ],
};

const calculateEligibility = (lastDonationDate) => {
  const today = new Date();
  const lastDate = new Date(lastDonationDate);
  const diffTime = today - lastDate;
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);
  return diffMonths > 6;
};

// Profile Component
const Profile = () => {
  const [userData] = useState(mockUserData);
  const isEligible = calculateEligibility(userData.lastDonationDate);

  return (
    <ProfileContainer>
      <ProfileCard>
        <SectionTitle>Your Profile</SectionTitle>

        {/* Personal Information Section */}
        <InfoSection>
          <InfoItem>
            <Label>Name:</Label>
            <Value>{userData.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email:</Label>
            <Value>{userData.email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Blood Group:</Label>
            <Value>{userData.bloodGroup}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Gender:</Label>
            <Value>{userData.gender}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Last Donation:</Label>
            <Value>{userData.lastDonationDate}</Value>
          </InfoItem>
        </InfoSection>

        {/* Update Profile Button */}
        <Button>Update Profile</Button>

        {/* Donation History Section */}
        <HistorySection>
          <SectionTitle>Donation History</SectionTitle>
          {userData.donationHistory.length > 0 ? (
            userData.donationHistory.map((record, index) => (
              <DonationRecord key={index}>
                <span>{record.date}</span>
                <span>{record.location}</span>
              </DonationRecord>
            ))
          ) : (
            <NoHistory>No previous donations found.</NoHistory>
          )}
        </HistorySection>

        {/* Eligibility Message */}
        <EligibilityMessage isEligible={isEligible}>
          {isEligible
            ? 'You are eligible to donate blood!'
            : 'You are not eligible to donate blood yet. Please wait for 6 months since your last donation.'}
        </EligibilityMessage>

        {/* Call to Action */}
        {isEligible && (
          <Button as={Link} to="/application" style={{ marginTop: '20px' }}>
            Donate Blood Now
          </Button>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
