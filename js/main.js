// PPAR BG
    $('#ppar').hover(function() {
        $('.bg').addClass('show')
    }, function() {
        $('.bg').removeClass('show')
    })

// <th colspan="$">
    tdMax = []
    $('table tr')
        .each(function() { tdMax.push($('td', this).length) })
        .find('th').attr('colspan', Math.max.apply(Math, tdMax))

// Placeholders
    $('#pkmn, #met_loc, #ot, #ppid, #ign, #fc')
        .attr({
            'placeholder': 'Required'
        })
        .addClass('boldPlaceholder')
    $('#nn, #item').attr({
        'placeholder': 'Leave blank if none'
    })
    $('#pkhex, #serebii, #tid, #sid, #ribbon').attr({
        'placeholder': 'Optional'
    })

// select > options
    $('select.ball').each(function() {
        $(this).html(`
            <option value="Poke">Poké Ball</option>
			<option value="Great">Great Ball</option>
			<option value="Ultra">Ultra Ball</option>
			<option value="Master">Master Ball</option>
			<option value="Safari">Safari Ball</option>
			<option value="Sport">Sport Ball</option>
			<option value="Premier">Premier Ball</option>
			<option value="Repeat">Repeat Ball</option>
			<option value="Timer">Timer Ball</option>
			<option value="Nest">Nest Ball</option>
			<option value="Net">Net Ball</option>
			<option value="Dive">Dive Ball</option>
			<option value="Luxury">Luxury Ball</option>
			<option value="Heal">Heal Ball</option>
			<option value="Quick">Quick Ball</option>
			<option value="Dusk">Dusk Ball</option>
			<option value="Cherish">Cherish Ball</option>
			<option value="Park">Park Ball</option>
			<option value="Dream">Dream Ball</option>
			<option value="Beast">Beast Ball</option>
			<optgroup label="- Apricorn Balls -">
			<option value="Level">Level Ball</option>
			<option value="Lure">Lure Ball</option>
			<option value="Moon">Moon Ball</option>
			<option value="Friend">Friend Ball</option>
			<option value="Love">Love Ball</option>
			<option value="Heavy">Heavy Ball</option>
			<option value="Fast">Fast Ball</option>
			</optgroup>
        `)
    })
    $('.spreads:not(#hyperTraining)').each(function() {
        $(this).html(`
            <tr>
                <td><input
                    id="${$(this).attr('data-id')}_h"
                    type="number"
                    value="${$(this).data('val')}"
                    min="0"
                    max="${$(this).data('max')}"
                    step="${$(this).data('step')}">
                </td>
                <td><input
                    id="${$(this).attr('data-id')}_a"
                    type="number"
                    value="${$(this).data('val')}"
                    min="0"
                    max="${$(this).data('max')}"
                    step="${$(this).data('step')}">
                </td>
                <td><input
                    id="${$(this).attr('data-id')}_b"
                    type="number"
                    value="${$(this).data('val')}"
                    min="0"
                    max="${$(this).data('max')}"
                    step="${$(this).data('step')}">
                </td>
                <td><input
                    id="${$(this).attr('data-id')}_c"
                    type="number"
                    value="${$(this).data('val')}"
                    min="0"
                    max="${$(this).data('max')}"
                    step="${$(this).data('step')}">
                </td>
                <td><input
                    id="${$(this).attr('data-id')}_d"
                    type="number"
                    value="${$(this).data('val')}"
                    min="0"
                    max="${$(this).data('max')}"
                    step="${$(this).data('step')}">
                </td>
                <td><input
                    id="${$(this).attr('data-id')}_s"
                    type="number"
                    value="${$(this).data('val')}"
                    min="0"
                    max="${$(this).data('max')}"
                    step="${$(this).data('step')}">
                </td>
            </tr>
        `)
    })
    $('.hyperTraining td').each(function() {
        $(this).click(function() {
            $('input', this).click()
        })
    })
    ht_check()
    $('#lv').change(ht_check)
    function ht_check() {
            if ($('#lv').val() < 100) {
                $('.hyperTraining input')
                    .attr('disabled', true)
                    .prop('checked', false)
                $('#ht_100').show()
            } else {
                $('.hyperTraining input')
                    .attr('disabled', false)
                    .prop('checked', false)
                $('#ht_100').hide()
            }
        }
    $('#gts_msg option').each(function() {
        $(this).html($(this).val())
    })
    var items = []
        $.ajax({
            url: 'js/items.csv',
            async: false,
            success: function(data) {
                var items = data.split(/\r\n|\n/)

                $(document).ready(function() {
                    setTimeout(function() {
                        $("#item").select2({
                          data: items
                        })
                    }, 500)
                })
            }
        })

// Capitalize input values
    $('#pkmn, .moves input').change(function(e){
        txt = $(this).val()
        $(this).val(txt.replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase()))
    });

