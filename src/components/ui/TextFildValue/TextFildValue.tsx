import { ErrorMessage, Field } from "formik";
import "./textFildValue.css";

interface props {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
}

const TextFieldValue = ({ name, type, placeholder, disabled }: props) => {
  return (
    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
      <Field
        className="input-formulario"
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete="off"
        disabled={disabled}
      />
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
};

export default TextFieldValue;
