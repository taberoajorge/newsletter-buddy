import { Ref, RefObject } from "preact";

export interface AddSubscriberFormProps {
  formState: {
    state: {
      name: string;
      email: string;
    };
    content: string;
    handleChange: (e: Event, field: string) => void;
    handleAddSubscriber: () => void;
    handleAddMultipleSubscribers: () => void;
    loading: boolean;
    dispatch: (action: Action) => void;
  };
}

export interface NavItemProps {
  imgSrc: string;
  alt: string;
  label: string;
  onClick: () => void;
}

export interface SendNewsletterFormProps {
  formState: {
    state: {
      file: File | null;
      subject: string;
      htmlBody: string;
      scheduleDate: string;
    };
    handleChange: (e: Event, field: string) => void;
    handleFileChange: (e: Event) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    loading: boolean;
  };
}
export interface SubmitButtonProps {
  handleSubmit: () => void;
  disabled: boolean;
}
export interface ContentHandlerProps {
  content: string;
  formState: {
    state: {
      file: File | null;
      subject: string;
      htmlBody: string;
      scheduleDate: string;
      name: string;
      email: string;
    };
    handleChange: (e: Event, field: string) => void;
    handleFileChange: (e: Event) => void;
    handleAddSubscriber: () => void;
    handleAddMultipleSubscribers: () => void;
    fileInputRef: RefObject<HTMLInputElement>;
    loading: boolean;
  };
}
export interface GeneralFormProps {
  title: string;
  fields: {
    id: string;
    label: string;
    type: string;
    value: string | File | null | undefined;
    accept?: string;
    inputRef?: Ref<HTMLInputElement>;
  }[];
  handleChange: (e: Event, field: string) => void;
  handleFileChange?: (e: Event) => void;
  handleSubmit?: (e: Event) => void;
  loading?: boolean;
}

export interface State {
  file: File | null;
  subject: string;
  htmlBody: string;
  scheduleDate: string;
  name: string;
  email: string;
}

export interface Action {
  type: "updateField" | "reset";
  field?: string;
  value?: string | File | null;
}