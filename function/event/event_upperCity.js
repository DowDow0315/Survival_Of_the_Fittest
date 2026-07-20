//발렌
window.EVENTS.push({
    id : "uppercity_first_entry_event",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "richTownStreet",

    action : (player) => {
        player.flags.uppercity_first_entry_event_seen = true;
        player.flags.uppercity_first_entry_event_seen_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene([
            {
                type : "text",
                value : [
                    "상류도시에 들어서자마자, 당신은 잠시 걸음을 멈췄다. 관문에서 봤던 것처럼 도시는 화려했다. 깨끗한 거리, 하류도시와 다르게 쓰레기나 핏자국 따위는 없는 백색의 도시, 대신 향수 냄새와 꽃잎, 웃음소리와 노랫소리가 공기 위를 떠다녔다.",
                    " 경비병들도 하류도시의 경비병들과는 달랐다. 그들의 옷은 더 화려했고 백색을 상징하는 깃발이 달려있었다.",
                    "<br>그때, 거리 한가운데에 모여 있던 사람들이 일제히 고개를 들었다. 백색의 도로 위, 금색의 단상 위로 누군가의 모습이 보였다. 금빛 머리카락에 단정한 미소, 그리고 손을 들어 사람들에게 인사하는 모습.... 마치 천사와도 같아 보였다.",
                    "<br><br>\"발렌 님이다.\"<br><br>",
                    "곧이어 거리 곳곳에서 박수가 터졌다. 사람들은 그를 향해 웃고, 고개를 숙이고, 이름을 불렀다. 몇 명은 그를 더 가까이에서 보기 위해 사람들을 밀치기도 했다. 그의 이름은 이미 군중 사이를 떠돌고 있었다. <br><br>발렌.<br><br>당신도 그 이름을 들어본 적이 있다.",
                    "<br><br>영웅. <br><br>이 도시의 영웅. <br><br>그리고 이 도시의 주인.",
                    "<br><br>그가 무슨 말을 하고 있는지는 들리지 않았다. 하지만 발렌의 입이 멈추자 사람들은 환호성을 질렀고, 당신의 옆에 있던 사람들도 동조하여 환호했다. 당신은 그 환호성 속에서 발렌을 바라보았다. 너무 멀어서 그의 표정은 보이지 않았다. 하지만 그의 금빛 머리카락 아래 하늘색 눈동자만은 이상할 정도로 선명하게 보였다. <br>그의 위로는 슬로건이 걸려 있었다.",
                    "<br><br><br><div style='text-align:center; font-size:1.1em;'><span style='color: #1de2f0'><strong>모든 사람들은 사랑받을 권리가 있다.</strong></span></div>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "valen_invitation_01",
    once : true,

    condition : (player) =>
        player.location === "heavenPalace" &&
        player.flags?.rebel_story_02_after_uppercity_promise_invitation &&
        isPlayerProperlyDressed(player) &&
        !player.flags?.valen_invitation_01_seen,

    action : (player) => {
        player.flags.valen_invitation_01_seen = true;
        savePlayer(player);
        
        startScene(NPC_DATA["valen"].scenes.valen_invitation_01, player, {
            onEnd : () => {
                startScene(getLocationScene(player), player);
            }
        });
    }
});

//데릭
function deric_repeat_date_bad_clothes(player){
    player.flags = player.flags || {};
    player.flags.dericRepeatDateCheckedDay = getCurrentDay(player);

    changeEmotion("deric", "affection", -3);
    changeEmotion("deric", "rage", 2);

    savePlayer(player);

    startScene(NPC_DATA["deric"].scenes.deric_repeat_date_bad_clothes, player, {
        onEnd : () => {
            startScene(getLocationScene(player), player);
        }
    });
}

window.EVENTS.push({
    id : "deric_first_meeting_high_charm_event",
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        getTotalStat(player, "charm") >= 25 &&
        isPlayerProperlyDressed(player) &&
        !player.flags.dericFirstMet &&
        !player.flags.dericLetterReceived,

    action : (player) => {
        startScene(NPC_DATA["deric"].scenes.deric_first_meeting_high_charm_event, player, {
            onEnd : () => {
                player.flags.dericFirstMet = true;
                player.flags.dericFirstMetDay = getCurrentDay(player);
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
});

window.EVENTS.push({
    id : "deric_first_meeting_nikolai_letter_kept_event",
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.dericLetterReceived &&
        isPlayerProperlyDressed(player) &&
        hasItem(player, "데릭의 친필 서신") &&
        !player.flags?.dericFirstMet,

    action : (player) => {
        startScene(NPC_DATA["deric"].scenes.deric_first_meeting_nikolai_letter_kept_event, player, {
            onEnd : () => {
                player.flags.dericFirstMet = true;
                player.flags.dericFirstMetDay = getCurrentDay(player);
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
});

window.EVENTS.push({
    id : "deric_first_meeting_nikolai_letter_sold_event",
    once : true,

    condition : (player) =>
        player.location === "gloryStreet" &&
        player.flags?.dericLetterReceived &&
        isPlayerProperlyDressed(player) &&
        !hasItem(player, "데릭의 친필 서신") &&
        !player.flags?.dericFirstMet,

    action : (player) => {
        startScene(NPC_DATA["deric"].scenes.deric_first_meeting_nikolai_letter_sold_event, player, {
            onEnd : () => {
                player.flags.dericFirstMet = true;
                player.flags.dericFirstMetDay = getCurrentDay(player);
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
});

window.EVENTS.push({
    id : "deric_date_01",
    once : true,

    condition : (player) =>
        player.flags?.dericFirstMet &&
        player.flags?.uppercity_hero_event_seen &&
        isPlayerProperlyDressed(player) &&
        getCurrentDay(player) > player.flags.dericFirstMetDay &&
        (player.location === "richTownStreet" ||
         player.location === "gloryStreet" ||
         player.location === "nobleSquare") &&
        ( getTimePeriod(player) === "afternoon" ),

    action : (player) => {
        startScene(NPC_DATA["deric"].scenes.deric_date_01, player, {
            onEnd : () => {
                startScene(getLocationScene(player), player);
            }
        });
    }
});

window.EVENTS.push({
    id : "deric_date_02",
    once : true,

    condition : (player) =>
        player.flags?.dericDate01Accepted &&
        isPlayerProperlyDressed(player) &&
        getCurrentDay(player) >= player.flags.dericDate01AcceptedDay + 3 &&
        player.location === "gloryStreet" &&
        ( getTimePeriod(player) === "afternoon" ),

    action : (player) => {
        startScene(NPC_DATA["deric"].scenes.deric_date_02, player, {
            onEnd : () => {
                startScene(getLocationScene(player), player);
            }
        });
    }
});

window.EVENTS.push({
    id : "deric_repeat_date",
    once : false,

    condition : (player) =>
        player.flags?.dericDate02Accepted &&
        player.flags?.dericRepeatDateCheckedDay !== getCurrentDay(player) &&
        getCurrentDay(player) % 7 === 6 &&
        NPC_DATA["deric"].emotion.rage < 60 &&
        player.location === "theater" &&
        getTimePeriod(player) === "afternoon",

    action : (player) => {
        if (!isPlayerProperlyDressed(player)){
            deric_repeat_date_bad_clothes(player);
            return;
        }

        deric_repeat_date(player);
    }
});

window.EVENTS.push({
    id: "deric_nobleSquare_dance_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "nobleSquare" &&
        NPC_DATA["deric"].emotion.affection > 30 &&
        getTimePeriod(player) === "night" &&
        player.flags?.deric_nobleSquare_dance_01_day !== getCurrentDay(player) &&
        isPlayerProperlyDressed(player) &&
        Math.random() < 0.1,

    action: (player) => {
        player.flags.deric_nobleSquare_dance_01_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["deric"].scenes.deric_nobleSquare_dance_01,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "deric_alcohol_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "gloryStreet" &&
        NPC_DATA["deric"].emotion.affection > 30 &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        player.flags?.deric_alcohol_01_day !== getCurrentDay(player) &&
        Math.random() < 0.1,

    action: (player) => {
        player.flags.deric_alcohol_01_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["deric"].scenes.deric_alcohol_01,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "deric_rage_limit_event",

    condition : (player) =>
        player.justMoved &&
        (player.location === "nobleSquare" ||
         player.location === "gloryStreet" ||
         player.location === "richTownStreet") &&
        NPC_DATA["deric"].emotion.rage >= 80 &&
        player.flags?.deric_rage_limit_event_day !== getCurrentDay(player) &&
        Math.random() < 0.4,

    action : (player) => {
        player.flags.deric_rage_limit_event_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["deric"].scenes.deric_rage_limit_event,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

//아카시아
window.EVENTS.push({
    id : "akasia_uppercity_story_02_after_affection_event",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "theater" &&
        player.flags?.uppercity_story_03_intro_event_killErwin_seen &&
        !player.flags?.akasia_uppercity_story_02_after_affection_event_seen &&
        isPlayerProperlyDressed(player) &&
        getTimePeriod(player) === "night",

    action : (player) => {
        player.flags.akasia_uppercity_story_02_after_affection_event_seen = true;
        addItem(player, ITEMS.top.whiteUppercityTop);
        addItem(player, ITEMS.bottom.whiteUppercityBottom);
        changeTrauma(player, -3);
        passTime(player, 30);
        savePlayer(player);

        startScene(
            NPC_DATA["akasia"].scenes.akasia_uppercity_story_02_after_affection_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "akasia_undercity_comeToSeeYou_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "tavern" &&
        player.flags?.akasia_uppercity_story_02_after_affection_event_seen &&
        NPC_DATA["akasia"].emotion.affection > 30 &&
        isPlayerProperlyDressed(player) &&
        getTimePeriod(player) === "night" &&
        Math.random() < 0.07,

    action : (player) => {
        startScene(
            NPC_DATA["akasia"].scenes.akasia_undercity_comeToSeeYou_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//카인
window.EVENTS.push({
    id: "kain_firstMeeting",
    once: true,

    condition: (player) =>
        player.flags?.dericDate02Accepted &&
        getCurrentDay(player) >= player.flags.dericDate02AcceptedDay + 2 &&
        !player.flags?.kain_firstMeeting_seen &&
        player.location === "gloryStreet",

    action: (player) => {
        player.flags.kain_firstMeeting_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_firstMeeting,
            player,
            {
                onEnd: () => {
                    player.location = "theater";
                    player.flags.kainTalkUnlock = true;
                    savePlayer(player);
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_noShow_01",

    condition: (player) =>
        player.justMoved &&
        player.flags?.kain_firstMeeting_seen &&
        player.flags?.kain_noShow_01_day !== getCurrentDay(player) &&
        player.location === "gloryStreet" &&
        Math.random() < 0.07,

    action: (player) => {
        player.flags.kain_noShow_01_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["kain"].scenes.kain_noShow_01,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_noShow_02",

    condition: (player) =>
        player.justMoved &&
        player.flags?.kain_firstMeeting_seen &&
        player.flags?.kain_noShow_02_day !== getCurrentDay(player) &&
        ["richTownStreet", "gloryStreet", "theater"].includes(player.location) &&
        Math.random() < 0.08,

    action: (player) => {
        player.flags.kain_noShow_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_noShow_02,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_noShow_03",

    condition: (player) =>
        player.justMoved &&
        player.flags?.kain_firstMeeting_seen &&
        player.flags?.kain_noShow_03_day !== getCurrentDay(player) &&
        player.location === "theater" &&
        Math.random() < 0.07,

    action: (player) => {
        player.flags.kain_noShow_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_noShow_03,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_blushesAtYou",
    once: true,

    condition: (player) =>
        NPC_DATA["kain"].emotion.affection >= 30 &&
        !player.flags?.kain_blushesAtYou_seen &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        player.location === "gloryStreet",

    action: (player) => {
        player.flags.kain_blushesAtYou_seen = true;
        player.flags.kain_blushesAtYou_seen_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_blushesAtYou,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_umbrella",
    once: true,

    condition: (player) =>
        player.flags?.kain_blushesAtYou_seen &&
        !player.flags?.kain_umbrella_seen &&
        getCurrentDay(player) >= player.flags.kain_blushesAtYou_seen_day + 3 &&
        player.location === "theater",

    action: (player) => {
        player.flags.kain_umbrella_seen = true;
        player.flags.kain_umbrella_seen_day = getCurrentDay(player);
        addItem(player, ITEMS.weapon.umbrella);

        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_umbrella,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_sing_01",
    once: true,

    condition: (player) =>
        NPC_DATA["kain"].emotion.affection >= 30 &&
        player.flags?.kain_umbrella_seen &&
        !player.flags?.kain_sing_01_seen &&
        getCurrentDay(player) >= player.flags.kain_umbrella_seen_day + 7 &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        player.location === "theater",

    action: (player) => {
        player.flags.kain_sing_01_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_sing_01,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_sing_02",

    condition: (player) =>
        player.justMoved &&
        NPC_DATA["kain"].emotion.affection >= 30 &&
        NPC_DATA["kain"].emotion.rage <= 60 &&
        player.flags?.kain_sing_01_seen &&
        !player.flags?.KainWillNotSingHisSong &&
        player.flags?.kain_sing_02_day !== getCurrentDay(player) &&
        player.location === "theater" &&
        Math.random() < 0.08,

    action: (player) => {
        player.flags.kain_sing_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_sing_02,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_about_yuri_01",
    once: true,

    condition: (player) =>
        NPC_DATA["kain"].emotion.affection >= 50 &&
        (
            getTimePeriod(player) === "afternoon" ||
            getTimePeriod(player) === "night"
        ) &&
        !player.flags?.kain_about_yuri_01_seen &&
        player.location === "theater",

    action: (player) => {
        player.flags.kain_about_yuri_01_seen = true;
        player.flags.kain_about_yuri_01_seen_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_about_yuri_01,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_about_yuri_02",
    once: true,

    condition: (player) =>
        NPC_DATA["kain"].emotion.affection >= 50 &&
        (
            getTimePeriod(player) === "dawn" ||
            getTimePeriod(player) === "night"
        ) &&
        getCurrentDay(player) >= player.flags.kain_about_yuri_01_seen_day + 2 &&
        !player.flags?.kain_about_yuri_02_seen &&
        player.location === "theater",

    action: (player) => {
        player.flags.kain_about_yuri_02_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_about_yuri_02,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_confession",
    once: true,

    condition: (player) =>
        NPC_DATA["kain"].emotion.affection >= 80 &&
        (
            getTimePeriod(player) === "dawn" ||
            getTimePeriod(player) === "night"
        ) &&
        !player.flags?.KainWillNotSingHisSong &&
        !player.flags?.kain_hurt &&
        player.flags.kain_about_yuri_02_seen &&
        !hasNpcRelationship("kain", "lover") &&
        !hasNpcRelationship("kain", "spouse") &&
        player.location === "theater",

    action: (player) => {
        becomeLover("kain");
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_confession,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id : "kain_patience_limit_event",

    condition : (player) =>
        player.justMoved &&
        (player.location === "nobleSquare" ||
         player.location === "gloryStreet" ||
         player.location === "richTownStreet") &&
        NPC_DATA["kain"].emotion.lust >= 100 &&
        ( hasNpcRelationship("kain", "lover") ||
          hasNpcRelationship("kain", "spouse") ) &&
        Math.random() < 0.2,

    action : (player) => {
        player.location = "theater";
        savePlayer(player);

        startScene(
            NPC_DATA["kain"].scenes.kain_patience_limit_event,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_nobleSquare_dance_01",

    condition: (player) =>
        player.justMoved &&
        player.flags?.kain_firstMeeting_seen &&
        player.location === "nobleSquare" &&
        NPC_DATA["kain"].emotion.affection > 30 &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        player.flags?.kain_nobleSquare_dance_01_day !== getCurrentDay(player) &&
        isPlayerProperlyDressed(player) &&
        Math.random() < 0.1,

    action: (player) => {
        player.flags.kain_nobleSquare_dance_01_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["kain"].scenes.kain_nobleSquare_dance_01,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//줄리앙
window.EVENTS.push({
    id: "juliang_firstMeeting",
    once: true,

    condition: (player) =>
        player.location === "royalForge",

    action: (player) => {
        startScene(
            NPC_DATA["juliang"].scenes.juliang_firstMeeting,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "juliang_recognizingMatin_event",
    once: true,

    condition: (player) =>
        player.location === "royalForge" &&
        player.flags.matin_graveyard_sheWasHere &&
        player.flags.matin_enhance_after_event_01_seen &&
        !player.flags?.juliang_recognizeingMatin_event_seen,
        
    action: (player) => {
        player.flags.juliang_recognizeingMatin_event_seen = true;
        startScene(
            NPC_DATA["juliang"].scenes.juliang_recognizingMatin_event,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//라파엘
window.EVENTS.push({
    id: "raphael_firstMeeting",
    once: true,

    condition: (player) =>
        player.location === "royalHospital",

    action: (player) => {
        startScene(
            NPC_DATA["raphael"].scenes.raphael_firstMeeting,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "raphael_trauma_warning",
    once: false,

    condition: (player) =>
        player.location === "royalHospital" &&
        player.status.trauma >= 60 &&
        player.status.trauma < 80 &&
        !player.flags?.raphaelTraumaWarned,

    action: (player) => {
        player.flags = player.flags || {};
        player.flags.raphaelTraumaWarned = true;
        savePlayer(player);

        startScene(
            NPC_DATA["raphael"].scenes.raphael_traumaWarning,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id: "raphael_forced_hospitalization",
    once: false,

    condition: (player) =>
        player.location === "royalHospital" &&
        player.status.trauma >= 80 &&
        !player.flags?.raphaelHospitalized,

    action: (player) => {
        startRaphaelForcedHospitalization(player);
    }
});

//랜덤이벤트
window.EVENTS.push({
    id : "uppercity_hero_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "nobleSquare" &&
        player.flags?.uppercity_hero_event_seen &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "사교회장에 도착하자 몇 명 사람들이 당신을 흘낏흘낏 쳐다보는 게 느껴졌다. 가면을 쓰고 있는데도 그들의 시선이 적나라하게 느껴졌다.",
                    "<br>처음에는 하류도시의 영웅이라는 호칭에 따른 흥미였을지도 모르겠다. 하지만 점점 그들의 시선은 노골적으로 변해갔다. 그들은 대놓고 당신의 몸을 위아래로 훑으며 서로 속닥거렸다. 자신들의 대화에 당신을 끼어줄 생각은 없지만 당신을 도마 위의 생선으로는 삼고 싶은 모양이다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그들의 앞에서 빙그르르 춤을 추듯이 돌았다.",
                        type : "check",
                        stat : "charm",
                        difficulty : 18,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신의 춤에 사람들의 시선이 바뀌었다. 곧 당신은 그들에게 옆구리에 끼고 싶은 트로피들 중 하나가 되었다." +
                                    "<br><br>\"저런 아이라서 데릭이 관심을 가지는 거지.\"<br><br>" +
                                    "당신을 빤히 보고 있던 사람들 중 한 명이 돈을 던졌다. 그러자 옆에 있던 다른 사람들도 몇몇 당신에게 돈을 던졌다. 당신은 그들에게 우아하게 인사를 한 후 그들이 던진 돈을 전부 수거했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, 300);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 빙그르르 그들의 앞에서 춤을 추었다. 그들은 당신의 춤에 어이없다는 듯이 서로에게 눈짓을 하며 부채로 입을 가렸다. 그들은 당신의 춤을 비웃고 있다." +
                                    "<br>옛다, 하고 한 명이 당신에게 돈을 던져주었다. 당신의 귀끝이 붉어졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, 100);
                                    changeTrauma(player, -1);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그들의 시선에 신경을 껐다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그들이 당신을 어떤 눈으로 바라보든 신경쓰지 않았다. 남이사~ 당신은 어깨를 피고 당당해졌다. 누가 어떻게 쳐다보든 나는 멋져! 당신은 스스로 멘탈이 회복됐다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -1);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 고개를 숙이고 그 자리를 벗어났다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "고개를 푹 숙이고 그 자리에서 벗어나는 당신을 보며 몇 명이 수군덕거렸다. 그들은 역시 당신이 아무리 영웅이라고 불려도 출신을 극복할 수는 없는 법이라고 쑥덕거렸다. 그런 당신을 지켜보고 있던 한 노예가 조심스럽게 당신에게 다가왔다." +
                                    " 그는 말이 없었지만, 당신의 손에 쥐어주는 돈만큼은 진심 어린 위로였다. 적어도 상류도시에 있는 하류도시 출신 사람들 중 몇몇은 당신을 응원하고 있다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, 100);
                                }
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "uppercity_hero_02",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        player.flags?.rebelLeader2KilledNoRing &&
        Math.random() < 0.06,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 걷던 당신의 뒤로 인기척이 느껴졌다. 당신이 뒤를 돌아보자 반란군이 달려들었다. 싸움이다!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("rebels3", player, {
                        onWin : () => startScene(getLocationScene(player), player),
                        onEscape : () => startScene(getLocationScene(player), player),
                    });
                    return true;
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "uppercity_hero_03",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        player.flags?.rebelLeader2KilledWithRing &&
        Math.random() < 0.06,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 걷던 당신의 뒤로 인기척이 느껴졌다. 당신이 뒤를 돌아보자 반란군이 달려들었다. 싸움이다!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("rebels3", player, {
                        onWin : () => startScene(getLocationScene(player), player),
                        onEscape : () => startScene(getLocationScene(player), player),
                    });
                    return true;
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "night_attack_01",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet", "darkStreet"].includes(player.location) &&
        player.flags?.uppercity_hero_event_seen &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        Math.random() < 0.07,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 걷던 당신의 뒤로 인기척이 느껴졌다. 인신매매상이 당신을 뒤에서부터 노리고 있다!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("trafficker1", player, {
                        onWin : () => startScene(getLocationScene(player), player),
                        onEscape : () => startScene(getLocationScene(player), player),
                    });
                    return true;
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "night_attack_02",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet", "darkStreet"].includes(player.location) &&
        player.flags?.uppercity_hero_event_seen &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        Math.random() < 0.06,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 걷던 당신의 뒤로 인기척이 느껴졌다. 인신매매상이 당신을 뒤에서부터 노리고 있다!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("trafficker2", player, {
                        onWin : () => startScene(getLocationScene(player), player),
                        onEscape : () => startScene(getLocationScene(player), player),
                    });
                    return true;
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "luke_pet_02",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        (
            hasNpcRelationship("luke", "lover") ||
            hasNpcRelationship("luke", "spouse")
        ) &&
        Math.random() < 0.07,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 가던 당신은 백색 제복 군인들이 당신을 보며 어수선하게 떠드는 것을 느꼈다. 그들은 당신을 손가락으로 가리키며 '루크의 손가락' 등을 말하고 있었다.",
                    "<br>\"하류도시의 영웅이 그 미천한 개랑? 안 어울리는 군.\"<br>",
                    "\"발렌 님이 아무리 자비를 베푼다고 해도 하류도시 출신은 역시 안 되는 거지.\"<br>",
                    "당신을 바라보는 그들의 눈빛이 점점 날카롭고 차가워진다. 그들은 당신을 이곳에 있으면 안 되는 불순물 중 하나로 보고 있는 거 같다. 당신은 재빠르게 발걸음을 옮겼다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "luke_pet_03",
    condition : (player) =>
        player.justMoved &&
        player.flags?.uppercity_hero_event_seen &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        (
            hasNpcRelationship("luke", "lover") ||
            hasNpcRelationship("luke", "spouse")
        ) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "백색 제복을 입은 군인이 당신의 앞을 가로막았다. 그는 단호한 얼굴로 당신에게 몸 수색을 할 테니 협조해달라고 말했다.",
                    "<br><br>\"지금까지는 하류도시의 영웅이라서 하류도시와 상류도시를 왔다갔다 하는 것을 봐드렸지만 더 이상은 봐드릴 수 없습니다.<br>어차피 하류도시에서 몸 수색은 많이 당해보셨지 않습니까. 하류도시의 개랑도 친해보이는데.\"<br><br>",
                    "하류도시의 개, 당신은 그들이 누구를 말하는 건지 단번에 알아들었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그들에게 루크를 왜 그렇게 싫어하는 건지 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"싫어한다? 그 개는 저희가 싫어할 가치도 없는 짐승입니다.\"<br><br>",
                                    "당신의 말에 그의 표정은 더 썩었다. 그는 더 이상의 대화는 필요없다고 생각했는지 당신에게 옷을 벗을 것을 명했다. 지나가던 사람들이 몇몇은 흥미로, 몇몇은 동정으로, 그리고 또 몇몇은 경멸로 당신의 상황을 관망하기 시작했다.",
                                    "<br>여기서 소란을 피웠다가는 더 큰일이 나고 만다. 당신은 어쩔 수 없이 옷을 벗었다. 백색 군인은 당신의 앞을 눈대중으로만 확인하지는 않았다. 그의 손이 당신의 몸을 쓸고 지나간다. 특히 성기 주변에서 그의 손짓은 다른 곳을 훑을 때보다 더 느리게 움직였다. 앞을 다 확인한 후 그는 당신에게 뒤로 돌라고 말했다. 뒤로 돌면서 당신의 얼굴은 붉게 달아올랐다. 허리선을 따라 훑어내려가던 그의 손가락이 당신의 애널 구멍을 찔렀다. 당신의 몸이 본능적으로 움츠러들었다.",
                                    "<br><br>\"수고하셨습니다. 이제 가셔도 됩니다.\"<br><br>",
                                    "그의 허락이 떨어지자마자 당신은 재빨리 그 자리를 떴다. 몸 이곳저곳에, 특히 얼굴에 남은 열기는 쉽게 지워질 거 같지가 않다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                    changeSensitivity(player, "cSensitivity", 3);
                                    changeSensitivity(player, "aSensitivity", 3);
                                    changeSensitivity(player, "bSensitivity", 3);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 순순히 그들의 수색에 협조했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 순순히 수색에 협조하자 그도 당신에게 옷을 벗으라는 소리까지는 하지 않았다. 그는 기계적으로 당신의 몸을 훑어내리고 뒤적거린 후 고개를 끄덕였다.",
                                    "<br><br>\"하류도시의 영웅, 누군가가 당신에게 부여해준 권리가 있다면 그 권리를 저버리는 행동은 하지 마시길 바랍니다.\"<br><br>",
                                    "그는 마지막으로 당신에게 경고를 한 후 가도 좋다는 사인을 남겼다. 당신은 이제 자유다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 1);
                                    changeSensitivity(player, "bSensitivity", 3);
                                }
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "nobleSquare_approach",
    condition : (player) =>
        player.justMoved &&
        player.location === "nobleSquare" &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "사교회장에 있던 당신에게 귀족들 중 한 명이 접근해왔다. 그는 자신과 어울려주면 돈을 주겠다고 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 고개를 끄덕이고 그의 파트너가 되어주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그의 파트너가 되어 이곳저곳 돌아다녔다. 그는 당신을 옆구리에 낀 채 트로피처럼 써먹었다.",
                                    "<br>대화를 하던 중에 그의 손이 당신의 엉덩이로 내려왔다. 그는 다른 귀족들과 얘기를 하면서 계속 당신의 엉덩이를 주물럭거렸다. 다른 귀족들은 성희롱을 봤으면서도 그것이 일상이라는 듯 계속 대화를 이어갔다.",
                                    "대화가 끝날 떄까지 당신은 그에게 엉덩이를 만져줘야만 했다. 어느 순간부터는 남자의 땀이 당신의 엉덩이에 느껴져서 불쾌했다..."
                                ]
                            },
                            {
                                type : "text",
                                value : [
                                    "몇 시간이 흐른 후, 남자는 당신에게 수고했다고 말하며 돈을 건넸다. 당신의 엉덩이에 붙은 불쾌감은 쉽게 사라지지 않을 거 같다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 1);
                                    changeArousal(
                                        player,
                                        getSensitivityArousalGain(player, "a", 10)
                                    );
                                    changeSensitivity(player, "aSensitivity", 10);
                                    changeStamina(player, -20);
                                    changeGold(player, 800);
                                    passTime(player, 35);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 고개를 저었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 고개를 젓자 그는 아쉬운 표정을 짓긴 했지만 당신에게 더는 강요하지 않았다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

//시온
window.EVENTS.push({
    id : "sion_spying_04",

    condition : (player) =>
        player.justMoved &&
        getCurrentDay(player) >= (player.flags.yuri_rebel_story_01_after_seen_day + 1) &&
        player.flags?.sion_uppercity &&
        player.flags?.sion_spying_04_day !== getCurrentDay(player) &&
        (player.location === "richTownStreet" ||
         player.location === "gloryStreet" ) &&
        Math.random() < 0.08,

    action : (player) => {
        player.flags.sion_spying_04_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["sion"].scenes.sion_spying_04,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "sion_spying_05",

    condition : (player) =>
        player.justMoved &&
        player.flags?.sion_uppercity &&
        getCurrentDay(player) >= (player.flags.yuri_rebel_story_01_after_seen_day + 1) &&
        player.flags?.sion_spying_05_day !== getCurrentDay(player) &&
        player.location === "theater" &&
        Math.random() < 0.08,

    action : (player) => {
        player.flags.sion_spying_05_day = getCurrentDay(player);
        savePlayer(player);
        
        startScene(
            NPC_DATA["sion"].scenes.sion_spying_05,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});