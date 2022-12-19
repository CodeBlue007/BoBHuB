require("dotenv").config();
const { app } = require("./src/app.js");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
