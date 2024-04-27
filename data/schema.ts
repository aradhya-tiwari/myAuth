import Database from 'better-sqlite3'
import path from 'path'

const schema = `
CREATE TABLE SAMPLE(
    id INT NOT NULL PRIMARY KEY,
    user_name Varchar(f)
)`

console.log(path.join(__dirname))
function up(name: string) {
    const db = new Database(name)
    // db.pragma('journal_mode = WAL');
    // db.exec(`CREATE TABLE SAMPLE(
    //     Id INT NOT NULL,  
    // make VARCHAR(64), 
    // model VARCHAR(128),
    // derivative VARCHAR(255),
    // PRIMARY KEY(Id)
    // )`)
    // let res = db.exec("INSERT INTO SAMPLE VALUES(121,'weq','121','wed')")
    let res = db.prepare("Select * from SAMPLE")
    console.log(res)
}

up(__dirname + '/randomDiary1.db')
