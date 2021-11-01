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

const _getKorDay = day => {
  if (day === 0) return '일요일';
  if (day === 1) return '월요일';
  if (day === 2) return '화요일';
  if (day === 3) return '수요일';
  if (day === 4) return '목요일';
  if (day === 5) return '금요일';
  if (day === 6) return '토요일';
}

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
    if (_format === "YYYY-MM-DD||HH:mm") {
      console.log(`${_date.getFullYear()}-${_doubleDigitsNum(
        _date.getMonth() + 1
      )}-${_doubleDigitsNum(_date.getDate())}` === `${_date.getFullYear()}-${_doubleDigitsNum(
        _date.getMonth() + 1
      )}-${_doubleDigitsNum(_date.getDate())}`)
      if (`${_date.getFullYear()}-${_doubleDigitsNum(
        _date.getMonth() + 1
      )}-${_doubleDigitsNum(_date.getDate())}` === `${_date.getFullYear()}-${_doubleDigitsNum(
        _date.getMonth() + 1
      )}-${_doubleDigitsNum(_date.getDate())}`) {
        return `${_doubleDigitsNum(
          _date.getHours()
        )}:${_doubleDigitsNum(_date.getMinutes())}`;
      }
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
    if (_format === "KOR_YYMDD") {
      return `${_date.getFullYear()}년 ${_doubleDigitsNum(
        _date.getMonth() + 1
      )}월 ${_doubleDigitsNum(_date.getDate())}일 ${_getKorDay(_date.getDay())}`
    }
    return `${_date.getFullYear()}-${_doubleDigitsNum(
      _date.getMonth() + 1
    )}-${_doubleDigitsNum(_date.getDate())}`;
  };
  return { format };
};

export { getHashStr, getQueryFromSearch, dateForm };
