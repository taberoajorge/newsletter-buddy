import { useEffect, useState } from "preact/hooks";
import styled from "styled-components";
import emailsSentIcon from "../assets/email-svgrepo-com.svg";
import suscribersIcon from "../assets/user-svgrepo-com.svg";
import { getRecipients, getSentEmails } from "../services/recipient-service";

const StyledAnalyticsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledCard = styled.div`
  background-color: #fff;
  box-shadow: 2px 2px #f3f3f3;
  border: 1px solid #e6e6e6;
  border-radius: 0.6rem;
  padding: 2.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 3rem;
    }

    p {
      font-size: 3rem;
      color: #4a4a4a;
    }
  }
`;

const fetchData = async (fetchFunction, setState) => {
  const result = await fetchFunction();
  setState(result);
};

const Analytics = () => {
  const [recipients, setRecipients] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    fetchData(getRecipients, setRecipients);
    fetchData(getSentEmails, setSentEmails);
  }, []);

  return (
    <>
      <h1>Analytics</h1>

      <StyledAnalyticsContainer>
        <StyledCard>
          <div>
            <img src={suscribersIcon} alt="Suscribers" />
            <p>{recipients.length}</p>
          </div>
          <h3>Suscribers</h3>
        </StyledCard>

        <StyledCard>
          <div>
            <img src={emailsSentIcon} alt="Emails Sent" />
            <p>{sentEmails.length}</p>
          </div>
          <h3>Emails Sent</h3>
        </StyledCard>
      </StyledAnalyticsContainer>
    </>
  );
};

export default Analytics;
