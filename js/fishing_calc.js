document.getElementById("calc_fishing_lvl").addEventListener("click", function() {
    var cur_fishing_lvl = document.getElementById("cur_fishing_lvl");
    var cur_fishing_lvl_value = parseInt(cur_fishing_lvl.value);
    var des_fishing_level = document.getElementById("des_fishing_lvl");
    var des_fishing_lvl_value = parseInt(des_fishing_level.value);
    var cur_fishing_xp = document.getElementById("cur_fishing_xp");
    var cur_fishing_xp_value = parseInt(cur_fishing_xp.value);
    var des_fishing_xp = document.getElementById("des_fishing_xp");
    var des_fishing_xp_value = parseInt(des_fishing_xp.value);
    var total;
    var c_f_l_xp;
    var d_f_l_xp;
    var c_f_l_f_xp;
    var c_f_l;
    var chance;
    const shrimp = [1, 48, 256];
    const sardine = [5, 32, 192];
    const herring = [10, 24, 128];
    const anchovy = [15, 24, 128];
    const mackerel = [16, 14, 48];
    const b_g = [16, 8, 8];
    const seaweed = [16, 8, 8];
    const oyster = [16, 2, 5];
    const casket = [16, 0, 1];
    const trout = [20, 32, 192];
    const cod = [23, 10, 41];
    const pike = [25, 16, 96];
    const salmon = [30, 16, 96];
    const tuna = [35, 8, 64];
    const lobster = [40, 6, 95];
    const bass = [46, 6, 31];
    const swordfish = [50, 4, 48];
    const lava_eel = [53, 16, 96];
    const shark = [76, 3, 40];

    //get the corrosponding level from the xp input into the calculator
    c_f_l_xp = parseInt(xpforlvl[cur_fishing_lvl_value]);
    d_f_l_xp = parseInt(xpforlvl[des_fishing_lvl_value]);

    //get the corrosponding xp from the level input into the calculator
    for (var i = 1; i < xpforlvl.length; i++) {
        if (xpforlvl[i] > cur_fishing_xp_value) {
            c_f_l_f_xp = i - 1;
            break;
        }
        c_f_l_f_xp = 99;
    }
    
    //get the current fishing level based off level input, or xp input,
    //and use it to output the chance to mine things in the form
    if (c_f_l_f_xp >= cur_fishing_lvl_value) {
        c_f_l = c_f_l_f_xp;
    }
    else if (c_f_l_f_xp < cur_fishing_lvl_value){
        c_f_l = cur_fishing_lvl_value;
    }

    //set the total to either the most desired xp, or xp 
    //for the input level minus(-) the current xp or xp for level
    if (c_f_l_xp >= cur_fishing_xp_value) {
        if (d_f_l_xp >= des_fishing_xp_value){
            total = d_f_l_xp - c_f_l_xp;
        }
        else {
            total = des_fishing_xp_value - c_f_l_xp;
        }
    } 
    else {
        if (d_f_l_xp >= des_fishing_xp_value){
            total = d_f_l_xp - cur_fishing_xp_value;
        }
        else {
            total = des_fishing_xp_value - cur_fishing_xp_value;
        }
    }
    
    if (total > 0) {
        shrimp_need.innerHTML = Math.ceil(total/10);
        sardine_need.innerHTML = Math.ceil(total/20);
        herring_need.innerHTML = Math.ceil(total/30);
        anchovy_need.innerHTML = Math.ceil(total/40);
        boot_need.innerHTML = Math.ceil(total/1);
        seaweed_need.innerHTML = Math.ceil(total/1);
        oyster_need.innerHTML = Math.ceil(total/10);
        casket_need.innerHTML = Math.ceil(total/10);
        mackerel_need.innerHTML = Math.ceil(total/20);
        cod_need.innerHTML = Math.ceil(total/45);
        pike_need.innerHTML = Math.ceil(total/60);
        bass_need.innerHTML = Math.ceil(total/100);
    
        trout_need.innerHTML = Math.ceil(total/50);
        salmon_need.innerHTML = Math.ceil(total/70);
        tuna_need.innerHTML = Math.ceil(total/80);
        lobster_need.innerHTML = Math.ceil(total/90);
        swordfish_need.innerHTML = Math.ceil(total/100);
        lava_eel_need.innerHTML = Math.ceil(total/90);
        shark_need.innerHTML = Math.ceil(total/110);
        sea_turtle_need.innerHTML = Math.ceil(total/95);
        manta_ray_need.innerHTML = Math.ceil(total/115);
    }

    var pot = 0;
    var potted = document.getElementById('fish_pot');
    var pot_c_f_l;

    if (potted.checked) {
        pot_c_f_l = c_f_l + 3;
    }
    else {
        pot_c_f_l = c_f_l;
    }


    shark_success = (((Math.floor(shark[1]*(99-pot_c_f_l)/98)+Math.floor(shark[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    lava_eel_success = (((Math.floor(lava_eel[1]*(99-pot_c_f_l)/98)+Math.floor(lava_eel[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    swordfish_success = (((Math.floor(swordfish[1]*(99-pot_c_f_l)/98)+Math.floor(swordfish[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    bass_success = (((Math.floor(bass[1]*(99-pot_c_f_l)/98)+Math.floor(bass[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    lobster_success = (((Math.floor(lobster[1]*(99-pot_c_f_l)/98)+Math.floor(lobster[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    tuna_success_interp = (((Math.floor(tuna[1]*(99-pot_c_f_l)/98)+Math.floor(tuna[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    tuna_success_cascade = (((1-(swordfish_success/100))*(Math.floor(tuna[1]*(99-pot_c_f_l)/98)+Math.floor(tuna[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    salmon_success = (((Math.floor(salmon[1]*(99-pot_c_f_l)/98)+Math.floor(salmon[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    pike_success = (((Math.floor(pike[1]*(99-pot_c_f_l)/98)+Math.floor(pike[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    cod_success = (((Math.floor(cod[1]*(99-pot_c_f_l)/98)+Math.floor(cod[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    trout_success_interp = (((Math.floor(trout[1]*(99-pot_c_f_l)/98)+Math.floor(trout[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    trout_success_cascade = (((1-(salmon_success/100))*(Math.floor(trout[1]*(99-pot_c_f_l)/98)+Math.floor(trout[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    casket_success = (((Math.floor(casket[1]*(99-pot_c_f_l)/98)+Math.floor(casket[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    oyster_success = (((Math.floor(oyster[1]*(99-pot_c_f_l)/98)+Math.floor(oyster[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    seaweed_success = (((Math.floor(seaweed[1]*(99-pot_c_f_l)/98)+Math.floor(seaweed[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    b_g_success = (((Math.floor(b_g[1]*(99-pot_c_f_l)/98)+Math.floor(b_g[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    mackerel_success = (((Math.floor(mackerel[1]*(99-pot_c_f_l)/98)+Math.floor(mackerel[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    anchovy_success = (((Math.floor(anchovy[1]*(99-pot_c_f_l)/98)+Math.floor(anchovy[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    herring_success = (((Math.floor(herring[1]*(99-pot_c_f_l)/98)+Math.floor(herring[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    sardine_success_interp = (((Math.floor(sardine[1]*(99-pot_c_f_l)/98)+Math.floor(sardine[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    sardine_success_cascade = (((1-(herring_success/100))*(Math.floor(sardine[1]*(99-pot_c_f_l)/98)+Math.floor(sardine[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    shrimp_success_interp = (((Math.floor(shrimp[1]*(99-pot_c_f_l)/98)+Math.floor(shrimp[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    shrimp_success_cascade = (((1-(anchovy_success/100))*(Math.floor(shrimp[1]*(99-pot_c_f_l)/98)+Math.floor(shrimp[2]*(pot_c_f_l-1)/98)+1)/256)*100).toFixed(2);
    
    if (pot_c_f_l >= 76) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Shark " + shark_success + "%<br>"
        + "Lava Eel " + lava_eel_success + "%<br>"
        + "Swordfish " + swordfish_success + "%<br>"
        + "Bass " + bass_success + "%<br>"
        + "Lobster " + lobster_success + "%<br>"
        + "Tuna " + tuna_success_cascade + "%<br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 53 && pot_c_f_l < 76) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Lava Eel " + lava_eel_success + "%<br>"
        + "Swordfish " + swordfish_success + "%<br>"
        + "Bass " + bass_success + "%<br>"
        + "Lobster " + lobster_success + "%<br>"
        + "Tuna " + tuna_success_cascade + "%<br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 50 && pot_c_f_l < 53) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Swordfish " + swordfish_success + "%<br>"
        + "Bass " + bass_success + "%<br>"
        + "Lobster " + lobster_success + "%<br>"
        + "Tuna " + tuna_success_cascade + "%<br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 46 && pot_c_f_l < 50) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Bass " + bass_success + "%<br>"
        + "Lobster " + lobster_success + "%<br>"
        + "Tuna " + tuna_success_interp + "%<br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 40 && pot_c_f_l < 46) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Lobster " + lobster_success + "%<br>"
        + "Tuna " + tuna_success_interp + "%<br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 35 && pot_c_f_l < 40) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Tuna " + tuna_success_interp + "%<br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 30 && pot_c_f_l < 35) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Salmon " + salmon_success + "%<br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_cascade + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 25 && pot_c_f_l < 30) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Pike " + pike_success + "%<br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_interp + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 23 && pot_c_f_l < 25) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Cod " + cod_success + "%<br>"
        + "Trout " + trout_success_interp + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 20 && pot_c_f_l < 23) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Trout " + trout_success_interp + "%<br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 16 && pot_c_f_l < 20) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Casket " + casket_success + "%<br>"
        + "Oyster " + oyster_success + "%<br>"
        + "Seaweed " + seaweed_success + "%<br>"
        + "Boots/Gloves " + b_g_success + "%<br>"
        + "Mackerel " + mackerel_success + "%<br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 15 && pot_c_f_l < 16) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Anchovy " + anchovy_success + "%<br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_cascade + "%<br>";
    }
    else if (pot_c_f_l >= 10 && pot_c_f_l < 15) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Herring " + herring_success + "%<br>"
        + "Sardine " + sardine_success_cascade + "%<br>"
        + "Shrimp " + shrimp_success_interp + "%<br>";
    }
    else if (pot_c_f_l >= 5 && pot_c_f_l < 10) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Sardine " + sardine_success_interp + "%<br>"
        + "Shrimp " + shrimp_success_interp + "%<br>";
    }
    else if (pot_c_f_l >= 1 && pot_c_f_l < 5) {
        chance = "Chance to catch if you have the required level<br><br>"
        + "Shrimp " + shrimp_success_interp + "%<br>";
    }
        

    total = Math.max(total,0);
    fishing_xp_needed.innerHTML = "Your need " + total + 
    " more xp for your desired Fishing Level.<br><br>" + chance;

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