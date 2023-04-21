import { RefObject, h } from "preact";

interface CustomInputProps {
  id: string;
  label: string;
  type: string;
  value: string | undefined;
  accept?: string;
  onChange: (e: Event) => void;
  inputRef?: RefObject<HTMLInputElement>;
  disabled?: boolean;
}

const style = {
  input: {
    border: "1px solid #D6D9E6",
    borderRadius: "8px",
    width: "90%",
    height: "40px",
  },
  fileInput: {
    display: "inline-block",
  },
  disabledInput: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

const CustomInput = ({
  id,
  label,
  type,
  value,
  accept,
  onChange,
  inputRef,
  disabled,
}: CustomInputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          style={{
            ...style.input,
            ...(disabled ? style.disabledInput : {}),
          }}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          style={
            type === "file"
              ? style.fileInput
              : {
                  ...style.input,
                  ...(disabled ? style.disabledInput : {}),
                }
          }
          type={type}
          value={value}
          accept={accept}
          onChange={onChange}
          ref={inputRef}
        />
      )}
    </div>
  );
};

export default CustomInput;
