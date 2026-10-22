const rules = [
  ['Mechanical Engineering', /mechanical|thermodynamics|fluid|manufacturing|engineering mechanics/],
  ['Civil Engineering', /civil|structural|surveying|construction|geotechnical|environmental engineering/],
  ['Electrical Engineering', /electrical|circuit|power systems|electrical machines/],
  ['Electronics & Communication', /electronics|embedded|microprocessor|digital electronics/],
  ['Business & Management', /business|management|marketing|finance|accounting|economics/],
  ['Science & Mathematics', /physics|chemistry|mathematics|calculus|probability|discrete mathematics/],
  ['Humanities & Communication', /english|communication|professional writing/],
];
export const departmentFor = (subject = '') => rules.find(([, pattern]) => pattern.test(subject.toLowerCase()))?.[0] || 'Computer Science & IT';
export const departmentNames = ['Computer Science & IT', ...rules.map(([name]) => name)];
