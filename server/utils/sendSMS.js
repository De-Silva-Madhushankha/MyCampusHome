import twilio from 'twilio'; // Assuming Twilio (can be replaced with Bolt)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSms = async (phoneNumber, message) => {
  try {
    // Ensure the phone number is in the correct format (+[country_code][phone_number])
    if (!phoneNumber || !message) {
      throw new Error("Phone number and message are required.");
    }
    console.log(phoneNumber);

    // Send the SMS via Twilio
    const smsResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber, // The recipient phone number
    });

    console.log(`OTP sent successfully to ${phoneNumber}. Message SID: ${smsResponse.sid}`);
    return smsResponse;
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error.message);
    throw new Error("Failed to send OTP via SMS.");
  }
};
