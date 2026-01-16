import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { unsubscribeUser } from "../services/recipient-service";

const Unsubscribe = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performUnsubscribe = async () => {
      setIsLoading(true);
      try {
        const response = await unsubscribeUser(userId);
        setMessage(response.message);
      } catch (error) {
        console.error("Error unsubscribing:", error);
        setMessage("An error occurred while processing your request.");
      } finally {
        setIsLoading(false);
      }
    };

    performUnsubscribe();
  }, [userId]);

  return (
    <div>
      <h1>Unsubscribe</h1>
      {isLoading ? <p>Processing your request...</p> : <p>{message}</p>}
    </div>
  );
};

export default Unsubscribe;
