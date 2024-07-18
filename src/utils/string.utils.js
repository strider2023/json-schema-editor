export function camelCaseToTitleCase(camelCaseStr) {
  // Split the camelCase string by uppercase letters and join with spaces
  const result = camelCaseStr.replace(/([A-Z])/g, ' $1');
  
  // Capitalize the first letter of the result
  return result.charAt(0).toUpperCase() + result.slice(1);
}