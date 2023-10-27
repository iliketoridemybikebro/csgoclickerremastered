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

  // Create an empty array to store the weapons
  const weapons = [];

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
        // Add the weapon to the `weapons` array
        weapons.push(item);
      }
    }
  }

  // Print the names of all the weapons
  for (const weapon of weapons) {
    console.log(`Found a weapon: ${weapon.name}`);
  }
}

main()
