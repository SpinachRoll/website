var att = document.getElementById("att_lvl");
var def = document.getElementById("def_lvl");
var str = document.getElementById("str_lvl");
var hits = document.getElementById("hits_lvl");
var range = document.getElementById("range_lvl");
var magic = document.getElementById("magic_lvl");
var pray = document.getElementById("pray_lvl");
var next_lvl;
var adsh_left;
var r_left;
var mp_left;
var dh_left;

document.getElementById("calc_cmb_lvl_btn").addEventListener("click", function() {
	var melee_cmb = ((parseInt(att.value) * 0.25) + (parseInt(str.value) * 0.25) + (parseInt(def.value) * 0.25) + (parseInt(hits.value) * 0.25) + (parseInt(magic.value) * 0.125) + (parseInt(pray.value) * 0.125));
	var range_cmb = (parseInt(range.value) * 0.375) + (parseInt(def.value) * 0.25) + (parseInt(hits.value) * 0.25) + (parseInt(pray.value) * 0.125) + (parseInt(magic.value) * 0.125);
	var cmb;
	if ((parseInt(att.value) == 1) & (parseInt(str.value) == 1) & (parseInt(def.value) == 1) & (parseInt(hits.value) == 10) & (parseInt(magic.value) == 99) & (parseInt(pray.value) == 1)) {
		cmb_lvl.innerHTML = "You are a Mage based account Lord Jolt.";
	}
	else if ((parseInt(att.value) == 1) & (parseInt(str.value) == 1) & (parseInt(def.value) == 1) & (parseInt(hits.value) == 10) & (parseInt(magic.value) == 1) & (parseInt(pray.value) == 99)) {
		cmb_lvl.innerHTML = "LOL! Get real my friend.";
	}
	else if ((parseInt(att.value) == 99) & (parseInt(str.value) == 99) & (parseInt(def.value) == 1) & (parseInt(hits.value) == 99) & (parseInt(magic.value) == 1) & (parseInt(pray.value) == 40)) {
		cmb_lvl.innerHTML = "Nice";
	}
	else if (melee_cmb > range_cmb) {
		cmb = melee_cmb;
		next_lvl = Math.max(Math.ceil(cmb), Math.floor(cmb + 1));
		adsh_left = Math.ceil((next_lvl - cmb) / .25);
		mp_left = Math.ceil((next_lvl - cmb) / .125);
		cmb_lvl.innerHTML = "Your Combat Level is " + cmb + ". <br/><br/>You are a Melee based account.<br/><br/>" + "You need " + adsh_left + " more Att, Def, Str, or Hits levels, or " + mp_left + " more Mage or Pray levels for your next Combat Level";
	} else {
		cmb = range_cmb;
		next_lvl = Math.max(Math.ceil(cmb), Math.floor(cmb + 1));
		dh_left = Math.ceil((next_lvl - cmb) / .25);
		r_left = Math.ceil((next_lvl - cmb) / .375);
		mp_left = Math.ceil((next_lvl - cmb) / .125);
		cmb_lvl.innerHTML = "Your Combat Level is " + cmb + ". <br/><br/>You are a Range based account.<br/><br/>" + "You need " + dh_left + " more Def, or Hits levels, or " + r_left + " more Range levels, or " + mp_left + " more Mage or Pray levels for your next Combat Level";
	};
});


function calculateTotalExperience(attack, defense, strength) {
	var total = 0;
	var levels = [attack, defense, strength];
	for (var i = 0; i < levels.length; i++) {
		var level = levels[i];
		var xp = xpforlvl[level];
		total += xp;
	}
	return total;
}


function calculateHpLevel(total) {
	if ((total/3) < 1154) {
		return 10;
	}
	else if ((total/3) >= xpforlvl[99]) {
		return 99;
	}
	else {
		var level = Math.floor(total/3 + 1154);
		for (var i = 1; i < xpforlvl.length; i++) {
			if (xpforlvl[i] > level) {
				return i - 1;
			} 
		}
	}
}


document.getElementById("calc_hits_lvl_btn").addEventListener("click", function() {
	var total = calculateTotalExperience(att.value, def.value, str.value);
	var hp = calculateHpLevel(total);
	var hits_xp = Math.max(1154, Math.floor(total/3 + 1154));
	var xpdiff = parseInt(xpforlvl[hp + 1] - hits_xp);
	hits.value = hp;
	cmb_lvl.innerHTML = "Hits lvl is a close minimum estimate!! About <b>" + xpdiff + " xp</b> for your next hits lvl";
});

