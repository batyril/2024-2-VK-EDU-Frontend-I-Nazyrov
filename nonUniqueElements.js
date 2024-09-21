export default function nonUniqueElements(data) {
  const countRepeat = {};
  const initialValue = 1;

  data.forEach((element) => {
    countRepeat[element] = countRepeat[element]
        ? ++countRepeat[element]
        : initialValue;
  });

  const checkRepeated = (element) => countRepeat[element] > initialValue;

  return data.filter(checkRepeated);
}
