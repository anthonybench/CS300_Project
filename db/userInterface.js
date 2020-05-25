//=====================================================
//=====================================================
// SleepyChat Database Interface: User Information
// SQLite3 + Node.js
//
// Written by Isaac Yep
//=====================================================
//=====================================================
const sqlite3 = require('sqlite3').verbose();


/***********************
  Build DB
***********************/
/*
  > create's new table of name `table`
  > column's are defined by list `columns`
  > column's have types defined in list `types`,
    indexed respectively
  Example:
    build("users", ["username", "password", "email"], ["text", "text", "text"]);
*/
function build(table, columns, types) {
  // open db
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });
  // create table
  let sql = 'CREATE TABLE IF NOT EXISTS ' + table + '(';
  for (i = 0; i < columns.length; i++) {
    if (i != 0)
      sql += ', ';
    sql += (columns[i] + ' ' + types[i]);
  }
  sql += ')'
  db.run(sql);
  // close db
  db.close((err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - close.');
  });
}


/***********************
  Add DB entry
***********************/
/*
  > add row to existing `table`
  > new entry defined by list `data`
  Example:
    add("users", ["Sleepy Boy", "RK7G36L299I", "anthonybenchyep@gmail.com"]);
*/
function add(table, data) {
  // open db
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });
  // insert values
  let sql = "INSERT INTO " + table + "(username, password, email)  VALUES('" + data[0] + "', '" + data[1] + "', '" + data[2] + "')";
  db.run(sql);
  // close db
  db.close((err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - close.');
  });
}


/***********************
  Update DB entry
***********************/
/*
  > update existing entry in users table
  > modify `column` value with `data` where
    match with usernmae `un` is found
  Example:
    update("password", "UF353G79i6", "Sleepy Boy");
*/
function update(column, data, un, table = "users") {
  // open db
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });
  // udpate row
  let sql = "UPDATE " + table + " SET " + column + " = '" + data + "' WHERE username = '" + un + "'";
  console.log(sql);
  db.run(sql, [], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
  // close db
  db.close((err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - close.');
  });
}


/***********************
  Dump DB
***********************/
/*
  > logs all data in database to console
  > ordered alphabetically by username
  Example:
    get("users");
*/
function get(table = "users") {
  // open db
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });
  // get all
  let sql = "SELECT DISTINCT username UN, password PW, email Email FROM " + table + " ORDER BY UN";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.UN, " | ", row.PW, " | " , row.Email);
    });
  });
  // close db
  db.close((err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - close.');
  });
}

/***********************
  Check Credentials
    Against DB
***********************/
/*
  > takes email and pw recieved from
    front-end form
  > returns true if match is found
    else it returns false
  Example:
    validate("awakeygirl@gmail.com", "abcdefg");
*/
function validate(email, password) {
  // open db
  let res = true;
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });
  // check credentials
  let sql = "SELECT email UN FROM users WHERE password = '" + password + "'";
  console.log(sql);
  db.get(sql, [], function(err, row) {
    if (err) {
      return console.error(err.message);
    }
    if (row.UN == email) {
      res = true;
      console.log("match found!");
    }
    else
      console.log("no match found!");
  });
  // close db
  db.close((err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - close.');
  });
  return res;
}

/*********************
 * Exporting
 ********************/
module.exports = {
  build,
  add,
  update,
  get,
  validate
}
