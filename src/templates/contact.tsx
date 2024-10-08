import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

// import { siteConfig } from '@/constant/config';

// const baseUrl = siteConfig.url ?? '';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  phone,
  message,
}) => (
  <Html>
    <Head />
    <Preview>You have a new enquiry!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          {/* <Img
            src={`${baseUrl}/images/logo.svg`}
            width='100'
            height='100'
            alt='Drive 2 Learn'
          />
          <Hr style={hr} /> */}
          <Text style={paragraph}>You have received a new enquiry:</Text>
          <Text style={paragraph}>
            <strong>Name:</strong> {name}
            <br />
            <strong>Email:</strong> {email}
            <br />
            <strong>Phone:</strong> {phone}
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>Here's the message they sent:</Text>
          <Text style={paragraph}>{message}</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Drive 2 Learn, The Business Village, Innovation Way, Barnsley, South
            Yorkshire. S75 1JL.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
