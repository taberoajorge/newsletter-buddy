import { useEffect, useState } from "preact/hooks";
import { getRecipients } from "../services/recipientService";
import styled from "styled-components";

const StyledAnalyticsContainer = styled.div`
  display: grid;
  grid-template-areas: "count email";
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem;
  padding: 1rem;
`;

const StyledCard = styled.div`
  border-radius: 0.5rem;
  background-color: var(--main-color);
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
`;

const Analytics = () => {
  const [recipients, setRecipients] = useState([]);
  const currentCount = parseInt(localStorage.getItem("emailsSent") || "0");

  useEffect(() => {
    getRecipients().then((res) => {
      setRecipients(res);
    });
  }, []);

  return (
    <>
      <h2>Analytics</h2>

      <StyledAnalyticsContainer>
        <StyledCard>
          <h3>Recipients</h3>
          <p>{recipients.length}</p>
        </StyledCard>

        <StyledCard>
          <h3>Emails sents</h3>
          <p>{currentCount}</p>
        </StyledCard>
      </StyledAnalyticsContainer>
    </>
  );
};

export default Analytics;
