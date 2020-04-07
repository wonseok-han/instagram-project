const getBase64FromFile = file => {
  // resolve : 정상적으로 처리되었을 때 호출
  // reject : 에러상황일 때 호출
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export default getBase64FromFile;
