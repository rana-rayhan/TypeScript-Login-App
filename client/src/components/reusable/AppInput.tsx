import React from "react";
import style from "../../styles/Username.module.css";

type InputPrp = {
  name: string;
  // onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
};

const AppInput = (props: InputPrp) => {
  const { type, name, placeholder, value, onChange } = props;
  return (
    <input
      required
      className={style.textbox}
      name={name}
      // onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default AppInput;
