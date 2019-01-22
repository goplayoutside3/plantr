const { db, Plot, Vegetable, Gardener} = require( `./models`)

const gardenerData =[
  { name: `Delilah Clement`, age: 21},
  { name: `Steve Bonifas`, age: 60}
]
const plotData = [
  { size: 5, shaded: true},
  { size: 7, shaded: false}
]
const vegetableData = [
  { name: `carrots`, color: `orange`, planted_on: Date.now()},
  { name: `tomatoes`, color: `red`, planted_on: Date.now()},
  { name: `celery`, color: `green`, planted_on: Date.now()}
]

db.sync({force: true})
.then(() => console.log(`Database successfully connected!`))
.then(() => {
  const promiseForVegetable = Vegetable.bulkCreate( vegetableData, { returning: true})
  const promiseForPlot = Plot.bulkCreate( plotData, { returning: true})
  const promiseForGardener = Gardener.bulkCreate( gardenerData, { returning: true})
  return Promise.all([ promiseForVegetable, promiseForPlot, promiseForGardener])
})
.catch((err) => console.log(err))
.finally(() => db.close())

