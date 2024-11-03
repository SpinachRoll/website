document.getElementById("ranged_max_hit_btn").addEventListener("click", function() {
    var ranged_lvl_given = document.getElementById("ranged_lvl");
    var ranged_lvl_value = parseInt(ranged_lvl_given.value);
    var mh_ranged_weapon = document.getElementById("ranged_weapon");
    var mh_ranged_weapon_value = parseInt(mh_ranged_weapon.value);
    var ranged_pot = document.getElementById("ranged_potion");
    var start = ranged_pot.checked;
    var mh_ranged;
    var mh_ranged_maxroll;
    if (mh_ranged_weapon_value == 999) {
        mh_ranged = ranged_lvl_value/3 +2;
        ranged_max_hit.innerHTML = "Your Cannonball Max Hit is " + mh_ranged;
    }
    else {
        mh_ranged_maxroll = Math.floor((ranged_lvl_value + 8) * (mh_ranged_weapon_value + 1 + 64))
        if (ranged_pot.checked) {
            mh_ranged = ((mh_ranged_maxroll + (mh_ranged_maxroll * .1) + 4) + 319) / 640
            ranged_max_hit.innerHTML = "Your Ranged Max Hit is " + String(mh_ranged);
        } else {
            mh_ranged = (mh_ranged_maxroll + 319) / 640
            ranged_max_hit.innerHTML = "Your Ranged Max Hit is " + String(mh_ranged);
        };
    };
});


document.getElementById("calc_ranged_lvl").addEventListener("click", function() {
    var cur_ranged_lvl = document.getElementById("cur_ranged_lvl");
    var cur_ranged_lvl_value = parseInt(cur_ranged_lvl.value);
    var des_ranged_level = document.getElementById("des_ranged_lvl");
    var des_ranged_lvl_value = parseInt(des_ranged_level.value);
    var total;
    c_r_l_xp = parseInt(xpforlvl[cur_ranged_lvl_value]);
    d_r_l_xp = parseInt(xpforlvl[des_ranged_lvl_value]);
    total = d_r_l_xp - c_r_l_xp
	ranged_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Ranged level.";
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