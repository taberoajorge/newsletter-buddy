import CustomInput from "components/CustomInput";
import { RefObject, h } from "preact";

interface GeneralFormProps {
  title: string;
  fields: {
    id: string;
    label: string;
    type: string;
    value: string | File | null | undefined;
    accept?: string;
    inputRef?: RefObject<HTMLInputElement>;
  }[];
  handleChange: (e: Event, field: string) => void;
  handleFileChange?: (e: Event) => void;
  loading?: boolean;
}

const style = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    marginBottom: "1rem",
  },
};

const GeneralForm = ({
  title,
  fields,
  handleChange,
  handleFileChange = () => {},
  loading = false,
}: GeneralFormProps) => {
  return (
    <form style={style.form}>
      <h1 style={style.title}>{title}</h1>
      {fields.map(({ id, label, type, value, accept, inputRef }) => (
        <CustomInput
          id={id}
          label={label}
          type={type}
          value={type === "file" ? undefined : (value as string)}
          accept={accept}
          onChange={
            type === "file" ? handleFileChange : (e) => handleChange(e, id)
          }
          inputRef={inputRef}
          disabled={loading}
        />
      ))}
    </form>
  );
};

export default GeneralForm;
