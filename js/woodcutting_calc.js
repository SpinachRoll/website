document.getElementById("calc_woodcutting_lvl").addEventListener("click", function() {
    var cur_woodcutting_lvl_value = parseInt(document.getElementById("cur_woodcutting_lvl").value);
    var des_woodcutting_lvl_value = parseInt(document.getElementById("des_woodcutting_lvl").value);
    var cur_woodcutting_xp_value = parseInt(document.getElementById("cur_woodcutting_xp").value);
    var des_woodcutting_xp_value = parseInt(document.getElementById("des_woodcutting_xp").value);
    var axe_type_value = parseInt(document.getElementById("axe_type").value);
    var total;
    var c_w_l_xp;
    var d_w_l_xp;
    var chance;
    var c_w_l_f_xp;
    var c_w_l;
    const normal_tree = [64, 200, 96, 300, 128, 400, 144, 450, 160, 500, 192, 600, 224, 700];
    const oak_tree = [32, 100, 48, 150, 64, 200, 72, 225, 80, 250, 96, 300, 112, 350];
    const willow_tree = [16, 50, 24, 75, 32, 100, 36, 112, 40, 125, 48, 150, 56, 175];
    const maple_tree = [8, 25, 12, 37, 16, 50, 18, 56, 20, 62, 24, 75, 28, 87];
    const yew_tree = [4, 12, 6, 19, 8, 25, 9, 28, 10, 31, 12, 37, 14, 44];
    const magic_tree = [2, 6, 3, 9, 4, 12, 5, 13, 5, 15, 6, 18, 7, 21];

    //get the corrosponding level from the xp input into the calculator
    c_w_l_xp = parseInt(xpforlvl[cur_woodcutting_lvl_value]);
    d_w_l_xp = parseInt(xpforlvl[des_woodcutting_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_woodcutting_xp_value) {
            c_w_l_f_xp = i - 1;
            break;
        }
        c_w_l_f_xp = 99;
    }

    //get the current woodcutting level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_w_l_f_xp >= cur_woodcutting_lvl_value) {
        c_w_l = c_w_l_f_xp;
    }
    else if (c_w_l_f_xp < cur_woodcutting_lvl_value){
        c_w_l = cur_woodcutting_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_w_l_xp >= cur_woodcutting_xp_value) {
        if (d_w_l_xp >= des_woodcutting_xp_value){
            total = d_w_l_xp - c_w_l_xp;
        }
        else {
            total = des_woodcutting_xp_value - c_w_l_xp;
        }
    } 
    else {
        if (d_w_l_xp >= des_woodcutting_xp_value){
            total = d_w_l_xp - cur_woodcutting_xp_value;
        }
        else {
            total = des_woodcutting_xp_value - cur_woodcutting_xp_value;
        }
    }

    tree_logs_need = Math.ceil(total/25);
    oak_logs_need = Math.ceil(total/37.5);
    willow_logs_need = Math.ceil(total/62.5);
    maple_logs_need = Math.ceil(total/100);
    yew_logs_need = Math.ceil(total/175);
    magic_logs_need = Math.ceil(total/250);
    
    if (total > 0) {
        tree_need.innerHTML = tree_logs_need;
        oak_need.innerHTML = oak_logs_need;
        willow_need.innerHTML = willow_logs_need;
        maple_need.innerHTML = maple_logs_need;
        yew_need.innerHTML = yew_logs_need;
        magic_need.innerHTML = magic_logs_need;
    }

    tree_success = (Math.min(Math.max((Math.floor(normal_tree[axe_type_value]*(99-c_w_l)/98)+Math.floor(normal_tree[axe_type_value+1]*(c_w_l-1)/98)+1)/256, 0),1)*100).toFixed(2);
    oak_success = (Math.min(Math.max((Math.floor(oak_tree[axe_type_value]*(99-c_w_l)/98)+Math.floor(oak_tree[axe_type_value+1]*(c_w_l-1)/98)+1)/256, 0),1)*100).toFixed(2);
    willow_success = (Math.min(Math.max((Math.floor(willow_tree[axe_type_value]*(99-c_w_l)/98)+Math.floor(willow_tree[axe_type_value+1]*(c_w_l-1)/98)+1)/256, 0),1)*100).toFixed(2);
    maple_success = (Math.min(Math.max((Math.floor(maple_tree[axe_type_value]*(99-c_w_l)/98)+Math.floor(maple_tree[axe_type_value+1]*(c_w_l-1)/98)+1)/256, 0),1)*100).toFixed(2);
    yew_success = (Math.min(Math.max((Math.floor(yew_tree[axe_type_value]*(99-c_w_l)/98)+Math.floor(yew_tree[axe_type_value+1]*(c_w_l-1)/98)+1)/256, 0),1)*100).toFixed(2);
    magic_success = (Math.min(Math.max((Math.floor(magic_tree[axe_type_value]*(99-c_w_l)/98)+Math.floor(magic_tree[axe_type_value+1]*(c_w_l-1)/98)+1)/256, 0),1)*100).toFixed(2);

    if (c_w_l >= 75) {
        chance = "Chance to cut if you have the required level<br><br>"
        + "Magic " + magic_success + "%<br>"
        + "Yew " + yew_success + "%<br>"
        + "Maple " + maple_success + "%<br>"
        + "Willow " + willow_success + "%<br>"
        + "Oak " + oak_success + "%<br>"
        + "Regular Tree " + tree_success + "%<br>";
    }
    else if (c_w_l >= 60 && c_w_l < 75) {
        chance = "Chance to cut if you have the required level<br><br>"
        + "Yew " + yew_success + "%<br>"
        + "Maple " + maple_success + "%<br>"
        + "Willow " + willow_success + "%<br>"
        + "Oak " + oak_success + "%<br>"
        + "Regular Tree " + tree_success + "%<br>";
    }
    else if (c_w_l >= 45 && c_w_l < 60) {
        chance = "Chance to cut if you have the required level<br><br>"
        + "Maple " + maple_success + "%<br>"
        + "Willow " + willow_success + "%<br>"
        + "Oak " + oak_success + "%<br>"
        + "Regular Tree " + tree_success + "%<br>";
    }
    else if (c_w_l >= 30 && c_w_l < 45) {
        chance = "Chance to cut if you have the required level<br><br>"
        + "Willow " + willow_success + "%<br>"
        + "Oak " + oak_success + "%<br>"
        + "Regular Tree " + tree_success + "%<br>";
    }
    else if (c_w_l >= 15 && c_w_l < 30) {
        chance = "Chance to cut if you have the required level<br><br>"
        + "Oak " + oak_success + "%<br>"
        + "Regular Tree " + tree_success + "%<br>";
    }
    else if (c_w_l < 15) {
        chance = "Chance to cut if you have the required level<br><br>"
        + "Regular Tree " + tree_success + "%<br>";
    }

    total = Math.max(total,0);
    woodcutting_xp_needed.innerHTML = "Your need " + total + " more xp for your desired Woodcutting Level.<br><br>" + chance;

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