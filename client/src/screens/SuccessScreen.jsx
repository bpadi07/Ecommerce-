import { useEffect } from "react";
import axios from "axios";
const SuccessScreen = () => {
  useEffect(() => {
    const sendSuccessEmail = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/success-screen"
        );
        console.log(data.message);
      } catch (error) {
        console.error("Error sending success email", error);
      }
    };

    sendSuccessEmail();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase.</p>
      </div>
    </>
  );
};

export default SuccessScreen;
