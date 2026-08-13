import { InputText } from "primereact/inputtext";

type TextFieldProps = {
  register: any;
  placeholder?: string;
  fieldName: string;
};

const TextField = ({ register, fieldName, placeholder }: TextFieldProps) => {
  return (
    <InputText
      placeholder={placeholder}
      className="p-inputtext-sm"
      {...register(fieldName)}
    />
  );
};

export default TextField;
