// thrall name gen
// https://www.theloyalones.com
// https://github.com/pengowray/thrallname/

var MascFirst = "A Ab Ac Ad Ae Af Ain Al Alc Ald Alf An Ash At Ath Aud Ave Bax Ben Bent Beo Bo Brad Brin Bron Cas Ceo Chad Ches Clay Cliff Clint Col Com Cor Craw Cuth Dal Dar Dex Di Dud Dun Ea Ead Eal Eald Eb Ed Ei Eid El Elf Eo Es Eth Ever Fin Ful Gal Gi Glad God Hal Hay Hayd Haw Hux In Jon Kal Ken Kil Kith La Lal Lay Les Lie Lin Na Nal Nes Nor Oak Os Pais Pend Rad San Thor Thorn Tal Tam Tru Ul Up Ur Uth Van Wal Ward Wayn Weald Wes Whit Wil Wilk Wini Wins Wolf Wood Wright Wy Yar".split(" ").sort();
var FemFirst = "A Ab Ac Ad Ae Af Ain Al Alc Ald Alf An Ash At Ath Aud Ave Ben Bent Beo Bev Bever Brin Bron Cas Ceo Ches Col Com Cor Craw Cuth Dal Dar Di Dud Dun Ea Ead Eal Eald Eb Ed Ei Eid El Elf Eo Es Eth Ever Fin Ful Gal Gi Glad God Hal Hay Hayd Haw In Jon Kal Ken Kil Kith La Lal Lay Les Lie Lin Na Nal Nes Nor Oak Os Pais Pend Rad San Tal Tam Tru Ul Up Ur Uth Van Wal Ward Wayn Weald Wes Whit Wil Wilk Wini Wins Wolf Wood Wright Wy Yar".split(" ").sort();
var MascSecond = "a al ard be bert dair den en er field ford gar gard hard helm here ie ion is land ly man mar mer mere mon mond on ran red ric rith seth sly son stan ter ton um us vard ven wald ward wart werd wick wig win wulf".split(" ").sort();
var FemSecond = "a ba be da ege en ette ia ie is ith lin low ly lyn me mera mere nne ra reda rey ril rith ta vena wna ytha".split(" ").sort();
var MascSimple = "Ash Aspen Aster Barrow Basil Bay Bear Beryl Birch Bird Blake Blaze Blue Breeze Briar Brick Carnelian Cedar Cloud Copper Cove Dusk Eagle Elm Ember Field Flint Forest Fox Gale Glen Gray Green Grove Hawk Heath Heron Jasper Jay Jet Kale Lake Marsh Mica Ocean Onyx Rain Red Reed Ridge River Rowan Silver Sky Slate Sorrel Sparrow Stone Stone Storm Summer Winter Woad Woad Yarrow".split(" ").sort();
var FemSimple = "Amber Anise Ash Aspen Aster Autumn Balsam Beryl Bird Blake Blue Bramble Breeze Briar Brook Camellia Carmine Clementine Clover Crystal Dahlia Daisy Dawn Dove Ebony Elm Ember Emerald Eve Fern Field Fox Gale Ginger Harvest Hazel Holly Hyacinth Iris Ivory Ivy Jade Jade Jasmine Jewel Juniper Lake Laurel Lavender Lily Magnolia Maple Marigold Meadow Mica Mist Moss Myrtle Olive Opal Parsley Pearl Pepper Poppy Primrose Rain Red Reed River Rose Rosemary Rowan Ruby Rue Rush Sage Sapphire Scarlet Silver Sky Sorrel Sparrow Star Storm Summer Violet Violet Willow Wisteria Wren".split(" ").sort();
var MascBrairi = "Ako Adrian Afynasi Ajdin Akim Aldin Aleksi Alem Anatoli Andel Andon Andrez".split(" ").sort();
var FemBrairi = "Ada Adalejda Adrianja Agatka Aglaja Agniezka Ajda Akilina Aksinja Aldinja Aleksinja Alenka Amalija Ana Anda".split(" ").sort();



