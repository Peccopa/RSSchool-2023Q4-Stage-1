export function templateToLeftArr(template, tempSize) {
  let result = [];
  for (let i = 0; i < template.length; i += 1) {
    let arr = [];
    let sum = 0;
    for (let j = 0; j < template[i].length; j += 1) {
      if (template[i][j] && template[i][j + 1]) {
        sum += template[i][j];
      } else if (template[i][j] && !template[i][j + 1]) {
        sum += template[i][j];
        arr.push(sum);
        sum = 0;
      }
    }
    while (arr.length < tempSize) {
      arr.unshift(0);
    }
    result.push(arr);
  }
  return result;
}

export function templateToTopArr(template, tempSize) {
  template.push([]);
  let newArr = [];
  for (let i = 0; i < template.length - 1; i += 1) {
    let sum = 0;
    let arr = [];
    for (let j = 0; j < template.length - 1; j += 1) {
      if (template[j][i] && template[j + 1][i]) {
        sum += template[j][i];
      } else if (template[j][i] && !template[j + 1][i]) {
        sum += template[j][i];
        arr.unshift(sum);
        sum = 0;
      }
    }
    while (arr.length < tempSize) {
      arr.push(0);
    }
    newArr.push(arr);
  }
  const result = newArr[0].map((val, index) =>
    newArr.map((row) => row[row.length - 1 - index])
  );
  template.pop();
  return result;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

