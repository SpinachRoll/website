document.getElementById("calc_thieving_lvl").addEventListener("click", function() {
    var cur_thieving_lvl = document.getElementById("cur_thieving_lvl");
    var cur_thieving_lvl_value = parseInt(cur_thieving_lvl.value);
    var des_thieving_level = document.getElementById("des_thieving_lvl");
    var des_thieving_lvl_value = parseInt(des_thieving_level.value);
    var cur_thieving_xp = document.getElementById("cur_thieving_xp");
    var cur_thieving_xp_value = parseInt(cur_thieving_xp.value);
    var des_thieving_xp = document.getElementById("des_thieving_xp");
    var des_thieving_xp_value = parseInt(des_thieving_xp.value);
    var c_t_l_xp;
    var d_t_l_xp;
    var total;
    var chance;
    var c_t_l_f_xp;
    var c_t_l;

    //get the corrosponding level from the xp input into the calculator
    c_t_l_xp = parseInt(xpforlvl[cur_thieving_lvl_value]);
    d_t_l_xp = parseInt(xpforlvl[des_thieving_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_thieving_xp_value) {
          c_t_l_f_xp = i - 1;
          break;
        }
        c_t_l_f_xp = 99;
    }

    //get the current thieving level based off level input, or xp input,
    //and use it to output the chance to pickpocket things in the form
    if (c_t_l_f_xp >= cur_thieving_lvl_value) {
        c_t_l = c_t_l_f_xp;
    }
    else if (c_t_l_f_xp < cur_thieving_lvl_value){
        c_t_l = cur_thieving_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_t_l_xp >= cur_thieving_xp_value) {
        if (d_t_l_xp >= des_thieving_xp_value){
            total = d_t_l_xp - c_t_l_xp;
        }
        else {
            total = des_thieving_xp_value - c_t_l_xp;
        }
    } 
    else {
        if (d_t_l_xp >= des_thieving_xp_value){
            total = d_t_l_xp - cur_thieving_xp_value;
        }
        else {
            total = des_thieving_xp_value - cur_thieving_xp_value;
        }
    }  
    
    if (total > 0) {
        man_need.innerHTML = Math.ceil(total/8);
        farmer_need.innerHTML = Math.ceil(total/14.5);
        warrior_need.innerHTML = Math.ceil(total/26);
        rogue_need.innerHTML = Math.ceil(total/36.5);
        guard_need.innerHTML = Math.ceil(total/46.75);
        knight_need.innerHTML = Math.ceil(total/84.25);
        watchman_need.innerHTML = Math.ceil(total/137.5);
        paladin_need.innerHTML = Math.ceil(total/151.75);
        gnome_need.innerHTML = Math.ceil(total/198.25);
        hero_need.innerHTML = Math.ceil(total/273.25);

        tea_need.innerHTML = Math.ceil(total/16);
        baker_need.innerHTML = Math.ceil(total/16);
        rock_cake_need.innerHTML = Math.ceil(total/16);
        silk_need.innerHTML = Math.ceil(total/24);
        fur_need.innerHTML = Math.ceil(total/36);
        silver_need.innerHTML = Math.ceil(total/54);
        spice_need.innerHTML = Math.ceil(total/81);
        gem_need.innerHTML = Math.ceil(total/16);

        ten_coin_chest_need.innerHTML = Math.ceil(total/7.5);
        nature_chest_need.innerHTML = Math.ceil(total/25);
        fifty_coin_chest_need.innerHTML = Math.ceil(total/125);
        hemenster_chest_need.innerHTML = Math.ceil(total/150);
        blood_chest_need.innerHTML = Math.ceil(total/250);
        paladin_chest_need.innerHTML = Math.ceil(total/500);
        
    }

	man_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(1 * 1.5)))/128) * 100).toFixed(2);
    farmer_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(10 * 1.5)))/128) * 100).toFixed(2);
    warrior_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(25 * 1.5)))/128) * 100).toFixed(2);
    rogue_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(32 * 1.5)))/128) * 100).toFixed(2);
    guard_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(40 * 1.5)))/128) * 100).toFixed(2);
    knight_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(55 * 1.5)))/128) * 100).toFixed(2);
    watchman_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(65 * 1.5)))/128) * 100).toFixed(2);
    paladin_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(70 * 1.5)))/128) * 100).toFixed(2);
    gnome_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(75 * 1.5)))/128) * 100).toFixed(2);
    hero_success = ((Math.min(127, Math.max(1, cur_thieving_lvl_value + 40 + 40 - Math.floor(80 * 1.5)))/128) * 100).toFixed(2);



    chance = "Chance to pickpocket if you have the required level<br><br>";
    switch (true) {
        case (c_t_l >= 85):
            chance +=  "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>"
            + "Guard " + guard_success + "%<br>"
            + "Knight " + knight_success + "%<br>"
            + "Watchman " + watchman_success + "%<br>"
            + "Paladin " + paladin_success + "%<br>"
            + "Gnomes " + gnome_success + "%<br>"
            + "Hero " + hero_success + "%<br>";
            break;
        case (c_t_l < 85 && c_t_l >= 75):
            chance +=  "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>"
            + "Guard " + guard_success + "%<br>"
            + "Knight " + knight_success + "%<br>"
            + "Watchman " + watchman_success + "%<br>"
            + "Paladin " + paladin_success + "%<br>"
            + "Gnomes " + gnome_success + "%<br>";
        break;
        case (c_t_l < 75 && c_t_l >= 70):
            chance +=  "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>"
            + "Guard " + guard_success + "%<br>"
            + "Knight " + knight_success + "%<br>"
            + "Watchman " + watchman_success + "%<br>"
            + "Paladin " + paladin_success + "%<br>";
            break; 
        case (c_t_l < 70 && c_t_l >= 65):
            chance +=  "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>"
            + "Guard " + guard_success + "%<br>"
            + "Knight " + knight_success + "%<br>"
            + "Watchman " + watchman_success + "%<br>";
            break;
        case (c_t_l < 65 && c_t_l >= 55):
            chance +=  "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>"
            + "Guard " + guard_success + "%<br>"
            + "Knight " + knight_success + "%<br>";
            break;
        case (c_t_l < 55 && c_t_l >= 40):
            chance += "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>"
            + "Guard " + guard_success + "%<br>";
            break;
        case (c_t_l < 40 && c_t_l >= 32):
            chance += "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>"
            + "Rogue " + rogue_success + "%<br>";
            break;
        case (c_t_l < 32 && c_t_l >= 25):
            chance += "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>"
            + "Warrior " + warrior_success + "%<br>";
            break;
        case (c_t_l < 25 && c_t_l >= 10):
            chance += "Man " + man_success +"%<br>"
            + "Farmer " + farmer_success + "%<br>";
            break;
        default:
            chance += "Man " + man_success +"%<br>";
    }
    
    total = Math.max(total,0);
    thieving_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Thieving Level.<br><br>"
    + chance;

})

