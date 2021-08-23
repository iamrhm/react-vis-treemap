import chroma from "chroma-js";

export function validate(data) {
  const obj = {
    minNegativeColor: data.minNegativeColor,
    maxNegativeColor: data.maxNegativeColor,
    minPositiveColor: data.minPositiveColor,
    maxPositiveColor: data.maxPositiveColor
  };
  const inValidInputs = [];

  Object.keys(obj).forEach(key => {
    if(!chroma.valid(obj[key])) {
      inValidInputs.push(obj[key]);
    }
  });

  if(inValidInputs.length) {
    return {
      isValid: false,
      messages: `${inValidInputs.join(', ')}, are/is not valid color input(s)`
    }
  }
  return {
    isValid: true,
    messages: null
  }
}