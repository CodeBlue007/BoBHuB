class MakeQueryString {
  constructor(table) {
    this.table = table;
  }
  objToQueryArray(DTO) {
    const result = [];
    Object.entries(DTO).forEach(([key, val]) =>
      result.push(`${key} = ${typeof val === "string" ? '"' + val + '"' : val}`)
    );
    return result;
  }

  objToKeyValueArray(DTO) {
    const keyArr = [];
    const valArr = [];
    Object.entries(DTO).forEach(([key, val]) => {
      keyArr.push(key);
      valArr.push(val);
    });
    return { keyArr, valArr };
  }

  makeSelectQuery(columnArr = ["*"], whereArr = null) {
    const column = columnArr.join(", ");
    const where = whereArr ? "where " + whereArr.join(" and ") : "";
    return `select ${column} from ${this.table} ${where}`;
  }

  makeInsertQuery(columnArr, valuesArr) {
    const column = columnArr.join(", ");
    const values = valuesArr
      .map((value) => (typeof value == "string" ? "'" + value + "'" : value))
      .join(", ");
    return `insert into ${this.table} (${column}) values (${values})`;
  }

  makeUpdateQuery(setArr, whereArr) {
    const set = setArr.join(", ");
    const where = whereArr.join(" and ");
    return `update ${this.table} set ${set} where ${where}`;
  }

  makeDeleteQuery(whereArr) {
    const where = whereArr.join(" and ");
    return `delete from ${this.table} where ${where}`;
  }
}

module.exports = MakeQueryString;
