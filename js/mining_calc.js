document.getElementById("calc_mining_lvl").addEventListener("click", function() {
    var cur_mining_lvl = document.getElementById("cur_mining_lvl");
    var cur_mining_lvl_value = parseInt(cur_mining_lvl.value);
    var cur_mining_xp = document.getElementById("cur_mining_xp");
    var cur_mining_xp_value = parseInt(cur_mining_xp.value);
    var des_mining_level = document.getElementById("des_mining_lvl");
    var des_mining_lvl_value = parseInt(des_mining_level.value);
    var des_mining_xp = document.getElementById("des_mining_xp");
    var des_mining_xp_value = parseInt(des_mining_xp.value);
    var total;
    var chance;
    var c_m_l_xp;
    var d_m_l_xp;
    var c_m_l_f_xp;
    var c_m_l;

    //get the corrosponding level from the xp input into the calculator
    c_m_l_xp = parseInt(xpforlvl[cur_mining_lvl_value]);
    d_m_l_xp = parseInt(xpforlvl[des_mining_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_mining_xp_value) {
          c_m_l_f_xp = i - 1;
          break;
        }
        c_m_l_f_xp = 99;
    }

    //get the current mining level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_m_l_f_xp >= cur_mining_lvl_value) {
        c_m_l = c_m_l_f_xp;
    }
    else if (c_m_l_f_xp < cur_mining_lvl_value){
        c_m_l = cur_mining_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_m_l_xp >= cur_mining_xp_value) {
        if (d_m_l_xp >= des_mining_xp_value){
            total = d_m_l_xp - c_m_l_xp;
        }
        else {
            total = des_mining_xp_value - c_m_l_xp;
        }
    } 
    else {
        if (d_m_l_xp >= des_mining_xp_value){
            total = d_m_l_xp - cur_mining_xp_value;
        }
        else {
            total = des_mining_xp_value - cur_mining_xp_value;
        }
    }


    clay_mine_need = Math.ceil(total/5);
    copper_mine_need = Math.ceil(total/17.5);
    tin_mine_need = Math.ceil(total/17.5);
    blurite_mine_need = Math.ceil(total/17.5);
    iron_mine_need = Math.ceil(total/35);
    silv_mine_need = Math.ceil(total/40);
    coal_mine_need = Math.ceil(total/50);
    gold_mine_need = Math.ceil(total/65);
    gem_mine_need = Math.ceil(total/50);
    mith_mine_need = Math.ceil(total/80);
    addy_mine_need = Math.ceil(total/95);
    rune_mine_need = Math.ceil(total/125);
    
    if (total > 0) {
        clay_o_need.innerHTML = clay_mine_need;
        copper_o_need.innerHTML = copper_mine_need;
        tin_o_need.innerHTML = tin_mine_need;
        blurite_o_need.innerHTML = blurite_mine_need;
        iron_o_need.innerHTML = iron_mine_need;
        silv_o_need.innerHTML = silv_mine_need;
        coal_o_need.innerHTML = coal_mine_need;
        gold_o_need.innerHTML = gold_mine_need;
        gem_o_need.innerHTML = gem_mine_need;
        mith_o_need.innerHTML = mith_mine_need;
        addy_o_need.innerHTML = addy_mine_need;
        rune_o_need.innerHTML = rune_mine_need;
    }

    clay_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(1 * 1.5)))/128) * 100).toFixed(2);
    copper_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(1 * 1.5)))/128) * 100).toFixed(2);
    blurite_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(10 * 1.5)))/128) * 100).toFixed(2);
    iron_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(15 * 1.5)))/128) * 100).toFixed(2);
    silver_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(20 * 1.5)))/128) * 100).toFixed(2);
    coal_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(30 * 1.5)))/128) * 100).toFixed(2);
    gold_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(40 * 1.5)))/128) * 100).toFixed(2);
    gem_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(40 * 1.5)))/128) * 100).toFixed(2);
    mith_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(55 * 1.5)))/128) * 100).toFixed(2);
    addy_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(70 * 1.5)))/128) * 100).toFixed(2);
    rune_success = ((Math.min(127, Math.max(1, cur_mining_lvl_value + 0 + 40 - Math.floor(85 * 1.5)))/128) * 100).toFixed(2);

    if (c_m_l >= 85) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>"
        + "Silver " + silver_success + "%<br>"
        + "Coal " + coal_success + "%<br>"
        + "Gold " + gold_success + "%<br>"
        + "Gem Rocks " + gem_success + "%<br>"
        + "Mith " + mith_success + "%<br>"
        + "Addy " + addy_success + "%<br>"
        + "Rune " + rune_success + "%<br>";
    }
    else if (c_m_l < 85 && c_m_l >= 70) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>"
        + "Silver " + silver_success + "%<br>"
        + "Coal " + coal_success + "%<br>"
        + "Gold " + gold_success + "%<br>"
        + "Gem Rocks " + gem_success + "%<br>"
        + "Mith " + mith_success + "%<br>"
        + "Addy " + addy_success + "%<br>";
    }   
    else if (c_m_l < 70 && c_m_l >= 55) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>"
        + "Silver " + silver_success + "%<br>"
        + "Coal " + coal_success + "%<br>"
        + "Gold " + gold_success + "%<br>"
        + "Gem Rocks " + gem_success + "%<br>"
        + "Mith " + mith_success + "%<br>";
    }   
    else if (c_m_l < 55 && c_m_l >= 40) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>"
        + "Silver " + silver_success + "%<br>"
        + "Coal " + coal_success + "%<br>"
        + "Gold " + gold_success + "%<br>"
        + "Gem Rocks " + gem_success + "%<br>";
    }   
    else if (c_m_l < 40 && c_m_l >= 30) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>"
        + "Silver " + silver_success + "%<br>"
        + "Coal " + coal_success + "%<br>";
    }   
    else if (c_m_l < 30 && c_m_l >= 20) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>"
        + "Silver " + silver_success + "%<br>";
    }   
     
    else if (c_m_l < 20 && c_m_l >= 15) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>"
        + "Iron " + iron_success + "%<br>";
    }   
     
    else if (c_m_l < 15 && c_m_l >= 10) {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>"
        + "Blurite " + blurite_success + "%<br>";
    }   
     
    else {
        chance = "Chance to mine if you have the required level<br><br>"
        + "Clay " + clay_success + "%<br>"
        + "Copper/Tin " + copper_success + "%<br>";
    }

    total = Math.max(total,0);
    mining_xp_needed.innerHTML = "Your need " + total + " more xp for your desired mining Level.<br><br>"
    + chance;
})


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