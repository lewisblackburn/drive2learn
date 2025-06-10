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

interface CourseBookingConfirmationEmailProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const CourseBookingConfirmationEmail: React.FC<
  Readonly<CourseBookingConfirmationEmailProps>
> = ({ name, message }) => (
  <Html>
    <Head />
    <Preview>Your Course Booking Request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Thank you for your course booking request. We have received your
            details and will contact you shortly to confirm your booking.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            <strong>Your Booking Details:</strong>
          </Text>
          <Text style={paragraph}>
            <strong>Course:</strong>{' '}
            {message.split('\n')[2].replace('Course: ', '')}
            <br />
            <strong>Hours:</strong>{' '}
            {message.split('\n')[3].replace('Hours: ', '')}
          </Text>
          <Text style={paragraph}>
            <strong>Your Preferences:</strong>
            <br />
            {message.split('\n')[7].replace('- ', '• ')}
            <br />
            {message.split('\n')[8].replace('- ', '• ')}
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            If you have any questions, please don't hesitate to contact us.
          </Text>
          <Text style={footer}>
            Drive 2 Learn, The Business Village, Innovation Way, Barnsley, South
            Yorkshire. S75 1JL.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default CourseBookingConfirmationEmail;

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
