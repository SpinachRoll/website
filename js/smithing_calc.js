//This javascript file sets up all the formula's and such for the smithing.html page

document.getElementById("calc_smithing_lvl").addEventListener("click", function() {
    var cur_smithing_lvl_value = parseInt(document.getElementById("cur_smithing_lvl").value);
    var cur_smithing_xp_value = parseInt(document.getElementById("cur_smithing_xp").value);
    var des_smithing_lvl_value = parseInt(document.getElementById("des_smithing_lvl").value);
    var des_smithing_xp_value = parseInt(document.getElementById("des_smithing_xp").value);
    var total;
    var c_s_l_xp;
    var d_s_l_xp;
    var c_s_l_f_xp;
    var gold_ore_xp_cur = document.getElementById("gold_ore_xp");

    //get the corrosponding xp from the level input into the calculator
    c_s_l_xp = parseInt(xpforlvl[cur_smithing_lvl_value]);
    d_s_l_xp = parseInt(xpforlvl[des_smithing_lvl_value]);

    //get the corrosponding level from the xp input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_smithing_xp_value) {
          c_s_l_f_xp = i - 1;
          break;
        }
        c_s_l_f_xp = 99;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_s_l_xp >= cur_smithing_xp_value) {
        if (d_s_l_xp >= des_smithing_xp_value){
            total = d_s_l_xp - c_s_l_xp;
        }
        else {
            total = des_smithing_xp_value - c_s_l_xp;
        }
    } 
    else {
        if (d_s_l_xp >= des_smithing_xp_value){
            total = d_s_l_xp - cur_smithing_xp_value;
        }
        else {
            total = des_smithing_xp_value - cur_smithing_xp_value;
        }
    }

    //variables to get the values put into the stock table for ore
    var cur_tin_o_have_value =  parseInt(document.getElementById("tin_o_have").value);
    var cur_copper_o_have_value =  parseInt(document.getElementById("copper_o_have").value);
    var cur_iron_o_have_value =  parseInt(document.getElementById("iron_o_have").value);
    var cur_silv_o_have_value =  parseInt(document.getElementById("silv_o_have").value);
    var cur_coal_o_have_value =  parseInt(document.getElementById("coal_o_have").value);
    var cur_gold_o_have_value =  parseInt(document.getElementById("gold_o_have").value);
    var cur_mith_o_have_value =  parseInt(document.getElementById("mith_o_have").value);
    var cur_addy_o_have_value =  parseInt(document.getElementById("addy_o_have").value);
    var cur_rune_o_have_value =  parseInt(document.getElementById("rune_o_have").value);

    //variables to get the values put into the stock table for bars
    var cur_bronze_b_have_value = parseInt(document.getElementById("bronze_b_have").value);
    var cur_iron_b_have_value = parseInt(document.getElementById("iron_b_have").value);
    var cur_steel_b_have_value = parseInt(document.getElementById("steel_b_have").value);
    var cur_gold_b_have_value = parseInt(document.getElementById("gold_b_have").value);
    var cur_mith_b_have_value = parseInt(document.getElementById("mith_b_have").value);
    var cur_addy_b_have_value = parseInt(document.getElementById("addy_b_have").value);
    var cur_rune_b_have_value = parseInt(document.getElementById("rune_b_have").value);

    //variables to get the total xp for the items we already have from the stock table
    var have_total = 0;
    var bronze_total = 0;
    var iron_total = 0;
    var steel_total = 0;
    var mith_total = 0;
    var addy_total = 0;
    var rune_total = 0;

    //variable LIST to go through and check it any of the items in the stock table contain more than 0
    var have_values = [cur_tin_o_have_value, cur_copper_o_have_value, cur_iron_o_have_value, cur_silv_o_have_value, 
        cur_coal_o_have_value, cur_gold_o_have_value, cur_mith_o_have_value, cur_addy_o_have_value, 
        cur_rune_o_have_value, cur_bronze_b_have_value, cur_iron_b_have_value, cur_steel_b_have_value, 
        cur_gold_b_have_value, cur_mith_b_have_value, cur_addy_b_have_value, cur_rune_b_have_value];

    //variable used in the formula to calculate total xp we current have banked
    var flag = false;
    
    //variable to use the iron and steel radio buttons
    var barType = document.querySelector('input[name="iron_steel"]:checked').value;

    //variable to check for gauntlets equiped
    var gauntsOn = document.getElementById('gauntlets');

    //formula to check the LIST and set the flag to true if there are any values greater than 0 in the stock table
    for ( i = 0; i < have_values.length; i++ ) {
        if (have_values[i] > 0) {
            flag = true;
            break;
        }
    }

    //formula to calculate the total XP from the stock table. total = 0 before this
    if (flag) {
        //if less tin that copper, (ie 5 tin 10 copper) then bronze total is 6.25 * 5, since we have at least that many of both
        if (cur_tin_o_have_value <= cur_copper_o_have_value) {
            bronze_total = parseFloat(cur_tin_o_have_value * 6.25);
        }
        //else there is more copper, so we do 6.25 * copper
        else {
            bronze_total = parseFloat(cur_copper_o_have_value * 6.25);
        }
        //if bar type = iron(radio button) then set iron total to 12.5 * iron ore we have, and steel to 0
        if(barType == "iron") {
            iron_total = cur_iron_o_have_value * 12.5;
            steel_total = 0;
        }
        //if bar type = steel(radio button) then move on
        if(barType == "steel") {
            //if less iron than coal / 2, then we set steel total to iron * 17.5, and iron total to 0
            if (cur_iron_o_have_value <= (cur_coal_o_have_value / 2)) {
                steel_total = parseFloat(cur_iron_o_have_value * 17.5);
                iron_total = 0;
            }
            //else there is more iron than coal / 2, so we set steel total to 17.5 * (coal /2) and iron total to 0
            else {
                steel_total = parseFloat(Math.floor(cur_coal_o_have_value / 2) * 17.5);
                iron_total = 0;
            }
        }
        //if gaunts on, 33.75 xp, else 22.5 xp per gold smelted
        if (gauntsOn.checked) {
            gold_total = parseFloat(cur_gold_o_have_value * 33.75);
        }
        else {
            gold_total = parseFloat(cur_gold_o_have_value * 22.5);
        }
        //if less mith than coal / 4, then we set mith total to mith * 30
        if (cur_mith_o_have_value <= (cur_coal_o_have_value / 4)) {
            mith_total = parseFloat(cur_mith_o_have_value * 30);
        }
        //else there is more mith than coal / 4, so we set mith total to 30 * (coal / 4)
        else {
            mith_total = parseFloat(Math.floor(cur_coal_o_have_value / 4) * 30);
        }
        //if less addy than coal / 6, then we set addy total to addy * 37.5
        if (cur_addy_o_have_value <= (cur_coal_o_have_value / 6)) {
            addy_total = parseFloat(cur_addy_o_have_value * 37.5);
        }
        //else there is more addy than coal / 6, so we set addy total to 37.5 * (coal / 6)
        else {
            addy_total = parseFloat(Math.floor(cur_coal_o_have_value / 6) * 37.5);
        }
        //if less rune than coal / 8, then we set rune total to rune * 50
        if (cur_rune_o_have_value <= (cur_coal_o_have_value / 8)) {
            rune_total = parseFloat(cur_rune_o_have_value * 50);
        }
        //else there is more rune tha coal / 8, so we set rune total to 50 * (coal / 8)
        else {
            rune_total = parseFloat(Math.floor(cur_coal_o_have_value / 8) * 50);
        }
        //calculate the total xp already owned in the stock table
        have_total = bronze_total + iron_total + (cur_silv_o_have_value * 13.75) + steel_total + gold_total + mith_total + addy_total + rune_total + (cur_bronze_b_have_value * 12.5) + (cur_iron_b_have_value * 25) + (cur_steel_b_have_value * 37.5) + (cur_gold_b_have_value * 30) + (cur_mith_b_have_value * 50) + (cur_addy_b_have_value * 62.5) + (cur_rune_b_have_value * 75);
        total = Math.max(total - have_total,0);
    };

    //variables to set the number of ores needed to the total xp / xp given per ore smelted, or 0, whichever is higher
    tin_smelt_need = Math.max(Math.ceil((total + bronze_total) /6.25) - cur_tin_o_have_value, 0);
    copper_smelt_need = Math.max(Math.ceil((total + bronze_total) /6.25) - cur_copper_o_have_value, 0);
    iron_smelt_need = Math.max(Math.ceil(total/12.5), 0);
    silv_smelt_need = Math.max(Math.ceil(total/13.75), 0);
    iron_smelt_need_2 = Math.max(Math.ceil((total + steel_total)/17.5) - cur_iron_o_have_value, 0);
    steel_coal_need = Math.max(Math.ceil(((total + steel_total)/17.5)*2) - cur_coal_o_have_value, 0);
    if (gauntsOn.checked) {
        gold_smelt_need = Math.max(Math.ceil(total/33.75), 0);
        gold_ore_xp.innerHTML = "33.75";
    } else {
        gold_smelt_need = Math.max(Math.ceil(total/22.5), 0);
        gold_ore_xp.innerHTML = "22.5";
    }
    mith_smelt_need = Math.max(Math.ceil((total + mith_total)/30) - cur_mith_o_have_value, 0);
    mith_coal_need = Math.max(Math.ceil(((total + mith_total)/30)*4) - cur_coal_o_have_value, 0);
    addy_smelt_need = Math.max(Math.ceil((total + addy_total)/37.5) - cur_addy_o_have_value, 0);
    addy_coal_need = Math.max(Math.ceil(((total + addy_total)/37.5)*6) - cur_coal_o_have_value, 0);
    rune_smelt_need = Math.max(Math.ceil((total + rune_total)/50) - cur_rune_o_have_value, 0);
    rune_coal_need = Math.max(Math.ceil(((total + rune_total)/50)*8) - cur_coal_o_have_value, 0);

    //variables to set the number of bars needed to the total xp / xp given per bar smelted, or 0, whichever is higher
    bronze_smith_need = Math.ceil(total/12.5);
    iron_smith_need = Math.ceil(total/25);
    steel_smith_need = Math.ceil(total/37.5);
    gold_smith_need = Math.ceil(total/30)*2;
    mith_smith_need = Math.ceil(total/50);
    addy_smith_need = Math.ceil(total/62.5);
    rune_smith_need = Math.ceil(total/75);

    //variable to set the combined number of ores needed to the total xp / xp given per ore smelted + bar smithed, or 0, whichever is higher
    copper_combine_need = Math.max(Math.ceil((total + bronze_total) / 18.75) - cur_copper_o_have_value, 0);
    tin_combine_need = Math.max(Math.ceil((total + bronze_total) / 18.75) - cur_tin_o_have_value, 0);
    iron_combine_need = Math.max(Math.ceil(total/37.5), 0);
    steel_iron_combine_need = Math.max(Math.ceil((total + steel_total)/55) - cur_iron_o_have_value, 0);
    steel_coal_combine_need = Math.max((Math.ceil(((total + steel_total)/55))*2) - cur_coal_o_have_value, 0);
    if (gauntsOn.checked) {
        gold_combine_need = Math.ceil(total/63.75)*2;

    } else {
        gold_combine_need = Math.ceil(total/52.5)*2;
    }
    mith_combine_need = Math.max(Math.ceil((total + mith_total)/80) - cur_mith_o_have_value, 0);
    mith_coal_combine_need = Math.max((Math.ceil(((total + mith_total)/80))*4) - cur_coal_o_have_value, 0);
    addy_combine_need = Math.max(Math.ceil((total + addy_total)/100) - cur_addy_o_have_value, 0);
    addy_coal_combine_need = Math.max((Math.ceil(((total + addy_total)/100))*6) - cur_coal_o_have_value, 0);
    rune_combine_need = Math.max(Math.ceil((total + rune_total)/125) - cur_rune_o_have_value, 0);
    rune_coal_combine_need = Math.max((Math.ceil(((total + rune_total)/125))*8) - cur_coal_o_have_value, 0);

    //if a calculation must be completed, use this
    if (total >= 0) {
        //send the results back to the webpage. Use the radio buttons to choose iron or steel calculations
        ct_o_need.innerHTML = copper_smelt_need + " / " + tin_smelt_need;
        if (barType == "iron") {
            iron_o_need.innerHTML = iron_smelt_need;
            steel_o_need.innerHTML = "0 / 0";
            iron_c_need.innerHTML = iron_combine_need;
            steel_c_need.innerHTML = "0 / 0";
        };
        silv_o_need.innerHTML = silv_smelt_need;
        if (barType == "steel") {
            iron_o_need.innerHTML = "0";
            steel_o_need.innerHTML = iron_smelt_need_2 + " / " + steel_coal_need;
            iron_c_need.innerHTML = "0";
            steel_c_need.innerHTML = steel_iron_combine_need + " / " + steel_coal_combine_need;
        };
        gold_o_need.innerHTML = gold_smelt_need;
        mith_o_need.innerHTML = mith_smelt_need + " / " + mith_coal_need;
        addy_o_need.innerHTML = addy_smelt_need + " / " + addy_coal_need;
        rune_o_need.innerHTML = rune_smelt_need + " / " + rune_coal_need;
        bronze_b_need.innerHTML = bronze_smith_need;
        iron_b_need.innerHTML = iron_smith_need;
        steel_b_need.innerHTML = steel_smith_need;
        gold_b_need.innerHTML = gold_smith_need;
        mith_b_need.innerHTML = mith_smith_need;
        addy_b_need.innerHTML = addy_smith_need;
        rune_b_need.innerHTML = rune_smith_need;
        bronze_c_need.innerHTML = copper_combine_need + " / " + tin_combine_need;
        gold_c_need.innerHTML = gold_combine_need;
        mith_c_need.innerHTML = mith_combine_need + " / " + mith_coal_combine_need;
        addy_c_need.innerHTML = addy_combine_need + " / " + addy_coal_combine_need;
        rune_c_need.innerHTML = rune_combine_need + " / " + rune_coal_combine_need;        
    }    
    //show the remaining xp needed below the form(calculator)
    if (cur_tin_o_have_value == 0 &&
        cur_copper_o_have_value == 0 &&
        cur_iron_o_have_value > 0 &&
        cur_silv_o_have_value ==  0 &&
        cur_coal_o_have_value > 0 &&
        cur_gold_o_have_value ==  0 &&
        cur_mith_o_have_value ==  0 &&
        cur_addy_o_have_value ==  0 &&
        cur_rune_o_have_value ==  0 &&
        cur_bronze_b_have_value == 0 &&
        cur_iron_b_have_value == 0 &&
        cur_steel_b_have_value == 0 &&
        cur_gold_b_have_value == 0 &&
        cur_mith_b_have_value == 0 &&
        cur_addy_b_have_value == 0 &&
        cur_rune_b_have_value == 0) {
            smithing_xp_needed.innerHTML = "You need " + total + " more xp for your desired Smithing Level.<br><br>" + "You have " + have_total + " xp banked in ores and bars. <br/><br/>HOWEVER, IF YOU USE THE <br/><a href='https://www.youtube.com/watch?v=PbAJHQQxH5o' target='_blank'>SLAM! METHOD</a>,</br> YOU CAN GAIN EXPONENTIALLY MORE XP!!!1!11!!1!";
        }
    else{
        smithing_xp_needed.innerHTML = "You need " + total + " more xp for your desired Smithing Level.<br><br>" + "You have " + have_total + " xp banked in ores and bars.";
    }
})

var stock_table = document.getElementById("stock_table");
var stock_button = document.getElementById("toggle_table");

stock_button.addEventListener("click", function() {
    if (stock_table.style.display == "none") {
        stock_table.style.display = "table";
    } else {
        stock_table.style.display = "none";
    }
});

var combine_button = document.getElementById("combine_button");
var smithing_table = document.getElementById("smithing_table");
var smelting_table = document.getElementById("smelting_table");
var combine_table = document.getElementById("combine_table");

combine_button.addEventListener("click", function() {
    if (combine_table.style.display == "none") {
        combine_table.style.display = "table";
        smithing_table.style.display = "none";
        smelting_table.style.display = "none";
        combine_button.innerHTML = "Calc Smelt & Smith Seperately";
    } else {
        combine_table.style.display = "none";
        smithing_table.style.display = "table";
        smelting_table.style.display = "table";
        combine_button.innerHTML = "Calc Smelt & Smith Together";

    }
});

document.getElementById("stock_reset").addEventListener("click", function() {
    var inputElements = document.querySelectorAll ("#stock_table input[type='number']");
    for (var i = 0; i < inputElements.length; i++) {
      inputElements [i].value = 0;
    }
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