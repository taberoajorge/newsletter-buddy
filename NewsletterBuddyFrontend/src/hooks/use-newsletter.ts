import { useReducer, useRef, useState } from 'preact/hooks';
import { sendNewsletter, addSubscriber } from '../services/recipient-service';
import { toast } from 'react-toastify';

const initialState = {
  file: null,
  subject: '',
  htmlBody: '',
  scheduleDate: '',
  name: '',
  email: []
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'updateField':
      return action.field ? { ...state, [action.field]: action.value } : state;
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export function useNewsletterBuddy() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [content, setContent] = useState('sendNewsletter');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const incrementEmailsSent = () => {
    const currentCount = parseInt(localStorage.getItem('emailsSent') || '0');
    localStorage.setItem('emailsSent', (currentCount + 1).toString());
  };

  const handleChange = (event: Event, field: string) => {
    const target = event.target;

    dispatch({ type: 'updateField', field, value: target.value });
  };
  const handleFileChange = (event: Event) => {
    const { files } = event.target as HTMLInputElement;
    const file = files && files.length > 0 ? files[0] : null;
    const fileTypes = ['application/pdf', 'image/png'];
    if (file && !fileTypes.includes(file.type)) {
      dispatch({ type: 'updateField', field: 'file', value: null });
      toast.error('Invalid file type. Please upload a PDF or PNG file.');
      return;
    }
    dispatch({ type: 'updateField', field: 'file', value: file });
  };

  const handleSubmitNewsletter = async () => {
    const { subject, htmlBody, file, scheduleDate } = state;

    if (!subject || !htmlBody) {
      toast.error("Please complete all fields");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("attachments", file);
    if (scheduleDate) formData.append("scheduleDate", scheduleDate);
    formData.append("subject", subject);
    formData.append("html", htmlBody);

    try {
      sendNewsletter(formData);
      incrementEmailsSent();
      toast.success("Newsletter sent successfully");
      if (fileInputRef.current) (fileInputRef.current as HTMLInputElement).value = "";
      dispatch({ type: "reset" });
    } catch (error) {
      console.error("Error sending the newsletter:", error);
      toast.error("An error occurred when sending the newsletter.");
    }
  };

  const handleAddSubscriber = async () => {
    const { name, email } = state;
    const SINGLE_TYPE = "single";
    const MULTIPLE_TYPE = "multiple";
    let subscriberType = SINGLE_TYPE;
  
    const resetForm = () => {
      dispatch({ type: "updateField", field: "name", value: "" });
      dispatch({ type: "updateField", field: "email", value: "" });
      setLoading(false);
    };
  
    try {
      if (!name || !email) {
        toast.error("Please fill out all fields");
        console.error("Please fill out all fields");
        return;
      }
  
      let emails = [email];
      if (email.includes(",")) {
        subscriberType = MULTIPLE_TYPE;
        emails = email.split(",");
      }
  
      await addSubscriber(name, emails, subscriberType);
      toast.success(subscriberType === MULTIPLE_TYPE ? "Subscribers added successfully!" : "Subscriber added successfully!");
    } catch (error) {
      console.error("Error adding the subscriber:", error);
      toast.error("An error occurred when adding the subscriber.");
    } finally {
      resetForm();
    }
  };
  
  const handleFormSubmit = async () => {
    setLoading(true);

    if (content === 'sendNewsletter') {
      await handleSubmitNewsletter();
    } else if (content === 'addSubscriber') {
      await handleAddSubscriber();
    }

    setLoading(false);
  };

  const stateValidation = (state) => {
    const { subject, htmlBody } = state;
    if (!subject || !htmlBody) {
      return false;
    }
    return true;
  }

  return {
    state,
    dispatch,
    content,
    setContent,
    loading,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleFormSubmit,
    stateValidation
  };
}
