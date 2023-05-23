import { useReducer, useRef, useState } from "preact/hooks";
import SubmitButton from "../components/SubmitButton";
import Container from "../layout/container";
import SideBar from "../layout/SideBar";
import ContentHandler from "../layout/contentHandler";
import { sendNewsletter, addSubscriber } from "../services/recipientService";
import NavItem from "components/NavItem";
import SendNewsletter from "../assets/icon-advanced.svg";
import AddNewUser from "../assets/icon-pro.svg";
import Dashboard from "../assets/icon-arcade.svg";
import { Action, State } from "interfaces/interfaces";

const NewsletterBuddy = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [content, setContent] = useState("sendNewsletter");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const incrementEmailsSent = () => {
    const currentCount = parseInt(localStorage.getItem("emailsSent") || "0");
    localStorage.setItem("emailsSent", (currentCount + 1).toString());
  };

  const handleChange = (event: Event, field: string) => {
    const target = event.target as HTMLInputElement;
    dispatch({ type: "updateField", field, value: target.value });
  };

  const handleSubmitNewsletter = async () => {
    if (!state.subject || !state.htmlBody) {
      alert("Please fil out all fields");
      return;
    }

    const formData = new FormData();

    if (state.file) {
      formData.append("attachments", state.file);
    }

    if (state.scheduleDate) {
      formData.append("scheduleDate", state.scheduleDate);
    }

    formData.append("subject", state.subject);
    formData.append("html", state.htmlBody);

    try {
      const result = await sendNewsletter(formData);

      if (result.status !== 200) {
        incrementEmailsSent();
      }

      alert("Newsletter submitted successfully!");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      dispatch({ type: "reset" });
    } catch (error) {
      console.error("Error submitting the newsletter:", error);
      alert("An error occurred while submitting the newsletter.");
    }
  };

  const handleFileChange = (event: Event) => {
    const { files } = event.target as HTMLInputElement;
    if (files && files.length > 0) {
      dispatch({ type: "updateField", field: "file", value: files[0] });
    } else {
      dispatch({ type: "updateField", field: "file", value: null });
    }
  };

  const handleAddSubscriber = async () => {
    const { name, singleEmail } = state;

    if (!name || !singleEmail) {
      alert("Please fill out all fields");
      return;
    }

    try {
      await addSubscriber(state.name, state.singleEmail);
      alert("Subscriber added successfully!");
      dispatch({ type: "updateField", field: "name", value: "" });
      dispatch({ type: "updateField", field: "singleEmail", value: "" });
    } catch (error) {
      console.error("Error adding the subscriber:", error);
      alert("An error occurred while adding the subscriber.");
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    if (content === "sendNewsletter") {
      await handleSubmitNewsletter();
    } else if (content === "addSubscriber") {
      await handleAddSubscriber();
    }

    setLoading(false);
  };

  return (
    <Container>
      <h1 style={{ fontSize: "4rem", textAlign: "center" }}>
        Newsletter Buddy
      </h1>

      <article style="width: 90%;max-width: 50rem;height: 100%;min-height: 45rem;">
        <ContentHandler
          content={content}
          formState={{
            state,
            handleChange,
            handleFileChange,
            fileInputRef,
            loading,
          }}
        />
      </article>
      {content !== "analytics" && (
        <SubmitButton handleSubmit={handleFormSubmit} disabled={loading} />
      )}

      <SideBar setContent={setContent}>
        <NavItem
          imgSrc={SendNewsletter}
          alt="Newsletter Buddy"
          label="Send Newsletter"
          onClick={() => setContent("sendNewsletter")}
        />
        <NavItem
          imgSrc={Dashboard}
          alt="Newsletter Buddy"
          label="Analytics"
          onClick={() => setContent("analytics")}
        />
        <NavItem
          imgSrc={AddNewUser}
          alt="Newsletter Buddy"
          label="Add New User"
          onClick={() => setContent("addSubscriber")}
        />
      </SideBar>
    </Container>
  );
};

const initialState: State = {
  file: null,
  subject: "",
  htmlBody: "",
  scheduleDate: "",
  name: "",
  singleEmail: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateField":
      return action.field ? { ...state, [action.field]: action.value } : state;
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default NewsletterBuddy;
