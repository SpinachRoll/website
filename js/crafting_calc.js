document.getElementById("calc_crafting_lvl").addEventListener("click", function() {
    var cur_crafting_lvl = document.getElementById("cur_crafting_lvl");
    var cur_crafting_lvl_value = parseInt(cur_crafting_lvl.value);
    var des_crafting_level = document.getElementById("des_crafting_lvl");
    var des_crafting_lvl_value = parseInt(des_crafting_level.value);
    var cur_crafting_xp = document.getElementById("cur_crafting_xp");
    var cur_crafting_xp_value = parseInt(cur_crafting_xp.value);
    var des_crafting_xp = document.getElementById("des_crafting_xp");
    var des_crafting_xp_value = parseInt(des_crafting_xp.value);
    var total;
    var c_c_l_xp;
    var d_c_l_xp;
    var c_c_l_f_xp;
    var c_c_l;

    //get the corrosponding level from the xp input into the calculator
    c_c_l_xp = parseInt(xpforlvl[cur_crafting_lvl_value]);
    d_c_l_xp = parseInt(xpforlvl[des_crafting_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_crafting_xp_value) {
            c_c_l_f_xp = i - 1;
            break;
        }
        c_c_l_f_xp = 99;
    }
    
    //get the current crafting level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_c_l_f_xp >= cur_crafting_lvl_value) {
        c_c_l = c_c_l_f_xp;
    }
    else if (c_c_l_f_xp < cur_crafting_lvl_value){
        c_c_l = cur_crafting_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_c_l_xp >= cur_crafting_xp_value) {
        if (d_c_l_xp >= des_crafting_xp_value){
            total = d_c_l_xp - c_c_l_xp;
        }
        else {
            total = des_crafting_xp_value - c_c_l_xp;
        }
    } 
    else {
        if (d_c_l_xp >= des_crafting_xp_value){
            total = d_c_l_xp - cur_crafting_xp_value;
        }
        else {
            total = des_crafting_xp_value - cur_crafting_xp_value;
        }
    }
    
    if (total > 0) {
        wool_need.innerHTML = Math.ceil(total/2.5);
        pot_need.innerHTML = Math.ceil(total/12.5);
        gloves_need.innerHTML = Math.ceil(total/13.75);
        b_glass_need.innerHTML = Math.ceil(total/17.5);
        m_glass_need.innerHTML = Math.ceil(total/20);
        m_glass_2_need.innerHTML = Math.ceil(total/20);
        pie_dish_need.innerHTML = Math.ceil(total/25);
        g_ring_need.innerHTML = Math.ceil(total/15);
        g_neck_need.innerHTML = Math.ceil(total/20);
        boots_need.innerHTML = Math.ceil(total/16.25);
        bowl_need.innerHTML = Math.ceil(total/25);
        g_ammy_need.innerHTML = Math.ceil(total/30);
        
        s_ring_need.innerHTML = Math.ceil(total/40);
        opal_need.innerHTML = Math.ceil(total/15);
        b_string_need.innerHTML = Math.ceil(total/15);
        s_necklace_need.innerHTML = Math.ceil(total/55);
        jade_need.innerHTML = Math.ceil(total/20);
        s_ammy_need.innerHTML = Math.ceil(total/65);
        s_ammy_2_need.innerHTML = Math.ceil(total/65);
        l_armour_need.innerHTML = Math.ceil(total/25);
        r_topaz_need.innerHTML = Math.ceil(total/25);
        holy_need.innerHTML = Math.ceil(total/50);
        unholy_need.innerHTML = Math.ceil(total/50);
        e_ring_need.innerHTML = Math.ceil(total/55);

        sapphire_need.innerHTML = Math.ceil(total/50);
        sapphire_2_need.innerHTML = Math.ceil(total/50);
        e_necklace_need.innerHTML = Math.ceil(total/60);
        emerald_need.innerHTML = Math.ceil(total/67.5);
        emerald_2_need.innerHTML = Math.ceil(total/67.5);
        e_ammy_need.innerHTML = Math.ceil(total/70);
        e_ammy_2_need.innerHTML = Math.ceil(total/70);
        r_ring_need.innerHTML = Math.ceil(total/70);
        vial_need.innerHTML = Math.ceil(total/35);
        ruby_need.innerHTML = Math.ceil(total/85);
        ruby_2_need.innerHTML = Math.ceil(total/85);
        r_necklace_need.innerHTML = Math.ceil(total/75);
        d_ring_need.innerHTML = Math.ceil(total/85);
        diamond_need.innerHTML = Math.ceil(total/107.5);
        diamond_2_need.innerHTML = Math.ceil(total/107.5);
        orb_need.innerHTML = Math.ceil(total/52.5);
        orb_2_need.innerHTML = Math.ceil(total/52.5);

        r_ammy_need.innerHTML = Math.ceil(total/85);
        r_ammy_2_need.innerHTML = Math.ceil(total/85);
        drag_ring_need.innerHTML = Math.ceil(total/100);
        w_bstave_need.innerHTML = Math.ceil(total/100);
        w_bstave_2_need.innerHTML = Math.ceil(total/100);
        dragonstone_need.innerHTML = Math.ceil(total/137.5);
        dragonstone_2_need.innerHTML = Math.ceil(total/137.5);
        d_necklace_need.innerHTML = Math.ceil(total/90);
        e_bstave_need.innerHTML = Math.ceil(total/112.5);
        e_bstave_2_need.innerHTML = Math.ceil(total/112.5);
        f_bstave_need.innerHTML = Math.ceil(total/125);
        f_bstave_2_need.innerHTML = Math.ceil(total/125);
        a_bstave_need.innerHTML = Math.ceil(total/137.5);
        a_bstave_2_need.innerHTML = Math.ceil(total/137.5);
        d_ammy_need.innerHTML = Math.ceil(total/100);
        d_ammy_2_need.innerHTML = Math.ceil(total/100);
        drag_necklace_need.innerHTML = Math.ceil(total/105);
        drag_ammy_need.innerHTML = Math.ceil(total/150);
        drag_ammy_2_need.innerHTML = Math.ceil(total/150);
    }
    
    total = Math.max(total,0);
    crafting_xp_needed.innerHTML = "Your need " + total + " more xp <br>for your desired Crafting Level.";
})