// Pokémon
	var pkmnList = []
	var ppaList = []
    var genderList = []
    var abilityList = []
	$.getJSON('https://nuotsu.github.io/PPAR/js/ppa.json', function(ppaJSON) {
        for (var i in ppaJSON) {
			pkmnList.push(ppaJSON[i].nameENG)
			ppaList.push(ppaJSON[i].dex)
            genderList.push(ppaJSON[i].gender)
            abilityList.push(ppaJSON[i].abilityENG)
        }
		return pkmnList
	})
    $(document).ready(function() {
        setTimeout(function() {
            $("#pkmn").select2({
              data: pkmnList
            })
        }, 500)
    })

// Meeting Date: Today
	now = new Date()
	    yyyy = now.getFullYear()
	    mm = now.getMonth()+1
	        if (mm < 10) mm = `0${mm}`
	    d = now.getDate()
	    dd = ''
	        if (d < 10) dd = `0${dd}`
	timestamp = `${mm}/${d}/${yyyy}`
	$('#met_date').val(timestamp)

// Copy & Submit
    $('#copy').click(function() {
        $('textarea').select()
        document.execCommand('copy')
    })

// Export
    $('input, select').on('change keyup', generate)
    $('#pkmn').on('change', function() {
        if ($('#pkmn').val() != undefined) {
            var genderAdj = genderList[pkmnList.indexOf($('#pkmn').val())]
            if (genderAdj[0] == 'm' && genderAdj[1] == undefined) {
                $('#gender').html(`<option value="(M) ">♂</option>`)
            } else if (genderAdj[0] == 'f' && genderAdj[1] == undefined) {
                $('#gender').html(`<option value="(F) ">♀</option>`)
            } else if (genderAdj[0] == '-') {
                $('#gender').html(`<option value="">-</option>`)
            } else {
                $('#gender').html(`
                    <option value="(M) ">♂</option>
                    <option value="(F) ">♀</option>
                `)
            }

            var abilityAdj = abilityList[pkmnList.indexOf($('#pkmn').val())]
            $('#ability').html('')
            for (var i in abilityAdj)
                $('#ability').append(`<option value="${abilityAdj[i]}">${abilityAdj[i]}</option>`)
        }
    })
    $('#gts_pkmn').on('change', function() {
        if ($('#gts_pkmn').val() != undefined) {
            var genderAdj = genderList[pkmnList.indexOf($('#gts_pkmn').val())]
            if (genderAdj[0] == 'm' && genderAdj[1] == undefined) {
                $('#gts_gender').html(`<option value="(M) ">♂</option>`)
            } else if (genderAdj[0] == 'f' && genderAdj[1] == undefined) {
                $('#gts_gender').html(`<option value="(F) ">♀</option>`)
            } else if (genderAdj[0] == '-') {
                $('#gts_gender').html(`<option value="">-</option>`)
            } else {
                $('#gts_gender').html(`
                    <option value="(M) ">♂</option>
                    <option value="(F) ">♀</option>
                `)
            }
        }
    })
    function generate() {
        game_ver = $('#game_ver').val()
		pkhex = $('#pkhex').val()
		serebii = $('#serebii').val()
		pkmn = ''
            if ($('#pkmn').val() != undefined) pkmn = $('#pkmn').val()
            else pkmn = ''
			var ppa = ppaList[pkmnList.indexOf(pkmn)]
			if (ppa == undefined || ppa == '0025Co') ppa = 'Egg'
			$('#img_pkmn').css({
				'background-image': `url('https://nuotsu.github.io/PPAR/img/ppa/${ppa}_PPA.png')`
			})
            var pkmn_form = pkmn.replace(' (', '-').replace(')', '')
                if (pkmn.indexOf('Alolan ') >= 0)
                    pkmn_form = pkmn_form.replace('Alolan ', '') + '-Alola'
		nn = ''
            if ($('#nn').val() != '') {
                nn = `${$('#nn').val()} `
                pkmn_form = `(${pkmn_form})`
            }
        gender = $('#gender').val()
            if (gender == null) gender = ''
		shiny = ''
			if ( $('#shiny').prop('checked') ) shiny = 'Yes'
			else shiny = 'No'
        lv = $('#lv').val()
        nat = $('#nat').val()
		item = ''
            if ($('#item').val() != '' ||
                $('#item').val() != 'None') item = ` @ ${$('#item').val()}`
            if ($('#item').val() == 'None') item = ''
		ability = $('#ability').val()
		lang = $('#lang').val()
		pkrs = $('#pkrs').val()
            $('#img_pkrs').attr({
                'src': `img/pkrs_${pkrs.toLowerCase()}.png`
            })
		met_game = $('#met_game').val()
		met_loc = $('#met_loc').val()
		met_date = $('#met_date').val()
		met_lv = $('#met_lv').val()
		ball = $('#ball').val()
			$('#img_ball').css({
				'background-image': `url('https://nuotsu.github.io/PPAR/img/ball/${ball}_ball.png')`
			})
		ribbon = $('#ribbon').val()
        iv_h = $('#iv_h').val()
            iv_a = $('#iv_a').val()
            iv_b = $('#iv_b').val()
            iv_c = $('#iv_c').val()
            iv_d = $('#iv_d').val()
            iv_s = $('#iv_s').val()
        ev_h = $('#ev_h').val()
            ev_a = $('#ev_a').val()
            ev_b = $('#ev_b').val()
            ev_c = $('#ev_c').val()
            ev_d = $('#ev_d').val()
            ev_s = $('#ev_s').val()
        ht_h = ''
            ht_a = ''
            ht_b = ''
            ht_c = ''
            ht_d = ''
            ht_s = ''
            if ($('#ht_h').prop('checked') == true) ht_h = 'HP '
                else ht_h = ''
            if ($('#ht_a').prop('checked') == true) ht_a = 'Atk '
                else ht_a = ''
            if ($('#ht_b').prop('checked') == true) ht_b = 'Def '
                else ht_b = ''
            if ($('#ht_c').prop('checked') == true) ht_c = 'SpA '
                else ht_c = ''
            if ($('#ht_d').prop('checked') == true) ht_d = 'SpD '
                else ht_d = ''
            if ($('#ht_s').prop('checked') == true) ht_s = 'Spe '
                else ht_s = ''
        ht = `${ht_h}${ht_a}${ht_b}${ht_c}${ht_d}${ht_s}`
            if (ht_h == '' && ht_a == '' && ht_b == '' &&
                ht_c == '' && ht_d == '' && ht_s == '') ht = '--'
		hp = $('#hp').val()
		move1 = $('#move1').val()
    		move2 = $('#move2').val()
    		move3 = $('#move3').val()
    		move4 = $('#move4').val()
            if ($('#maxPP').prop('checked') == true) maxPP = 'Yes'
            else maxPP = 'No'
		ot = $('#ot').val()
		ot_gender = $('#ot_gender').val()
		ppid = $('#ppid').val()
            if ($('#ppid').val() == '') ppid = 'null'
		tid = $('#tid').val()
		sid = $('#sid').val()
		ign = $('#ign').val()
		fc = $('#fc').val()
		gts_pkmn = $('#gts_pkmn').val()
			var gts_ppa = ppaList[pkmnList.indexOf(gts_pkmn)]
			if (gts_ppa == undefined ||
				gts_ppa == '0129s') gts_ppa = 'Egg'
			$('#img_gts_pkmn').css({
				'background-image': `url('https://nuotsu.github.io/PPAR/img/ppa/${gts_ppa}_PPA.png')`
			})
		gts_gender = $('#gts_gender').val()
            if (gts_gender == null) gts_gender = ''
		gts_lv = $('#gts_lv').val()
		gts_ball = $('#gts_ball').val()
			$('#img_gts_ball').css({
				'background-image': `url('https://nuotsu.github.io/PPAR/img/ball/${gts_ball}_ball.png')`
			})
		gts_msg = $('#gts_msg').val()

        $('textarea').val(
`# File Information
* Game Version: ${game_ver}
* PKHex File Link: ${pkhex}
* Serebii Link: ${serebii}

# Pokémon Info
* ${nn}${pkmn_form} ${gender}${item}
* Ability: ${ability}
* Level: ${lv}
* Shiny: ${shiny}
* EVs: ${ev_h} HP / ${ev_a} Atk / ${ev_b} Def / ${ev_c} SpA / ${ev_d} SpD / ${ev_s} Spe
* ${nat} Nature
* IVs: ${iv_h} HP / ${iv_a} Atk / ${iv_b} Def / ${iv_c} SpA / ${iv_d} SpD / ${iv_s} Spe
 * \\- ${move1}
 * \\- ${move2}
 * \\- ${move3}
 * \\- ${move4}

# Misc Pokémon Info
* Language: ${lang}
* Pokérus: ${pkrs}
* Hidden Power: ${hp}
* Max PPs: ${maxPP}
* Hyper Training: ${ht}

# Meeting Info
* Game: ${met_game}
* Met Location: ${met_loc}
* Poké Ball: ${ball} Ball
* Met Level: ${met_lv}
* Met Date: ${met_date}

# Trainer Info
* OT: ${ot} (${ot_gender})
* Passport ID: ${ppid}
* TID: ${tid}
* SID: ${sid}
* Ribbons: ${ribbon}

# GTS Deposit
* IGN: ${ign}
* FC: ${fc}
* Deposit: ${gts_pkmn} ${gts_gender}Lv.${gts_lv} in ${gts_ball} Ball
* Message: "${gts_msg}"`)}
