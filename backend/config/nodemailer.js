const transporter = {
    sendMail: async (mailOptions) => {
        console.log('Mock email sent:', mailOptions);
        return { messageId: 'mock-id' };
    }
};

export default transporter;

