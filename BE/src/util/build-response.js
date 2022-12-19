module.exports = (method, result) => {
  let res = {};
  switch (method) {
    case "c":
      if (result.affectedRows >= 1) {
        res.message = "생성에 성공하였습니다.";
        if (result.insertId) {
          res.insertId = result.insertId;
        }
      } else throw new Error("영향받는 데이터가 없습니다.");
      return res;
    case "u":
      if (result.changedRows >= 1) {
        res.message = "업데이트에 성공하였습니다.";
      } else throw new Error("영향받는 데이터가 없습니다.");

      return res;
    case "d":
      if (result.affectedRows >= 1) {
        res.message = "삭제에 성공하였습니다.";
      } else throw new Error("영향받는 데이터가 없습니다.");

      return res;
  }
};
