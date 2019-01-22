const db = require( `./models`)
db.sync({force: true}).then(()=> console.log(`Databse successfully connected!`)).catch( (err) => console.log( err)).finally(()=> db.close())
