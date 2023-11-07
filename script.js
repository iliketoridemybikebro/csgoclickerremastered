let response
let itemsJson
let randomWeapon
let weaponsObject = {}
let useRarity
let stattrakList = {}
let nonStattrakList = {}

let milspec = {}
let restricted = {}
let classified = {}
let covert = {}
let extraordinary = {}

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

function openCase(weaponsObject) {
  const randomskindiv = document.getElementById('randomskindiv');
  const skinimg = document.getElementById('skinimg');

  // Hide the div initially
  randomskindiv.style.display = 'block';

  // Listen for the image to load
  skinimg.onload = function() {
    // Once the image has loaded, show the div
    randomskindiv.style.display = 'block';
    document.getElementById("name").innerHTML = randomWeapon.name
    document.getElementById("name").style.color = `#${randomWeapon.rarity_color}`;
    document.getElementById("randomskindiv").style.borderColor = `#${randomWeapon.rarity_color}`;

    try {
      if (randomWeapon.price.hasOwnProperty("7_days") && randomWeapon.price["7_days"].average != 0) {
        document.getElementById("price").innerHTML = randomWeapon.price["7_days"].average + "$"
      } else if (randomWeapon.price.hasOwnProperty("30_days") && randomWeapon.price["30_days"].average != 0) {
        document.getElementById("price").innerHTML = randomWeapon.price["30_days"].average + "$"
      } else if (randomWeapon.price.hasOwnProperty("all_time") && randomWeapon.price["all_time"].average != 0) {
        document.getElementById("price").innerHTML = randomWeapon.price["all_time"].average + "$"
      }
    } catch {
      document.getElementById("price").innerHTML = "No price to display"
    }
  };

  const rarityString = getRandom()
  
  switch (rarityString) {
    case "extraordinary":
      useRarity = extraordinary
      break
    case "covert":  
      useRarity = covert
      break
    case "classified":
      useRarity = classified
      break
    case "restricted":
      useRarity = restricted
      break
    case "milspec":
      useRarity = milspec
      break
  }

  for (const key of Object.keys(useRarity)) {
    const item = useRarity[key];
    if (item.hasOwnProperty("stattrak")) {
      stattrakList[item.name] = item
    } else if (!item.hasOwnProperty("stattrak")) {
      nonStattrakList[item.name] = item
    }
  }

  const statnum = Math.random()

  if (statnum < 0.5) {
    randomWeapon = Object.values(stattrakList)[Math.floor(Math.random() * Object.values(stattrakList).length)]
  } else {
    randomWeapon = Object.values(nonStattrakList)[Math.floor(Math.random() * Object.values(nonStattrakList).length)]
  }

  console.log(randomWeapon)
  //document.getElementById("skinimg").src = `https://steamcommunity-a.akamaihd.net/economy/image/${randomWeapon.icon_url}`
  document.getElementById("skinimg").src = "/puppy.png"
}

function getRandom() {
  const num = Math.random()
  console.log(num)
  if (num < 0.0026) {
    return "extraordinary"
  } else if (num < 0.0064) {
    return "covert"
  } else if (num < 0.032) {
    return "classified"
  } else if (num < 0.1598) {
    return "restricted"
  } else {
    return "milspec"
  }
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

      // Check if the value of the `"type"` key is `"Weapon"` and also make sure its not a deagle skin that doesnt exist
      if ((type === "Weapon" || type === "Gloves") && item.tradable === 1 && item.icon_url !== "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaLwJh1P_NP28b6YSwxITck6f2Nu7UwTgG7JF33L-S8Imtigft_xFpMGCmJIbHJlIgIQaH3GjvkKk") {
        // Add the weapon to the `weaponsObject` object, using its name as the key
        
        weaponsObject[item.name] = item;

        switch (item.rarity) {
          case "Mil-Spec Grade":
            milspec[item.name] = item;
            break
          case "Restricted":
            restricted[item.name] = item;
            break
          case "Classified":
            classified[item.name] = item;
            break
          case "Covert":
            if (item.weapon_type === "Knife") {
              extraordinary[item.name] = item;
              item.rarity_color = "e4ae39"
            } else {
              covert[item.name] = item;
            }
            break
          case "Extraordinary":  
            extraordinary[item.name] = item;
            item.rarity_color = "e4ae39"
            break
        }
      }
    }
  }

  // Add an event listener for the `click` event on the `openCaseButton` element
  document.getElementById("openCaseButton").addEventListener("click", function() {
    // Open a random case
    console.log("button pressed")
    openCase(weaponsObject);
  });

  // let counter = 0
  // let i = setInterval(function(){
  //   openCase()
  //   counter++;
  //   if (counter === 1000) {
  //       clearInterval(i);
  //   }
  // }, 50);

}

main()
