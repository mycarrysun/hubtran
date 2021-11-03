interface Field {
  left: number;
  top: number;
  width: number;
  height: number;
  chars: string;
}

export type Fieldset = Field[];

function getNumberFromWords(words: string[]): string {
  if(!words.length){
    throw new Error('Words cannot be an empty array');
  }
  const number = words.pop();
  if(number && number.match(/[A-Za-z\d]/) !== null){
    return number;
  }
  return getNumberFromWords(words);
}

function parseInvoiceNumber(input: string) {
  const words = input.split(' ');
  const number = getNumberFromWords(words);
  const label = words.join(' ');
  return {
    label,
    number,
  }
}

export function main(inputFields: Fieldset) {
  const newFields: ({index?: number} & Field)[] = [];
  const outputFields = inputFields.map((field, index) => {
    if(field.chars.match(/invoice/i) !== null){
      const {label, number} = parseInvoiceNumber(field.chars);

      field.chars = label;

      newFields.push({
        ...field,
        index,
        chars: number,
      });
    }
    return field;
  });

  let offset = 1;
  newFields.forEach(field => {
    const index = field.index;
    if(typeof index !== 'number'){
      return;
    }
    delete field.index;
    outputFields.splice(index + offset, 0, field);
    offset++;
  })

  return outputFields;
}
