const mongoose = require("mongoose");

const clearDB = async () => {
  Object.keys(mongoose.connection.collections).forEach(async key => {
    await mongoose.connection.collections[key].deleteMany({});
  });
};

beforeAll(async () => {
  clearDB();

  await mongoose.connect(
    process.env.DB_,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    err => {
      if (err) {
        console.error(err.message);
        process.exit(1);
      }
      return clearDB();
    }
  );
});

afterEach(() => {
  clearDB();
});
