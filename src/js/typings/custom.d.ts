declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
