//=====================================================
//=====================================================
// SleepyChat Database Interface: Chat History
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
    build("history", ["username", "msg"], ["text", "text"]);
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
    add("history", ["Sleepy Boy", "hello world"]);
*/
function add(table, data) {
  // open db
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });

  // insert values
  let sql = "INSERT INTO " + table + "(username, msg)  VALUES('" + data[0] + "', '" + data[1] + "')";
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
  Example:
    update("history", "msg", "goodbye moon", "Sleepy Boy");
*/
function update(table, column, data, un) {
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
function get(table = "history") {
  // open db
  let db = new sqlite3.Database('./db/sleepyChat.db', (err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - open.');
  });

  // get all
  let sql = "SELECT DISTINCT username UN, msg MSG FROM " + table + " ORDER BY UN";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.UN, " | ", row.MSG);
    });
  });

  // close db
  db.close((err) => {
    if (err)
      return console.error(err.message);
    console.log('DB connection - close.');
  });
}


/*********************
 * Exporting
 ********************/
module.exports = {
  build,
  add,
  update,
  get
}