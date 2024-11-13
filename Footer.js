import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #333;
  padding: 20px;
  color: white;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const SocialIcons = styled.div`
  margin: 10px 0;
`;

const IconLink = styled.a`
  color: white;
  margin: 0 10px;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4d4d;
  }
`;

const QuickLinks = styled.div`
  margin: 10px 0;
`;

const QuickLink = styled.a`
  color: #ffcccc;
  margin: 0 10px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4d4d;
  }
`;

const ContactInfo = styled.div`
  margin-top: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Blood Donation Website. All rights reserved.</p>
      <SocialIcons>
        <IconLink href="https://facebook.com" aria-label="Facebook">
          <FaFacebook />
        </IconLink>
        <IconLink href="https://twitter.com" aria-label="Twitter">
          <FaTwitter />
        </IconLink>
        <IconLink href="https://instagram.com" aria-label="Instagram">
          <FaInstagram />
        </IconLink>
      </SocialIcons>
      <QuickLinks>
        <QuickLink href="/faq">FAQs</QuickLink>
        <QuickLink href="/terms">Terms of Service</QuickLink>
        <QuickLink href="/privacy">Privacy Policy</QuickLink>
      </QuickLinks>
      <ContactInfo>
        <p>
          <FaEnvelope /> Email: blooddonation@example.com
        </p>
        <p>
          <FaPhone /> Phone: (123) 456-7890
        </p>
      </ContactInfo>
    </FooterContainer>
  );
};

export default Footer;
