function CombineArray (obj) {
  let joinedArray = [];
  for (let i = 0; i < obj.data.length; i++) {
    const element = obj.data[i];
    joinedArray = [...joinedArray, ...element];
  }

  return joinedArray;
}
export { CombineArray };