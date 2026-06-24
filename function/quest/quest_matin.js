const MATIN_QUESTS = {
    matin_graveyard_01: {
        id: "matin_graveyard_01",
        title: "마틴의 과거",
        type: "collect",
        category : "sub",
        giver: "matin",

        requiredItem: "matinLocket",
        requiredCount: 1,

        rewardGold: 1000
    }
};

const MATIN_GRAVEYARD_EVENT_01 = [
    {
        type : "text",
        value : "주점 문을 열자, 그릇을 닦고 있던 마틴이 당신을 올려다보았다. 그는 잠시 머뭇거리더니 당신에게 손짓했다. 당신은 그에게 다가갔다. 당신이 다가온 후에도 마틴은 마음을 정하지 못한 듯 주저하는 것처럼 보였다." +
        "<br><br>\"네게 부탁할 게 있어. 공동묘지에서 하나만 가져와줬으면 해.\"<br><br>" +
        "공동묘지? 의아해하는 당신에게 마틴은 더 말하고 싶지는 않아했다. 그는 하고 싶지 않으면 하지 않아도 된다고 말했다." +
        "<br><br>\"...그래서? 가져와줄 건가?\""
    },
    {
        type : "choice",
        choices : [
            {
                text : "당신은 고개를 끄덕였다.",
                scene : [
                    {
                        type : "text",
                        value : "당신이 고개를 끄덕이자, 마틴은 조금 놀란 표정을 지었다. 그는 당신에게 부탁을 하면서도 당신이 부탁을 들어주지 않을 거라고 생각했던 모양이다. 그는 순간 '왜'라고 말하려다가 숨을 삼켰다." +
                        "<br><br>\"...그래. 고맙다.\"<br><br>" +
                        "그는 당신에게 클럽 하나와 물약 2개를 내밀었다." +
                        "<br><br>\"남은 거니까 가져가. 그 해골들은 클럽에 약하거든.\"<br><br>" +
                        "그는 고개를 돌렸다."+
                        "<br><br>\"그 물건은... 목걸이야. 하트모양에 사진이 걸려있어.\""
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeEmotion("matin", "affection", 5);
                            changeEmotion("matin", "rage", -20);
                            addItem(player, ITEMS.weapon.club);
                            addItem(player, ITEMS.consumable.mediumPotion);
                            addItem(player, ITEMS.consumable.mediumPotion);
                            acceptMatinGraveyardQuest(player);
                        }
                    }
                ]
            },
            {
                text : "고개를 저었다.",
                scene : [
                    {
                        type : "text",
                        value : "마틴은 그럴 줄 알았다는 듯이 고개를 끄덕였다. 그는 괜한 이야기를 꺼냈다고 말하며 당신에게서 고개를 돌렸다."
                    }
                ]
            }
        ]
    }
];

const MATIN_GRAVEYARD_RETURN_SUCCESS = [
    {
        type : "text",
        value : "마틴은 당신이 공동묘지에서 돌아와 하트 로켓 목걸이를 내밀자 잠시 말을 잃었다. 그는 당신에게 하트 로켓 목걸이를 받아들이지도 못한 채 멍하니 당신의 손을 내려다보고 있었다. 1초, 2초.... 10초, 10초보다 더 많은 시간이 흐르고 나서야 마틴은 당신에게서 그 목걸이를 받아들였다. 그는 목걸이 안의 사진을 보더니 손가락으로 사진을 쓸었다." +
                "<br><br>\"고마워.\"<br><br>" +
                "당신이 무슨 말을 꺼내기도 전에 마틴은 당신에게 고맙다고 말했다. 그는 목걸이를 소중하게 끌어안으며 당신에게 한번 더 고맙다고 말했다." +
                "<br><br>\"이건 정말 내게 중요한 거야. 진심으로, 고마워, {playerName}.\"<br><br>" +
                "그는 당신에게 목걸이의 사진에 있었던 사람은 자신에게 정말로 소중한 사람이었다고 말해주었다. 그는 고개를 돌리더니 당신에게 불쑥 돈을 내밀었다." +
                "<br><br>\"나한테 그대로 가져다줘서 고마워.\""
    },
    {
        type : "effect",
        run : (player) => {
            changeEmotion("matin", "affection", 15);
            changeGold(player, 500);
            completeMatinGraveyardQuest(player);
            startScene(getLocationScene(player), player);
            return true;
        }
    }
]

const MATIN_GRAVEYARD_RETURN_SOLD = [
    {
        type : "text",
        value : "마틴은 말없이 당신을 쳐다보았다. 그의 손에는 하트 로켓 목걸이가 있었다. 분명 상점에 팔았었는데 그가 다시 사온 모양이다." +
                "<br><br>\"가.\"<br><br>" +
                "그는 딱 그 한 마디만을 내뱉었다. 당신은 변명도 못하고 그의 차가운 뒷모습을 바라보아야만 했다."
    },
    {
        type : "effect",
        run : (player) => {
            changeEmotion("matin", "affection", -30);
            changeEmotion("matin", "rage", 20);
            failMatinGraveyardQuest(player);
            startScene(getLocationScene(player), player);
            return true;
        }
    }
]

function startMatinGraveyardEvent01(player){
    player.flags = player.flags || {};
    player.flags.matin_graveyard_event_seen = true;

    runScene(MATIN_GRAVEYARD_EVENT_01, player, {
        onEnd: () => {
            startScene(getLocationScene(player), player);
        }
    });
}

function acceptMatinGraveyardQuest(player){
    initQuestData(player);

    const questId = "matin_graveyard_01";

    const alreadyActive = player.quest.subActive.some(q => q.id === questId);
    const alreadyCompleted = player.quest.completed.includes(questId);

    if (alreadyActive || alreadyCompleted) return;

    player.quest.subActive.push({
        id: questId,
        progress: 0
    });

    localStorage.setItem("playerData", JSON.stringify(player));
}

function completeMatinGraveyardQuest(player){
    initQuestData(player);

    removeItemByKey(player, "matinLocket");

    player.quest.subActive = player.quest.subActive.filter(
        q => q.id !== "matin_graveyard_01"
    );

    if (!player.quest.completed.includes("matin_graveyard_01")){
        player.quest.completed.push("matin_graveyard_01");
    }

    player.flags.matin_graveyard_01_done = true;
    player.flags.matinLocketTaken = false;
    changeGold(player, MATIN_QUESTS.matin_graveyard_01.rewardGold);
    savePlayer(player);
}

function failMatinGraveyardQuest(player){
    initQuestData(player);

    player.quest.subActive = player.quest.subActive.filter(
        q => q.id !== "matin_graveyard_01"
    );
    player.flags.matin_graveyard_01_failed = true;
    player.flags.matinLocketTaken = false;
    localStorage.setItem("playerData", JSON.stringify(player));
}