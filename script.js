let response
let itemsJson
let randomWeapon

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

  const randomskin = document.getElementById('randomskin');
  const skinimg = document.getElementById('skinimg');

  // Hide the div initially
  randomskin.style.display = 'none';

  // Listen for the image to load
  skinimg.onload = function() {
    // Once the image has loaded, show the div
    randomskin.style.display = 'block';
    document.getElementById("name").innerHTML = randomWeapon.name
    document.getElementById("name").style.color = `#${randomWeapon.rarity_color}`;
  };

  // Print out a random weapon
  randomWeapon = Object.values(weaponsObject)[Math.floor(Math.random() * Object.values(weaponsObject).length)]
  console.log(randomWeapon)
  document.getElementById("randomskin").style.borderColor = `#${randomWeapon.rarity_color}`;
  document.getElementById("skinimg").src = `https://you-livid.vercel.app/proxy/https:/community.akamai.steamstatic.com/economy/image/${randomWeapon.icon_url}`
}

main()
