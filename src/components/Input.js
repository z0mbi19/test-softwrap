import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";

import { useField } from "@unform/core";

// eslint-disable-next-line react/prop-types
export default function Mask({ name, inputMask }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [mask, setMask] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.value",
      clearValue: (pickerRef) => {
        pickerRef.setInputValue(null);
      },
    });
  }, [ref.current, fieldName]);

  function handleMask(e) {
    const { value } = e.target;
    return setMask(value);
  }

  return (
    <>
      <InputMask
        className="form-control"
        required
        name={fieldName}
        mask={inputMask}
        value={mask}
        onChange={(e) => handleMask(e)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
