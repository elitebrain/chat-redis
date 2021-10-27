const getHashStr = (digit) => {
  const STR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let str = "";
  for (let i = 0; i < digit; i++) {
    str += STR.substr(Math.floor(Math.random() * (STR.length - 1)), 1);
  }
  return str;
};

module.exports = { getHashStr }