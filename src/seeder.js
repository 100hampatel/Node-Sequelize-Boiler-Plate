require('./app');
const seeder = require('./seeders/seeder');
const promises = [];
seeder.forEach((seed) => {
  promises.push(require(`./seeders/${seed}Seeder.js`)
    .run());
});
Promise.all(promises)
  .then(() => {
    console.log('Seeders completed');
  }, (err) => {
    console.error('Seeder error', err);
  });
