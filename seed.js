const { db, Plot, Vegetable, Gardener} = require( `./models`)

db.sync({force: true})
.then(() => console.log(`Database successfully connected!`))
.catch((err) => console.log(err))
.finally(() => db.close())

