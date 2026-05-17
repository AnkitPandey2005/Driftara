require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
// Geocoding removed. Using provided geometry from init data or default.
const geoCodingClient = null;

const mongoUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const updatedData = await Promise.all(
      initData.data.map(async (obj) => {
        let geometry = obj.geometry || {
          type: "Point",
          coordinates: [0, 0],
        };

        if (geoCodingClient) {
          try {
            const response = await geoCodingClient
              .forwardGeocode({
                query: `${obj.location}, ${obj.country}`,
                limit: 1,
              })
              .send();

            geometry = response.body.features?.[0]?.geometry || geometry;
          } catch (error) {
            console.error(
              `Geocoding failed for ${obj.location}, ${obj.country}:`,
              error.message
            );
          }
        }

        return {
          ...obj,
          owner: "66567b03fda820235197b582",
          geometry,
        };
      })
    );

    await Listing.insertMany(updatedData);
    console.log("DB is initialized");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};

initDB();
