export const formatNumToArr = (testnum, len = 2) => {
  const list = [parseInt(testnum % 10)]; // 去个位数的值
  // 判断是否是大于个位数的值
  if (len > 1) {
    // 对数字进行循环并存入数组中
    for (let i = 2; i <= len; i += 1) {
      list.push(
        parseInt(
          (testnum % Number(1 + "0".repeat(i))) / Number(1 + "0".repeat(i - 1))
        ) // repeat是将字符0复制为多少个
      );
    }
    list.reverse(); // 将数组进行反转，得到正确的数组
  }
  return list;
};
