document.getElementById("calc_magic_lvl").addEventListener("click", function() {
    var cur_magic_lvl = document.getElementById("cur_magic_lvl");
    var cur_magic_lvl_value = parseInt(cur_magic_lvl.value);
    var des_magic_level = document.getElementById("des_magic_lvl");
    var des_magic_lvl_value = parseInt(des_magic_level.value);
    var cur_magic_xp = document.getElementById("cur_magic_xp");
    var cur_magic_xp_value = parseInt(cur_magic_xp.value);
    var des_magic_xp = document.getElementById("des_magic_xp");
    var des_magic_xp_value = parseInt(des_magic_xp.value);
    var total;
    var c_m_l_xp;
    var d_m_l_xp;
    var c_m_l_f_xp;

    //get the corrosponding level from the xp input into the calculator
    c_m_l_xp = parseInt(xpforlvl[cur_magic_lvl_value]);
    d_m_l_xp = parseInt(xpforlvl[des_magic_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_magic_xp_value) {
            c_m_l_f_xp = i - 1;
            break;
        }
        c_m_l_f_xp = 99;
    }


    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_m_l_xp >= cur_magic_xp_value) {
        if (d_m_l_xp >= des_magic_xp_value){
            total = d_m_l_xp - c_m_l_xp;
        }
        else {
            total = des_magic_xp_value - c_m_l_xp;
        }
    } 
    else {
        if (d_m_l_xp >= des_magic_xp_value){
            total = d_m_l_xp - cur_magic_xp_value;
        }
        else {
            total = des_magic_xp_value - cur_magic_xp_value;
        }
    }

    wind_s_calc_need = Math.ceil(total/22);
    confuse_calc_need = Math.ceil(total/26);
    water_s_calc_need = Math.ceil(total/30);
    enchant_1_calc_need = Math.ceil(total/34);
    earth_s_calc_need = Math.ceil(total/38);
    weaken_calc_need = Math.ceil(total/42);
    fire_s_calc_need = Math.ceil(total/46);
    banana_calc_need = Math.ceil(total/50);
    wind_b_calc_need = Math.ceil(total/54);
    curse_calc_need = Math.ceil(total/58);
    low_a_calc_need = Math.ceil(total/62);
    water_b_calc_need = Math.ceil(total/66);
    v_tele_calc_need = Math.ceil(total/70);
    enchant_2_calc_need = Math.ceil(total/74);
    earth_b_calc_need = Math.ceil(total/78);
    l_tele_calc_need = Math.ceil(total/82);
    t_grab_calc_need = Math.ceil(total/86);
    fire_b_calc_need = Math.ceil(total/90);
    f_tele_calc_need = Math.ceil(total/94);
    crumble_calc_need = Math.ceil(total/98);
    wind_bl_calc_need = Math.ceil(total/102);
    superheat_calc_need = Math.ceil(total/106);
    c_tele_calc_need = Math.ceil(total/110);
    water_bl_calc_need = Math.ceil(total/114);
    enchant_3_calc_need = Math.ceil(total/118);
    iban_calc_need = Math.ceil(total/120);
    a_tele_calc_need = Math.ceil(total/122);
    earth_bl_calc_need = Math.ceil(total/126);
    high_a_calc_need = Math.ceil(total/130);
    water_orb_calc_need = Math.ceil(total/132);
    enchant_4_calc_need = Math.ceil(total/134);
    w_tele_calc_need = Math.ceil(total/136);
    fire_bl_calc_need = Math.ceil(total/138);
    earth_orb_calc_need = Math.ceil(total/140);
    claws_calc_need = Math.ceil(total/140);
    sara_calc_need = Math.ceil(total/140);
    zammy_calc_need = Math.ceil(total/140);
    wind_w_calc_need = Math.ceil(total/144);
    fire_orb_calc_need = Math.ceil(total/146);
    water_w_calc_need = Math.ceil(total/150);
    air_orb_calc_need = Math.ceil(total/152);
    vulnerability_calc_need = Math.ceil(total/152);
    enchant_5_calc_need = Math.ceil(total/156);
    earth_w_calc_need = Math.ceil(total/160);
    enfeeble_calc_need = Math.ceil(total/166);
    fire_w_calc_need = Math.ceil(total/170);
    stun_calc_need = Math.ceil(total/180);
    charge_calc_need = Math.ceil(total/180);
    
    
    if (total > 0) {
        wind_s_need.innerHTML = wind_s_calc_need;
        confuse_need.innerHTML = confuse_calc_need;
        water_s_need.innerHTML = water_s_calc_need;
        enchant_1_need.innerHTML = enchant_1_calc_need;
        earth_s_need.innerHTML = earth_s_calc_need;
        weaken_need.innerHTML = weaken_calc_need;
        fire_s_need.innerHTML = fire_s_calc_need;
        banana_need.innerHTML = banana_calc_need;
        wind_b_need.innerHTML = wind_b_calc_need;
        curse_need.innerHTML = curse_calc_need;
        low_a_need.innerHTML = low_a_calc_need;
        water_b_need.innerHTML = water_b_calc_need;
        v_tele_need.innerHTML = v_tele_calc_need;
        enchant_2_need.innerHTML = enchant_2_calc_need;
        earth_b_need.innerHTML = earth_b_calc_need;
        l_tele_need.innerHTML = l_tele_calc_need;
        t_grab_need.innerHTML = t_grab_calc_need;
        fire_b_need.innerHTML = fire_b_calc_need;
        f_tele_need.innerHTML = f_tele_calc_need;
        crumble_need.innerHTML = crumble_calc_need;
        wind_bl_need.innerHTML = wind_bl_calc_need;
        superheat_need.innerHTML = superheat_calc_need;
        c_tele_need.innerHTML = c_tele_calc_need;
        water_bl_need.innerHTML = water_bl_calc_need;
        enchant_3_need.innerHTML = enchant_3_calc_need;
        iban_need.innerHTML = iban_calc_need;
        a_tele_need.innerHTML = a_tele_calc_need;
        earth_bl_need.innerHTML = earth_bl_calc_need;
        high_a_need.innerHTML = high_a_calc_need;
        water_orb_need.innerHTML = water_orb_calc_need;
        enchant_4_need.innerHTML = enchant_4_calc_need;
        w_tele_need.innerHTML = w_tele_calc_need;
        fire_bl_need.innerHTML = fire_bl_calc_need;
        earth_orb_need.innerHTML = earth_orb_calc_need;
        claws_need.innerHTML = claws_calc_need;
        sara_need.innerHTML = sara_calc_need;
        zammy_need.innerHTML = zammy_calc_need;
        wind_w_need.innerHTML = wind_w_calc_need;
        fire_orb_need.innerHTML = fire_orb_calc_need;
        water_w_need.innerHTML = water_w_calc_need;
        air_orb_need.innerHTML = air_orb_calc_need;
        vulnerability_need.innerHTML = vulnerability_calc_need;
        enchant_5_need.innerHTML = enchant_5_calc_need;
        earth_w_need.innerHTML = earth_w_calc_need;
        enfeeble_need.innerHTML = enfeeble_calc_need;
        fire_w_need.innerHTML = fire_w_calc_need;
        stun_need.innerHTML = stun_calc_need;
        charge_need.innerHTML = charge_calc_need;
        
    }
    total = Math.max(total,0);
    magic_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Magic Level.";

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