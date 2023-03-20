var exports = module.exports;
exports.add = (a, b) => {
  return a + b;
};
exports.sub = (a, b) => {
  return a - b;
};
exports.mul = (a, b) => {
  return a * b;
};
exports.div = (a, b) => {
    if(b==0){
        return "( Lỗi : Số b != 0 )";
    }else{
        return a / b;
    }
};

