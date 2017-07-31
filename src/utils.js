export const classNames = (...klasses) => {
  return klasses
    .reduce((prev, curr) => {
      if (typeof curr === 'string' && curr) {
        prev.push(curr);
      } else if (typeof curr === 'object') {
        Object.keys(curr).map(key => {
          if (curr[key]) {
            prev.push(key);
          }
        });
      }
      return prev;
    }, [])
    .join(' ');
};
