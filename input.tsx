import { InputHTMLAttributes } from "react";

interface IInputProps {
  errors?: string[];
  name: string;
}

export default function FormInput({
  errors = [],
  name,
  ...rest
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="w-96 rounded-xl py-2 px-5 focus:outline-none focus:ring-2 focus:ring-neutral-500 placeholder:text-neutral-400 border border-gray-400  focus:ring-offset-2"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
