export async function delay(time = 100) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};
// Disable this check because we don't know (or care about) the callback function shape
/* eslint-disable-next-line @typescript-eslint/ban-types */
export async function debounce(key: string, callback: Function, args: any[] = [], time = 200) {
  if (debounceTimers[key]) {
    clearTimeout(debounceTimers[key]);
  }
  debounceTimers[key] = setTimeout(() => {
    callback(...args);
  }, time);
}