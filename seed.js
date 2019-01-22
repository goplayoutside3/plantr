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
.then((insertedData) => {
  const [vegetables, plots, gardeners] = insertedData;

  const [carrots, tomatoes, celery] = vegetables;
  const [delilah, steve] = gardeners;
  const [plotOne, plotTwo] = plots;

  const promise1 = plotOne.setGardener(delilah);
  const promise2 = plotTwo.setGardener(steve);

  const promise3 = carrots.addPlot(plotOne);
  const promise4 = tomatoes.addPlot(plotTwo);

  // const promise5 = steve.setVegetable(tomatoes);

  return Promise.all([promise1, promise2, promise3, promise4])
})
.catch((err) => console.log(err))
.finally(() => db.close())
