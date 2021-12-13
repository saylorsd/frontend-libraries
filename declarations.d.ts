// part of getting css modules to work
// https://github.com/formium/tsdx/issues/186#issuecomment-526548872
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
