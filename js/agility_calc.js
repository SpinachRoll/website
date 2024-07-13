document.getElementById("calc_agility_lvl").addEventListener("click", function() {
    var cur_agility_lvl = document.getElementById("cur_agility_lvl");
    var cur_agility_lvl_value = parseInt(cur_agility_lvl.value);
    var des_agility_level = document.getElementById("des_agility_lvl");
    var des_agility_lvl_value = parseInt(des_agility_level.value);
    var cur_agility_xp = document.getElementById("cur_agility_xp");
    var cur_agility_xp_value = parseInt(cur_agility_xp.value);
    var des_agility_xp = document.getElementById("des_agility_xp");
    var des_agility_xp_value = parseInt(des_agility_xp.value);
    var total;
    var c_a_l_xp;
    var d_a_l_xp;
    var chance;
    var c_a_l_f_xp;
    var c_a_l;

    //get the corrosponding level from the xp input into the calculator
    c_a_l_xp = parseInt(xpforlvl[cur_agility_lvl_value]);
    d_a_l_xp = parseInt(xpforlvl[des_agility_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_agility_xp_value) {
            c_a_l_f_xp = i - 1;
            break;
        }
        c_a_l_f_xp = 99;
    }

    //get the current agility level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_a_l_f_xp >= cur_agility_lvl_value) {
        c_a_l = c_a_l_f_xp;
    }
    else if (c_a_l_f_xp < cur_agility_lvl_value){
        c_a_l = cur_agility_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_a_l_xp >= cur_agility_xp_value) {
        if (d_a_l_xp >= des_agility_xp_value){
            total = d_a_l_xp - c_a_l_xp;
        }
        else {
            total = des_agility_xp_value - c_a_l_xp;
        }
    } 
    else {
        if (d_a_l_xp >= des_agility_xp_value){
            total = d_a_l_xp - cur_agility_xp_value;
        }
        else {
            total = des_agility_xp_value - cur_agility_xp_value;
        }
    }

    gnome_lap_need = Math.ceil(total/90);
    barb_lap_need = Math.ceil(total/150);
    wild_lap_need = Math.ceil(total/472.5);
    log_lap_need = Math.ceil(total/8.5);
    tree_lap_need = Math.ceil(total/30);
    wall_lap_need = Math.ceil(total/5);
    ledge_lap_need = Math.ceil(total/22.5);
    ropeswing_lap_need = Math.ceil(total/27.5);
    
    if (total > 0) {
        gnome_need.innerHTML = gnome_lap_need;
        barb_need.innerHTML = barb_lap_need;
        wild_need.innerHTML = wild_lap_need;
        log_need.innerHTML = log_lap_need;
        tree_need.innerHTML = tree_lap_need;
        wall_need.innerHTML = wall_lap_need;
        ledge_need.innerHTML = ledge_lap_need;
        ropeswing_need.innerHTML = ropeswing_lap_need;
    }
    total = Math.max(total,0);
    agility_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Agility Level.";

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