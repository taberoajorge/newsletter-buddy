import { h } from "preact";

interface SubmitButtonProps {
  handleSubmit: () => void;
  disabled: boolean;
}

const style = {
  button: {
    width: "123px",
    height: "48px",
    background: "#022959",
    borderRadius: "5px",
    border: "none",
    color: "white",
    fontSize: "16px",
  },
  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

const SubmitButton = ({ handleSubmit, disabled }: SubmitButtonProps) => {
  return (
    <button
      onClick={handleSubmit}
      style={{
        ...style.button,
        ...(disabled ? style.disabledButton : {}),
      }}
      disabled={disabled}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
