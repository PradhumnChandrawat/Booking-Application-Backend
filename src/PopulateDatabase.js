const mongoose = require("mongoose");
const Seat = require("./models/Seat");
const Pricing = require("./models/Pricing");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const seatsData = [
  { id: "654059941-2", seat_class: "H" },
  { id: "186150079-3", seat_class: "E" },
  { id: "554266047-9", seat_class: "G" },
  { id: "955883445-9", seat_class: "G" },
  { id: "113273476-2", seat_class: "G" },
  { id: "006890170-4", seat_class: "B" },
  { id: "296284124-4", seat_class: "I" },
  { id: "372259832-X", seat_class: "C" },
  { id: "029228116-1", seat_class: "I" },
  { id: "292549467-6", seat_class: "J" },
  { id: "726092574-4", seat_class: "D" },
  { id: "704770716-6", seat_class: "A" },
  { id: "616679240-9", seat_class: "E" },
  { id: "488073276-1", seat_class: "G" },
  { id: "925856496-0", seat_class: "F" },
  { id: "607894352-9", seat_class: "D" },
  { id: "047828406-3", seat_class: "J" },
  { id: "202665431-X", seat_class: "J" },
  { id: "784103793-7", seat_class: "E" },
  { id: "535457886-8", seat_class: "I" },
  { id: "999153534-9", seat_class: "H" },
  { id: "603962325-X", seat_class: "C" },
  { id: "671176466-8", seat_class: "H" },
  { id: "635323715-4", seat_class: "C" },
  { id: "926184936-9", seat_class: "B" },
  { id: "497402750-6", seat_class: "F" },
  { id: "544053582-9", seat_class: "H" },
  { id: "467904863-8", seat_class: "D" },
  { id: "597507461-4", seat_class: "G" },
  { id: "767276921-9", seat_class: "J" },
  { id: "132807839-6", seat_class: "C" },
  { id: "811935636-5", seat_class: "B" },
  { id: "657293145-5", seat_class: "G" },
  { id: "540893227-3", seat_class: "F" },
  { id: "575065058-8", seat_class: "J" },
  { id: "871034850-6", seat_class: "A" },
  { id: "589262175-8", seat_class: "B" },
  { id: "535325062-1", seat_class: "E" },
  { id: "062857362-6", seat_class: "C" },
  { id: "332579490-4", seat_class: "A" },
  { id: "262684304-0", seat_class: "E" },
  { id: "218740820-5", seat_class: "J" },
  { id: "270197201-9", seat_class: "C" },
  { id: "473596428-2", seat_class: "I" },
  { id: "109449074-1", seat_class: "J" },
  { id: "555711713-X", seat_class: "J" },
  { id: "707416818-1", seat_class: "D" },
  { id: "270663583-5", seat_class: "I" },
  { id: "844777210-1", seat_class: "A" },
  { id: "181964461-8", seat_class: "F" },
  { id: "232869050-5", seat_class: "F" },
  { id: "377239121-4", seat_class: "J" },
  { id: "654043242-9", seat_class: "C" },
  { id: "652618477-4", seat_class: "G" },
  { id: "180123257-1", seat_class: "H" },
  { id: "862980129-8", seat_class: "H" },
  { id: "567288002-9", seat_class: "A" },
  { id: "365003459-X", seat_class: "B" },
  { id: "527693692-7", seat_class: "H" },
  { id: "252131729-2", seat_class: "C" },
  { id: "459798718-5", seat_class: "B" },
  { id: "318327500-7", seat_class: "C" },
  { id: "003597896-1", seat_class: "G" },
  { id: "608629041-5", seat_class: "B" },
  { id: "774324583-7", seat_class: "A" },
  { id: "803025248-X", seat_class: "A" },
  { id: "058306561-9", seat_class: "B" },
  { id: "620767856-7", seat_class: "E" },
  { id: "174541201-8", seat_class: "B" },
  { id: "658021204-7", seat_class: "F" },
  { id: "645838826-8", seat_class: "J" },
  { id: "799611074-3", seat_class: "F" },
  { id: "249634692-1", seat_class: "A" },
  { id: "838015980-2", seat_class: "A" },
  { id: "569192679-9", seat_class: "E" },
  { id: "691507211-X", seat_class: "I" },
  { id: "572075570-5", seat_class: "H" },
  { id: "659111050-X", seat_class: "H" },
  { id: "672483295-0", seat_class: "I" },
  { id: "450551720-9", seat_class: "A" },
  { id: "958035325-5", seat_class: "B" },
  { id: "107261389-1", seat_class: "F" },
  { id: "047713443-2", seat_class: "C" },
  { id: "970856448-6", seat_class: "H" },
  { id: "158201579-1", seat_class: "F" },
  { id: "138953075-2", seat_class: "D" },
  { id: "161712497-4", seat_class: "B" },
  { id: "921466765-9", seat_class: "C" },
  { id: "556366724-3", seat_class: "I" },
  { id: "717289988-1", seat_class: "E" },
  { id: "360867949-9", seat_class: "H" },
  { id: "627233063-4", seat_class: "F" },
  { id: "101939708-X", seat_class: "B" },
  { id: "989796566-1", seat_class: "D" },
  { id: "829880560-7", seat_class: "J" },
  { id: "898865785-3", seat_class: "A" },
  { id: "292774461-0", seat_class: "A" },
  { id: "072116571-0", seat_class: "E" },
  { id: "409857046-7", seat_class: "J" },
];

const pricingData = [
  { seat_class: "A", normal_price: 397.61, max_price: 547.2 },
  {
    seat_class: "B",
    min_price: 183.44,
    normal_price: 441.65,
    max_price: 766.96,
  },
  {
    seat_class: "C",
    min_price: 158.47,
    normal_price: 449.4,
    max_price: 678.55,
  },
  { seat_class: "D", min_price: 156.15, normal_price: 263.73 },
  { seat_class: "E", normal_price: 274.52, max_price: 795.68 },
  { seat_class: "F", normal_price: 459.66, max_price: 694.75 },
  { seat_class: "G", normal_price: 296.21 },
  { seat_class: "H", normal_price: 477.06 },
  { seat_class: "I", normal_price: 451.84, max_price: 762.14 },
  { seat_class: "J", normal_price: 406.24, max_price: 868.71 },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing data
    await Seat.deleteMany({});
    await Pricing.deleteMany({});

    // Insert new data
    await Seat.insertMany(seatsData);
    await Pricing.insertMany(pricingData);

    console.log("Database seeded!");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
  });
