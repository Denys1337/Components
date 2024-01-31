const getTranslators = (prefix: string) => {
  prefix = prefix ? `${prefix}.` : '';
  return {
    t: (msg: string) => `${prefix}${msg}`,
    tc: (msg: string, count: number) => (count ? `${prefix}${msg} - ${count}` : `${prefix}${msg}`),
  };
};

export default getTranslators;
