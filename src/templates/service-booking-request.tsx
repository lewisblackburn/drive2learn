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

interface ServiceBookingRequestEmailProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const ServiceBookingRequestEmail: React.FC<
  Readonly<ServiceBookingRequestEmailProps>
> = ({ name, phone, email, message }) => (
  <Html>
    <Head />
    <Preview>New Service Booking Request!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={paragraph}>
            You have received a new service booking request:
          </Text>
          <Text style={paragraph}>
            <strong>Name:</strong> {name}
            <br />
            <strong>Phone:</strong> {phone}
            <br />
            <strong>Email:</strong> {email}
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            <strong>Booking Details:</strong>
          </Text>
          <Text style={paragraph}>
            <strong>Service:</strong>{' '}
            {message.split('\n')[2].replace('Service: ', '')}
            <br />
            <strong>Price:</strong>{' '}
            {message.split('\n')[3].replace('Price: ', '')}
          </Text>
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

export default ServiceBookingRequestEmail;

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
