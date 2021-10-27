const getHashStr = (digit) => {
  const STR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let str = "";
  for (let i = 0; i < digit; i++) {
    str += STR.substr(Math.floor(Math.random() * (STR.length - 1)), 1);
  }
  return str;
};

const getQueryFromSearch = ({ search, key }) => {
  const list = search.substr(1).split('&');
  const idx = list.findIndex(v => v.indexOf(key) !== -1);
  if (idx === -1) return '';
  return list[idx].split('=')[1]
}

// 두자리 숫자로 변환 (_doubleDigitsNum(1) -> 01)
const _doubleDigitsNum = (num) => {
  return num < 10 ? `0${num}` : num;
};

const dateForm = (date) => {
  const _date = typeof date === "string" ? new Date(date) : date;
  const format = (_format) => {
    if (_format === "HH:mm") {
      return `${_doubleDigitsNum(
        _date.getHours()
      )}:${_doubleDigitsNum(_date.getMinutes())}`;
    }
    if (_format === "YYYY-MM-DD HH:mm") {
      return `${_date.getFullYear()}-${_doubleDigitsNum(
        _date.getMonth() + 1
      )}-${_doubleDigitsNum(_date.getDate())} ${_doubleDigitsNum(
        _date.getHours()
      )}:${_doubleDigitsNum(_date.getMinutes())}`;
    }
    if (_format === "YYYY-MM-DD HH:mm:ss") {
      return `${_date.getFullYear()}-${_doubleDigitsNum(
        _date.getMonth() + 1
      )}-${_doubleDigitsNum(_date.getDate())} ${_doubleDigitsNum(
        _date.getHours()
      )}:${_doubleDigitsNum(_date.getMinutes())}:${_doubleDigitsNum(
        _date.getSeconds()
      )}`;
    }
    return `${_date.getFullYear()}-${_doubleDigitsNum(
      _date.getMonth() + 1
    )}-${_doubleDigitsNum(_date.getDate())}`;
  };
  return { format };
};

export { getHashStr, getQueryFromSearch, dateForm };
