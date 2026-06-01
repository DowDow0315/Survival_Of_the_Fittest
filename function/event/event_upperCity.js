//발렌
window.EVENTS.push({
    id : "uppercity_first_entry_event",
    once : true,

    condition : (player) =>
        player.location === "richTownStreet",

    action : (player) => {
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
                    "<br><br>그가 무슨 말을 하고 있는지는 들리지 않았다. 하지만 발렌의 입이 멈추자 사람들은 환호성을 질렀고, 당신의 옆에 있던 사람들도 동조하여 환호했다. 당신은 그 환호성 속에서 발렌을 바라보았다. 너무 멀어서 그의 표정은 보이지 않았다. 하지만 그의 금빛 머리카락 아래 푸른색 눈동자만은 이상할 정도로 선명하게 보였다. <br>그의 위로는 슬로건이 걸려 있었다.",
                    "<br><br><br><div style='text-align:center; font-size:1.1em;'><span style='color:#8ec5ff'><strong>모든 사람들은 사랑받을 권리가 있다.</strong></span></div>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
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