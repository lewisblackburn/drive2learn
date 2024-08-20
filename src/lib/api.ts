// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendContactForm = async (data: {
  subject: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending contact form:', error);
  }
};
