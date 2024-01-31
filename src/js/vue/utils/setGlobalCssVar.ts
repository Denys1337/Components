const setGlobalCssVar = (varName: string, value: string) => {
  document.documentElement.style.setProperty(varName, value);
};
export default setGlobalCssVar;