one_button.addEventListener("click", function() {
    if (crafting_table_1.style.display == "none") {
        crafting_table_1.style.display = "table";
        one_button.innerHTML = "&nbsp;&nbsp;Lvl 1 - 8";
    } else {
        crafting_table_1.style.display = "none";
        one_button.innerHTML = "<s>&nbsp;&nbsp;Lvl 1 - 8</s>";
    }
});

two_button.addEventListener("click", function() {
    if (crafting_table_2.style.display == "none") {
        crafting_table_2.style.display = "table";
        two_button.innerHTML = "Lvl 8 - 18";
    } else {
        crafting_table_2.style.display = "none";
        two_button.innerHTML = "<s>Lvl 8 - 18</s>";
    }
});

three_button.addEventListener("click", function() {
    if (crafting_table_3.style.display == "none") {
        crafting_table_3.style.display = "table";
        three_button.innerHTML = "Lvl 20-46";
    } else {
        crafting_table_3.style.display = "none";
        three_button.innerHTML = "<s>Lvl 20-46</s>";
    }
});

four_button.addEventListener("click", function() {
    if (crafting_table_4.style.display == "none") {
        crafting_table_4.style.display = "table";
        four_button.innerHTML = "Lvl 50-80";
    } else {
        crafting_table_4.style.display = "none";
        four_button.innerHTML = "<s>Lvl 50-80</s>";
    }
});

five_button.addEventListener("click", function() {
    if (crafting_table_5.style.display == "none") {
        crafting_table_5.style.display = "table";
        five_button.innerHTML = "Gems/Ammys";
    } else {
        crafting_table_5.style.display = "none";
        five_button.innerHTML = "<s>Gems/Ammys</s>";
    }
});

six_button.addEventListener("click", function() {
    if (crafting_table_6.style.display == "none") {
        crafting_table_6.style.display = "table";
        six_button.innerHTML = "Glass/Staves&nbsp;";
    } else {
        crafting_table_6.style.display = "none";
        six_button.innerHTML = "<s>Glass/Staves&nbsp;</s>";
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