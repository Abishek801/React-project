import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components for layout and styling
const HeroSection = styled.div`
  background: url('https://wallpapercave.com/wp/wp4323463.jpg') center/cover no-repeat;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-top: 60px;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5em;
  margin-bottom: 20px;
  line-height: 1.2;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2em;
  margin-bottom: 30px;
`;

const HeroButton = styled(Link)`
  background-color: #ff3333;
  padding: 15px 30px;
  color: white;
  font-size: 1.2em;
  text-decoration: none;
  border-radius: 50px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6666;
  }
`;

const MainContent = styled.div`
  
  padding: 40px 20px;
  background-color: #f8f8f8;
`;

const SectionTitle = styled.h2`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 30px;
  color: #ff4d4d;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const InfoCard = styled.div`
  background-color: white;
  padding: 20px;
  width: 300px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const InfoIcon = styled.div`
  font-size: 3em;
  color: #ff4d4d;
  margin-bottom: 15px;
`;

const InfoText = styled.p`
  font-size: 1.1em;
  color: #333;
`;

const TestimonialSection = styled.div`
  background-color: #ffebeb;
  padding: 40px 20px;
  text-align: center;
`;

const TestimonialCard = styled.div`
  display: inline-block;
  background-color: white;
  padding: 20px;
  margin: 20px;
  max-width: 500px;
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
`;

const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: #ff4d4d;
`;

const CTASection = styled.div`
  text-align: center;
  margin: 40px 0;
`;

const CTAButton = styled(Link)`
  background-color: #ff3333;
  padding: 15px 40px;
  color: white;
  font-size: 1.3em;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff6666;
  }
`;

// Home Component
const Home = () => (
  <>
    <HeroSection>
      <HeroContent>
        <HeroTitle>Donate Blood, Save Lives</HeroTitle>
        <HeroSubtitle>Every drop counts. Your blood donation can save up to three lives. Be a hero today!</HeroSubtitle>
        <HeroButton to="/application">Start Donating</HeroButton>
      </HeroContent>
    </HeroSection>

    <MainContent>
      <SectionTitle>Why Donate Blood?</SectionTitle>
      <InfoSection>
        <InfoCard>
          <InfoIcon>💉</InfoIcon>
          <InfoText>Every 2 seconds, someone in the U.S. needs blood.</InfoText>
        </InfoCard>
        <InfoCard>
          <InfoIcon>🩸</InfoIcon>
          <InfoText>One donation can save up to 3 lives.</InfoText>
        </InfoCard>
        <InfoCard>
          <InfoIcon>❤️</InfoIcon>
          <InfoText>Blood donations are critical for surgeries, cancer treatments, and trauma patients.</InfoText>
        </InfoCard>
      </InfoSection>

      <TestimonialSection>
        <SectionTitle>What Our Donors Say</SectionTitle>
        <TestimonialCard>
          <TestimonialText>
            "Donating blood was one of the most rewarding experiences of my life. Knowing that I helped save someone's life makes it all worth it."
          </TestimonialText>
          <TestimonialAuthor>- Sarah, Regular Donor</TestimonialAuthor>
        </TestimonialCard>
        <TestimonialCard>
          <TestimonialText>
            "After receiving a blood transfusion during my surgery, I realized how important it is to give back. Donating is the least I can do."
          </TestimonialText>
          <TestimonialAuthor>- John, Blood Recipient</TestimonialAuthor>
        </TestimonialCard>
      </TestimonialSection>

      <CTASection>
        <CTAButton to="/application">Join the Movement, Donate Blood Now</CTAButton>
      </CTASection>
    </MainContent>
  </>
);

export default Home;
