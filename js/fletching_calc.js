document.getElementById("calc_fletching_lvl").addEventListener("click", function() {
    function getElementValue(id) {
        var element = document.getElementById(id);
        return parseInt(element.value);
      }
    var cur_fletching_lvl_value = getElementValue("cur_fletching_lvl");
    var des_fletching_lvl_value = getElementValue("des_fletching_lvl");
    var cur_fletching_xp_value = getElementValue("cur_fletching_xp");
    var des_fletching_xp_value = getElementValue("des_fletching_xp");
    var total;
    var c_f_l_xp;
    var d_f_l_xp;
    var c_f_l_f_xp;

    //get the corrosponding level from the xp input into the calculator
    c_f_l_xp = parseInt(xpforlvl[cur_fletching_lvl_value]);
    d_f_l_xp = parseInt(xpforlvl[des_fletching_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_fletching_xp_value) {
            c_f_l_f_xp = i - 1;
            break;
        }
        c_f_l_f_xp = 99;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_f_l_xp >= cur_fletching_xp_value) {
        if (d_f_l_xp >= des_fletching_xp_value){
            total = d_f_l_xp - c_f_l_xp;
        }
        else {
            total = des_fletching_xp_value - c_f_l_xp;
        }
    } 
    else {
        if (d_f_l_xp >= des_fletching_xp_value){
            total = d_f_l_xp - cur_fletching_xp_value;
        }
        else {
            total = des_fletching_xp_value - cur_fletching_xp_value;
        }
    }

    var cur_log_have_value = getElementValue("log_have");
    var cur_oak_log_have_value = getElementValue("oak_log_have");
    var cur_willow_log_have_value = getElementValue("willow_log_have");
    var cur_maple_log_have_value = getElementValue("maple_log_have");
    var cur_yew_log_have_value = getElementValue("yew_log_have");
    var cur_magic_log_have_value = getElementValue("magic_log_have");

    var cur_arrow_shafts_have_value = getElementValue("arrow_shafts_have");
    var cur_feather_have_value = getElementValue("feathers_have");
    var cur_headless_arrow_have_value = getElementValue("headless_arrow_have");
    var cur_bronze_arrow_head_have_value = getElementValue("bronze_arrow_head_have");
    var cur_iron_arrow_head_have_value = getElementValue("iron_arrow_head_have");
    var cur_steel_arrow_head_have_value = getElementValue("steel_arrow_head_have");
    var cur_mith_arrow_head_have_value = getElementValue("mith_arrow_head_have");
    var cur_addy_arrow_head_have_value = getElementValue("addy_arrow_head_have");
    var cur_rune_arrow_head_have_value = getElementValue("rune_arrow_head_have");

    var cur_oyster_pearl_have_value = getElementValue("oyster_pearl_have");
    var cur_oyster_pearl_bolt_tips_have_value = getElementValue("oyster_pearl_bolt_tips_have");
    var cur_bolts_have_value = getElementValue("bolts_have");
    var cur_bronze_dart_tip_have_value = getElementValue("bronze_dart_head_have");
    var cur_iron_dart_tip_have_value = getElementValue("iron_dart_head_have");
    var cur_steel_dart_tip_have_value = getElementValue("steel_dart_head_have");
    var cur_mith_dart_tip_have_value = getElementValue("mith_dart_head_have");
    var cur_addy_dart_tip_have_value = getElementValue("addy_dart_head_have");
    var cur_rune_dart_tip_have_value = getElementValue("rune_dart_head_have");

    shortbow_us_need_value = Math.max(Math.ceil(total/5) - cur_log_have_value, 0);
    shortbow_s_need_value = Math.max(Math.ceil(total/10) - cur_log_have_value, 0);
    longbow_us_need_value = Math.max(Math.ceil(total/10) - cur_log_have_value, 0);
    longbow_s_need_value = Math.max(Math.ceil(total/20) - cur_log_have_value, 0);
    oak_shortbow_us_need_value = Math.max(Math.ceil(total/16) - cur_oak_log_have_value, 0);
    oak_shortbow_s_need_value = Math.max(Math.ceil(total/32) - cur_oak_log_have_value, 0);
    oak_longbow_us_need_value = Math.max(Math.ceil(total/25) - cur_oak_log_have_value, 0);
    oak_longbow_s_need_value = Math.max(Math.ceil(total/50) - cur_oak_log_have_value, 0);
    willow_shortbow_us_need_value = Math.max(Math.ceil(total/33) - cur_willow_log_have_value, 0);
    willow_shortbow_s_need_value = Math.max(Math.ceil(total/66) - cur_willow_log_have_value, 0);
    willow_longbow_us_need_value = Math.max(Math.ceil(total/41) - cur_willow_log_have_value, 0);
    willow_longbow_s_need_value = Math.max(Math.ceil(total/82) - cur_willow_log_have_value, 0);
    maple_shortbow_us_need_value = Math.max(Math.ceil(total/50) - cur_maple_log_have_value, 0);
    maple_shortbow_s_need_value = Math.max(Math.ceil(total/100) - cur_maple_log_have_value, 0);
    maple_longbow_us_need_value = Math.max(Math.ceil(total/58) - cur_maple_log_have_value, 0);
    maple_longbow_s_need_value = Math.max(Math.ceil(total/116) - cur_maple_log_have_value, 0);
    yew_shortbow_us_need_value = Math.max(Math.ceil(total/67) - cur_yew_log_have_value, 0);
    yew_shortbow_s_need_value = Math.max(Math.ceil(total/134) - cur_yew_log_have_value, 0);
    yew_longbow_us_need_value = Math.max(Math.ceil(total/75) - cur_yew_log_have_value, 0);
    yew_longbow_s_need_value = Math.max(Math.ceil(total/150) - cur_yew_log_have_value, 0);
    magic_shortbow_us_need_value = Math.max(Math.ceil(total/84) - cur_magic_log_have_value, 0);
    magic_shortbow_s_need_value = Math.max(Math.ceil(total/168) - cur_magic_log_have_value, 0);
    magic_longbow_us_need_value = Math.max(Math.ceil(total/92) - cur_magic_log_have_value, 0);
    magic_longbow_s_need_value = Math.max(Math.ceil(total/184) - cur_magic_log_have_value, 0);

    arrow_shafts_need_value = Math.max(Math.ceil(total/.5) - cur_arrow_shafts_have_value - (cur_log_have_value * 10), 0);
    headless_arrows_need_value = Math.max(Math.ceil(total/1) - cur_headless_arrow_have_value - (cur_log_have_value * 10), 0);
    feather_need_value = Math.max(Math.ceil(total/1) - cur_feather_have_value, 0);
    bronze_arrow_head_need_value = Math.max(Math.ceil(total/1.25) - cur_bronze_arrow_head_have_value, 0);
    bronze_headless_need_value = Math.max(Math.ceil(total/1.25) - cur_headless_arrow_have_value,0);
    iron_arrow_head_need_value = Math.max(Math.ceil(total/2.5) - cur_iron_arrow_head_have_value, 0);
    iron_headless_need_value = Math.max(Math.ceil(total/2.5) - cur_headless_arrow_have_value,0);
    steel_arrow_head_need_value = Math.max(Math.ceil(total/5) - cur_steel_arrow_head_have_value, 0);
    steel_headless_need_value = Math.max(Math.ceil(total/5) - cur_headless_arrow_have_value,0);
    mith_arrow_head_need_value = Math.max(Math.ceil(total/7.5) - cur_mith_arrow_head_have_value, 0);
    mith_headless_need_value = Math.max(Math.ceil(total/7.5) - cur_headless_arrow_have_value,0);
    addy_arrow_head_need_value = Math.max(Math.ceil(total/10) - cur_addy_arrow_head_have_value, 0);
    addy_headless_need_value = Math.max(Math.ceil(total/10) - cur_headless_arrow_have_value,0);
    rune_arrow_head_need_value = Math.max(Math.ceil(total/12.5) - cur_rune_arrow_head_have_value, 0);
    rune_headless_need_value = Math.max(Math.ceil(total/12.5) - cur_headless_arrow_have_value,0);

    
    oyster_pearl_bolt_tips_need_value = Math.max(Math.ceil(total/12.5) - (cur_oyster_pearl_have_value * 2), 0);
    oyster_pearl_bolt_tips_need_need_value = Math.max(Math.ceil(total/6.25) - cur_oyster_pearl_bolt_tips_have_value - (cur_oyster_pearl_have_value * 2), 0);
    bolts_need_value = Math.max(Math.ceil(total/6.25) - cur_bolts_have_value, 0);
    bronze_dart_tips_need_value = Math.max(Math.ceil(total/1) - cur_bronze_dart_tip_have_value, 0);
    iron_dart_tips_need_value = Math.max(Math.ceil(total/1) - cur_iron_dart_tip_have_value, 0);
    steel_dart_tips_need_value = Math.max(Math.ceil(total/1) - cur_steel_dart_tip_have_value, 0);
    mith_dart_tips_need_value = Math.max(Math.ceil(total/1) - cur_mith_dart_tip_have_value, 0);
    addy_dart_tips_need_value = Math.max(Math.ceil(total/1) - cur_addy_dart_tip_have_value, 0);
    rune_dart_tips_need_value = Math.max(Math.ceil(total/1) - cur_rune_dart_tip_have_value, 0);

    if (total > 0) {
        shortbow_us_need.innerHTML = shortbow_us_need_value;
        shortbow_s_need.innerHTML = shortbow_s_need_value;
        longbow_us_need.innerHTML = longbow_us_need_value;
        longbow_s_need.innerHTML = longbow_s_need_value;
        oak_shortbow_us_need.innerHTML = oak_shortbow_us_need_value;
        oak_shortbow_s_need.innerHTML = oak_shortbow_s_need_value;
        oak_longbow_us_need.innerHTML = oak_longbow_us_need_value;
        oak_longbow_s_need.innerHTML = oak_longbow_s_need_value;
        willow_shortbow_us_need.innerHTML = willow_shortbow_us_need_value;
        willow_shortbow_s_need.innerHTML = willow_shortbow_s_need_value;
        willow_longbow_us_need.innerHTML = willow_longbow_us_need_value;
        willow_longbow_s_need.innerHTML = willow_longbow_s_need_value;
        maple_shortbow_us_need.innerHTML = maple_shortbow_us_need_value;
        maple_shortbow_s_need.innerHTML = maple_shortbow_s_need_value;
        maple_longbow_us_need.innerHTML = maple_longbow_us_need_value;
        maple_longbow_s_need.innerHTML = maple_longbow_s_need_value;
        yew_shortbow_us_need.innerHTML = yew_shortbow_us_need_value;
        yew_shortbow_s_need.innerHTML = yew_shortbow_s_need_value;
        yew_longbow_us_need.innerHTML = yew_longbow_us_need_value;
        yew_longbow_s_need.innerHTML = yew_longbow_s_need_value;
        magic_shortbow_us_need.innerHTML = magic_shortbow_us_need_value;
        magic_shortbow_s_need.innerHTML = magic_shortbow_s_need_value;
        magic_longbow_us_need.innerHTML = magic_longbow_us_need_value;
        magic_longbow_s_need.innerHTML = magic_longbow_s_need_value;

        arrow_shafts_need.innerHTML = arrow_shafts_need_value + " Shafts";
        headless_arrows_need.innerHTML = (arrow_shafts_need_value / 2) + " Shafts<br>" + feather_need_value + " Feathers";
        bronze_arrow_need.innerHTML = bronze_arrow_head_need_value + " Heads<br>" + bronze_headless_need_value + " Headless Arrows";
        iron_arrow_need.innerHTML = iron_arrow_head_need_value + " Heads<br/>" + iron_headless_need_value + " Headless Arrows";
        steel_arrow_need.innerHTML = steel_arrow_head_need_value + " Heads<br/>" + steel_headless_need_value + " Headless Arrows";
        mith_arrow_need.innerHTML = mith_arrow_head_need_value + " Heads<br/>" + mith_headless_need_value + " Headless Arrows";
        addy_arrow_need.innerHTML = addy_arrow_head_need_value + " Heads<br/>" + addy_headless_need_value + " Headless Arrows";
        rune_arrow_need.innerHTML = rune_arrow_head_need_value + " Heads<br/>" + rune_headless_need_value + " Headless Arrows";

        oyster_pearl_bolt_tips_need.innerHTML = oyster_pearl_bolt_tips_need_value + " Tips";
        oyster_pearl_bolts_need.innerHTML = oyster_pearl_bolt_tips_need_need_value + " Tips<br/>" + bolts_need_value + " Bolts";
        bronze_dart_need.innerHTML = bronze_dart_tips_need_value + " Darts<br/>" + Math.max((bronze_dart_tips_need_value - cur_feather_have_value),0) + " Feathers";
        iron_dart_need.innerHTML = iron_dart_tips_need_value + " Darts<br/>" + Math.max((iron_dart_tips_need_value - cur_feather_have_value),0) + " Feathers";
        steel_dart_need.innerHTML = steel_dart_tips_need_value + " Darts<br/>" + Math.max((steel_dart_tips_need_value - cur_feather_have_value),0) + " Feathers";
        mith_dart_need.innerHTML = mith_dart_tips_need_value + " Darts<br/>" + Math.max((mith_dart_tips_need_value - cur_feather_have_value),0) + " Feathers";
        addy_dart_need.innerHTML = addy_dart_tips_need_value + " Darts<br/>" + Math.max((addy_dart_tips_need_value - cur_feather_have_value),0) + " Feathers";
        rune_dart_need.innerHTML = rune_dart_tips_need_value + " Darts<br/>" + Math.max((rune_dart_tips_need_value - cur_feather_have_value),0) + " Feathers";

    }
    total = Math.max(total,0);
    fletching_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Fletching Level.";

})

var stock_table = document.getElementById("stock_table");
var stock_button = document.getElementById("toggle_table");

stock_button.addEventListener("click", function() {
    if (stock_table.style.display == "none") {
        stock_table.style.display = "table";
        stock_table.style.flexBasis = "18em";
    } else {
        stock_table.style.display = "none";
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