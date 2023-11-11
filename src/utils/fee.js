export function add(...args) {
  const data = args.map((item) => item * 100).reduce((acc, val) => acc + val) / 100;
  return data.toFixed(2);
}
