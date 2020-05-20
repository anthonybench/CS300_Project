//=====================================================
//=====================================================
// SleepyChat Database Interface
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
*/
function build(table, columns, types) {
  // open db
  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });

  // create table
  let sql = 'CREATE TABLE ' + table + '(';
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
*/
function add(table, data) {
  // open db
  let db = new sqlite3.Database('./db/test.db', (err) => {
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
  > update existing entry in `table`
  > modify `column` value with `data` where
    match with usernmae `un` is found
*/
function update(table, column, data, un) {
  // open db
  let db = new sqlite3.Database('./db/test.db', (err) => {
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
*/
function get(table) {
  // open db
  let db = new sqlite3.Database('./db/test.db', (err) => {
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
  CS300 Demo
***********************/
// build("users", ["username", "password", "email"], ["text", "text", "text"]);
// add("users", ["Sleepy Boy", "RK7G36L299I", "anthonybenchyep@gmail.com"]);
// add("users", ["Awakey Girl", "abcdefg", "cutebutt@butt.butt"]);
// update("users", "password", "UF353G79i6", "Sleepy Boy");
get("users");
