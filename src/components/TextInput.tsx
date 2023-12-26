import classNames from "classnames";
import { v4 as uuid } from "uuid";

type TextInputProps = {
  className?: string;
  id?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
};
export default function TextInput({
  className,
  id,
  inputClassName,
  label,
  labelClassName,
  onChange,
  placeholder,
  value,
}: TextInputProps) {
  const inputId = id ?? uuid();

  return (
    <div className={classNames(className)}>
      <label
        htmlFor={inputId}
        className={classNames(labelClassName, "font-bold text-sm")}
      >
        {label}
      </label>
      <input
        className={classNames(
          inputClassName,
          "border rounded p-2 font-mono text-lg"
        )}
        onChange={onChange}
        value={value}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
