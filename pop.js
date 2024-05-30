#! /usr/bin/env node

console.log('This script populates some test items and categories to your database. ');
console.log(
  'Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, category, name, description, price, number_in_stock) {
  const item = new Item({
    category: category,
    name: name,
    description: description,
    price: price,
    number_in_stock: number_in_stock,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'Engine Components',
      'The heart of the vehicle, responsible for converting fuel into mechanical power to propel the car.'
    ),
    categoryCreate(
      1,
      'Transmission System',
      'Transmits power from the engine to the wheels, enabling vehicle movement and speed control.'
    ),
    categoryCreate(
      2,
      'Fuel System',
      'Delivers fuel to the engine for combustion, ensuring efficient engine performance.'
    ),
    categoryCreate(
      3,
      'Exhaust System',
      'Manages and expels exhaust gases from the engine, reducing emissions and noise.'
    ),
    categoryCreate(
      4,
      'Electrical System',
      "Powers and controls the vehicle's electrical components, from starting the engine to running accessories."
    ),
    categoryCreate(
      5,
      'Cooling System',
      'Regulates engine temperature to prevent overheating and ensure optimal performance.'
    ),
    categoryCreate(
      6,
      'Braking System',
      'Ensures the vehicle can slow down or stop safely and effectively.'
    ),
    categoryCreate(
      7,
      'Suspension and Steering',
      'Provides vehicle stability, smooth ride, and steering control.'
    ),
    categoryCreate(
      8,
      'Body and Exterior',
      "Encloses and protects the vehicle's interior while providing structural integrity."
    ),
    categoryCreate(
      9,
      'Interior Components',
      "Provides comfort, control, and safety features within the vehicle's cabin."
    ),
    categoryCreate(
      10,
      'HVAC (Heating, Ventilation, and Air Conditioning)',
      'Maintains comfortable temperature and air quality inside the vehicle.'
    ),
    categoryCreate(
      11,
      'Wheels and Tires',
      "Support the vehicle's weight and provide traction and stability on the road."
    ),
    categoryCreate(
      12,
      'Miscellaneous',
      'Additional components and tools that enhance vehicle functionality and maintenance.'
    ),
  ]);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      categories[0],
      'Engine Block',
      'The main structure of the engine housing cylinders.',
      1000,
      4
    ),
    itemCreate(
      1,
      categories[0],
      'Cylinder Head',
      'Sits above the cylinders, containing valves and spark plugs.',
      300,
      7
    ),
    itemCreate(
      2,
      categories[0],
      'Pistons',
      'Moving components within cylinders that compress the fuel-air mixture.',
      50,
      10
    ),
    itemCreate(
      3,
      categories[0],
      'Crankshaft',
      'Converts piston movement into rotational motion.',
      200,
      8
    ),
    itemCreate(
      4,
      categories[0],
      'Camshaft',
      'Controls the opening and closing of engine valves.',
      100,
      7
    ),
    itemCreate(
      5,
      categories[0],
      'Valves',
      'Regulate the intake of fuel and expulsion of exhaust gases.',
      10,
      15
    ),
    itemCreate(
      6,
      categories[0],
      'Timing Belt/Chain',
      'Synchronizes the rotation of the crankshaft and camshaft.',
      50,
      11
    ),
    itemCreate(
      7,
      categories[0],
      'Oil Pan',
      'Holds engine oil to lubricate moving parts.',
      80,
      9
    ),
    itemCreate(
      8,
      categories[0],
      'Gaskets',
      'Seals between engine parts to prevent leaks.',
      20,
      14
    ),
    itemCreate(
      9,
      categories[0],
      'Turbocharger/Supercharger',
      'Increases engine power by forcing extra air into the combustion chamber',
      500,
      6
    ),

    itemCreate(
      10,
      categories[1],
      'Transmission (Manual/Automatic)',
      'Transfers power from the engine to the wheels.',
      1000,
      3
    ),
    itemCreate(
      11,
      categories[1],
      'Clutch',
      'Engages and disengages the engine from the transmission in manual cars.',
      100,
      20
    ),
    itemCreate(
      12,
      categories[1],
      'Flywheel',
      'Provides rotational inertia to keep the engine running smoothly.',
      50,
      10
    ),
    itemCreate(
      13,
      categories[1],
      'Torque Converter',
      'Replaces the clutch in automatic transmissions.',
      150,
      8
    ),
    itemCreate(
      14,
      categories[1],
      'Gearbox',
      "Houses gears that adjust the vehicle's speed and torque.",
      300,
      14
    ),
    itemCreate(
      15,
      categories[1],
      'Driveshaft',
      'Transmits power from the transmission to the differential.',
      200,
      11
    ),
    itemCreate(
      16,
      categories[1],
      'Differential',
      'Allows wheels to rotate at different speeds during turns.',
      300,
      15
    ),

    itemCreate(17, categories[2], 'Fuel Tank', 'Stores gasoline or diesel fuel.', 100, 4),
    itemCreate(
      18,
      categories[2],
      'Fuel Pump',
      'Delivers fuel from the tank to the engine.',
      50,
      9
    ),
    itemCreate(
      19,
      categories[2],
      'Fuel Injectors',
      "Spray fuel into the engine's combustion chambers.",
      50,
      8
    ),
    itemCreate(
      20,
      categories[2],
      'Carburetor',
      'Mixes air and fuel for older engines.',
      200,
      2
    ),
    itemCreate(
      21,
      categories[2],
      'Fuel Filter',
      'Removes contaminants from the fuel.',
      10,
      14
    ),

    itemCreate(
      22,
      categories[3],
      'Exhaust Manifold',
      'Collects exhaust gases from the engine cylinders.',
      100,
      6
    ),
    itemCreate(
      23,
      categories[3],
      'Catalytic Converter',
      'Reduces harmful emissions from exhaust gases.',
      200,
      3
    ),
    itemCreate(
      24,
      categories[3],
      'Muffler',
      'Reduces noise from the exhaust system.',
      50,
      9
    ),
    itemCreate(
      25,
      categories[3],
      'Tailpipe',
      'Expels exhaust gases from the vehicle.',
      25,
      12
    ),
    itemCreate(
      26,
      categories[3],
      'Oxygen Sensors',
      'Measure oxygen levels in the exhaust gases to adjust the air-fuel mixture.',
      20,
      16
    ),

    itemCreate(
      27,
      categories[4],
      'Battery',
      'Provides electrical power to start the engine and run accessories.',
      50,
      8
    ),
    itemCreate(
      28,
      categories[4],
      'Alternator',
      'Recharges the battery and powers electrical systems while the engine runs.',
      100,
      4
    ),
    itemCreate(
      29,
      categories[4],
      'Starter Motor',
      'Cranks the engine to start it.',
      50,
      7
    ),
    itemCreate(
      30,
      categories[4],
      'Spark Plugs',
      'Ignite the fuel-air mixture in the engine.',
      2,
      16
    ),
    itemCreate(
      31,
      categories[4],
      'Ignition Coils',
      'Transform battery voltage to a higher voltage to fire the spark plugs.',
      20,
      9
    ),
    itemCreate(
      32,
      categories[4],
      'Fuses',
      'Protect electrical circuits from overcurrent.',
      1,
      26
    ),
    itemCreate(33, categories[4], 'Relays', 'Electrically operated switches.', 30, 12),
    itemCreate(
      34,
      categories[4],
      'Wiring Harness',
      'Bundle of wires that connects electrical components.',
      50,
      13
    ),

    itemCreate(
      35,
      categories[5],
      'Radiator',
      'Transfers heat from the coolant to the air.',
      100,
      5
    ),
    itemCreate(
      36,
      categories[5],
      'Water Pump',
      'Circulates coolant through the engine and radiator.',
      50,
      8
    ),
    itemCreate(
      37,
      categories[5],
      'Thermostat',
      'Regulates engine temperature by controlling coolant flow.',
      10,
      13
    ),
    itemCreate(
      38,
      categories[5],
      'Coolant',
      'Liquid that absorbs and dissipates heat from the engine.',
      10,
      20
    ),
    itemCreate(
      39,
      categories[5],
      'Cooling Fan',
      'Draws air through the radiator to help cool the coolant.',
      50,
      4
    ),

    itemCreate(
      40,
      categories[6],
      'Brake Pedal',
      'Activates the braking system when pressed.',
      20,
      6
    ),
    itemCreate(
      41,
      categories[6],
      'Brake Master Cylinder',
      'Converts pedal pressure into hydraulic pressure.',
      50,
      3
    ),
    itemCreate(
      42,
      categories[6],
      'Brake Lines',
      'Carry brake fluid to the brake components.',
      10,
      4
    ),
    itemCreate(
      43,
      categories[6],
      'Brake Calipers',
      'House the brake pads and press them against the rotors.',
      50,
      2
    ),
    itemCreate(
      44,
      categories[6],
      'Brake Pads',
      'Create friction to stop the vehicle.',
      20,
      5
    ),
    itemCreate(
      45,
      categories[6],
      'Brake Rotors/Discs',
      'Rotating discs that brake pads press against to stop the vehicle.',
      30,
      5
    ),
    itemCreate(
      46,
      categories[6],
      'Brake Drum',
      'Drum-shaped component that brake shoes press against in drum brakes.',
      30,
      8
    ),
    itemCreate(
      47,
      categories[6],
      'Anti-lock Braking System (ABS) Components',
      'Prevents wheel lock-up during braking.',
      100,
      6
    ),

    itemCreate(
      48,
      categories[7],
      'Shock Absorbers',
      'Dampen the impact of road bumps.',
      50,
      5
    ),
    itemCreate(
      49,
      categories[7],
      'Struts',
      'Structural components that combine a shock absorber and coil spring.',
      100,
      7
    ),
    itemCreate(
      50,
      categories[7],
      'Control Arms',
      'Connect the wheel hub to the vehicle frame.',
      50,
      8
    ),
    itemCreate(
      50,
      categories[7],
      'Ball Joints',
      'Allow for smooth movement of suspension components.',
      20,
      11
    ),
    itemCreate(
      51,
      categories[7],
      'Tie Rods',
      'Connect the steering mechanism to the wheels.',
      20,
      6
    ),
    itemCreate(
      52,
      categories[7],
      'Steering Wheel',
      'Allows the driver to control the direction of the vehicle.',
      50,
      7
    ),
    itemCreate(
      53,
      categories[7],
      'Steering Column',
      'Connects the steering wheel to the steering mechanism.',
      100,
      5
    ),
    itemCreate(
      54,
      categories[7],
      'Power Steering Pump',
      'Provides hydraulic power to assist in steering.',
      50,
      7
    ),
    itemCreate(
      55,
      categories[7],
      'Rack and Pinion',
      'Converts steering wheel motion into linear motion to turn the wheels.',
      200,
      2
    ),

    itemCreate(
      56,
      categories[8],
      'Bumpers',
      'Protect the front and rear of the vehicle in minor collisions.',
      100,
      4
    ),
    itemCreate(
      57,
      categories[8],
      'Hood',
      'Covers and protects the engine compartment.',
      200,
      2
    ),
    itemCreate(58, categories[8], 'Trunk Lid', 'Covers the rear storage area.', 100, 3),
    itemCreate(
      59,
      categories[8],
      'Doors',
      "Provide access to the vehicle's interior.",
      500,
      1
    ),
    itemCreate(60, categories[8], 'Windows', 'Allow visibility and ventilation.', 100, 4),
    itemCreate(
      61,
      categories[8],
      'Mirrors',
      'Provide visibility of the areas behind and beside the vehicle.',
      50,
      4
    ),
    itemCreate(62, categories[8], 'Headlights', 'Illuminate the road ahead.', 50, 6),
    itemCreate(
      63,
      categories[8],
      'Taillights',
      'Indicate braking and turning to other drivers.',
      50,
      3
    ),
    itemCreate(
      64,
      categories[8],
      'Grille',
      'Allows air to enter and cool the radiator.',
      50,
      7
    ),

    itemCreate(
      65,
      categories[9],
      'Seats',
      'Provide seating for the driver and passengers.',
      200,
      3
    ),
    itemCreate(
      66,
      categories[9],
      'Dashboard',
      'Houses controls and instruments for the driver.',
      200,
      5
    ),
    itemCreate(
      67,
      categories[9],
      'Center Console',
      'Area between the front seats that houses controls and storage.',
      50,
      3
    ),
    itemCreate(
      68,
      categories[9],
      'Steering Wheel',
      'Allows the driver to steer the vehicle.',
      50,
      8
    ),
    itemCreate(
      69,
      categories[9],
      'Instrument Panel',
      'Displays critical vehicle information.',
      100,
      13
    ),
    itemCreate(
      70,
      categories[9],
      'Airbags',
      'Provide occupant protection in a collision.',
      200,
      8
    ),
    itemCreate(
      71,
      categories[9],
      'Seat Belts',
      'Restrain occupants during a crash.',
      50,
      18
    ),
    itemCreate(
      72,
      categories[9],
      'Carpets',
      'Cover the floor of the vehicle interior.',
      50,
      8
    ),
    itemCreate(
      73,
      categories[9],
      'Headliner',
      'Material that covers the interior roof.',
      100,
      7
    ),

    itemCreate(
      74,
      categories[10],
      'Compressor',
      'Pressurizes the refrigerant in the AC system.',
      200,
      6
    ),
    itemCreate(
      75,
      categories[10],
      'Condenser',
      'Releases heat from the refrigerant.',
      100,
      3
    ),
    itemCreate(76, categories[10], 'Evaporator', 'Absorbs heat to cool the air.', 50, 5),
    itemCreate(
      77,
      categories[10],
      'Blower Motor',
      'Pushes air through the HVAC system.',
      50,
      2
    ),
    itemCreate(
      78,
      categories[10],
      'Heater Core',
      'Provides heat to the vehicle interior.',
      50,
      5
    ),

    itemCreate(
      79,
      categories[11],
      'Wheels/Rims',
      'Support the tires and vehicle load.',
      50,
      5
    ),
    itemCreate(
      80,
      categories[11],
      'Tires',
      'Provide traction and absorb road shocks.',
      50,
      6
    ),
    itemCreate(
      81,
      categories[11],
      'Wheel Bearings',
      'Allow smooth rotation of the wheels.',
      20,
      7
    ),
    itemCreate(82, categories[11], 'Lug Nuts', 'Secure the wheels to the vehicle.', 1, 8),
    itemCreate(
      83,
      categories[11],
      'Tire Pressure Monitoring System (TPMS)',
      'Monitors and alerts of tire pressure issues.',
      50,
      3
    ),

    itemCreate(
      84,
      categories[12],
      'Windshield Wipers',
      'Clear rain and debris from the windshield.',
      10,
      3
    ),
    itemCreate(
      85,
      categories[12],
      'Washer Fluid Reservoir',
      'Stores fluid for cleaning the windshield.',
      20,
      9
    ),
    itemCreate(86, categories[12], 'Horn', 'Emits a sound to alert others.', 10, 7),
    itemCreate(
      87,
      categories[12],
      'Jack and Spare Tire',
      'Used for emergency tire replacement.',
      100,
      7
    ),
    itemCreate(
      88,
      categories[12],
      'Tool Kit',
      'Basic tools for minor repairs and maintenance.',
      20,
      13
    ),
  ]);
}