//str pot is 10% + 3; ssp is 15% + 5; zammy pot is 12% + 2
document.getElementById("calc_max_hit_btn").addEventListener("click", function() {
	var mh_str_calc_value = parseInt(document.getElementById("mh_str_lvl").value);
	var mh_weap_pwr_calc_value = parseInt(document.getElementById("mh_weap_pwr").value);
	var mh_ammy_calc_value = parseInt(document.getElementById("mh_ammy").value);
	var mh_gaunlets_calc_value = parseInt(document.getElementById("mh_gaunlets").value);
	var mh_pot_calc = document.getElementById("mh_potions");
	var mh_pray_bonus_calc = parseFloat(document.getElementById("mh_prayer").value);
	var mh_cmb_style_calc_value = parseInt(document.getElementById("mh_cmb_style").value);
	var max_hit_base;
	if (parseInt(mh_pot_calc.value) === 0) {
		max_hit_base = (Math.floor((Math.floor(mh_str_calc_value * mh_pray_bonus_calc) + 8 + mh_cmb_style_calc_value) * (mh_weap_pwr_calc_value + mh_ammy_calc_value + mh_gaunlets_calc_value + 64)) + 319) / 640;
		max_hit_round.innerHTML = "Your Max Hit is: " + max_hit_base;
	} else if (parseInt(mh_pot_calc.value) === 1) {
		max_hit_base = (Math.floor((Math.floor((mh_str_calc_value + (mh_str_calc_value * 0.1) + 3) * mh_pray_bonus_calc) + 8 + mh_cmb_style_calc_value) * (mh_weap_pwr_calc_value + mh_ammy_calc_value + mh_gaunlets_calc_value + 64)) + 319) / 640;
		max_hit_round.innerHTML = "Your Max Hit is: " + max_hit_base;
	} else if (parseInt(mh_pot_calc.value) === 2) {
		max_hit_base = (Math.floor((Math.floor((mh_str_calc_value + (mh_str_calc_value * 0.15) + 5) * mh_pray_bonus_calc) + 8 + mh_cmb_style_calc_value) * (mh_weap_pwr_calc_value + mh_ammy_calc_value + mh_gaunlets_calc_value + 64)) + 319) / 640;
		max_hit_round.innerHTML = "Your Max Hit is: " + max_hit_base;
	} else if (parseInt(mh_pot_calc.value) === 3) {
		max_hit_base = (Math.floor((Math.floor((mh_str_calc_value + (mh_str_calc_value * 0.12) + 2) * mh_pray_bonus_calc) + 8 + mh_cmb_style_calc_value) * (mh_weap_pwr_calc_value + mh_ammy_calc_value + mh_gaunlets_calc_value + 64)) + 319) / 640;
		max_hit_round.innerHTML = "Your Max Hit is: " + max_hit_base;
	};
});


/*show aim and prayer and cmb style for attacker when a player*/
document.getElementById("att_acc_choice").addEventListener("change", function() {
    var att_type = document.getElementById("att_acc_choice");
	var att_aim = document.getElementById("att_aim");
    var att_prayer = document.getElementById("att_prayer");
    var att_cmb_style = document.getElementById("att_cmb_style");

    if (att_type.value == "8") {
		att_aim.style.display = "block";
        att_prayer.style.display = "block";
        att_cmb_style.style.display = "block";
    } else {
		att_aim.style.display = "none";
        att_prayer.style.display = "none";
        att_cmb_style.style.display = "none";
    }
});

/*show armour and prayer and cmb style for defender when a player*/
document.getElementById("def_acc_choice").addEventListener("change", function() {
    var def_type = document.getElementById("def_acc_choice");
	var def_arm = document.getElementById("def_arm");
    var def_prayer = document.getElementById("def_prayer");
    var def_cmb_style = document.getElementById("def_cmb_style");

    if (def_type.value == "8") {
		def_arm.style.display = "block";
        def_prayer.style.display = "block";
        def_cmb_style.style.display = "block";
    } else {
		def_arm.style.display = "none";
        def_prayer.style.display = "none";
        def_cmb_style.style.display = "none";
    }
});

/*accuracy % based on att lvl, aim, prayer, and style*/
document.getElementById("calc_acc_btn").addEventListener("click", function() {
	var att_type = parseInt(document.getElementById("att_acc_choice").value);
	var att_acc_lvl_calc = parseInt(document.getElementById("att_acc_lvl").value);
	var att_aim_calc = parseInt(document.getElementById("att_acc_aim").value);
	var att_prayer_calc = parseFloat(document.getElementById("att_acc_prayer").value);
	var att_cmb_style_calc = parseInt(document.getElementById("att_acc_cmb_style").value);
	var def_type = parseInt(document.getElementById("def_acc_choice").value);
	var def_acc_lvl_calc = parseInt(document.getElementById("def_acc_lvl").value);
	var def_arm_calc = parseInt(document.getElementById("def_acc_arm").value);
	var def_prayer_calc = parseFloat(document.getElementById("def_acc_prayer").value);
	var def_cmb_style_calc = parseInt(document.getElementById("def_acc_cmb_style").value);

	var getMeleeAccuracy;
	if (att_type == "8") {
		getMeleeAccuracy = Math.floor((att_acc_lvl_calc * att_prayer_calc) + 8 + att_cmb_style_calc)*(att_aim_calc + 64);
	}
	else if (att_type == "0") {
		getMeleeAccuracy = Math.floor((att_acc_lvl_calc * 1) + 0 + 0) * (0 + 64);
	};

	var getMeleeDefence;
	if (def_type == "8") {
		getMeleeDefence = Math.floor((def_acc_lvl_calc * def_prayer_calc) + 8 + def_cmb_style_calc) * (def_arm_calc + 64);
	}
	else if (def_type == "0") {
		getMeleeDefence = Math.floor((def_acc_lvl_calc * 1) + 0 + 0) * (0 + 64);
	};
	
	var hitChance;
	if (getMeleeAccuracy > getMeleeDefence) {
		hitChance = ((1 - ((getMeleeDefence + 2) / (2 * (getMeleeAccuracy + 1))))*100).toFixed(5);
	} else {
		hitChance = ((getMeleeAccuracy / (2 * (getMeleeDefence + 1)))*100).toFixed(3);
	};

	max_acc_round.innerHTML = "Attacker Accuracy is: " + hitChance + "%";


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