var stall_table = document.getElementById("thieving_table_2");
var stall_button = document.getElementById("stall_button");

stall_button.addEventListener("click", function() {
    if (stall_table.style.display == "none") {
        stall_table.style.display = "table";
        stall_button.innerHTML = "Stalls";
    } else {
        stall_table.style.display = "none";
        stall_button.innerHTML = "<s>Stalls</s>";
    }
});

var chest_table = document.getElementById("thieving_table_3");
var chest_button = document.getElementById("chest_button");

chest_button.addEventListener("click", function() {
    if (chest_table.style.display == "none") {
        chest_table.style.display = "table";
        chest_button.innerHTML = "Chests";
    } else {
        chest_table.style.display = "none";
        chest_button.innerHTML = "<s>Chests</s>";
    }
});

var xpforlvl = new Array(100)
xpforlvl[1] = 0
xpforlvl[2] = 83
xpforlvl[3] = 174
xpforlvl[4] = 276
xpforlvl[5] = 388
xpforlvl[6] = 512
xpforlvl[7] = 650
xpforlvl[8] = 801
xpforlvl[9] = 969
xpforlvl[10] = 1154
xpforlvl[11] = 1358
xpforlvl[12] = 1584
xpforlvl[13] = 1833
xpforlvl[14] = 2107
xpforlvl[15] = 2411
xpforlvl[16] = 2746
xpforlvl[17] = 3115
xpforlvl[18] = 3523
xpforlvl[19] = 3973
xpforlvl[20] = 4470
xpforlvl[21] = 5018
xpforlvl[22] = 5624
xpforlvl[23] = 6291
xpforlvl[24] = 7028
xpforlvl[25] = 7842
xpforlvl[26] = 8740
xpforlvl[27] = 9730
xpforlvl[28] = 10824
xpforlvl[29] = 12031
xpforlvl[30] = 13363
xpforlvl[31] = 14833
xpforlvl[32] = 16456
xpforlvl[33] = 18247
xpforlvl[34] = 20224
xpforlvl[35] = 22406
xpforlvl[36] = 24815
xpforlvl[37] = 27473
xpforlvl[38] = 30408
xpforlvl[39] = 33648
xpforlvl[40] = 37224
xpforlvl[41] = 41171
xpforlvl[42] = 45529
xpforlvl[43] = 50339
xpforlvl[44] = 55649
xpforlvl[45] = 61512
xpforlvl[46] = 67983
xpforlvl[47] = 75127
xpforlvl[48] = 83014
xpforlvl[49] = 91721
xpforlvl[50] = 101333
xpforlvl[51] = 111945
xpforlvl[52] = 123660
xpforlvl[53] = 136594
xpforlvl[54] = 150872
xpforlvl[55] = 166636
xpforlvl[56] = 184040
xpforlvl[57] = 203254
xpforlvl[58] = 224466
xpforlvl[59] = 247886
xpforlvl[60] = 273742
xpforlvl[61] = 302288
xpforlvl[62] = 333804
xpforlvl[63] = 368599
xpforlvl[64] = 407015
xpforlvl[65] = 449428
xpforlvl[66] = 496254
xpforlvl[67] = 547953
xpforlvl[68] = 605032
xpforlvl[69] = 668051
xpforlvl[70] = 737627
xpforlvl[71] = 814445
xpforlvl[72] = 899257
xpforlvl[73] = 992895
xpforlvl[74] = 1096278
xpforlvl[75] = 1210421
xpforlvl[76] = 1336443
xpforlvl[77] = 1475581
xpforlvl[78] = 1629200
xpforlvl[79] = 1798808
xpforlvl[80] = 1986068
xpforlvl[81] = 2192818
xpforlvl[82] = 2421087
xpforlvl[83] = 2673114
xpforlvl[84] = 2951373
xpforlvl[85] = 3258594
xpforlvl[86] = 3597792
xpforlvl[87] = 3972294
xpforlvl[88] = 4385776
xpforlvl[89] = 4842295
xpforlvl[90] = 5346332
xpforlvl[91] = 5902831
xpforlvl[92] = 6517253
xpforlvl[93] = 7195629
xpforlvl[94] = 7944614
xpforlvl[95] = 8771558
xpforlvl[96] = 9684577
xpforlvl[97] = 10692629
xpforlvl[98] = 11805606
xpforlvl[99] = 13034431
xpforlvl[100] = 14391160