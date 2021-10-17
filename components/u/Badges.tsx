import { useEffect, useMemo, useState } from "react";
import { wonITZCount } from "utils/constants";
import BadgeContainer from "./BadgeContainer";

export const regularTournamentBadges: {
  badgeName: string;
  name: string;
  altNames?: string[];
  hueRotateAngle?: number;
  winnerDiscordIds: string;
}[] = [
  {
    badgeName: "sundae",
    name: "4v4 Sundaes",
    winnerDiscordIds: "147036636608331779,97804913941172224,260602342309756940,891048899626795078,105390854063034368,109804061900992512,151192098962407424,99673720477474816,304382991331753987,164748705713356800,199763761026826241,105390854063034368,260602342309756940,97804913941172224,107263003031764992,94823756299505664,753593759492472844,753593759492472844,357960147399606295,330599850049798146,249257371182956544,358597619972440065,92909500100513792,92909500100513792,265816182374924298,265816182374924298,99931397451419648,99931397451419648,94211878636486656,109804061900992512,397208511848644619,491067479452549143,338530058572660737,209732307324633098,203704363141562368,720884483431202857,383774228937179136,186543007850299393,117677626012860421,448493571419537428,140911330059091969,431923570063441922,396849768799797259,186624589218971649,226484699537735683,109804061900992512,220344765240180738,79237403620945920,81154649993785344,265816182374924298,249466317554450432,122759401613426689,109804061900992512,147036636608331779,266716798945067010,151192098962407424,97804913941172224,397097842411569152,265816182374924298,92909500100513792"
  },
  {
    badgeName: "zones",
    name: "Dapple SZ Speedladder",
    altNames: ["Dapple SZ Ladder"],
    winnerDiscordIds:
      "393411373289177098,300073469503340546,554124226915860507,417489824589676548,403345464138661888,343375632819814400,726389792237027370,570288931321413653,716227192060641281,381129695980290050,448493571419537428,207150814735761408,339041223736164354,335275129552502794,266716798945067010,244246880442122250,431923570063441922,358780871375060993",
  },
  {
    badgeName: "ebtv",
    name: "EBTV League",
    winnerDiscordIds:
      "141945784600887296,110023598911008768,128928922837450753,132189238744711168,133616977968103424,117677626012860421,117677626012860421,117677626012860421,117677626012860421,99931397451419648,99931397451419648,99931397451419648,99931397451419648,99931397451419648,99931397451419648,99931397451419648,99931397451419648,99931397451419648,99931397451419648,94941539632943104,94941539632943104,94941539632943104,94941539632943104,94941539632943104,396418169012617219,396418169012617219,396418169012617219,396418169012617219,396418169012617219,396418169012617219,396418169012617219,396418169012617219,138034502692765696,135674881869086721,144123041876672512,136989307780071424,245195310593212417,245195310593212417,245195310593212417,245195310593212417,92909500100513792,92909500100513792,92909500100513792,92909500100513792,92909500100513792,92909500100513792,265816182374924298,265816182374924298,265816182374924298,249466317554450432",
    hueRotateAngle: -76,
  },
  {
    badgeName: "girls",
    name: "Girls Duo Cup",
    winnerDiscordIds:
      "266716798945067010,277576057912033281,315610730294411264,222416939291639808,266716798945067010,277576057912033281,315610730294411264,222416939291639808,114889120379043843,315610730294411264,266716798945067010",
  },
  {
    badgeName: "idtga",
    name: "It's Dangerous to go Alone",
    winnerDiscordIds: "273188925189914628,87607171906293760,141632285643505665,526165570404483084"
  },
  {
    badgeName: "pair",
    name: "League Rush (Pair)",
    altNames: ["League Rush!!"],
    winnerDiscordIds:
      "453753483427053568,398818695608270849,776911543216111648,393908122525368331,498710435915104266,397208511848644619,675299701117157377,416992682381148160,403345464138661888,394214426754154497",
  },
  {
    badgeName: "quad",
    name: "League Rush (Quad)",
    altNames: ["League Rush!!"],
    winnerDiscordIds:
      "105390854063034368,151192098962407424,147036636608331779,260602342309756940,115572122482507782,109804061900992512,169184589200359424,339041223736164354,388778540545474570,219877773605470211,448493571419537428,397208511848644619,209732307324633098,338530058572660737,186543007850299393,133616977968103424,433708069654888448,219877773605470211,448493571419537428,105390854063034368,105390854063034368,105390854063034368,151192098962407424,151192098962407424,151192098962407424,115572122482507782,115572122482507782",
  },
  {
    badgeName: "lobster",
    name: "Lobster Crossfire",
    winnerDiscordIds:
      "105390854063034368,109804061900992512,151192098962407424,260602342309756940,266716798945067010,244246880442122250,431923570063441922,114889120379043843,99673720477474816,109962465965559808,97804913941172224,107263003031764992,115572122482507782,670112561068507136,105390854063034368,151192098962407424,260602342309756940,109804061900992512",
  },
  {
    badgeName: "monday",
    name: "Monday Afterparty",
    winnerDiscordIds:
      "189021480527331328,397097842411569152,274245305363464192,245195310593212417,427319047785545759,186543007850299393,125301875863060480,328641373655924739,274245305363464192,143918846535925761,147036636608331779,260602342309756940,105390854063034368,189125119937871872,516036546370207764,164734950686326784,133616977968103424,323496682920738817,353199183345352704,207150814735761408,273503438124613632,381129695980290050,344096615033995266,265816182374924298,427221050330316814,724313854536056862,161173517163954176,441232639358402560,108951379095072768,160778600834924544,377510502139691018,338470854339854346,182892865695907840,331170488602591242,310359084387794946,331170488602591242,164734950686326784,133616977968103424,353199183345352704,323496682920738817,675752882682724352,403598012888252426,250689440056475648,410342922253500416,164748705713356800,619566583970529314,448493571419537428,250689440056475648,784695580920119297,393411373289177098,350225756082798593,274693882221166597,436528474807730176,108951379095072768,441232639358402560,477555922026102818,412203683024076800,92909500100513792,99931397451419648,81154649993785344,439066642920505344,388778540545474570,379381005989052427,322793789532143618,365669143413915648,239803554569650177,184415457078411265,334452189185572875,177206374260932609,319245965498384387,547411365921423361,320297534759370752,205640541579247616,206476405201043458,411621214994432000,79237403620945920,81154649993785344,92909500100513792,79894491800014848,397208511848644619,158163424004538369,448493571419537428,266716798945067010,212673938474401796,114889120379043843,266716798945067010,244246880442122250,108951379095072768,441232639358402560,195346111387533312,505266229548810250,397208511848644619,448493571419537428,358597619972440065,228340094308712449",
  },
  {
    badgeName: "pool1",
    name: "Paddling Pool Weekly",
    winnerDiscordIds:
      "205640541579247616,205640541579247616,206476405201043458,320297534759370752,547411365921423361,206476405201043458,108951379095072768,448493571419537428,158163424004538369,388079291356807187,619566583970529314,299974788427022336,305453601474609153,400325796386045953,672584711289307149,388778540545474570,357960147399606295,477555922026102818,428618743153688576,291263309762789376,304382991331753987,226462670298152960,528043224124620802,436528474807730176,453753483427053568,226462670298152960,528043224124620802,436528474807730176,453753483427053568,409713830701170689,639208208233136141,274429786456326144,605333997106495499,732054863189508206,561954805384478730,275462618414841856,294326973558423552,200066011616116737,173238005761441802,673240733691412490,457473830022152212,737999569597497365,398237251894509568,302851443184893952,694691665008394312,340498680110907404,149504203654430720,392316684381323265,403962004739588096,304337232808902668,406517090938388492,310359084387794946,453753483427053568,672584711289307149,621119972873207840,699754496745799781,530584907680841742,672584711289307149,732054863189508206,650447994839105576,732054863189508206,275462618414841856,601332262046531588,732054863189508206,288002715085307906,650447994839105576,275462618414841856,275462618414841856,732054863189508206,392780007350730764,323223258159906818,306139598721908738,273418210051751936,158163424004538369,330044344738381834,414435389198041089,90117027854823424,239803554569650177,159037817320636417,207480800210452481,322793789532143618,304337232808902668,406517090938388492,241892796066299905,403962004739588096,412203683024076800,207150814735761408,164734950686326784,353199183345352704,323496682920738817,282291151707439104,412203683024076800,236913830276497408,529148867267264533,164734950686326784,182892865695907840,381129695980290050,347855082185949184,217807481508724747,275462618414841856,217807481508724747,453360556762595328,396849768799797259,228235320854970369,431923570063441922,368979690523852800,344096615033995266,149513048816615424,140911330059091969,273503438124613632,344096615033995266,114889120379043843,140092601263980544,212673938474401796,254468316695887872,477555922026102818,414435389198041089,396849768799797259,265548501826535426,158163424004538369,247024165436129281,526883393485406208,340583035542175744,330044344738381834,181366773306753024,235819592851652608,161173670729875456,529148867267264533,140092601263980544,114889120379043843,427221050330316814,186543007850299393,140092601263980544,368979690523852800,251943117622738944,144252821288517632,358306343679033359,140092601263980544,368979690523852800,251943117622738944,144252821288517632,171819164594470922,95586191725826048,228235320854970369,135135051275829249,259526563324755968,307260321247264778,379381005989052427,383774228937179136,203704363141562368,397208511848644619,338530058572660737,396876576446218273,215697775814246401,151192098962407424,110449827258589184,394762516221132811,448924033204092928,274429786456326144,605333997106495499,353558861589774337,344654362938834944,439066642920505344,283610717217619968,394889445968576522,377510502139691018,313407177236807680,290623306997039105,331104768204341258,212673938474401796,547281071448915991,266716798945067010,397208511848644619,338530058572660737,396876576446218273,516036546370207764,194700153553289216,154775194198736898,260602342309756940,151192098962407424,127989645521715200,79237403620945920,438794820287463425,356199654721060876,244246880442122250,547281071448915991,203704363141562368,601212946420334635,427319047785545759,110023598911008768,438794820287463425,209858231584030721,260602342309756940,209858231584030721,390997871886991365,169294854453460992,241892796066299905,110023598911008768,132189238744711168,403962004739588096,377510502139691018,154775194198736898,177206374260932609,352835824976658432,209858231584030721,340732701109911552,244295477917515776,390997871886991365,388778540545474570,219877773605470211,414435389198041089,225272786904416256,254943418755710976,162277584384557057,103017450437632000,266649942926426112,150650309541101568,323223258159906818,358780871375060993,273418210051751936,186543007850299393,456602429903994892,232451114593812480,448924033204092928,353558861589774337,182892865695907840,275213752025088000,159037817320636417,160747727154577408,273846298090799105,371979303665270786,247024165436129281,211476740512546828,211476740512546828,340583035542175744,323223258159906818,273418210051751936,396403521601404930,376284430521860107,161173517163954176,275213752025088000,160747727154577408,273846298090799105,398485979226177546,388778540545474570,414435389198041089,110427482854830080,273846298090799105,398485979226177546,275213752025088000,160747727154577408,150650309541101568,265449198239875072,310359084387794946,274245305363464192,371979303665270786,178489224192851969,178489224192851969,274245305363464192,274245305363464192,154775194198736898,154775194198736898,212673938474401796,212673938474401796,169294854453460992,150650309541101568,232197030087360512,110427482854830080,162277584384557057,178489224192851969,169294854453460992,150650309541101568,169294854453460992,265449198239875072,150650309541101568,361089198742175745,374572920594235392,338470854339854346,169294854453460992,153544537824821248,254943418755710976,150650309541101568,374572920594235392,265449198239875072,265449198239875072,338470854339854346,265449198239875072,283610717217619968,207480800210452481,338470854339854346,403161067389452288,127835267129147392,165280702177345537,401744323156115457,335465485942652933,254254783710363648,165280702177345537,264452174552104980,343758521663225859,212673938474401796,165280702177345537,526883393485406208,247024165436129281,799622791014907924,441232639358402560,240879045359828993,304382991331753987,339041223736164354,207150814735761408,199763761026826241,361742382963621889,304382991331753987,250689440056475648,273503438124613632,403598012888252426,304382991331753987,477555922026102818,273503438124613632,403598012888252426,249257371182956544,207150814735761408,360986777147670529,413497313626030110,285411952338141185,397208511848644619,453753483427053568,360986777147670529,199558778381795330,477555922026102818,357960147399606295,455076155679178782,433708069654888448,619566583970529314,411621214994432000,497147537526882327,243834840615616513,358623826721898496,199558778381795330,881033716644872244,866691404424413224,381955826375458818,212673938474401796,272500470453370882,228235320854970369,335275129552502794,448493571419537428,282291151707439104,658636974952939530,273503438124613632,226462670298152960,482984260131749889,528043224124620802,420714470801670145",
  },
  {
    badgeName: "snapshot_gold",
    name: "Snapshot (Alpha)",
    winnerDiscordIds:
      "239803554569650177,290623306997039105,322793789532143618,118075064070438916",
  },
  {
    badgeName: "snapshot_silver",
    name: "Snapshot (Beta)",
    winnerDiscordIds:
      "412203683024076800,403598012888252426,250689440056475648,273503438124613632,304382991331753987",
  },
  {
    badgeName: "snapshot_bronze",
    name: "Snapshot (Gamma)",
    winnerDiscordIds:
      "453094947298476032,275399433083158528,216707292274360333,151144919136862210,393247913003712523,205925854654627840",
  },
  {
    badgeName: "pool2",
    name: "Golden Paddling Pool Event",
    winnerDiscordIds:
      "92909500100513792,568115745314045953,712759282902499339,791431129928302672,381129695980290050,804048986469957633,79237403620945920,601212946420334635,209858231584030721,165280702177345537,269304206588903424,211476740512546828,526081844043579393,125702580490731521,171819164594470922,172166054217383936,390997871886991365,241892796066299905,406517090938388492,282291151707439104,304337232808902668,266716798945067010,114889120379043843,212673938474401796,413497313626030110",
  },
  {
    badgeName: "tidal_tuesdays",
    name: "Tidal Tuesdays",
    winnerDiscordIds:
      "226462670298152960,453753483427053568,214972552387231744,420714470801670145,347036855453220865,319245965498384387,452100472656887848,779963298564276224,226462670298152960,482984260131749889,453753483427053568,477555922026102818,360986777147670529,779963298564276224,482984260131749889,445086598107889684,388778540545474570,379381005989052427,239803554569650177,322793789532143618,295283215462170624,295283215462170624,477555922026102818,304382991331753987,273503438124613632,453753483427053568",
  },
  {
    badgeName: "squid_junction",
    name: "Squid Junction",
    winnerDiscordIds:
      "322793789532143618,388778540545474570,332893262966685696,239803554569650177,462785588194443266,445086598107889684,452100472656887848,718532507909357598,367391033035849729,313407177236807680,448493571419537428,257318683423014913,441376533077164043,249257371182956544,342838558564024322,357960147399606295,259526563324755968,437687489340112926,445086598107889684,600886777129205770,600886777129205770,482984260131749889,528043224124620802,453753483427053568,185903638034644992,392780007350730764,502660658953846795,709458397237477387,465254297521881098,396849768799797259,672934395891417098,397208511848644619,328319613140074507,467876387122970635,435985822165106717,480391723948965912,866691404424413224,482984260131749889,420714470801670145,453753483427053568,226462670298152960",
  },
  {
    badgeName: "triton",
    name: "Triton-Cup",
    winnerDiscordIds:
      "277760673436401664,317021572470669312,347127232839417856,149504203654430720,207150814735761408,304337232808902668,403962004739588096,381129695980290050,158163424004538369,330044344738381834,526883393485406208,340583035542175744,105390854063034368,151192098962407424,109804061900992512,115572122482507782,377510502139691018,265816182374924298,323496682920738817,182892865695907840,241892796066299905,304337232808902668,406517090938388492,403962004739588096,114889120379043843,173365902035779584,186543007850299393,266716798945067010,114889120379043843,212673938474401796,266716798945067010,244246880442122250,448493571419537428,358597619972440065,505266229548810250,619566583970529314,477555922026102818,433708069654888448,368979690523852800,358597619972440065,177206374260932609,358597619972440065,158163424004538369,448493571419537428,397208511848644619,658636974952939530,339041223736164354,273846298090799105,619566583970529314,497147537526882327,283645464572723201",
  },
  {
    badgeName: "cake",
    name: "Yay's SUPER AWESOME Birthday Bash!",
    winnerDiscordIds:
      "260602342309756940,105390854063034368,97804913941172224,107263003031764992",
  },
];

