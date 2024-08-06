document.getElementById("calc_herblaw_lvl").addEventListener("click", function() {
    var cur_herblaw_lvl_value = parseInt(document.getElementById("cur_herblaw_lvl").value);
    var des_herblaw_lvl_value = parseInt(document.getElementById("des_herblaw_lvl").value);
    var cur_herblaw_xp_value = parseInt(document.getElementById("cur_herblaw_xp").value);
    var des_herblaw_xp_value = parseInt(document.getElementById("des_herblaw_xp").value);
    var total = 0;
    var chance;
    var c_h_l_xp;
    var d_h_l_xp;
    var c_h_l_f_xp;
    var c_h_l;

    //get the corrosponding level from the xp input into the calculator
    c_h_l_xp = parseInt(xpforlvl[cur_herblaw_lvl_value]);
    d_h_l_xp = parseInt(xpforlvl[des_herblaw_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_herblaw_xp_value) {
            c_h_l_f_xp = i - 1;
            break;
        }
        c_h_l_f_xp = 99;
    }
    
    //get the current herblaw level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_h_l_f_xp >= cur_herblaw_lvl_value) {
        c_h_l = c_h_l_f_xp;
    }
    else if (c_h_l_f_xp < cur_herblaw_lvl_value){
        c_h_l = cur_herblaw_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_h_l_xp >= cur_herblaw_xp_value) {
        if (d_h_l_xp >= des_herblaw_xp_value){
            total = d_h_l_xp - c_h_l_xp;
        }
        else {
            total = des_herblaw_xp_value - c_h_l_xp;
        }
    } 
    else {
        if (d_h_l_xp >= des_herblaw_xp_value){
            total = d_h_l_xp - cur_herblaw_xp_value;
        }
        else {
            total = des_herblaw_xp_value - cur_herblaw_xp_value;
        }
    }

    //variables to get the values put into the stock table for herbs
    var cur_guam_have =  parseInt(document.getElementById("guam_have").value);
    var cur_marr_have =  parseInt(document.getElementById("marr_have").value);
    var cur_tarr_have =  parseInt(document.getElementById("tarr_have").value);
    var cur_harr_have =  parseInt(document.getElementById("harr_have").value);
    var cur_ranarr_have =  parseInt(document.getElementById("ranarr_have").value);
    var cur_irit_have =  parseInt(document.getElementById("irit_have").value);
    var cur_avantoe_have =  parseInt(document.getElementById("avantoe_have").value);
    var cur_kwuarm_have =  parseInt(document.getElementById("kwuarm_have").value);
    var cur_cad_have =  parseInt(document.getElementById("cad_have").value);
    var cur_dwarf_have =  parseInt(document.getElementById("dwarf_have").value);
    var cur_torstol_have =  parseInt(document.getElementById("torstol_have").value);

    //variables to get the values put into the stock table for unfinished pots
    var cur_att_pot_have =  parseInt(document.getElementById("att_pot_have").value);
    var cur_cure_pot_have =  parseInt(document.getElementById("cure_pot_have").value);
    var cur_exp_pot_have =  parseInt(document.getElementById("exp_pot_have").value);
    var cur_str_pot_have =  parseInt(document.getElementById("str_pot_have").value);
    var cur_ogre_pot_have =  parseInt(document.getElementById("ogre_pot_have").value);
    var cur_stat_pot_have =  parseInt(document.getElementById("stat_pot_have").value);
    var cur_blamish_pot_have =  parseInt(document.getElementById("blamish_pot_have").value);
    var cur_def_pot_have =  parseInt(document.getElementById("def_pot_have").value);
    var cur_pray_pot_have =  parseInt(document.getElementById("pray_pot_have").value);
    var cur_sap_pot_have =  parseInt(document.getElementById("sap_pot_have").value);
    var cur_anti_pot_have =  parseInt(document.getElementById("anti_pot_have").value);
    var cur_fish_pot_have =  parseInt(document.getElementById("fish_pot_have").value);
    var cur_ssp_pot_have =  parseInt(document.getElementById("ssp_pot_have").value);
    var cur_wep_pot_have =  parseInt(document.getElementById("wep_pot_have").value);
    var cur_sdp_pot_have =  parseInt(document.getElementById("sdp_pot_have").value);
    var cur_range_pot_have =  parseInt(document.getElementById("range_pot_have").value);
    var cur_zammy_pot_have =  parseInt(document.getElementById("zammy_pot_have").value);

    //variables to get the total xp for the items we already have from the stock table
    var have_total = 0;

    //variable LIST to go through and check it any of the items in the stock table contain more than 0
    var have_values = [cur_guam_have, cur_marr_have, cur_tarr_have, cur_harr_have, cur_ranarr_have, 
        cur_irit_have, cur_avantoe_have, cur_kwuarm_have, cur_cad_have, cur_dwarf_have, cur_torstol_have, 
        cur_att_pot_have, cur_cure_pot_have, cur_exp_pot_have, cur_str_pot_have, cur_ogre_pot_have, 
        cur_stat_pot_have, cur_blamish_pot_have, cur_def_pot_have, cur_pray_pot_have, cur_sap_pot_have, 
        cur_anti_pot_have, cur_fish_pot_have, cur_ssp_pot_have, cur_wep_pot_have, cur_sdp_pot_have, 
        cur_range_pot_have, cur_zammy_pot_have];

    //variable used in the formula to calculate total xp we current have banked
    var flag = false;

    //formula to check the LIST and set the flag to true if there are any values greater than 0 in the stock table
    for ( i = 0; i < have_values.length; i++ ) {
        if (have_values[i] > 0) {
            flag = true;
            break;
        }
    }

    //formula to calculate the total XP from the stock table. total = 0 before this
    if (flag) {
        //calculate the total xp already owned in the stock table
        have_total = (cur_guam_have * 2.5) + (cur_marr_have * 3.75) + (cur_tarr_have * 5) +(cur_harr_have * 6.25) +
        (cur_ranarr_have * 7.5) + (cur_irit_have * 8.75) + (cur_avantoe_have * 10) + (cur_kwuarm_have * 11.25) +
        (cur_cad_have * 12.5) + (cur_dwarf_have * 13.75) + (cur_torstol_have * 15) + (cur_att_pot_have * 25) +
        (cur_cure_pot_have * 37.5) + (cur_exp_pot_have * 18.75) + (cur_str_pot_have * 50) + (cur_ogre_pot_have * 50) +
        (cur_stat_pot_have * 62.5) + (cur_blamish_pot_have * 80) + (cur_def_pot_have * 75) + (cur_pray_pot_have * 87.5) +
        (cur_sap_pot_have * 100) + (cur_anti_pot_have * 106.25) + (cur_fish_pot_have * 112.5) + (cur_ssp_pot_have * 125) +
        (cur_wep_pot_have * 137.5) + (cur_sdp_pot_have * 150) + (cur_range_pot_have * 162.5) + (cur_zammy_pot_have * 175);

        total = Math.max(total - have_total,0);
    };
    
    if (total > 0) {
        guam_need.innerHTML = Math.ceil(total/2.5);
        marr_need.innerHTML = Math.ceil(total/3.75);
        tarr_need.innerHTML = Math.ceil(total/5);
        harr_need.innerHTML = Math.ceil(total/6.25);
        ranarr_need.innerHTML = Math.ceil(total/7.5);
        irit_need.innerHTML = Math.ceil(total/8.75);
        avantoe_need.innerHTML = Math.ceil(total/10);
        kwuarm_need.innerHTML = Math.ceil(total/11.25);
        cad_need.innerHTML = Math.ceil(total/12.50);
        dwarf_need.innerHTML = Math.ceil(total/13.75);
        torstol_need.innerHTML = Math.ceil(total/15);
        
        att_pot_need.innerHTML = Math.ceil(total/25);
        cure_pot_need.innerHTML = Math.ceil(total/37.5);
        exp_pot_need.innerHTML = Math.ceil(total/18.75);
        str_pot_need.innerHTML = Math.ceil(total/50);
        ogre_pot_need.innerHTML = Math.ceil(total/50);
        stat_pot_need.innerHTML = Math.ceil(total/62.5);
        blamish_oil_need.innerHTML = Math.ceil(total/80);
        def_pot_need.innerHTML = Math.ceil(total/75);
        pray_pot_need.innerHTML = Math.ceil(total/87.5);
        sap_pot_need.innerHTML = Math.ceil(total/100);
        anti_pot_need.innerHTML = Math.ceil(total/106.25);
        fish_pot_need.innerHTML = Math.ceil(total/112.5);
        ssp_pot_need.innerHTML = Math.ceil(total/125);
        wep_pot_need.innerHTML = Math.ceil(total/137.5);
        sdp_pot_need.innerHTML = Math.ceil(total/150);
        range_pot_need.innerHTML = Math.ceil(total/162.5);
        zammy_pot_need.innerHTML = Math.ceil(total/175);

        att_c_pot_need.innerHTML = Math.ceil(total/27.5);
        cure_c_pot_need.innerHTML = Math.ceil(total/41.25);
        exp_c_pot_need.innerHTML = Math.ceil(total/18.85);
        str_c_pot_need.innerHTML = Math.ceil(total/55);
        ogre_c_pot_need.innerHTML = Math.ceil(total/62.5);
        stat_c_pot_need.innerHTML = Math.ceil(total/68.75);
        blamish_oil_c_need.innerHTML = Math.ceil(total/86.25);
        def_c_pot_need.innerHTML = Math.ceil(total/82.5);
        pray_c_pot_need.innerHTML = Math.ceil(total/95);
        sap_c_pot_need.innerHTML = Math.ceil(total/108.75);
        anti_c_pot_need.innerHTML = Math.ceil(total/115);
        fish_c_pot_need.innerHTML = Math.ceil(total/122.5);
        ssp_c_pot_need.innerHTML = Math.ceil(total/136.25);
        wep_c_pot_need.innerHTML = Math.ceil(total/148.75);
        sdp_c_pot_need.innerHTML = Math.ceil(total/162.5);
        range_c_pot_need.innerHTML = Math.ceil(total/176.25);
        zammy_c_pot_need.innerHTML = Math.ceil(total/190);
    }
    total = Math.max(total,0);
    herblaw_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Herblaw Level." + "<br><br>" + "You currently have " + have_total + " xp banked.";

})

