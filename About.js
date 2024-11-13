import React from 'react';
import styled from 'styled-components';
import { FaHeartbeat, FaUsers, FaHandsHelping } from 'react-icons/fa';

// Styled Components for layout and design
const AboutContainer = styled.div`
  padding: 60px 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h1`
  font-size: 2.5em;
  color: #ff4d4d;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #555;
  line-height: 1.8;
  max-width: 800px;
  text-align: center;
  margin-bottom: 40px;
`;

const Highlights = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  width: 100%;
  max-width: 900px;
  text-align: center;
`;

const Highlight = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const HighlightIcon = styled.div`
  font-size: 3em;
  color: #ff4d4d;
  margin-bottom: 15px;
`;

const HighlightText = styled.p`
  font-size: 1.1em;
  color: #555;
`;

const CallToAction = styled.div`
  background-color: #ff4d4d;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
`;

const CTAButton = styled.a`
  background-color: white;
  color: #ff4d4d;
  padding: 10px 20px;
  font-size: 1.2em;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffe6e6;
  }
`;

const Statistics = styled.div`
  margin-top: 40px;
  text-align: center;
  max-width: 800px;
`;

const Stat = styled.div`
  margin-bottom: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
`;

const StatText = styled.p`
  font-size: 1.1em;
  color: #555;
`;

// About Component
const About = () => {
  return (
    <AboutContainer>
      <SectionTitle>About Us</SectionTitle>
      <Description>
        Our mission is to ensure a steady supply of blood for those in need. We are committed to saving lives by promoting and facilitating blood donations, connecting donors to recipients, and organizing regular blood donation drives.
      </Description>

      {/* Highlight Section */}
      <Highlights>
        <Highlight>
          <HighlightIcon>
            <FaHeartbeat />
          </HighlightIcon>
          <HighlightText>Saving Lives</HighlightText>
        </Highlight>

        <Highlight>
          <HighlightIcon>
            <FaUsers />
          </HighlightIcon>
          <HighlightText>Building a Community of Donors</HighlightText>
        </Highlight>

        <Highlight>
          <HighlightIcon>
            <FaHandsHelping />
          </HighlightIcon>
          <HighlightText>Volunteering and Advocacy</HighlightText>
        </Highlight>
      </Highlights>

      {/* Call to Action Section */}
      <CallToAction>
        <h2>Join Us in Saving Lives</h2>
        <p>Every drop of blood counts. Become a blood donor or volunteer today!</p>
        <CTAButton href="/application">Start Donating</CTAButton>
      </CallToAction>

      {/* Statistics Section */}
      <Statistics>
        <Stat>10,000+ Lives Saved</Stat>
        <StatText>Through our dedicated donors and volunteers, we have saved thousands of lives.</StatText>

        <Stat>200+ Blood Drives Organized</Stat>
        <StatText>We organize regular blood drives across the country to ensure a continuous supply of blood.</StatText>

        <Stat>1,000+ Active Donors</Stat>
        <StatText>Join our growing community of committed blood donors and make a difference.</StatText>
      </Statistics>
    </AboutContainer>
  );
};

export default About;
