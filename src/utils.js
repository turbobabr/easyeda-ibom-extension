
export function replaceVars(content, vars) {
  let temp = content.toString();

  Object.keys(vars).map(key => {
      const re = new RegExp('\\$\{' + key + '\}', 'gi');

      temp = temp.replace(re, vars[key]);
      return true;
  });
  return temp;
};