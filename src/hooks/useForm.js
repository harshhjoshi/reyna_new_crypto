import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const useForm = (options) => {
  const [data, setData] = useState(options?.initialValues || {});
  // const [place,setPlace] = useState(placeholder);
  const { placeholder } = useGlobalContext()
  const [errors, setErrors] = useState({});
  const [click,setClick] = useState(false);
  const navigate = useNavigate();
  const handleChange = (
    key,
    number,
    sanitizeFn,
  ) => (e) => {
    const value = sanitizeFn ? sanitizeFn(e.target.type === 'file' ? e.target.files[0] : e.target.type === 'checkbox' ? e.target.checked : e.target.value.trimLeft()) : e.target.type === 'file' ? e.target.files[0] : e.target.type === 'checkbox' ? e.target.checked : e.target.value.trimLeft();
    const finalValue = number ? value.replace(/\D/g, '') : value
    setData({
      ...data,
      [key]: finalValue,
    });
  };

  const handleFocus = (e) => {
    return e.target.placeholder = ''
  }

  const handleBlur = (e, key) => {
    return e.target.placeholder = placeholder[key]
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setClick(!click)
    if (options.setIsSubmit) {
      options?.setIsSubmit(true);
    }
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        const pattern = validation?.pattern;
        const custom = validation?.custom;
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }
        else if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        } else if (custom?.isValid && !custom.isValid(value)) {
          console.log('coming in isvalid block')
          valid = false;
          newErrors[key] = custom.message;
        }
      }
      if (!valid) {
        setErrors(newErrors);
        const ref = options?.ref
        if (ref) {
          for (const key in newErrors) {
            let value = ref[key];
            value && value.current && value.current.focus()
          }
        }
        // options?.ref.current.focus();
        return;
      }
      else {
        options.navigate && navigate(options.navigate, { state: options?.state })
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };
  return {
    data,
    setData,
    errors,
    handleChange,
    handleFocus,
    handleSubmit,
    handleBlur,
    setErrors,
    click,
    setClick
  };
}

export default useForm