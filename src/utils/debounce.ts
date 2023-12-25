/**
 * Used to prevent rapid-fire calling of a function. 
 * Every time the function is called it resets the timer.
 * 
 * Example: 
 * const updateText = debounce((v) => input.text = v, 500)
 * onKeyup(v) => updateText(v);
 * 
 * @param callback The function to execute
 * @param timeout The amount of time to wait before executing
 * @returns A function to create the debounce
 */
export default function debounce<A extends any[]>(callback: (...args: A) => any, timeout: number = 1000) {
  let timer: NodeJS.Timeout;
  return function (...args: A): void {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), timeout)
  }
}