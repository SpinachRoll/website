document.getElementById("calc_cooking_lvl").addEventListener("click", function() {
    var cur_cooking_lvl = document.getElementById("cur_cooking_lvl");
    var cur_cooking_lvl_value = parseInt(cur_cooking_lvl.value);
    var des_cooking_level = document.getElementById("des_cooking_lvl");
    var des_cooking_lvl_value = parseInt(des_cooking_level.value);
    var cur_cooking_xp = document.getElementById("cur_cooking_xp");
    var cur_cooking_xp_value = parseInt(cur_cooking_xp.value);
    var des_cooking_xp = document.getElementById("des_cooking_xp");
    var des_cooking_xp_value = parseInt(des_cooking_xp.value);
    var total;
    var chance;
    var c_c_l_xp;
    var d_c_l_xp;
    var c_c_l_f_xp;
    var c_c_l;

    //get the corrosponding level from the xp input into the calculator
    c_c_l_xp = parseInt(xpforlvl[cur_cooking_lvl_value]);
    d_c_l_xp = parseInt(xpforlvl[des_cooking_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_cooking_xp_value) {
            c_c_l_f_xp = i - 1;
            break;
        }
        c_c_l_f_xp = 99;
    }
    
    //get the current cooking level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_c_l_f_xp >= cur_cooking_lvl_value) {
        c_c_l = c_c_l_f_xp;
    }
    else if (c_c_l_f_xp < cur_cooking_lvl_value){
        c_c_l = cur_cooking_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_c_l_xp >= cur_cooking_xp_value) {
        if (d_c_l_xp >= des_cooking_xp_value){
            total = d_c_l_xp - c_c_l_xp;
        }
        else {
            total = des_cooking_xp_value - c_c_l_xp;
        }
    } 
    else {
        if (d_c_l_xp >= des_cooking_xp_value){
            total = d_c_l_xp - cur_cooking_xp_value;
        }
        else {
            total = des_cooking_xp_value - cur_cooking_xp_value;
        }
    }
    
    if (total > 0) {
        shrimp_need.innerHTML = Math.ceil(total/30);
        anchovy_need.innerHTML = Math.ceil(total/30);
        sardine_need.innerHTML = Math.ceil(total/40);
        herring_need.innerHTML = Math.ceil(total/50);
        mackerel_need.innerHTML = Math.ceil(total/60);
        trout_need.innerHTML = Math.ceil(total/70);
        cod_need.innerHTML = Math.ceil(total/75);
        pike_need.innerHTML = Math.ceil(total/80);
        salmon_need.innerHTML = Math.ceil(total/90);
        tuna_need.innerHTML = Math.ceil(total/100);
        lobster_need.innerHTML = Math.ceil(total/120);
        bass_need.innerHTML = Math.ceil(total/130);
        swordfish_need.innerHTML = Math.ceil(total/140);
        lava_eel_need.innerHTML = Math.ceil(total/140);
        shark_need.innerHTML = Math.ceil(total/210);
        sea_turtle_need.innerHTML = Math.ceil(total/211.5);
        manta_ray_need.innerHTML = Math.ceil(total/216);
        
        meat_need.innerHTML = Math.ceil(total/30);
        bread_need.innerHTML = Math.ceil(total/40);
        red_pie_need.innerHTML = Math.ceil(total/60);
        meat_pie_need.innerHTML = Math.ceil(total/80);
        stew_need.innerHTML = Math.ceil(total/90);
        apple_pie_need.innerHTML = Math.ceil(total/100);
        pizza_need.innerHTML = Math.ceil(total/110);
        wine_need.innerHTML = Math.ceil(total/110);
        cake_need.innerHTML = Math.ceil(total/120);
        oomlie_need.innerHTML = Math.ceil(total/125);
        ug_kebab_need.innerHTML = Math.ceil(total/40);
        tasty_ug_need.innerHTML = Math.ceil(total/120);
        curry_need.innerHTML = Math.ceil(total/125);

        d_crunch_need.innerHTML = Math.ceil(total/25);
        c_crunch_need.innerHTML = Math.ceil(total/30);
        s_crunch_need.innerHTML = Math.ceil(total/30);
        t_crunch_need.innerHTML = Math.ceil(total/30);
        w_crunch_need.innerHTML = Math.ceil(total/30);
        d_batta_need.innerHTML = Math.ceil(total/25);
        ct_batta_need.innerHTML = Math.ceil(total/30);
        f_batta_need.innerHTML = Math.ceil(total/30);
        t_batta_need.innerHTML = Math.ceil(total/30);
        v_batta_need.innerHTML = Math.ceil(total/30);
        w_batta_need.innerHTML = Math.ceil(total/30);
        d_bowl_need.innerHTML = Math.ceil(total/25);
        c_bomb_need.innerHTML = Math.ceil(total/30);
        t_legs_need.innerHTML = Math.ceil(total/30);
        vegball_need.innerHTML = Math.ceil(total/30);
        wormhole_need.innerHTML = Math.ceil(total/30);
    }

    function cookSuccess(level, reqLevel, bonus = 0) {
        var effectiveLevel = level + bonus;
        var levelStopFail = reqLevel + 35;
        if (effectiveLevel >= levelStopFail) {
            return 100;
        }
        var numerator = Math.floor(64 +(effectiveLevel - 1) * (19200 / (levelStopFail* 98)));
        var pct = (numerator / 256) * 100;
        return parseFloat(Math.min(100, pct).toFixed(2));
    }

    if(document.getElementById('cook_gauntlets').checked) {
        lobster_success = cookSuccess(c_c_l, 40, 11);
        swordfish_success = cookSuccess(c_c_l, 45, 6);
        shark_success = cookSuccess(c_c_l, 80, 11);
    } else {
        lobster_success = cookSuccess(c_c_l, 40);
        swordfish_success = cookSuccess(c_c_l, 45);
        shark_success = cookSuccess(c_c_l, 80);
    }

    meat_success = cookSuccess(c_c_l, 1);
    red_b_success = cookSuccess(c_c_l, 10);
    trout_success = cookSuccess(c_c_l, 15);
    salmon_success = cookSuccess(c_c_l, 25);
    tuna_success = cookSuccess(c_c_l, 30);
    lava_eel_success = cookSuccess(c_c_l, 53);

    chance = "Chance to cook if you have the required level<br><br>";
    switch (true) {
        case (c_c_l >= 80):
            chance +=  "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>"
            + "Salmon " + salmon_success + "%<br>"
            + "Tuna " + tuna_success + "%<br>"
            + "Lobster " + lobster_success + "%<br>"
            + "Swordfish " + swordfish_success + "%<br>"
            + "Lava Eel " + lava_eel_success + "%<br>"
            + "Shark " + shark_success + "%<br>"
            + "<br>Note: Cooking Gauntlets only affect <br>Lobster(+11), Swordfish(+6), and Shark(+11) <br>Cooking on ORSC.";
        break;
        case (c_c_l < 80 && c_c_l >= 53):
            chance +=  "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>"
            + "Salmon " + salmon_success + "%<br>"
            + "Tuna " + tuna_success + "%<br>"
            + "Lobster " + lobster_success + "%<br>"
            + "Swordfish " + swordfish_success + "%<br>"
            + "Lava Eel " + lava_eel_success + "%<br>"
            + "<br>Note: Cooking Gauntlets only affect <br>Lobster(+11), Swordfish(+6), and Shark(+11) <br>Cooking on ORSC.";
            break; 
        case (c_c_l < 53 && c_c_l >= 45):
            chance +=  "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>"
            + "Salmon " + salmon_success + "%<br>"
            + "Tuna " + tuna_success + "%<br>"
            + "Lobster " + lobster_success + "%<br>"
            + "Swordfish " + swordfish_success + "%<br>"
            + "<br>Note: Cooking Gauntlets only affect <br>Lobster(+11), Swordfish(+6), and Shark(+11) <br>Cooking on ORSC.";
            break;
        case (c_c_l < 45 && c_c_l >= 40):
            chance +=  "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>"
            + "Salmon " + salmon_success + "%<br>"
            + "Tuna " + tuna_success + "%<br>"
            + "Lobster " + lobster_success + "%<br>"
            + "<br>Note: Cooking Gauntlets only affect <br>Lobster(+11), Swordfish(+6), and Shark(+11) <br>Cooking on ORSC.";
            break;
        case (c_c_l < 40 && c_c_l >= 30):
            chance += "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>"
            + "Salmon " + salmon_success + "%<br>"
            + "Tuna " + tuna_success + "%<br>";
            break;
        case (c_c_l < 30 && c_c_l >= 25):
            chance += "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>"
            + "Salmon " + salmon_success + "%<br>";
            break;
        case (c_c_l < 25 && c_c_l >= 15):
            chance += "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>"
            + "Trout " + trout_success + "%<br>";
            break;
        case (c_c_l < 15 && c_c_l >= 10):
            chance += "Meat " + meat_success +"%<br>"
            + "Redberry Pie " + red_b_success + "%<br>";
            break;
        default:
            chance += "Meat " + meat_success +"%<br>";
    }
    
    total = Math.max(total,0);
    cooking_xp_needed.innerHTML = "Your need " + total + " more xp for your desired cooking Level.<br><br>"
    + chance;
})


fish_button.addEventListener("click", function() {
    if (cooking_table_1.style.display == "none") {
        cooking_table_1.style.display = "table";
        fish_button.innerHTML = "Fish";
    } else {
        cooking_table_1.style.display = "none";
        fish_button.innerHTML = "<s>Fish</s>";
    }
});

misc_button.addEventListener("click", function() {
    if (cooking_table_2.style.display == "none") {
        cooking_table_2.style.display = "table";
        misc_button.innerHTML = "Misc";
    } else {
        cooking_table_2.style.display = "none";
        misc_button.innerHTML = "<s>Misc</s>";
    }
});

gnome_button.addEventListener("click", function() {
    if (cooking_table_3.style.display == "none") {
        cooking_table_3.style.display = "table";
        gnome_button.innerHTML = "Gnome";
    } else {
        cooking_table_3.style.display = "none";
        gnome_button.innerHTML = "<s>Gnome</s>";
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