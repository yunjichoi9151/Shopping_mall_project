// 숫자 쉼표 추가
export const addCommas = (n) => {
  return n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 숫자만 추출
export const convertNumber = (string) => {
  return parseInt(string?.replace(/(,|개|원|:)/g, ''));
};
