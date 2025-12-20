var slayerBtn = document.getElementById("calc_slayer_task");
if (slayerBtn) {
    slayerBtn.addEventListener("click", function(e) {
        e.preventDefault();
    var combat_lvl = document.getElementById("combat_lvl");
    var cur_combat_lvl_value = parseInt(combat_lvl.value);
    var cur_risk_level = document.getElementById("risk_level");
    var risk_level_value = parseInt(cur_risk_level.value);
    var task_amount = document.getElementById("task_amount");
    var task_amount_value = parseInt(task_amount.value);
    var wild_value = parseInt(document.getElementById("wild").value); // 0 = no wild, 1 = include wild, 2 = wild only
    var f2p_value = parseInt(document.getElementById("f2p").value); // 0 = f2p only, 1 = f2p and p2p, 2 = p2p only


    const HIGHEST_NPC_LEVEL = Math.max.apply(null, NPCS.map(function(npc) { return npc.level; }));

        // map risk -> min allowed npc level relative to user combat
    function minAllowedByRisk(combat_lvl, risk) {
        const uc = Math.max(1, Number(combat_lvl) || 1);
        switch (Number(risk)) {
            case 1: return 0;
            case 2: return Math.floor(uc * 0.25);
            case 3: return Math.floor(uc * 0.25);
            case 4: return Math.floor(uc * 0.50);
            case 5: return Math.floor(uc * 0.50);
        }
    }   
    // map risk -> max allowed npc level relative to user combat
    function maxAllowedByRisk(combat_lvl, risk) {
        const uc = Math.max(1, Number(combat_lvl) || 1);
        switch (Number(risk)) {
            case 1: return Math.floor(uc * 0.50);
            case 2: return Math.floor(uc * 0.75);
            case 3: return Math.floor(uc*1.5);
            case 4: return Math.floor(uc * 2);
            case 5: return Math.floor(uc*3);
        }
    }

    var max_npc_level = maxAllowedByRisk(cur_combat_lvl_value, risk_level_value);
    var min_npc_level = minAllowedByRisk(cur_combat_lvl_value, risk_level_value);

    if (max_npc_level > HIGHEST_NPC_LEVEL) {
        max_npc_level = HIGHEST_NPC_LEVEL;
    }


    // filter NPCs by level, wild status, and f2p status
    var filtered_npcs = NPCS.filter(function(npc) {
      if (f2p_value === 0) {
        var npcIsF2P = npc.f2p === true || (Array.isArray(npc.locations) && npc.locations.some(function(loc) { return loc.f2p === true; }));
        if (!npcIsF2P) {
          return false;
        }
      } else if (f2p_value === 2) {
        var npcIsP2P = npc.f2p !== true && (Array.isArray(npc.locations) && npc.locations.some(function(loc) { return loc.f2p !== true; }));
        if (!npcIsP2P) {
          return false;
        }
      }

      // wild_value: 0 = no wild, 1 = include wild (both), 2 = wild only
      if (wild_value === 0) {
        // No wild: only allow non-wild locations
        if (Array.isArray(npc.locations)) {
          var hasNonWild = npc.locations.some(function(loc) {
            return loc.wild === false || loc.wild === undefined;
          });
          if (!hasNonWild) {
            return false;
          }
        } else if (npc.wild === true) {
          return false;
        }
      } else if (wild_value === 2) {
        // Wild only: only allow wild locations
        if (Array.isArray(npc.locations)) {
          var hasWild = npc.locations.some(function(loc) { return loc.wild === true; });
          if (!hasWild) {
            return false;
          }
        } else if (npc.wild !== true) {
          return false;
        }
      }
      // wild_value === 1: include all (no filtering)

      return npc.level <= max_npc_level && npc.level >= min_npc_level;
    });

    // select a random NPC from the filtered list
    var random_npc = filtered_npcs[Math.floor(Math.random() * filtered_npcs.length)];

    // calculate quantity based on combat levels and task amount
    var high_qty = Math.round(40 * (cur_combat_lvl_value / random_npc.level)* task_amount_value);
    var low_qty = Math.round(10 * (cur_combat_lvl_value / random_npc.level)* task_amount_value);
    var quantity = Math.ceil(Math.random( ) * (high_qty - low_qty));

    
    document.getElementById("npc_combat").innerText = random_npc.level;
    document.getElementById("task_npc_name").innerText = random_npc.name;
    document.getElementById("task_quantity").innerText = quantity;

    // display location if location checkbox is selected; respect f2p_value and wild_value when picking a spot
    var show_location = document.getElementById("location").checked;
    var candidate_locations = Array.isArray(random_npc.locations) ? random_npc.locations.slice() : [];
    if (f2p_value === 0) {
      candidate_locations = candidate_locations.filter(function(loc) { return loc.f2p === true; });
    } else if (f2p_value === 2) {
      candidate_locations = candidate_locations.filter(function(loc) { return loc.f2p !== true; });
    }
    if (wild_value === 0) {
      candidate_locations = candidate_locations.filter(function(loc) {
        return loc.wild === false || loc.wild === undefined;
      });
    } else if (wild_value === 2) {
      candidate_locations = candidate_locations.filter(function(loc) {
        return loc.wild === true;
      });
    }

    // Always pick a random location if available (for determining wild status), but only display if show_location is checked
    var random_location = null;
    if (candidate_locations.length > 0) {
      random_location = candidate_locations[Math.floor(Math.random() * candidate_locations.length)];
      if (show_location) {
        document.getElementById("exact_location").innerText = "Location: " + random_location.place;
      } else {
        document.getElementById("exact_location").innerText = "Location: Your Choice";
      }
    } else {
      document.getElementById("exact_location").innerText = "Location: Your Choice";
    }

    var isWildDisplay = false;
    if (random_location) {
      isWildDisplay = random_location.wild === true;
    } else if (wild_value === 2) {
      // Wild only selected: always show Yes
      isWildDisplay = true;
    } else {
      isWildDisplay = random_npc.wild === true;
    }
    document.getElementById("task_npc_wild").innerText = isWildDisplay ? "Yes" : "No";

    // update wiki link row to point to the NPC's wiki page
    var linkCell = document.getElementById("link");
    if (linkCell && random_npc.link) {
      linkCell.innerHTML = '<a href="' + random_npc.link + '" target="_blank" rel="noopener noreferrer">' + random_npc.name + ' Wiki</a>';
    }

  });
}

