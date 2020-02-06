export const ENV_SIGNER_MODE = "REACT_APP_SIGNER_MODE";

export const isAppInSignerMode = () => {
  return process.env[ENV_SIGNER_MODE] === "true";
};
