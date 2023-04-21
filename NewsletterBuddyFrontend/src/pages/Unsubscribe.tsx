import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import axios from "axios";

const Unsubscribe = (props: { userId: string }) => {
  const { userId } = props;
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function unsubscribe() {
      try {
        const response = await axios.get(
          `http://localhost:3000/unsubscribe/${userId}`
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage("An error occurred while processing your request.");
      }
    }

    unsubscribe();
  }, [userId]);

  return (
    <div>
      <h1>Unsubscribe</h1>
      <p>{message}</p>
    </div>
  );
};

export default Unsubscribe;
