import React from "react";

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return { showPassword, handleClickShowPassword };
};

export default usePasswordToggle;
