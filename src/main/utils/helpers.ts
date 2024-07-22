export const removeIllegalCharactersFromFilename = (filename: string) => {
  return filename.replace(/[/\\?%*:|"<>]/g, "-");
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const throttle = (fn: Function, ms = 300) => {
  var wait = false;
  return function (this: any, ...args: any[]) {
    if (!wait) {
      fn.apply(this, args);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, ms);
    }
  };
};
