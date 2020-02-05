export const isAppInSignerMode = () => {
  return process.env.REACT_APP_SIGNER_MODE === "true";
};