interface BadgesProps {
  userId: number;
  userDiscordId: string;
  patreonTier: number | null;
  peakXP?: number;
  presentationMode: boolean;
}

const usersBadges = ({
  userId,
  userDiscordId,
  patreonTier,
  peakXP = -1,
  presentationMode,
}: BadgesProps) => {
  const result: {
    src: string;
    description: string;
    count: number;
    hueRotateAngle?: number;
  }[] = [];

  const [itz1To9, itz10to19, itz20To29] = wonITZCount(userId);

  // PATREON

  if (patreonTier === 2 || presentationMode) {
    result.push({
      src: "patreon.gif",
      description: "Supporter of sendou.ink on Patreon",
      count: 1,
    });
  }

  if ((patreonTier ?? -1) >= 3 || presentationMode) {
    result.push({
      src: "patreonplus.gif",
      description: "Supporter+ of sendou.ink on Patreon",
      count: 1,
    });
  }

  // XP

  if (peakXP >= 3000) {
    result.push({
      src: "xp30.gif",
      description: "Peak X Power of 3000 or better",
      count: 1,
    });
  } else if (peakXP >= 2900) {
    result.push({
      src: "xp29.gif",
      description: "Peak X Power of 2900 or better",
      count: 1,
      hueRotateAngle: -120,
    });
  } else if (peakXP >= 2800) {
    result.push({
      src: "xp28.gif",
      description: "Peak X Power of 2800 or better",
      count: 1,
    });
  } else if (peakXP >= 2700) {
    result.push({
      src: "xp27.gif",
      description: "Peak X Power of 2700 or better",
      count: 1,
      hueRotateAngle: 160,
    });
  } else if (peakXP >= 2600) {
    result.push({
      src: "xp26.gif",
      description: "Peak X Power of 2600 or better",
      count: 1,
      hueRotateAngle: 100,
    });
  }

  if (presentationMode) {
    result.push({
      src: "xp30.gif",
      description: "Peak X Power of 3000 or better",
      count: 1,
    });
    result.push({
      src: "xp29.gif",
      description: "Peak X Power of 2900 or better",
      count: 1,
      hueRotateAngle: -120,
    });
    result.push({
      src: "xp28.gif",
      description: "Peak X Power of 2800 or better",
      count: 1,
    });
    result.push({
      src: "xp27.gif",
      description: "Peak X Power of 2700 or better",
      count: 1,
      hueRotateAngle: 160,
    });
    result.push({
      src: "xp26.gif",
      description: "Peak X Power of 2600 or better",
      count: 1,
      hueRotateAngle: 100,
    });
  }

  // ITZ

  if (itz1To9 > 0 || presentationMode) {
    result.push({
      src: "itz_red.gif",
      description: "Awarded for winning In The Zone 1-9",
      count: presentationMode ? 1 : itz1To9,
    });
  }

  if (itz10to19 > 0 || presentationMode) {
    result.push({
      src: "itz_orange.gif",
      description: "Awarded for winning In The Zone 10-19",
      count: presentationMode ? 1 : itz10to19,
    });
  }

  if (itz20To29 > 0 || presentationMode) {
    result.push({
      src: "itz_blue.gif",
      description: "Awarded for winning In The Zone 20-29",
      count: presentationMode ? 1 : itz20To29,
    });
  }

  // Other tournaments

  for (const tournament of regularTournamentBadges) {
    const count = tournament.winnerDiscordIds
      .split(",")
      .reduce(
        (count, winnersId) => (winnersId === userDiscordId ? count + 1 : count),
        0
      );

    if (count === 0 && !presentationMode) continue;

    result.push({
      src: `${tournament.badgeName}.gif`,
      description: `Awarded for winning ${tournament.name}`,
      count: presentationMode ? 1 : count,
      hueRotateAngle: tournament.hueRotateAngle,
    });
  }

  return result;
};

const Badges = ({
  userId,
  userDiscordId,
  patreonTier,
  peakXP,
  presentationMode = false,
  showInfo,
}: {
  userId: number;
  userDiscordId: string;
  patreonTier: number | null;
  peakXP?: number;
  presentationMode?: boolean;
  showInfo?: boolean;
}) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  const badges = useMemo(
    () =>
      usersBadges({
        userId,
        userDiscordId,
        patreonTier,
        peakXP,
        presentationMode,
      }),
    [userId, userDiscordId, patreonTier, peakXP, presentationMode]
  );

  useEffect(() => {
    const loadImage = (imageUrl: string) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = imageUrl;
        loadImg.onload = () => setTimeout(() => resolve(imageUrl));
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(badges.map((badge) => loadImage("/badges/" + badge.src)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.error("Failed to load images", err));
  }, [badges]);

  if (badges.length === 0) return null;

  return (
    <BadgeContainer
      badges={badges}
      showBadges={imgsLoaded}
      showInfo={showInfo}
    />
  );
};

export default Badges;
