/* regeneration begin */
/* handle activation/deactivation of advantages/disadvantages */
on(
	"change:nachteil_schlechte_regeneration " +
	"change:vorteil_schnelle_heilung_i " +
	"change:vorteil_schnelle_heilung_ii " +
	"change:vorteil_schnelle_heilung_iii ",
	function(eventInfo) {
		var attrsToChange = {};
		var regenerationLevel = 0; // -1 to +3
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of life regeneration
			if (source === "nachteil_schlechte_regeneration" && eventInfo.newValue === "1") {
				regenerationLevel = -1;
			} else if (source === "nachteil_schlechte_regeneration" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (source === "vorteil_schnelle_heilung_i" && eventInfo.newValue === "1") {
				regenerationLevel = 1;
			} else if (source === "vorteil_schnelle_heilung_i" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (source === "vorteil_schnelle_heilung_ii" && eventInfo.newValue === "1") {
				regenerationLevel = 2;
			} else if (source === "vorteil_schnelle_heilung_ii" && eventInfo.newValue === "0") {
				regenerationLevel = 1;
			} else if (source === "vorteil_schnelle_heilung_iii" && eventInfo.newValue === "1") {
				regenerationLevel = 3;
			} else if (source === "vorteil_schnelle_heilung_iii" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			}

			switch(regenerationLevel) {
				case -1:
					attrsToChange["nachteil_schlechte_regeneration"] = "1";
					attrsToChange["vorteil_schnelle_heilung_i"] = "0";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "0";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 0:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "0";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "0";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 1:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "1";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "0";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 2:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "1";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "1";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 3:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "1";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "1";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "1";
					break;
			}

			// Regeneration mod from advantages/disadvantages
			attrsToChange["reg_le_mod_vn"] = regenerationLevel; // regeneration, life energy, modifier, advantages/disadvantages (Vorteile/Nachteile)
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert " +
	"change:nachteil_schlechte_regeneration " +
	"change:vorteil_schnelle_heilung_i " +
	"change:vorteil_schnelle_heilung_ii " +
	"change:vorteil_schnelle_heilung_iii " +
	"change:reg_schlaf_verwoehnt_zufrieden ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_verwoehnt', 'nachteil_verwoehnt_wert',
				'nachteil_schlechte_regeneration', 
				'vorteil_schnelle_heilung_i',
				'vorteil_schnelle_heilung_ii',
				'vorteil_schnelle_heilung_iii',
				'reg_schlaf_verwoehnt_zufrieden'
			], function(values) {
			var attrsToChange = {};

			// Handle "spoilt"
			var spoilt = 0;
			if (
				values["nachteil_verwoehnt"] === "1" &&
				values["reg_schlaf_verwoehnt_zufrieden"] === "0"
			) {
				spoilt = parseInt(values["nachteil_verwoehnt_wert"]);
			} else {
				spoilt = 0;
			}

			var regLEKOMod = spoilt;
			// Handle changes to degree of life regeneration
			if (values["nachteil_schlechte_regeneration"] === "1") {
				regLEKOMod += 2;
			} else if (values["vorteil_schnelle_heilung_iii"] === "1") {
				regLEKOMod -= 3;
			} else if (values["vorteil_schnelle_heilung_ii"] === "1") {
				regLEKOMod -= 2;
			} else if (values["vorteil_schnelle_heilung_i"] === "1") {
				regLEKOMod -= 1;
			} else {
				regLEKOMod += 0;
			}

			attrsToChange["reg_le_ko"] = `@{KO} - (1d20 + (${regLEKOMod}))`;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_astraler_block " +
	"change:vorteil_astrale_regeneration_i " +
	"change:vorteil_astrale_regeneration_ii " +
	"change:vorteil_astrale_regeneration_iii ",
	function(eventInfo) {
		var attrsToChange = {};
		var regenerationLevel = 0; // -1 to +3
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			if (eventInfo.sourceAttribute === "nachteil_astraler_block" && eventInfo.newValue === "1") {
				regenerationLevel = -1;
			} else if (eventInfo.sourceAttribute === "nachteil_astraler_block" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_i" && eventInfo.newValue === "1") {
				regenerationLevel = 1;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_i" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_ii" && eventInfo.newValue === "1") {
				regenerationLevel = 2;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_ii" && eventInfo.newValue === "0") {
				regenerationLevel = 1;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_iii" && eventInfo.newValue === "1") {
				regenerationLevel = 3;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_iii" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			}

			// Populate attrsToChange so we don't forget later on
			switch(regenerationLevel) {
				case -1:
					attrsToChange["nachteil_astraler_block"] = "1";
					attrsToChange["vorteil_astrale_regeneration_i"] = "0";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "0";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 0:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "0";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "0";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 1:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "1";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "0";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 2:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "1";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "1";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 3:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "1";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "1";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "1";
					break;
			}

			// Regeneration mod from advantages/disadvantages
			attrsToChange["reg_ae_mod_vn"] = regenerationLevel;	// regeneration, astral energy, modifier, advantages/disadvantages (Vorteile/Nachteile)
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_heimwehkrank " +
	"change:reg_schlaf_heimwehkrank_fern_der_heimat ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_heimwehkrank',
				'reg_schlaf_heimwehkrank_fern_der_heimat'
			], function(values) {
			var attrsToChange = {};

			// Handle "homesickness"
			var homesick = 0;
			if (
				values["nachteil_heimwehkrank"] === "1" &&
				values["reg_schlaf_heimwehkrank_fern_der_heimat"] === "1"
			) {
				homesick = -1;
			} else {
				homesick = 0;
			}

			attrsToChange["reg_ae_mod_heimwehkrank"] = homesick;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_nahrungsrestriktion " +
	"change:reg_schlaf_nahrungsrestriktion_verletzt_dauer ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_nahrungsrestriktion',
				'reg_schlaf_nahrungsrestriktion_verletzt_dauer'
			], function(values) {
			var attrsToChange = {};

			// Handle "food restriction"
			var restriction = 0;
			if (values["nachteil_nahrungsrestriktion"] === "1")
			{
				if (
					values["reg_schlaf_nahrungsrestriktion_verletzt_dauer"] > 0 &&
					values["reg_schlaf_nahrungsrestriktion_verletzt_dauer"] <= 3
				) {
					restriction = -2;
				} else if (values["reg_schlaf_nahrungsrestriktion_verletzt_dauer"] > 3) {
					restriction = "total";
				} else {
					restriction = 0;
				}
			} else {
				restriction = 0;
			}

			switch(restriction) {
				case 0:
					attrsToChange["reg_schlaf_nahrungsrestriktion_effekt"] = 0;
					attrsToChange["reg_le_mod_nahrungsrestriktion"] = 0;
					attrsToChange["reg_ae_mod_nahrungsrestriktion"] = 0;
					break;
				case -2:
					attrsToChange["reg_schlaf_nahrungsrestriktion_effekt"] = 1;
					attrsToChange["reg_le_mod_nahrungsrestriktion"] = -2;
					attrsToChange["reg_ae_mod_nahrungsrestriktion"] = -2;
					break;
				case "total":
					attrsToChange["reg_schlaf_nahrungsrestriktion_effekt"] = 2;
					attrsToChange["reg_le_mod_nahrungsrestriktion"] = 0;
					attrsToChange["reg_ae_mod_nahrungsrestriktion"] = 0;
					break;
				default:
					attrsToChange["reg_schlaf_nahrungsrestriktion_effekt"] = 0;
					attrsToChange["reg_le_mod_nahrungsrestriktion"] = 0;
					attrsToChange["reg_ae_mod_nahrungsrestriktion"] = 0;
			}
			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert " +
	"change:nachteil_astraler_block " +
	"change:vorteil_astrale_regeneration_i " +
	"change:vorteil_astrale_regeneration_ii " +
	"change:vorteil_astrale_regeneration_iii " +
	"change:reg_schlaf_verwoehnt_zufrieden ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_verwoehnt', 'nachteil_verwoehnt_wert',
				'nachteil_astraler_block', 
				'vorteil_astrale_regeneration_i',
				'vorteil_astrale_regeneration_ii',
				'vorteil_astrale_regeneration_iii',
				'reg_schlaf_verwoehnt_zufrieden'
			], function(values) {
			var attrsToChange = {};

			// Handle "spoilt"
			var spoilt = 0;
			if (
				values["nachteil_verwoehnt"] === "1" &&
				values["reg_schlaf_verwoehnt_zufrieden"] === "0"
			) {
				spoilt = parseInt(values["nachteil_verwoehnt_wert"]);
			} else {
				spoilt = 0;
			}

			var regAEINMod = spoilt;
			// Handle changes to degree of life regeneration
			if (values["nachteil_astraler_block"] === "1") {
				regAEINMod += 2;
			} else if (values["vorteil_astrale_regeneration_iii"] === "1") {
				regAEINMod -= 3;
			} else if (values["vorteil_astrale_regeneration_ii"] === "1") {
				regAEINMod -= 2;
			} else if (values["vorteil_astrale_regeneration_i"] === "1") {
				regAEINMod -= 1;
			} else {
				regAEINMod += 0;
			}

			attrsToChange["reg_ae_in"] = `@{IN} - (1d20 + (${regAEINMod}))`;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_krankheitsanfaellig " +
	"change:vorteil_immunitaet_gegen_krankheiten_alle " +
	"change:vorteil_immunitaet_gegen_krankheiten_wundfieber " +
	"change:vorteil_resistenz_gegen_krankheiten_alle ",
	function(eventInfo) {
		var attrsToChange = {};
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			if (eventInfo.sourceAttribute === "nachteil_krankheitsanfaellig" && eventInfo.newValue === "1") {
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_alle"] = "0";
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_wundfieber"] = "0";
				attrsToChange["vorteil_resistenz_gegen_krankheiten_alle"] = "0";
			} else if (eventInfo.sourceAttribute === "vorteil_resistenz_gegen_krankheiten_alle" && eventInfo.newValue === "1") {
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_alle"] = "0";
				// immunity against a specific disease possible with resistence against all diseases
				attrsToChange["nachteil_krankheitsanfaellig"] = "0";
			} else if (eventInfo.sourceAttribute === "vorteil_immunitaet_gegen_krankheiten_wundfieber" && eventInfo.newValue === "1") {
				attrsToChange["nachteil_krankheitsanfaellig"] = "0";
			} else if (eventInfo.sourceAttribute === "vorteil_immunitaet_gegen_krankheiten_alle" && eventInfo.newValue === "1") {
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_wundfieber"] = "0";
				attrsToChange["vorteil_resistenz_gegen_krankheiten_alle"] = "0";
				attrsToChange["nachteil_krankheitsanfaellig"] = "0";
			}
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_schlafstoerungen_i " +
	"change:nachteil_schlafstoerungen_ii ",
	function(eventInfo) {
		var attrsToChange = {};
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;
		/*
		Sleep Disorder I has a 25% chance (4 on 1d4) to strike, Sleep Disorder II a 50% chance (2 on 1d2).
		Effect is is the same in both cases.
		*/
		var sleepDisorder = { "trigger": "1d0", "effect": "1d6 - 1" };

		if (sourceType === "player") {
			// Handle changes to degree of sleep disorder
			if (source === "nachteil_schlafstoerungen_i") {
				attrsToChange["nachteil_schlafstoerungen_ii"] = "0";
				if (eventInfo.newValue === "0") {
					sleepDisorder["trigger"] = "1d0";
				} else if (eventInfo.newValue === "1") {
					sleepDisorder["trigger"] = "1d4";
				}
			} else if (source === "nachteil_schlafstoerungen_ii") {
				if (eventInfo.newValue === "1") {
					attrsToChange["nachteil_schlafstoerungen_i"] = "1";
					sleepDisorder["trigger"] = "1d2";
				} else if (eventInfo.newValue === "0") {
					sleepDisorder["trigger"] = "1d4";
				}
			}

			attrsToChange["reg_schlaf_schlafstoerung_ausloeser"] = sleepDisorder["trigger"];
			attrsToChange["reg_schlaf_schlafstoerung_effekt"] = sleepDisorder["effect"];
			safeSetAttrs(attrsToChange);
		}
});

on("change:nachteil_schlafwandler",
	function(eventInfo) {
		var attrsToChange = {};
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;
		var effect = 0;
		/*
		Somnambulism has a 25% chance (4 on 1d4) to strike.
		*/
		if (sourceType === "player") {
			// Handle changes to degree of sleep disorder
			if (source === "nachteil_schlafwandler") {
				if (eventInfo.newValue === "0") {
					effect = "0";
				} else if (eventInfo.newValue === "1") {
					effect = "(-1) * ({ 0d1, 1d4 - 3 }kh1)";
				}
			}
			attrsToChange["reg_schlaf_mod_schlafwandler"] = effect;
			safeSetAttrs(attrsToChange);
		}
});

on(
	[
		"nachteil_sucht",
		"nachteil_sucht_giftstufe",
		"reg_schlaf_sucht_entzug_dauer"
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
		const caller = "Action Listener for Handling Addiction Effects";
		safeGetAttrs(
			[
				'nachteil_sucht',
				'nachteil_sucht_giftstufe',
				'reg_schlaf_sucht_entzug_dauer'
			], function(values) {
			debugLog(caller, "head", "eventInfo", eventInfo, "values", values);
			var attrsToChange = {};

			// Handle "addiction"
			var addiction = 0;
			if (values["nachteil_sucht"] === "1")
			{
				var threshold = 15 - parseInt(values["nachteil_sucht_giftstufe"]);
				if (values["reg_schlaf_sucht_entzug_dauer"] < threshold)
				{
					addiction = 0;
				} else if (
					values["reg_schlaf_sucht_entzug_dauer"] >= threshold &&
					values["reg_schlaf_sucht_entzug_dauer"] < 2 * threshold
				) {
					addiction = 1;
				} else {
					addiction = 2;
				}
			} else {
				addiction = 0;
			}

			switch(addiction) {
				case 0:
					attrsToChange["reg_schlaf_sucht_entzug_effekt"] = 0;
					break;
				case 1:
					attrsToChange["reg_schlaf_sucht_entzug_effekt"] = 1;
					break;
				case 2:
					attrsToChange["reg_schlaf_sucht_entzug_effekt"] = 2;
					break;
				default:
					attrsToChange["reg_schlaf_sucht_entzug_effekt"] = 0;
			}
			debugLog(caller, "tail", "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:sf_regeneration_i " +
	"change:sf_regeneration_ii " +
	"change:sf_meisterliche_regeneration ",
	function(eventInfo) {
	safeGetAttrs([
		"sf_meisterliche_regeneration_leiteigenschaft",
		"MU", "KL", "IN", "CH", "FF", "GE", "KO", "KK"
	], function(v) {
		var attrsToChange = {};
		var regenerationLevel = 0; // 0 to +3
		const stats = {
			"@{MU}": v["MU"], 
			"@{KL}": v["KL"], 
			"@{IN}": v["IN"], 
			"@{CH}": v["CH"], 
			"@{FF}": v["FF"], 
			"@{GE}": v["GE"], 
			"@{KO}": v["KO"], 
			"@{KK}": v["KK"]
		};
		const mainStat = stats[v["sf_meisterliche_regeneration_leiteigenschaft"]];
		var AEBaseRegenerationRoll = "1d6";
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			if (source === "sf_regeneration_i" && eventInfo.newValue === "1") {
				regenerationLevel = 1;
			} else if (source === "sf_regeneration_i" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (source === "sf_regeneration_ii" && eventInfo.newValue === "1") {
				regenerationLevel = 2;
			} else if (source === "sf_regeneration_ii" && eventInfo.newValue === "0") {
				regenerationLevel = 1;
			} else if (source === "sf_meisterliche_regeneration" && eventInfo.newValue === "1") {
				regenerationLevel = 3;
				AEBaseRegenerationRoll = parseInt(mainStat) / 3;
				AEBaseRegenerationRoll = DSAround(AEBaseRegenerationRoll).toString() + "d1";
			} else if (source === "sf_meisterliche_regeneration" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			}

			// Populate attrsToChange so we don't forget later on
			switch(regenerationLevel) {
				case 0:
					attrsToChange["sf_regeneration_i"] = "0";
					attrsToChange["sf_regeneration_ii"] = "0";
					attrsToChange["sf_meisterliche_regeneration"] = "0";
					break;
				case 1:
					attrsToChange["sf_regeneration_i"] = "1";
					attrsToChange["sf_regeneration_ii"] = "0";
					attrsToChange["sf_meisterliche_regeneration"] = "0";
					break;
				case 2:
					attrsToChange["sf_regeneration_i"] = "1";
					attrsToChange["sf_regeneration_ii"] = "1";
					attrsToChange["sf_meisterliche_regeneration"] = "0";
					break;
				case 3:
					attrsToChange["sf_regeneration_i"] = "1";
					attrsToChange["sf_regeneration_ii"] = "1";
					attrsToChange["sf_meisterliche_regeneration"] = "1";
					break;
			}
			attrsToChange["reg_ae_base"] = AEBaseRegenerationRoll;

			// Regeneration mod from special skills
			attrsToChange["reg_ae_mod_sf"] = regenerationLevel;	// regeneration, astral energy, modifier, special skills (Sonderfertigkeiten)
			safeSetAttrs(attrsToChange);
		}
	});
});

// Handling all changes leading to fixed regeneration
on(
	[
		"reg_schlaf_nahrungsrestriktion_effekt",
		"reg_schlaf_sucht_entzug_effekt"
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
		const caller = "Action Listener for Fixed Regeneration";
		safeGetAttrs(
			[
				'reg_schlaf_nahrungsrestriktion_effekt',
				'reg_schlaf_sucht_entzug_effekt'
			], function(values) {
			debugLog(caller, "head", "eventInfo", eventInfo, "values", values);
			var attrsToChange = {};
			const addiction = values["reg_schlaf_sucht_entzug_effekt"];
			const restriction = values["reg_schlaf_nahrungsrestriktion_effekt"];

			if (
				addiction === 1 ||
				addiction === 2 ||
				restriction === 2
			) {
				attrsToChange["reg_le_fest"] = 0;
				attrsToChange["reg_ae_fest"] = 0;
			} else {
				attrsToChange["reg_le_fest"] = "off";
				attrsToChange["reg_ae_fest"] = "off";
			}
			debugLog(caller, "tail", "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

/* handle regeneration-related values */
on(
	"change:reg_le_mod_vn " +
	"change:reg_ae_mod_vn " +
	"change:nachteil_heimwehkrank " +
	"change:nachteil_nahrungsrestriktion " +
	"change:nachteil_schlafstoerungen_i " +
	"change:nachteil_schlafstoerungen_ii " +
	"change:nachteil_schlafwandler " +
	"change:nachteil_sucht " +
	"change:nachteil_sucht_giftstufe " +
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert ",
	function() {
	safeGetAttrs([
		"reg_le_mod_vn",
		"reg_ae_mod_vn",
		"nachteil_heimwehkrank",
		"nachteil_nahrungsrestriktion",
		"nachteil_schlafstoerungen_i",
		"nachteil_schlafstoerungen_ii",
		"nachteil_schlafwandler",
		"nachteil_sucht",
		"nachteil_sucht_giftstufe",
		"nachteil_verwoehnt",
		"nachteil_verwoehnt_wert"
	], function(v) {
		/*
		Wundheilung aufnehmen
			mehr als 5 SP unbehandelt seit letzter Regeneration? -> Wundfieber möglich (bei gescheiterter oder ausgebliebener HKW-Probe) -> weitere Vor- und Nachteile beachten: Immunität gegen Krankheiten (alle/Wundfieber), Resistenz gegen Krankheiten (Wechselwirkung mit "Heimwehkrank" berücksichtigen), Krankheitsanfällig
			Abfrage im Roll: Erstversorgung oder Nachbehandlung -> TaP* entsprechend verrechnen
			Reihenfolge für Wundheilung festlegen: Kopf, Brust/Rücken, Bauch, RA, LA, RB, LB
			Schlechte Regeneration: +2 auf Wundheil-KO!
		*/
		/* Astrale Meditation: Thonnys mit/ohne SF */
		//safeSetAttrs(attrsToChange);
	});
});

// Generating Regeneration Roll (Sleep)
on(
	[
		"character_name",
		"gm_roll_opt",
		"le", "ae", "ke",
		"le_max", "ae_max", "ke_max",
		"nachteil_sucht_suchtmittel",
		"nachteil_verwoehnt",
		"reg_le_fest",
		"reg_ae_fest",
		"reg_le_ko",
		"reg_le_mod_nahrungsrestriktion",
		"reg_le_mod_vn",
		"reg_le_schlaf_mod_general",
		"reg_le_schlaf_mod_le",
		"reg_ae_base",
		"reg_ae_in",
		"reg_ae_mod_heimwehkrank",
		"reg_ae_mod_nahrungsrestriktion",
		"reg_ae_mod_sf",
		"reg_ae_mod_vn",
		"reg_schlaf_mod_general", "reg_schlaf_mod_ae", "reg_schlaf_mod_le",
		"reg_schlaf_mod_schlafwandler",
		"reg_schlaf_nahrungsrestriktion_effekt",
		"reg_schlaf_schlafstoerung_ausloeser",
		"reg_schlaf_sucht_entzug_effekt",
		"reg_schlaf_verwoehnt_zufrieden",
		"taw_selbstbeherrschung",
		"eigenschaft1selbstbeherrschung", "eigenschaft2selbstbeherrschung", "eigenschaft3selbstbeherrschung",
		"cs_talent", "cf_talent"
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			'character_name',
			'gm_roll_opt',
			'LE', 'AE', 'KE',
			'LE_max', 'AE_max', 'KE_max',
			'nachteil_sucht_suchtmittel',
			'nachteil_verwoehnt',
			'reg_le_fest',
			'reg_ae_fest',
			'reg_le_ko',
			'reg_le_mod_nahrungsrestriktion',
			'reg_le_mod_vn',
			'reg_ae_base',
			'reg_ae_in',
			'reg_ae_mod_heimwehkrank',
			'reg_ae_mod_nahrungsrestriktion',
			'reg_ae_mod_sf',
			'reg_ae_mod_vn',
			'reg_schlaf_mod_general', 'reg_schlaf_mod_ae', 'reg_schlaf_mod_le',
			'reg_schlaf_mod_schlafwandler',
			'reg_schlaf_nahrungsrestriktion_effekt',
			'reg_schlaf_schlafstoerung_ausloeser',
			'reg_schlaf_sucht_entzug_effekt',
			'reg_schlaf_verwoehnt_zufrieden',
			'TaW_selbstbeherrschung',
			'Eigenschaft1selbstbeherrschung', 'Eigenschaft2selbstbeherrschung', 'Eigenschaft3selbstbeherrschung',
			'cs_talent', 'cf_talent'
		], function(values) {
		const caller = "Action Listener for Generation of Regeneration Roll (Sleep)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		const foodRestrictionRoll = "{{nahrungsrestriktion=[[(@{reg_schlaf_nahrungsrestriktion_effekt})]]}}";
		const sleepDisorderRoll = [
			// general decision for triggering sleep disorder or not
			`{{schlafstoerung=[[${values["reg_schlaf_schlafstoerung_ausloeser"]}]]}}`,
			// effect of sleep disorder on life regeneration
			"{{leschlafstoerung=[[(@{reg_schlaf_schlafstoerung_effekt})]]}}",
			// effect of sleep disorder on astral regeneration
			"{{aeschlafstoerung=[[(@{reg_schlaf_schlafstoerung_effekt})]]}}",
			// case for showing correct parts in roll template
			"{{schlafstoerungfall=[[0d1]]}}"
		];
		const sleepDisorderIIRoll = [
			`{{taw=[[${values["TaW_selbstbeherrschung"]}d1cs0cf2]]}}`,
			"{{mod=[[7d1cs0cf2]]}}",
			"{{stats=[[ " +
				`[Eigenschaft 1:] [[${values["Eigenschaft1selbstbeherrschung"]}]]d1cs0cf2 + ` +
				`[Eigenschaft 2:] [[${values["Eigenschaft2selbstbeherrschung"]}]]d1cs0cf2 + ` +
				`[Eigenschaft 3:] [[${values["Eigenschaft3selbstbeherrschung"]}]]d1cs0cf2 + ` +
				"]]}}",
			`{{selbstbeherrschung=[[3d20cs<${values["cs_talent"]}cf>${values["cf_talent"]}]]}}`,
			"{{result=[[0]]}}",
			"{{criticality=[[0]]}}",
			`{{critThresholds=[[[[${values["cs_talent"]}]]d1cs0cf2 + [[${values["cf_talent"]}]]d1cs0cf2]]}}`
		];
		const somnambulismRoll = "{{schlafwandeln=[[(@{reg_schlaf_mod_schlafwandler})]]}}";
		const addictionRoll = [
			`{{suchteffekt=[[${values["reg_schlaf_sucht_entzug_effekt"]}]]}}`,
			`{{suchtmittel=${values["nachteil_sucht_suchtmittel"]}}}`
		];
		const unusedRoll = [
			"{{ke=[[@{KE}d1]]}}",
			"{{kereg=[[0]]}}",
			"{{keneu=[[0d1]]}}",
			"{{wound=[[2d1]]}}"
		];
		var roll = [
			values["gm_roll_opt"],
			"&{template:reg-schlaf}",
			`{{charactername=${values["character_name"]}}}`,
			`{{le=${values["LE"]}}}`,
			`{{lebase=[[1d6 + (${values["reg_le_mod_vn"]}) + (${values["reg_le_mod_nahrungsrestriktion"]}) + (${values["reg_schlaf_mod_general"]}) + (${values["reg_schlaf_mod_le"]})]]}}`,
			`{{leko=[[${values["reg_le_ko"]}]]}}`,
			"{{leneu=[[0d1]]}}",
			`{{ae=${values["AE"]}}}`,
			`{{aebase=[[${values["reg_ae_base"]} + (${values["reg_ae_mod_vn"]}) + (${values["reg_ae_mod_heimwehkrank"]}) + (${values["reg_ae_mod_nahrungsrestriktion"]}) + (${values["reg_ae_mod_sf"]}) + (${values["reg_schlaf_mod_general"]}) + (${values["reg_schlaf_mod_ae"]})]]}}`,
			`{{aein=[[${values["reg_ae_in"]}]]}}`,
			"{{aeneu=[[0d1]]}}"
		];

		// Additional property for food restriction
		if (values["reg_schlaf_nahrungsrestriktion_effekt"] !== 0)
		{
			roll = roll.concat(foodRestrictionRoll);
		}

		// Additional properties for sleep disorder
		switch(values["reg_schlaf_schlafstoerung_ausloeser"])
		{
			case "1d2":
				roll = roll.concat(sleepDisorderIIRoll);
				// break missing on purpose
			case "1d4":
				roll = roll.concat(sleepDisorderRoll);
				break;
		}

		// Additional property for somnambulism
		if (values["reg_schlaf_mod_schlafwandler"] !== "0")
		{
			roll = roll.concat(somnambulismRoll);
		}

		// Additional properties for addition
		if (values["reg_schlaf_sucht_entzug_effekt"] !== "0")
		{
			roll = roll.concat(addictionRoll);
		}

		// Modifications if fixed regeneration
		if (values["reg_le_fest"] !== "off")
		{
			roll[roll.findIndex(value => /lebase=/.test(value))] = `{{lebase=${values["reg_le_fest"]}}}`;
			roll[roll.findIndex(value => /leko=/.test(value))] = "{{leko=[[0d1]]}}";
		}
		if (values["reg_ae_fest"] !== "off")
		{
			roll[roll.findIndex(value => /aebase=/.test(value))] = `{{aebase=${values["reg_ae_fest"]}}}`;
			roll[roll.findIndex(value => /aein=/.test(value))] = "{{aein=[[0d1]]}}";
		}
		safeSetAttrs({"reg_schlaf_roll": roll.join(" ")});
	});
});

on('clicked:reg_schlaf-action', async (info) => {
	const caller = "Action Listener for Regeneration Button (Sleep)";
	results = await startRoll("@{reg_schlaf_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);
	var rollID = results.rollId;
	var results = results.results;
	var computed = {};

	/* Sleep Disorder 2 can have convoluted consequences
	If the sleep disorder did not trigger, the character needs to roll a
	self-control check +7.
	If the check succeeds, normal regeneration takes place.
	If the check fails, reduced regeneration takes place.

	This requires CRP and reaction rolls:
		Sleep Disorder 2 triggered -> no reaction required (results = regeneration results)
		Sleep Disorder 2 did not trigger
			-> normal result not shown
			-> results for both cases calculated
			-> results for both cases passed to "reaction" roll
			-> self-control +7 -> roll + regeneration results (stored from initial roll)
	*/
	if (results.hasOwnProperty("schlafstoerungfall"))
	{
		var sleepDisorder = {"level": 0, "triggered": -1};

		{
			const sleepDisorderDice = { "1d0": 0, "1d4": 1, "1d2": 2 };
			let expression = results["schlafstoerung"]["expression"] ?? 0;
			let result = results["schlafstoerung"]["result"] ?? 1;
			let level = 0;
			let triggered = -1;
			if (expression !== 0)
			{
				level = sleepDisorderDice[expression];
			} else {
				level = 0;
			}

			switch(level)
			{
				case 0:
					triggered = -1;
					break;
				case 1:
					if (result === 4)
					{
						triggered = 1;
					} else {
						triggered = 0;
					}
					break;
				case 2:
					if (result === 2)
					{
						triggered = 1;
					} else {
						triggered = 2;
					}
					break;
				default:
					triggered = -1;
			}

			sleepDisorder["level"] = level;
			sleepDisorder["triggered"] = triggered;
		}
		computed["schlafstoerungfall"] = sleepDisorder["triggered"];
	}

	// Process potential self-control roll for sleep disorder
	if (results.hasOwnProperty("selbstbeherrschung"))
	{
		var TaW = results.taw.result;
		var mod = results.mod.result;
		var stats = [
			results.stats.rolls[0].dice,
			results.stats.rolls[1].dice,
			results.stats.rolls[2].dice
		];
		var rolls = results.selbstbeherrschung.rolls[0].results;
		var success = results.critThresholds.rolls[0].dice;
		var failure = results.critThresholds.rolls[1].dice;
		/* Result
		0	Failure
		1	Success
		*/
		var result = 0;
		/* Criticality
		-3	Triple 20
		-2	Double 20
		 0	no double 1/20
		+2	Double 1
		+3	Triple 1
		*/
		var criticality = 0;

		/*
			Doppel/Dreifach-1/20-Berechnung
			Vor der TaP*-Berechnung, da diese damit gegebenenfalls hinfällig wird
		*/
		{
			let successes = 0;
			let failures = 0;
			for (roll of rolls)
			{
				if (roll <= success)
				{
					successes += 1;
				} else if (roll >= failure) {
					failures += 1;
				}
				if (successes >= 2)
				{
					criticality = successes;
				} else if (failures >= 2) {
					criticality = -failures;
				}
			}
		}

		/*
			TaP*-Berechnung
		*/
		var effRolls = rolls;
		var effTaW = TaW - mod;
		var TaPstar = effTaW;

		// Negativer TaW: |effTaW| zu Teilwürfen addieren
		if (criticality >= 2)
		{
			TaPstar = TaW;
			result = 1;
		} else {
			if (effTaW < 0)
			{
				for (roll in rolls)
				{
					effRolls[roll] = rolls[roll] + Math.abs(effTaW);
				}
				TaPstar = 0;
			}

			// TaP-Verbrauch für jeden Wurf
			for (roll in effRolls)
			{
				TaPstar -= Math.max(0, effRolls[roll] - stats[roll]);
			}

			// Max. TaP* = TaW
			TaPstar = Math.min(TaW, TaPstar);

			// Ergebnis an Doppel/Dreifach-20 anpassen
			if (Math.abs(criticality) <= 1)
			{
				result = TaPstar < 0 ? 0 : 1;
			} else if (criticality <= -2) {
				result = 0;
			}
		}
		computed["selbstbeherrschung"] = TaPstar;
		computed["result"] = result;
		computed["criticality"] = criticality;
		computed["stats"] = stats.toString().replaceAll(",", "/");
	}

	safeGetAttrs(
		[
			'LE', 'AE', 'KE',
			'LE_max', 'AE_max', 'KE_max',
			'reg_le_fest',
			'reg_ae_fest',
			'nachteil_verwoehnt',
			'reg_schlaf_verwoehnt_zufrieden'
		], function(values) {
		var attrsToChange = {};

		// LE Regeneration
		var LERegTotal = 0;
		var LEneu = parseInt(values["LE"]);

		if (values["reg_le_fest"] === "off")
		{
			// Additional regeneration from KO check
			var LEKO = 0;
			if (results["leko"].result >= 0) {
				LEKO = 1;
			} else {
				if (values["nachteil_verwoehnt"] === "1" && values["reg_schlaf_verwoehnt_zufrieden"] === "0") {
					LEKO = -1;
				} else {
					LEKO = 0;
				}
			}
			computed["leko"] = LEKO;
			LERegTotal = results["lebase"].result + LEKO;
			if (
				results.hasOwnProperty("schlafstoerungfall") &&
				(
					sleepDisorder["triggered"] === 1 ||
					(
						sleepDisorder["triggered"] === 2 &&
						computed["result"] === 0
					)
				)
			)
			{
				LERegTotal -= results["leschlafstoerung"]["result"];
			}
			if (results.hasOwnProperty("schlafwandeln"))
			{
				LERegTotal += parseInt(results["schlafwandeln"]["result"]);
			}
		} else {
			LERegTotal = parseInt(values["reg_le_fest"]);
		}
		LERegTotal = Math.max(LERegTotal, regLimitLower["le"]);
		LEneu += LERegTotal;
		LEneu = Math.min(LEneu, values["LE_max"]);
		if (parseInt(values["LE"]) !== LEneu)
		{
			attrsToChange["LE"] = LEneu;
		}
		computed["leneu"] = LEneu;

		// AE Regeneration
		var AERegTotal = 0;
		var AEneu = parseInt(values["AE"]);

		if (values["reg_ae_fest"] === "off")
		{
			// Additional regeneration from IN check
			var AEIN = 0;
			if (results["aein"].result >= 0) {
				AEIN = 1;
			} else {
				if (values["nachteil_verwoehnt"] === "1" && values["reg_schlaf_verwoehnt_zufrieden"] === "0") {
					AEIN = -1;
				} else {
					AEIN = 0;
				}
			}
			computed["aein"] = AEIN;
			AERegTotal = results["aebase"].result + AEIN;
			if (
				results.hasOwnProperty("schlafstoerungfall") &&
				(
					sleepDisorder["triggered"] === 1 ||
					(
						sleepDisorder["triggered"] === 2 &&
						computed["result"] === 0
					)
				)
			)
			{
				AERegTotal -= results["aeschlafstoerung"]["result"];
			}
			if (results.hasOwnProperty("schlafwandeln"))
			{
				AERegTotal += parseInt(results["schlafwandeln"]["result"]);
			}
		} else {
			AERegTotal = parseInt(values["reg_ae_fest"]);
		}
		computed["aeneu"] = attrsToChange["AE"];
		AERegTotal = Math.max(AERegTotal, regLimitLower["ae"]);
		AEneu += AERegTotal;
		AEneu = Math.min(AEneu, values["AE_max"]);
		if (parseInt(values["AE"]) !== AEneu)
		{
			attrsToChange["AE"] = AEneu;
		}
		computed["aeneu"] = AEneu;
		debugLog(caller, "tail", "rollID", rollID, "values", values, "LERegTotal", LERegTotal, "AERegTotal", AERegTotal, "attrsToChange", attrsToChange, "computed", computed);

		var KERegTotal = 0;
		safeSetAttrs(attrsToChange);

		finishRoll(
			rollID,
			computed
		);
	});
});


/* regeneration end */