function intersect_safe(a, b) { 
//via: https://stackoverflow.com/a/1885660
/* finds the intersection of 
 * two arrays in a simple fashion.  
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is 
 *    n = MIN(a.length(), b.length())
 */
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length ) {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

//todo: (optimize) all pretty ineffecient but also only done once / no one will notice

//var Brairi = MascBrairi.concat(FemBrairi); // just all (with duplicates) [not used yet]
var NeutralFirst = intersect_safe(MascFirst, FemFirst);
var NeutralSecond = intersect_safe(MascSecond, FemSecond);
var NeutralSimple = intersect_safe(MascSimple, FemSimple);
var NeutralBrairi = intersect_safe(MascBrairi, FemBrairi); // = [] none yet

// add an empty entry
MascSecond.push("");
FemSecond.push("");
NeutralSecond.push("");

Gender_Either = 0;
Gender_Masc = 1;
Gender_Femme = 2;
Gender_Neutral = 3;

Cat_Random = "R";
Cat_Generated = "G";
Cat_Simple = "S";
Cat_Brairi = "B"

function generate(gender = Gender_Either, cat = Cat_Random) {
	setName(GenName(gender, cat));
}

function setName(text) {
	gen.innerText = text;
	//gen.value = GenName(gender, cat); // if want to fill a text input box like: <input class="inp" id="gen" type="text">
}

function GenName(gender = Gender_Either, cat = Cat_Random) {
	if (gender == Gender_Either) {
		gender = Math.random() > 0.5 ? Gender_Masc : Gender_Femme;
	}

	if (cat == Cat_Random) {
		// =RANDBETWEEN(1,10)
		// =IF(C4<6,"G",(IF(C4<10,"S","B")))
		var catNum = (Math.random() * 10) + 1; // 1 to 10.9999
		if (catNum < 6) {
			cat = Cat_Generated;
		} else if (catNum < 10) {
			cat = Cat_Simple;
		} else {
			cat = Cat_Brairi; //note: will give Simple name if gender is neutral
		}
	}

	if (gender == Gender_Masc) {
		if (cat == Cat_Simple) {
			return PickOne(MascSimple);
		} else if (cat == Cat_Generated) {
			return PickOne(MascFirst) + PickOne(MascSecond);
		} else if (cat == Cat_Brairi) {
			return PickOne(MascBrairi);
		}
	} else if (gender == Gender_Femme) {
		if (cat == Cat_Simple) {
			return PickOne(FemSimple);
		} else if (cat == Cat_Generated) {
			return PickOne(FemFirst) + PickOne(FemSecond);
		} else if (cat == Cat_Brairi) {
			return PickOne(FemBrairi);
		}
	} else if (gender == Gender_Neutral) {
		if (cat == Cat_Simple) {
			return PickOne(NeutralSimple);
		} else if (cat == Cat_Generated) {
			return PickOne(NeutralFirst) + PickOne(NeutralSecond);
		} else if (cat == Cat_Brairi) {
			if (NeutralBrairi.length > 6) {
				return PickOne(NeutralBrairi);
			} else {
				//none or few found, fall back
				return PickOne(NeutralSimple);
			}
		}
	}

	return "Error"; //return $"Error [{gender} {cat}]";
}


function Stats() {
	return "Name stats:\n" +
		`[Either]:  S:${MascSimple.length + FemSimple.length - NeutralSimple.length}, 1:${MascFirst.length + FemFirst.length - NeutralFirst.length}, 2:${MascSecond.length + FemSecond.length - NeutralSecond.length}, B:${MascBrairi.length + FemBrairi.length - NeutralBrairi.length};\n` +
		`[Male]:    S:${MascSimple.length}, 1:${MascFirst.length}, 2:${MascSecond.length}, B:${MascBrairi.length};\n` +
		`[Female]:  S:${FemSimple.length}, 1:${FemFirst.length}, 2:${FemSecond.length}, B:${FemBrairi.length};\n` +
		`[GenderN]: S:${NeutralSimple.length}, 1:${NeutralFirst.length}, 2:${NeutralSecond.length}, B:${NeutralBrairi.length};`;
}

function CreateStatsComment() {
	const comment = document.createComment(Stats());
	document.body.appendChild(comment);
}


function PickOne(items) {
    return items[Math.floor(Math.random()*items.length)];
}

