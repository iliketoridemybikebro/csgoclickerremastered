let response
let itemsJson

async function logItems() {
  response = await fetch('https://goofy-three.vercel.app/proxy/http:/csgobackpack.net/api/GetItemsList/v2/', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
  })
  
  const json = await response.json()
  return json
}

async function main() {
  const items = await logItems();

  // Create an empty object to store the weapons
  const weaponsObject = {};

  // Loop through the keys in the `items.items_list` object
  for (const key of Object.keys(items.items_list)) {
    // Get the value of the current key
    const item = items.items_list[key];

    // Check if the `item` object has a key called `"type"`
    if (item.hasOwnProperty("type")) {
      // Get the value of the `"type"` key
      const type = item.type;

      // Check if the value of the `"type"` key is `"Weapon"`
      if (type === "Weapon") {
        // Add the weapon to the `weaponsObject` object, using its name as the key
        weaponsObject[item.name] = item;
      }
    }
  }

  // Print out a random weapon
  console.log(Object.values(weaponsObject)[Math.floor(Math.random() * Object.values(weaponsObject).length)]);
}

main()