var combine_button = document.getElementById("combine_button");
var herblaw_table_1 = document.getElementById("herblaw_table_1");
var herblaw_table_2 = document.getElementById("herblaw_table_2");
var herblaw_table_3 = document.getElementById("herblaw_table_3");
var herblaw_table_4 = document.getElementById("herblaw_table_4");
var herblaw_table_5 = document.getElementById("herblaw_table_5");
var herblaw_table_6 = document.getElementById("herblaw_table_6");


combine_button.addEventListener("click", function() {
    if (herblaw_table_4.style.display == "none") {
        herblaw_table_1.style.display = "none";
        herblaw_table_2.style.display = "none";
        herblaw_table_3.style.display = "none";
        herblaw_table_4.style.display = "table";
        herblaw_table_5.style.display = "table";
        combine_button.innerHTML = "Calc ID & Pot Seperately";
    } else {
        herblaw_table_1.style.display = "table";
        herblaw_table_2.style.display = "table";
        herblaw_table_3.style.display = "table";
        herblaw_table_4.style.display = "none";
        herblaw_table_5.style.display = "none";
        combine_button.innerHTML = "Calc ID and Pot Together";

    }
});

var stock_table = document.getElementById("stock_table");
var stock_button = document.getElementById("toggle_table");

stock_button.addEventListener("click", function() {
    if (stock_table.style.display == "none") {
        stock_table.style.display = "table";
    } else {
        stock_table.style.display = "none";
    }
});

document.getElementById("stock_reset").addEventListener("click", function() {
    var inputElements = document.querySelectorAll ("#stock_table input[type='number']");
    for (var i = 0; i < inputElements.length; i++) {
        inputElements [i].value = 0;
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