var calc_kills_remaining = document.getElementById("calc_kills_remaining");
if (calc_kills_remaining) {
      calc_kills_remaining.addEventListener("click", function(e) {
      e.preventDefault();
      var cur_kills_value = parseInt(document.getElementById("current_kills").value);
      var task_quantity = parseInt(document.getElementById("task_quantity").innerText);
      var kills_remaining = task_quantity + cur_kills_value;
      document.getElementById("slayer_task_count").value = kills_remaining;
  });
}


const NPCS = [
  { name: "Spider", level: 2.5, locations:[
    {place: "Al Kharid", wild: false, f2p: true}, 
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "Draynor Manor", wild: false, f2p: true},
    {place: "Black Knights Fortress", wild: false, f2p: true},
    {place: "Lumbridge Castle", wild: false, f2p: true},
    {place: "Varrock Sewers", wild: false, f2p: true},
    {place: "West Ardounge", wild: false, f2p: false},
    {place: "Wilderness Ruins", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Spider"},
  { name: "Rat", level: 2.75, locations:[
    {place: "Goblin Cave", wild: false, f2p: false},
    {place: "Tree Gnome Village", wild: false, f2p: false},
    {place: "Wilderness Ruins", wild: true, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "Goblin Village", wild: false, f2p: true},
    {place: "Ardougne Sewers", wild: false, f2p: false},
    {place: "Battlefield", wild: false, f2p: false},
    {place: "Rimmington", wild: false, f2p: true},
    {place: "Al Kharid", wild: false, f2p: true},
    {place: "Observatory", wild: false, f2p: false},
    {place: "McGrubor's Wood", wild: false, f2p: false},
    {place: "Varrock Palace", wild: false, f2p: true},
    {place: "Lumbridge Castle", wild: false, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Rat"},
  { name: "Chicken", level: 3.5, locations:[
    {place: "Falador Farm", wild: false, f2p: true},
    {place: "Entrana", wild: false, f2p: true},
    {place: "Fred's Farm", wild: false, f2p: true},
    {place: "NorthEast Lumbridge", wild: false, f2p: true},
    {place: "Champions' Guild", wild: false, f2p: true},
    {place: "Varrock Palace", wild: false, f2p: true},
    {place: "Pillars of Zanash", wild: false, f2p: false},
    {place: "Hemenster", wild: false, f2p: false},
    {place: "Sinclair Mansion", wild: false, f2p: false},
    {place: "Barbarian Outpost", wild: false, f2p: false},
    {place: "Tai Bwo Wannai", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Chicken"},
  { name: "Gnome child", level: 3, locations:[
    {place: "Tree Gnome Stronghold", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_child"},
  { name: "Gnome local", level: 3, locations:[
    {place: "Tree Gnome Stronghold", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_local"},
  { name: "Hans", level: 3, locations:[
    {place: "Lumbridge Castle", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Hans"},
  { name: "Gnome troop", level: 3, locations:[
    {place: "Battlefield", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_troop"},
  { name: "Kalron", level: 3, locations:[
    {place: "Tree Gnome Village", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Kalron"},
  { name: "Local gnome", level: 3, locations:[
    {place: "Tree Gnome Village", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Local_gnome"},
  { name: "Imp", level: 5.25, locations:[
    {place: "Falador", wild: false, f2p: true},
    {place: "Edgeville", wild: false, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "Lumbridge", wild: false, f2p: true},
    {place: "Barbarian Village", wild: false, f2p: true},
    {place: "Varrock", wild: false, f2p: true},
    {place: "Karamja", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Imp"},
  { name: "Firebird", level: 6.25, locations:[
    {place: "Entrana", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Firebird"},
  { name: "Goblin", level: 7.75, locations:[
    {place: "Lumbridge", wild: false, f2p: true},
    {place: "Goblin Cave", wild: false, f2p: false},
    {place: "Observatory", wild: false, f2p: false},
    {place: "Port Sarim", wild: false, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Goblin"},
  { name: "Wormbrain", level: 7.75, locations:[
    {place: "Port Sarim", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Wormbrain"},
  { name: "Giant Spider", level: 8.75, locations:[
    {place: "Ardounge Sewers", wild: false, f2p: false},
    {place: "Lumbridge", wild: false, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "Wilderness Ruins", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Giant_Spider"},
  { name: "Rat", level: 8.75, locations:[
    {place: "Goblin Cave", wild: false, f2p: false},
    {place: "Ardougne Sewer Mine", wild: false, f2p: false},
    {place: "Lumbridge Swamp", wild: false, f2p: true},
    {place: "Varrock Sewer", wild: false, f2p: true},
    {place: "Bandit Camp", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Rat"},
  { name: "Cow", level: 8.5, locations:[
    {place: "Lumbridge Farm", wild: false, f2p: true},
    {place: "Crafting Guild", wild: false, f2p: true},
    {place: "Lumbridge North", wild: false, f2p: true},
    {place: "East Ardougne", wild: false, f2p: false},
    {place: "North of Yanille", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Cow"},
  { name: "Gnome local", level: 9, locations:[
    {place: "Tree Gnome Stronghold", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_local"},
  { name: "Man", level: 9.25, locations:[
    {place: "Falador", wild: false, f2p: true},
    {place: "Lumbridge", wild: false, f2p: true},
    {place: "Varrock", wild: false, f2p: true},
    {place: "Edgeville", wild: false, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "Al Kharid", wild: false, f2p: true},
    {place: "Yanille", wild: false, f2p: false},
    {place: "Seers Village", wild: false, f2p: false},
    {place: "East Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Man"},
  { name: "Citizen", level: 10, locations:[
    {place: "West Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Citizen"},
  { name: "Jonny the beard", level: 10, locations:[
    {place: "Varrock", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Jonny_the_Beard"},
  { name: "Mugger", level: 10, locations:[
    {place: "Varrock", wild: false, f2p: true},
    {place: "Asgarnian Ice Dungeon", wild: false, f2p: true},
    {place: "Brimhaven", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Mugger"},
  { name: "Citizen", level: 11, locations:[
    {place: "West Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Citizen"},
  { name: "Citizen", level: 12, locations:[
    {place: "West Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Citizen"},
  { name: "Darkwizard", level: 13, locations:[
    {place: "Wizard's Tower", wild: false, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "North of Goblin Village", wild: true, f2p: true},
    {place: "Dark Wizard Tower", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Darkwizard"},
  { name: "Goblin", level: 13, locations:[
    {place: "West of Tree Gnome Stronghold", wild: false, f2p: false},
    {place: "Fishing Guild", wild: false, f2p: false},
    {place: "Goblin Cave", wild: false, f2p: false},
    {place: "Ardougne Sewer", wild: false, f2p: false},
    {place: "South of Tree Gnome Stronghold", wild: false, f2p: false},
    {place: "Draynor Forest", wild: false, f2p: true},
    {place: "Taverly", wild: false, f2p: false},
    {place: "Goblin Village", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Goblin"},
  { name: "Highwayman", level: 13, locations:[
    {place: "South of Falador", wild: false, f2p: true},
    {place: "North of Draynor", wild: false, f2p: true},
    {place: "North of Seers Village", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Highwayman"},
  { name: "Monk", level: 13, locations:[
    {place: "Monastery", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Monk"},
  { name: "Rat", level: 13.25, locations:[
    {place: "Goblin Cave", wild: false, f2p: false},
    {place: "Varrock Wilderness", wild: true, f2p: true},
    {place: "Tree Gnome Village", wild: false, f2p: false},
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "Wilderness Ruins", wild: true, f2p: true},
    {place: "Port Sarim", wild: false, f2p: true},
    {place: "Varrock Sewer", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Rat"},
  { name: "Blessed Vermen", level: 14, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Blessed_Vermen"},
  { name: "Citizen", level: 15, locations:[
    {place: "West Ardougne", wild: false, f2p: false}
  ], link: "https://classic.runescape.wiki/w/Citizen"},
  { name: "Farmer", level: 15, locations:[
    {place: "Falador Farm", wild: false, f2p: true},
    {place: "Lumbridge", wild: false, f2p: true},
    {place: "Varrock" , wild: false, f2p: true},
    {place: "Hemenster", wild: false, f2p: false},
    {place: "East Ardougne", wild: false, f2p: false},
    {place: "Seer's Village", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Farmer"},
  { name: "Barbarian", level: 16, locations:[
    {place: "Barbarian Village", wild: false, f2p: true},
    {place: "Barbarian Outpost", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Barbarian"},
  { name: "Dungeon Rat", level: 16,  locations:[
    {place: "Ardougne sewers", wild: false, f2p: false},
    {place: "Observatory dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Dungeon_Rat"},
  { name: "Mining Slave", level: 16, locations:[
    {place: "Desert Mining Camp mine", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Mining_Slave"},
  { name: "Rowdy Slave", level: 16, locations:[
    {place: "Desert Mining Camp mine", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Rowdy_Slave"},
  { name: "Souless", level: 16, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Souless"},
  { name: "Wizard", level: 16, locations:[
    {place: "Wizard's Tower", wild: false, f2p: true},
    {place: "Falador Farm", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Wizard"},
  { name: "Slave", level: 16, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Slave"},
  { name: "Dwarf", level: 18, locations:[
    {place: "Inside Dwarven Mine", wild: false, f2p: true},
    {place: "Outside Dwarven Mine", wild: false, f2p: true},
    {place: "South of Yanille", wild: false, f2p: false},
    {place: "Coal Trucks", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Dwarf"},
  { name: "Thug", level: 18, locations:[
    {place: "Edgeville Dungeon", wild: true, f2p: false},
    {place: "Edgeville Wild", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Thug"},
  { name: "Warrior", level: 18, locations:[
    {place: "Al Karid", wild: false, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Warrior"},
  { name: "Civillian", level: 18, locations:[
    {place: "West Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Civillian"},
  { name: "Chaos Druid", level: 19, locations:[
    {place: "Edgeville dungeon", wild: true, f2p: false},
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Yanille Agility Dungeon", wild: false, f2p: false},
    {place: "Chaos Druid Tower", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Chaos_Druid"},
  { name: "Goblin", level: 19, locations:[
    {place: "Observatory", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Goblin"},
  { name: "Iban disciple", level: 19, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Iban_disciple"},
  { name: "Monk of Zamorak", level: 19, locations:[
    {place: "Chaos Temple", wild: false, f2p: true},
    {place: "Grave of Scorpius", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Monk_of_Zamorak"},
  { name: "Zombie", level: 19, locations:[
    {place: "Varrock Sewers", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Zombie"},
  { name: "Citizen", level: 20, locations:[
    {place: "West Ardougne", wild: false, f2p: false}
  ], link: "https://classic.runescape.wiki/w/Citizen"},
  { name: "Zoo keeper", level: 20, locations:[
    {place: "Ardougne Zoo", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Zoo_keeper"},
  { name: "Dark Warrior", level: 21, locations:[
    {place: "Dark Warrior Fortress", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Dark_Warrior"},
  { name: "Forester", level: 21, locations:[
    {place: "McGrubor's Wood", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Forester"},
  { name: "Rogue", level: 21, locations:[
    {place: "Rogues' House", wild: true, f2p: false},
    {place: "Rouges' Mine", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Rogue"},
  { name: "Scorpion", level: 21, locations:[
    {place: "Edgeville Wilderness", wild: true, f2p: true},
    {place: "Dwarven Mine", wild: false, f2p: true},
    {place: "Karamja", wild: false, f2p: true},
    {place: "Al Kharid", wild: false, f2p: true},
    {place: "Ardougne Zoo", wild: false, f2p: false},
    {place: "Varrock sewers", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Scorpion"},
  { name: "Thief", level: 21, locations:[
    {place: "Ardougne Sewers", wild: false, f2p: false},
    {place: "Varrock", wild: false, f2p: true},
    {place: "Port Sarim", wild: false, f2p: true},
    {place: "Brimhaven", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Thief"},
  { name: "Unicorn", level: 21, locations:[
    {place: "South Varrock", wild: false, f2p: true},
    {place: "Barbarian Village", wild: false, f2p: true},
    {place: "Entrana", wild: false, f2p: true},
    {place: "Catherby", wild: false, f2p: false},
    {place: "Draynor Forest", wild: false, f2p: true},
    {place: "Seer's Village", wild: false, f2p: false},
    {place: "Gu'Tanoth", wild: false}
    ], link: "https://classic.runescape.wiki/w/Unicorn"},
  { name: "Skeleton", level: 21, locations:[
    {place: "Digsite Dungeon", wild: false, f2p: false},
    {place: "Varrock Sewers", wild: false, f2p: true},
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "Draynor Manor", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Skeleton"},
  { name: "Skeleton mage", level: 21, locations:[
    {place: "Waterfall Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Skeleton_Mage"},
  { name: "Dungeon spider", level: 22, locations:[
    {place: "Observatory", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Dungeon_Spider"},
  { name: "Mourner", level: 22, locations:[
    {place: "West Ardougne", wild: false, f2p: false},
    {place: "East Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Mourner"},
  { name: "Gnome guard", level: 23, locations:[
    {place: "Tree Gnome Stronghold", wild: false, f2p: false},
    {place: "Tree Gnome Village", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_guard"},
  { name: "Bear", level: 24, locations:[
    {place: "South of Yanille", wild: false, f2p: false},
    {place: "Ardougne Zoo", wild: false, f2p: false},
    {place: "Ice Mountain", wild: false, f2p: true},
    {place: "Draynor Forest", wild: false, f2p: true},
    {place: "Tree Gnome Stronghold", wild: false, f2p: false},
    {place: "Entrana", wild: false, f2p: true},
    {place: "Falador", wild: false, f2p: true},
    {place: "Grave of Scorpius", wild: false, f2p: false},
    {place: "Tree Gnome Village", wild: false, f2p: false},
    {place: "Varrock Palace", wild: false, f2p: true},
    {place: "Edgeville to Varrock Path", wild: false, f2p: true},
    {place: "Edgeville Wilderness", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Bear"},
  { name: "Souless", level: 24, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Souless"},
  { name: "Target practice zombie", level: 24, locations:[
    {place: "Wizards Guild", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Target_practice_zombie"},
  { name: "Zombie", level: 24, locations:[
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "Wilderness Graveyard", wild: true, f2p: true},
    {place: "Varrock Sewers", wild: false, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Zombie"},
  { name: "Darkwizard", level: 25, locations:[
    {place: "Dark Wizards Tower", wild: false, f2p: false},
    {place: "South of Varrock", wild: false, f2p: true},
    {place: "Wild near Chaos Temple", wild: true, f2p: true},
    {place: "Wizard's Tower", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Darkwizard"},
  { name: "Ghost", level: 25, locations:[
    {place: "West Ruins", wild: true, f2p: true},
    {place: "Bone Yard", wild: true, f2p: true},
    {place: "Melzar's Maze", wild: false, f2p: true},
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Varrock Sewers", wild: false, f2p: true},
    {place: "East of Bandit Camp", wild: true, f2p: true},
    {place: "Draynor Manor", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Ghost"},
  { name: "Mourner", level: 25, locations:[
    {place: "West Ardougne", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Mourner"},
  { name: "Witch", level: 25, locations:[
    {place: "Al Kharid", wild: false, f2p: true},
    {place: "Draynor Manor", wild: false, f2p: true}   
    ], link: "https://classic.runescape.wiki/w/Witch"},
  { name: "Skeleton", level: 25, locations:[
    {place: "Taverley dungeon", wild: false, f2p: false},
    {place: "Karamja Volcano", wild: false, f2p: true},
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "West of Legends Guild", wild: false, f2p: false},
    {place: "Edgeville Wild", wild: true, f2p: true},
    {place: "Skeleton Mine", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Skeleton"},
  { name: "Bear", level: 26, locations:[
    {place: "East Ardougne", wild: false, f2p: false},
    {place: "West of the Fortress", wild: true, f2p: true},
    {place: "Bandit Camp", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Bear"},
  { name: "Poison Scorpion", level: 26, locations:[
    {place: "West Brimhaven", wild: false, f2p: false},
    {place: "Taverley Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Poison_Scorpion"},
  { name: "Gnome guard", level: 27, locations:[
    {place: "Tree Gnome Stronghold", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_guard"},
  { name: "Pirate", level: 27, locations:[
    {place: "Pirate Hall", wild: true, f2p: false},
    {place: "Asgarnian Ice Dungeon", wild: false, f2p: true},
    {place: "Port Sarim Jail", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Pirate"},
  { name: "Warrior", level: 27, locations:[
    {place: "Ardougne Palace", wild: false, f2p: false},
    {place: "Varrock Palace", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Warrior"},
  { name: "Guard", level: 28, locations:[
    {place: "Falador", wild: false, f2p: true},
    {place: "Falador", wild: false, f2p: true},
    {place: "Edgeville", wild: false, f2p: true},
    {place: "Varrock,", wild: false, f2p: true},
    {place: "East Ardougne", wild: false, f2p: false},
    {place: "Black Knights' Fortress", wild: false, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Guard"},
  { name: "Khazard troop", level: 28, locations:[
    {place: "Khazard Battlefield", wild: false, f2p: false}
    ],  link: "https://classic.runescape.wiki/w/Khazard_troop"},
  { name: "Mountain Dwarf", level: 28, locations:[
    {place: "Dwarven Tunnel", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Mountain_Dwarf"},
  { name: "Soldier", level: 28, locations:[
    {place: "Yanille", wild: false, f2p: false},   
    ], link: "https://classic.runescape.wiki/w/Soldier"},
  { name: "Carnillean guard", level: 28, locations:[
    {place: "Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Carnillean_guard"},
  { name: "Bandit", level: 29, locations:[
    {place: "Bandit Camp", wild: true, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Bandit"},
  { name: "Druid", level: 29, locations:[
    {place: "Taverley", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Druid"},
  { name: "Ghost", level: 29, locations:[
    {place: "Grave of Scorpius", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ghost_(Grave_of_Scorpius)"},
  { name: "Monk of Zamorak", level: 29, locations:[
    {place: "Grave of Scorpius", wild: false, f2p: false},
    {place: "Chaos Temple", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Monk_of_Zamorak"},
  { name: "Pirate", level: 30, locations:[
    {place: "Brimhaven", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Pirate"},
  { name: "Platform Fisherman", level: 30, locations:[
    {place: "Fishing Platform", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Platform_Fisherman"},
  { name: "Black Unicorn", level: 31, locations:[
    {place: "Eastern Wilderness", wild: true, f2p: false}
  ], link: "https://classic.runescape.wiki/w/Black_Unicorn"},
  { name: "Desert Wolf", level: 31, locations:[
    {place: "Al Kharid Desert", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Desert_Wolf"},
  { name: "Giant Spider", level: 31, locations:[
    {place: "West Ruins", wild: true, f2p: true},
    {place: "Sapphire House", wild: true, f2p: true},
    {place: "Ardougne Sewers", wild: false, f2p: false},
    {place: "Varrock Sewers", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Giant_Spider"},
  { name: "Gnome guard", level: 31, locations:[
    {place: "Tree Gnome Stronghold", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Gnome_guard"},
  { name: "White wolf sentry", level: 31, locations:[
    {place: "White Wolf Mountain", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/White_Wolf_Sentry"},
  { name: "Skeleton", level: 31, locations:[
    {place: "Crandor", wild: false, f2p: true},
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "Varrock Sewers", wild: false, f2p: true},
    {place: "Melzar's Maze", wild: false, f2p: true},
    {place: "Big Bone Graveyard", wild: true, f2p: true},
    {place: "Wilderness Agility Course", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Skeleton"},
  { name: "Giant bat", level: 32, locations:[
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Ogre Enclave", wild: false, f2p: false},
    {place: "Skavid Caves", wild: false, f2p: false},
    {place: "Underground Pass", wild: false, f2p: false},
    {place: "Goblin Cave", wild: false, f2p: false},
    {place: "Tree Gnome Village", wild: false, f2p: false},
    {place: "Legends' Guild", wild: false, f2p: false},
    {place: "Yanille Agility Dungeon", wild: false, f2p: false},
    {place: "South of Seers Village", wild: false, f2p: false},
    {place: "Coal Trucks", wild: false, f2p: false},
    {place: "Waterfall Dungeon", wild: false, f2p: false},
    {place: "Axe House", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Giant_Bat"},
  { name: "Hobgoblin", level: 32, locations:[
    {place: "Hobgoblin Mine", wild: true, f2p: true},
    {place: "Hobgoblin Peninsula", wild: false, f2p: true},
    {place: "Tree Gnome Village", wild: false, f2p: false},
    {place: "Edgeville Dungeon,", wild: false, f2p: true},
    {place: "Asgarnian Ice Dungeon", wild: false, f2p: true},
    {place: "Crandor", wild: false, f2p: true},
    ], link: "https://classic.runescape.wiki/w/Hobgoblin"},
  { name: "Oomlie Bird", level: 32, locations:[
    {place: "Kharazi Jungle", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Oomlie_Bird"},
  { name: "Shantay Pass Guard", level: 32, locations:[
    {place: "Shantay Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Shantay_Pass_Guard"},
  { name: "Zombie", level: 32, locations:[
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "Entrana Dungeon", wild: false, f2p: false},
    {place: "Gnome Village Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Zombie"},
  { name: "Yanille Watchman", level: 33, locations:[
    {place: "Yanille", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Yanille_Watchman"},
  { name: "Head Thief", level: 34, locations:[
    {place: "Ardougne Sewers", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Head_Thief"},
  { name: "Jailguard", level: 34, locations:[
    {place: "Draynor Jail", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Jailguard"},
  { name: "Necromancer", level: 34, locations:[
    {place: "South of Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Necromancer"},
  { name: "Blessed Spider", level: 35, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Blessed_Spider"},
  { name: "Pit Scorpion", level: 35, locations:[
    {place: "Legends Guild", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Pit_Scorpion"},
  { name: "Deadly Red spider", level: 36, locations:[
    {place: "Red Spiders Village", wild: true, f2p: true},
    {place: "Runite Mine", wild: true, f2p: true},
    {place: "Edgeville Dungeon", wild: false, f2p: false},
    {place: "Varrock Sewers", wild: false, f2p: true},
    {place: "Karamja Dungeon", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Deadly_Red_Spider"},
  { name: "King Scorpion", level: 36, locations:[
    {place: "Scorpion Ravine", wild: true, f2p: false},
    {place: "Lava Maze", wild: true, f2p: true},
    {place: "Crandor", wild: false, f2p: true},
    {place: "Dwarven Mine", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/King_Scorpion"},
  { name: "Giant", level: 37, locations:[
    {place: "Edgeville Dungeon", wild: false, f2p: true},
    {place: "Deep Wilderness Dungeon", wild: true, f2p: false},
    {place: "Lava Maze", wild: true, f2p: true},
    {place: "Feldip Hills", wild: false, f2p: false},
    {place: "Tree Gnome Village", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Giant"},
  { name: "Gunthor the Brave", level: 37, locations:[
    {place: "Barbarian Village", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Gunthor_the_Brave"},
  { name: "Black Heather", level: 39, locations:[
    {place: "Bandit Camp", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Black_Heather"},
  { name: "Donny the lad", level: 39, locations:[
    {place: "Bandit Camp", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Donny_the_lad"},
  { name: "Mercenary", level: 39, locations:[
    {place: "Bandit Camp", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Mercenary"},
  { name: "Speedy Keith", level: 39, locations:[
    {place: "Bandit Camp", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Speedy_Keith"},
  { name: "Tribesman", level: 39, locations:[
    {place: "Khazari Jungle", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Tribesman"},
  { name: "Khazard commander", level: 41, locations:[
    {place: "Khazard Battlefield", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Khazard_Commander"},
  { name: "White wolf", level: 41, locations:[
    {place: "White Wolf Mountain", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/White_Wolf"},
  { name: "Chaos Druid warrior", level: 44, locations:[
    {place: "Yanille Agility Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Chaos_Druid_Warrior"},
  { name: "Shipyard worker", level: 44, locations:[
    {place: "Karamja Shipyard", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Shipyard_Worker"},
  { name: "Melzar the mad", level: 45, locations:[
    {place: "Melzar's Maze", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Melzar_the_Mad"},
  { name: "Ugthanki", level: 45, locations:[
    {place: "Al Kharid Desert", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ugthanki"},
  { name: "Animated axe", level: 46, locations:[
    {place: "Axe House", wild: true, f2p: false},
    {place: "Taverly Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Animated_Axe"},
  { name: "Black Knight", level: 46, locations:[
    {place: "Black Knights' Fortress", wild: false, f2p: true},
    {place: "Draynor Village", wild: false, f2p: true},
    {place: "Varrock", wild: false, f2p: true},
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Lava Maze", wild: true, f2p: true},
    {place: "West of the Bone Yard", wild: true, f2p: true},
    {place: "Port Sarim", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Black_Knight"},
  { name: "Grip", level: 46, locations:[
    {place: "Brimhaven", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Grip"},
  { name: "Guard Dog", level: 46, locations:[
    {place: "East Ardougne", wild: false, f2p: false},
    {place: "McGrubor's Wood", wild: false, f2p: false},
    {place: "Brimhaven Mansion", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Guard_Dog"},
  { name: "Jungle Spider", level: 47, locations:[
    {place: "Karamja Jungle", wild: false, f2p: false},
    {place: "Hazelmere's Island", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Jungle_Spider" },
  { name: "Monk of Zamorak", level: 47, locations:[
    {place: "Taverly Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Monk_of_Zamorak"},
  { name: "Captain Siad", level: 48, locations:[
    {place: "Desert Mining Camp", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Captain_Siad" },
  { name: "Hobgoblin", level: 48, locations:[
    {place: "Pillars of Zanash", wild: true, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Hobgoblin"},
  { name: "Baby Blue Dragon", level: 50, locations:[    
    {place: "Taverley Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Baby_Blue_Dragon"},
  { name: "Mercenary", level: 50, locations:[
    {place: "Desert Mining Camp", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Mercenary"},
  { name: "Rowdy Guard", level: 50, locations:[
    {place: "Desert Mining Camp", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Rowdy_Guard" },
  { name: "Colonel Radick", level: 51, locations:[
    {place: "Yanille", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Colonel_Radick"},
  { name: "Jailer", level: 51, locations:[
    {place: "Taverley Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Jailer"},
  { name: "Renegade knight", level: 51, locations:[
    {place: "Keep LeFaye", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Renegade_Knight"},
  { name: "Guthix Battle mage", level: 52, locations:[
    {place: "Mage Arena", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Battle_Mage"},
      { name: "Zamorak Battle mage", level: 52, locations:[
    {place: "Mage Arena", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Battle_Mage"},
      { name: "Saradomin Battle mage", level: 52, locations:[
    {place: "Mage Arena", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Battle_Mage"},
  { name: "Earth warrior", level: 52, locations:[
    {place: "Edgeville Dungeon", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Earth_Warrior"},
  { name: "Shadow spider", level: 53, locations:[
    {place: "Deep Wild Dungeon", wild: true, f2p: false},
    {place: "Waterfall Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Shadow_Spider"},
  { name: "Skeleton", level: 54, locations:[
    {place: "Crandor Dungeon", wild: false, f2p: true},
    {place: "Temple of Ikov", wild: false, f2p: false},
    {place: "Yanille Agility Dungeon", wild: false, f2p: false},
    {place: "Edgeville Dungeon", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Skeleton"},
  { name: "Knight", level: 56, locations:[
    {place: "East Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Knight"},
  { name: "White Knight", level: 56, locations:[
    {place: "Falador", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/White_Knight"},
  { name: "Ice warrior", level: 57, locations:[
    {place: "Asgarnian Ice Dungeon", wild: false, f2p: true},
    {place: "Ice Queen Maze", wild: false, f2p: false},
    {place: "Ice Plateau", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Ice_warrior"},
  { name: "Jogre", level: 58, locations:[
    {place: "Karamja East", wild: false, f2p: false},
    {place: "Karamja West", wild: false, f2p: false},
    {place: "Jogre Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Jogre"},
  { name: "Ogre", level: 58, locations:[
    {place: "Feldip Hills", wild: false, f2p: false},
    {place: "Gu'tanoth", wild: false, f2p: false},
    {place: "Chaos Druid Tower", wild: false, f2p: false},
    {place: "Ardougne Sewers", wild: false, f2p: false},
    {place: "Underground Pass", wild: false, f2p: false},
    {place: "Pillars of Zanash", wild: false, f2p: false},
    {place: "Combat Training Camp", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ogre"},
  { name: "Ogre citizen", level: 58, locations:[
    {place: "Gu'tanoth", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ogre_Citizen"},
  { name: "Sir Mordred", level: 58, locations:[
    {place: "Keep LaFaye", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Sir_Mordred"},
  { name: "Chaos Dwarf", level: 59, locations:[
    {place: "Taverley dungeon", wild: false, f2p: false},
    {place: "Chaos Ridge", wild: true, f2p: true},
    {place: "Deep Wild Dungeon", wild: true, f2p: false},
    {place: "Chaos Dwarf Mine", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Chaos_Dwarf"},
  { name: "Karamja Wolf", level: 61, locations:[
    {place: "Kharazi Jungle", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Karamja_Wolf"},
  { name: "Moss Giant", level: 62, locations:[
    {place: "Near Fishing Guild", wild: false, f2p: false},
    {place: "Crandor", wild: false, f2p: true},
    {place: "Varrock Sewers", wild: false, f2p: true},
    {place: "Near Red Dragon Isle", wild: true, f2p: true},
    {place: "Glarial's Tomb", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Moss_Giant"},
  { name: "UndeadOne", level: 62, locations:[
    {place: "Shilo Village", wild: false, f2p: false},
    {place: "Rashiliyia's Tomb", wild: false, f2p: false},
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/UndeadOne"},
  { name: "Poison Spider", level: 63, locations:[
    {place: "Lava Maze Dungeon", wild: true, f2p: true},
    {place: "Yanille Agility Dungeon", wild: false, f2p: false},
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Edgeville Dungeon", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Poison_spider"},
  { name: "The Fire warrior of lesarkus", level: 63, locations:[
    {place: "Temple of Ikov", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Fire_Warrior_of_Lesarkus"},
  { name: "Grey wolf", level: 64, locations:[
    {place: "Near Tree Gnome Stronghold", wild: false, f2p: false},
    {place: "Feldip Hills", wild: false, f2p: false},
    {place: "Wilderness Agility Course", wild: true, f2p: false},
    {place: "Near Scorpion Ravine", wild: true, f2p: false},
    {place: "East Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Grey_wolf"},
  { name: "Ice spider", level: 64, locations:[
    {place: "Temple of Ikov", wild: false, f2p: false},
    {place: "Ice Plateau", wild: true, f2p: false},
    {place: "Ice Queen Maze", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ice_Spider"},
  { name: "Mercenary Captain", level: 64, locations:[
    {place: "Desert Mining Camp", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Mercenary_Captain"},
  { name: "Shadow Warrior", level: 64, locations:[
    {place: "Legend's Guild", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Shadow_Warrior"},
  { name: "Otherworldly being", level: 66, locations:[
    {place: "Zanaris", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Otherworldly_Being"},
  { name: "Ice Giant", level: 68, locations:[
    {place: "Ice Plateau", wild: true, f2p: true},
    {place: "Asgarnian Ice Dungeon", wild: false, f2p: true},
    {place: "Ice Queen Maze", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ice_Giant"},
  { name: "Salarin the twisted", level: 69, locations:[
    {place: "Yanille Agility Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Salarin_the_Twisted"},
  { name: "Bedabin Nomad Guard", level: 70, locations:[
    {place: "Bedabin Camp", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Bedabin_Nomad_Guard"},
  { name: "Pack leader", level: 71, locations:[
    { place: "White Wolf Mountain", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Pack_Leader"},
  { name: "Paladin", level: 71, locations:[
    {place: "East Ardougne", wild: false, f2p: false},
    {place: "Ardougne Palace, 2nd floor", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Paladin"},
  { name: "Lord Darquarius", level: 76, locations:[
    {place: "Taverley Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Lord_Darquarius"},
  { name: "Holthion", level: 78, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Holthion"},
  { name: "Kalrag", level: 78, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Kalrag"},
  { name: "Ogre chieftan", level: 78, locations:[
    {place: "Gu'tanoth", wild: false, f2p: false},
    {place: "Feldip Hills", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ogre_Chieftain"},
  { name: "Ogre guard", level: 78, locations:[
    {place: "Gu'tanoth", wild: false, f2p: false},
    {place: "Feldip Hills", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ogre_Guard"},
  { name: "Othainian", level: 78, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Othainian"},
  { name: "Lesser Demon", level: 79, locations:[
    {place: "Crandor Dungeon", wild: false, f2p: true},
    {place: "Karamja Dungeon", wild: false, f2p: true},
    {place: "KBD Entrance", wild: true, f2p: false},
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Temple of Ikov Dungeon", wild: false, f2p: false},
    {place: "Greater Demon Ruins", wild: true, f2p: true},
    {place: "Lava Maze", wild: true, f2p: true},
    {place: "Wizard's Tower", wild: false, f2p: true},
    {place: "Melzar's Maze", wild: false, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Lesser_Demon"},
  { name: "Death Wing", level: 80, locations:[
    {place: "Legends Quest Cavern", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Death_Wing"},
  { name: "Hero", level: 83, locations:[
    {place: "East Ardougne", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Hero"},
  { name: "Greater Demon", level: 87, locations:[
    {place: "Entrana Dungeon", wild: false, f2p: false},
    {place: "Lava Maze", wild: true, f2p: true},
    {place: "Greater Demon Ruins", wild: true, f2p: true}
    ], link: "https://classic.runescape.wiki/w/Greater_Demon"},
  { name: "Jungle Savage", level: 87, locations:[
    {place: "Kharazi Jungle", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Jungle_Savage"},
  { name: "Tree spirit", level: 95, locations:[
    {place: "Entrana Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Tree_Spirit"},
  { name: "Ogre guard", level: 96, locations:[
    {place: "Gu'tanoth", wild: false, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Ogre_Guard#Level_96"},
  { name: "Doomion", level: 98, locations:[
    {place: "Underground Pass", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Doomion"},
  { name: "General Khazard", level: 100, locations:[
    {place: "Khazard Battlefield 2nd Floor", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/General_Khazard"},
  { name: "Khazard warlord", level: 100, locations:[
    {place: "Khazard Battlefield", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Khazard_Warlord"},
  { name: "Ice queen", level: 103, locations:[
    {place: "Ice Queen Maze", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Ice_Queen"},
  { name: "Blue Dragon", level: 105, locations:[
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Hero's Guild Mine", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Blue_Dragon"},
  { name: "Fire Giant", level: 109, locations:[
    {place: "Waterfall", wild: false, f2p: false},
    {place: "Deep Wild Dungeon", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Fire_Giant"},
  { name: "Hellhound", level: 114, locations:[
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Pillars of Zanash", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Hellhound"},
  { name: "Red Dragon", level: 140, locations:[
    {place: "Red Dragon Isle", wild: true, f2p: false},
    ], link: "https://classic.runescape.wiki/w/Red_Dragon"},
  { name: "Black Demon", level: 156, locations:[
    {place: "Taverley Dungeon", wild: false, f2p: false},
    {place: "Edgeville Dungeon", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Black_Demon"},
  { name: "Black Dragon", level: 200, locations:[
    {place: "Lava Maze", wild: true, f2p: false},
    {place: "Taverley Dungeon", wild: false, f2p: false}
    ], link: "https://classic.runescape.wiki/w/Black_Dragon"
  },
  { name: "King Black Dragon", level: 245, locations:[
    {place: "KBD Lair", wild: true, f2p: false}
    ], link: "https://classic.runescape.wiki/w/King_Black_Dragon"}
];