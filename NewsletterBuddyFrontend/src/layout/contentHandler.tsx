import SendNewsletterForm from "../components/SendNewsletterForm";
import AddSubscriberForm from "../components/AddSubscriberForm";
import Analytics from "../components/Analytics";
import { ContentHandlerProps } from "interfaces/interfaces";

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
