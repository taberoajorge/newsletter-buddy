import { RefObject, h } from "preact";
import SendNewsletterForm from "../components/SendNewsletterForm";
import AddSubscriberForm from "../components/AddSubscriberForm";
import Analytics from "../components/Analytics";

interface ContentHandlerProps {
  content: string;
  formState: {
    state: {
      file: File | null;
      subject: string;
      htmlBody: string;
      scheduleDate: string;
      name: string;
      singleEmail: string;
    };
    handleChange: (e: Event, field: string) => void;
    handleFileChange: (e: Event) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    loading: boolean;
  };
}

const ContentHandler = ({ content, formState }: ContentHandlerProps) => {
  switch (content) {
    case "sendNewsletter":
      return <SendNewsletterForm formState={formState} />;

    case "addSubscriber":
      return <AddSubscriberForm formState={formState} />;

    case "analytics":
      return <Analytics />;

    default:
      return null;
  }
};

export default ContentHandler;
