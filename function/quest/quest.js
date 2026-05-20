const QUESTS = {
    slime_hunt_01: {
        id: "slime_hunt_01",
        title: "슬라임 5마리 퇴치",
        type: "hunt",
        repeatable : true,
        giver: "martin",

        desc: "언제나처럼 슬라임이 마을의 고민거리인 모양이다. 슬라임 5마리를 처리하자.",
        targetEnemy: "slime",
        requiredKill: 5,

        rewardGold: 100,

        acceptText: "마틴은 당신에게 의뢰서를 주었다.<br><br>\"슬라임 5마리.\"",
        cancelText: "마틴은 무표정으로 당신에게서 의뢰서를 다시 받았다.",
        completeText: "마틴은 의뢰서를 확인하더니 동전을 내밀었다."
    },

    begger_hunt: {
        id: "begger_hunt",
        title: "거지 5마리 퇴치",
        type: "hunt",
        repeatable : true,
        giver: "martin",

        desc: "하수구의 거지들이 또 난리인 모양이다. 5명 정도 해치우자.",
        targetEnemy: "begger",
        requiredKill: 5,

        rewardGold: 100,

        acceptText: "마틴은 당신에게 의뢰서를 주었다. <br><br>\"준비가 되지 않았으면 하수구 깊은 곳까지는 가지마. 갔다가 돌아오지 못한 사람들도 많으니까.\"",
        cancelText: "마틴은 무표정으로 당신에게서 의뢰서를 다시 받았다.",
        completeText: "마틴은 의뢰서를 확인하더니 동전을 내밀었다."
    },

    goblin_cave_cleanup : {
        id : "goblin_cave_cleanup",
        title : "고블린동굴 포로들 구출",
        type : "boss",
        repeatable : true,
        giver : "matin",

        desc : "사람들을 괴롭히는 고블린들은 여전히 많다. 고블린킹을 토벌하고 사람들을 구하자.",
        activeDesc : "고블린킹을 토벌하고 사람들을 구해야 한다.",
        readyDesc : "고블린킹을 토벌하고 사람들을 구했다. 주점으로 돌아가 마틴에게 보고하자.",
        targetBoss : "goblinKing",
        requiredKill : 1,

        rewardGold : 500,

        require : {
            completedQuest : "undercity_story_04",
            count : 1
        },

        acceptText : "마틴은 당신에게 의뢰서를 주었다.",
        cancelText : "마틴은 무표정으로 당신에게서 의뢰서를 다시 받았다.",
        completeText : "마틴은 의뢰서를 확인하더니 동전을 내밀었다. 그는 당신이 구출한 사람들은 모두 인도됐다고 말했다. 어디로 인도된지는 말해주지 않았다."
    },

    //스토리퀘스트
    undercity_story_01: {
        id : "undercity_story_01",
        title : "하수구 깊은 곳",
        type : "boss",
        repeatable : false,
        giver : "matin",

        desc : "당신이 퀘스트 의뢰판을 보고 있을 때 마틴이 당신의 옆으로 다가왔다. 그는 퀘스트 게시판에 의뢰서를 붙이며 당신을 힐끗 곁눈질했다. <br>\"네가 지금까지 하수구 거지들을 처리해왔다는 걸 알고 있어.\"<br> 의뢰서에는 하수구 깊은 곳에 있는 거지들의 우두머리를 처리해달라는 내용이 쓰여져있었다. <br>\"이 퀘스트를 처리하고 싶으면 언제든 말해.\"<br>그는 의뢰서를 다 붙인 후 자신의 자리로 돌아갔다.",
        activeDesc : "하수구 깊은 곳의 거지 우두머리를 처리해야 한다.",
        readyDesc: "거지들의 우두머리를 처리했다. 주점에 돌아가 마틴에게 보고하자.",
        targetBoss: "beggers",
        requiredKill : 1,

        rewardGold : 300,

        require : {
            completedQuest : "begger_hunt",
            count : 3
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.undercity_story_01_done = true;
        },

        acceptText : "마틴은 당신이 의뢰서를 가져온 걸 보더니 잠시 말이 없었다. 그는 당신을 위아래로 훑어본 후 고개를 끄덕였다.<br><br>" +
                     "\"하수구에는 거지들이 많아. 모두를 다 해치우고 갈 필요는 없어. 우두머리의 귀에는 귀걸이가 있는데, 증표로 그 귀들만 잘라오도록 해.\"<br><br>" +
                     "마틴은 잠시 말이 없었다.<br><br>" +
                     "\"이미 알고 있겠지만, 거지들은 네 목숨에는 관심이 없어. 네가 살았든 죽었든, 그들에게 필요한 건 네 구멍뿐이야.\"<br><br>" +
                     "그는 당신에게서 시선을 돌렸디. 당신은 그의 말이 이어지길 기다렸지만, 그는 더 이상 말을 하지 않았다. 당신은 의뢰서를 쥐고 나갔다.",

        cancelText : "마틴은 당신에게서 의뢰서를 받아갔다. 그는 당신이 안 할 줄 알았다는 듯이 덤덤하게 굴었다. 그는 의뢰서를 다시 게시판에 붙여놓은 후 당신은 쳐다도 보지 않고 일을 했다.",

        completeText : "마틴은 당신이 가져온 증거를 확인하더니 고개를 끄덕였다. <br><br>\"이제 조금은 잠잠해지겠지. 다시 생기긴 하겠지만.... 잘했어.\"<br><br>당신은 그의 표정을 보고 싶었지만, 그가 바로 고개를 돌려버려 그의 표정을 볼 수 없었다."
        
    },
    undercity_story_02: {
        id : "undercity_story_02",
        title : "하수구 깊은 곳의 의문",
        type : "boss",
        repeatable : false,
        giver : "matin",

        desc : "마틴이 당신을 부르는 목소리에, 당신은 고개를 돌렸다. 마틴은 퀘스트 하나를 당신에게 내밀었다. 또 하수구다. 한번 죽은 후, 또 다른 놈들이 자리를 잡은 모양이다. 마틴은 당신에게 한번 더 이 퀘스트를 맡겠냐고 물었다.",
        activeDesc: "하수구 깊은 곳의 거지 우두머리를 처리해야 한다.",
        readyDesc: "거지들의 우두머리를 처리했다. 주점에 돌아가 마틴에게 보고하자.",
        targetBoss: "beggers",
        requiredKill : 1,

        rewardGold: 350,

        require: {
            completedQuest : "undercity_story_01",
            count : 1
        },

        acceptText : "마틴은 당신이 의뢰서를 가져가는 것을 보고 고개를 끄덕였다. 그는 당신이 의뢰서를 가져가는 걸 보며 그릇을 닦았다.",
        cancelText : "마틴은 당신에게서 의뢰서를 받아갔다. 그는 당신이 안 할 줄 알았다는 듯이 덤덤하게 굴었다. 그는 의뢰서를 다시 게시판에 붙여놓은 후 당신은 쳐다도 보지 않고 일을 했다.",
        completeText : "마틴은 당신의 증거를 확인한 후 고개를 끄덕였다. 당신이 왜 50골드가 더 늘었냐고 묻자 마틴은 그런 거에 일일히 신경을 쓰는 것보다는 다른 일에 신경쓰라고 쏘아붙였다.<br><br>\"다음 번에는 더 좋은 의뢰가 들어올 거다. 더 받으려면 실력이나 쌓아놔.\"<br><br>그는 순간 숨을 멈췄다. <br><br>\"...하얀꽃 냄새가 나는군.\"<br><br>그는 의아하다는 듯 당신을 쳐다봤지만 이내 다시 시선을 돌렸다."
    },

    undercity_story_03 : {
        id : "undercity_story_03",
        title : "실종자들의 흔적",
        type : "investigate",
        repeatable : false,
        giver : "eric",

        desc : "주점 게시판에는 예상대로 실종자들을 찾는 의뢰가 붙어있었다. 실종자들의 위치 수색. 아직 실종자들의 위치도 찾지 못했던 모양이다. 당신은 의뢰에 붙여져 있는 지도를 보았다. 깊은 숲에서 추적이 끊겨있었다." +
               "<br>당신이 그 의뢰서를 가져오자 마틴은 실종자 위치 수색 의뢰니 실종자들이 있는 고블린 동굴만 찾으면 된다고 말했다. 고블린동굴, 깊은 숲에는 수많은 고블린동굴들이 있으니 루크가 못 찾는 것도 이해는 간다. 게다가 고블린동굴 구조가 다 비슷하기도 하고.<br><br>" +
               "\"...그래서, 그 의뢰 받을 거야?\"",

        activeDesc : "깊은 숲에서 실종자들 흔적을 찾아야 한다. 아마 그들은 고블린 동굴에 있을 것이다.",
        readyDesc : "실종자들이 있는 고블린동굴을 찾았다! 주점으로 돌아가 마틴에게 보고하자.",
        targetFlag : "goblin_cave_found",
        requiredKill : 1,
        
        rewardGold: 500,

        require : {
            flag : "undercity_story_03_unlocked"
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.undercity_story_03_done = true;
            player.flags.undercity_story_04_unlocked = true;
            player.flags.story_goblin_cave_known = true;
        },

        acceptText : "마틴은 당신이 고개를 끄덕이자 표정이 미묘해졌다. <br><br>\"동굴만 찾는 거라고 생각하지마. 그 주변에는 고블린들이 많으니까.\"<br><br>그는 당신에게서 고개를 돌렸다.",
        cancelText : "마틴은 당신에게서 의뢰서를 받아갔다. 그는 고개를 끄덕이며 이런 건 경비병들에게 맡기는 게 낫다고 말했다.",
        completeText : "마틴은 당신이 고블린동굴을 찾았다고 했을 때 처음에는 믿지 못했다. 그는 멍하니 당신을 바라보다가 고개를 끄덕였다. 그는 에릭에게 전보를 보내기 위해 에릭의 새를 불렀다."
    },

    undercity_story_04 : {
        id : "undercity_story_04",
        title : "고블린동굴 실종자 구출 작전",
        type : "boss",
        repeatable : false,
        giver : "eric",
        
        desc : "당신이 게시판에 다가갔을 때 마틴이 당신을 불렀다. 그는 에릭에게서 전언이 날아왔다고 했다. 고블린동굴을 찾은 이에게 이 의뢰서를 보여주라고 했다고. 고블린동굴 실종자 구출 작전이다." +
               " 마틴은 의뢰서를 읽는 당신을 말없이 바라보았다. 당신이 시선이 의뢰서의 마지막 문장까지 닿은 걸 확인한 후 마틴은 당신에게 이 의뢰를 받을 거냐고 물었다.",
        activeDesc : "고블린동굴에 있는 실종자들을 구출해야 한다.",
        readyDesc : "고블린동굴의 실종자들을 구출했다! 주점에 있는 마틴에게 보고하자.",
        targetBoss : "goblinKing",
        requiredKill : 1,

        rewardGold : 1000,

        require: {
            completedQuest : "undercity_story_03",
            count : 1
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.undercity_story_04_done = true;
            player.flags.undercity_story_04_done_day = getCurrentDay(player);
        },

        acceptText : "당신이 의뢰를 받는다고 하자 마틴은 뭐라 말하려다가 그만두고 다시 그릇 닦는 일에 전념했다.",
        cancelText : "당신이 의뢰를 취소하자, 마틴은 고개를 끄덕였다.",
        completeText : "당신이 실종자들을 구출헀다고 보고하자 마틴은 잠시 말이 없었다. <br><br>\"수고했어.\"<br><br>그는 서신 하나를 새의 발목에 묶으면서 말했다. 그는 작게 경비병들이 지 일도 제대로 못한다고 중얼거렸다. <br><br>\"쓰레기새끼들...\"<br><br>그는 당신과 시선을 마주치지는 않았지만, 당신의 몸을 위아래로 훑으며 당신의 상태를 살폈다."
    },

    undercity_story_05 : {
        id : "undercity_story_05",
        title : "끊어진 가도의 도적떼",
        type : "investigate",
        repeatable : false,
        giver : "matin",

        desc : "도적떼의 하류도시 마을입구 습격 후, 마을사람들의 불안이 커졌다. 그래도 마을 안은 도적떼들로부터 안전하다고 생각했는데 그날의 습격건은 마을사람들의 생각을 정면으로 충돌해버리는 일이었던 것이다." +
               " 살아남은 도적들은 깊은 숲 너머의 끊어진 가도 쪽으로 도망갔다고 한다. 이번 의뢰는 고블린 동굴 때와 똑같이 도적떼의 흔적을 찾아내는 것이다. 당신이 그 의뢰서를 가져오자 마틴은 입을 열었다." +
               "<br>\"경비병들이 움직이긴 할 텐데. 물론 그 새끼들이 제대로 움직일지는 모르겠지만.\"",
        activeDesc : "깊은 숲 너머 끊어진 가도에서 도적떼의 흔적을 찾아야 한다.",
        readyDesc : "도적떼의 근거지로 이어지는 흔적을 찾았다. 주점으로 돌아가 마틴에게 보고하자.",

        targetFlag : "bandit_hideout_found",
        requiredKill : 1,

        rewardGold : 600,

        require : {
            flag : "undercity_story_05_unlocked"
        },

        onComplete : (player) => {
            player.flags = player.flags || {};
            player.flags.undercity_story_05_done = true;
            player.flags.undercity_story_06_unlocked = true;
        },

        acceptText : "당신이 의뢰를 받는다고 하자 마틴은 고개를 끄덕였다. 그는 도적떼들은 고블린들과 다르게 장비까지 갖춘 적이라고 말했다. 그는 잔을 닦던 손을 멈추지 않은 채 말을 이었다. <br><br>\"소문으로는 탈주한 경비병들도 도적떼에 끼고는 한다고 하더라군.\"",
        cancelText : "당신이 의뢰를 취소하자 마틴은 고개를 끄덕였다. 그는 다음부터는 하지도 못할 건 처음부터 받지도 말라고 말했다.",
        completeText : "끊어진 가도에서의 흔적을 찾았다는 당신의 말에 마틴은 고개를 끄덕였다. 그는 에릭에게 전하겠다고 말했다."
    }
};


function initQuestData(player){
    player.quest = player.quest || {};

    player.quest.active = player.quest.active || null;        // 주점/스토리 퀘스트 1개
    player.quest.subActive = player.quest.subActive || [];    // 서브퀘스트 여러 개
    player.quest.completed = player.quest.completed || [];
}

window.open_tavernQuests = function(player){
    initQuestData(player);

    const choices = [];

    Object.values(QUESTS).forEach(quest => {
    const alreadyCompleted = player.quest.completed.includes(quest.id);

    if (!quest.repeatable && alreadyCompleted) return;
    if (!canShowQuest(player, quest)) return;

    choices.push({
        text: quest.title,
        action: "quest_detail_" + quest.id
        });
    });

    choices.push({
        text: "돌아가기",
        action: "return_tavern"
    });

    startScene([
        {
            type: "text",
            value: "주점 한쪽 벽에 낡은 퀘스트 게시판이 걸려 있다.<br><br>몇 장의 의뢰서가 대충 꽂혀 있다. 찢어져있는 것도 보인다."
        },
        {
            type: "choice",
            choices: choices
        }
    ], player);
};

function openQuestDetail(player, questId){
    initQuestData(player);

    const quest = findQuest(questId);

    if(!quest){
        startScene([
            {
                type: "text",
                value: "의뢰서를 찾을 수 없다."
            },
            {
                type: "choice",
                choices: [
                    { text: "돌아가기", action: "open_tavernQuests" }
                ]
            }
        ], player);
        return;
    }

    startScene([
        {
            type: "text",
            value:
                `<b>${quest.title}</b><br><br>` +
                `${quest.desc}<br><br>` +
                `목표: ${quest.requiredKill}마리 처치<br>` +
                `보상: ${quest.rewardGold}G`
        },
        {
            type: "choice",
            choices: [
                { text: "수락한다", action: "accept_quest_" + quest.id },
                { text: "돌아가기", action: "open_tavernQuests" }
            ]
        }
    ], player);
}

window.open_activeQuest = function(player){
    initQuestData(player);

    const active = player.quest.active;

    if (!active){
        startScene([
            { type: "text", value: "현재 진행 중인 의뢰가 없다." },
            {
                type: "choice",
                choices: [
                    { text: "주점으로 돌아가기", action: "return_tavern" }
                ]
            }
        ], player);
        return;
    }

    const quest = findQuest(active.id);
    let desc = "";
    
    if ((active.progress || 0) >= quest.requiredKill){
        desc = quest.readyDesc || quest.activeDesc || quest.desc;
    }
    else{
        desc = quest.activeDesc || quest.desc;
    }

    const choices = [];

    if ((active.progress || 0) >= quest.requiredKill){
        choices.push({ text: "완료 보고한다", action: "complete_activeQuest" });
    }

    choices.push(
        { text: "의뢰를 취소한다", action: "cancel_activeQuest" },
        { text: "주점으로 돌아가기", action: "return_tavern" }
    );

    startScene([
        {
            type: "text",
            value:
                `<b>${quest.title}</b><br><br>` +
                `${desc}<br><br>` +
                `진행도: ${active.progress} / ${quest.requiredKill}`
        },
        {
            type: "choice",
            choices: choices
        }
    ], player);
};

window.cancel_activeQuest = function(player){
    initQuestData(player);

    const active = player.quest.active;

    if (!active){
        startScene(getLocationScene(player), player);
        return;
    }

    const quest = findQuest(active.id);

    player.quest.active = null;
    savePlayer(player);

    if (typeof changeEmotion === "function"){
        changeEmotion("matin", "affection", -10);
    }

    startScene([
        {
            type: "text",
            value: quest.cancelText || "당신은 의뢰를 포기했다. 마틴이 말없이 당신을 쳐다보는 것이 느껴진다. 그의 눈동자는 평소보다 더 식어있었다."
        },
        {
            type: "choice",
            choices: [
                { text: "주점으로 돌아가기", action: "return_tavern" }
            ]
        }
    ], player);
};

function handleQuestAction(action, player){
    if(action.startsWith("quest_detail_")){
        const questId = action.replace("quest_detail_", "");
        openQuestDetail(player, questId);
        return true;
    }

    if(action.startsWith("accept_quest_")){
        const questId = action.replace("accept_quest_", "");
        acceptQuest(player, questId);
        return true;
    }

    if(action === "cancel_activeQuest"){
        cancel_activeQuest(player);
        return true;
    }

    if(action === "complete_activeQuest"){
        completeQuest(player);
        return true;
    }

    return false;
}

function getQuestCompleteCount(player, questId){
    initQuestData(player);
    return player.quest.completed.filter(id => id === questId).length;
}

function canShowQuest(player, quest){
    if (!quest.require) return true;

    if (quest.require.flag){
        if (!player.flags?.[quest.require.flag]) return false;
    }

    if (quest.require.completedQuest){
        return getQuestCompleteCount(player, quest.require.completedQuest) >= quest.require.count;
    }

    return true;
}

function acceptQuest(player, questId){
    initQuestData(player);

    const quest = findQuest(questId);

    if(!quest){
        startScene([
            { type: "text", value: "의뢰서를 찾을 수 없다." },
            {
                type: "choice",
                choices: [
                    { text: "돌아가기", action: "open_tavernQuests" }
                ]
            }
        ], player);
        return;
    }

    if(player.quest.active){
        startScene([
            {
                type: "text",
                value: "이미 진행 중인 의뢰가 있다.<br>마틴은 인상을 찌푸리며 당신을 응시했다.<br><br>\"하나씩 받아.\""
            },
            {
                type: "choice",
                choices: [
                    { text: "퀘스트 게시판으로 돌아가기", action: "open_tavernQuests" },
                    { text: "주점으로 돌아가기", action: "return_tavern" }
                ]
            }
        ], player);
        return;
    }

    player.quest.active = {
        id: quest.id,
        progress: 0
    };
    localStorage.setItem("playerData", JSON.stringify(player));

    startScene([
        {
            type: "text",
            value: quest.acceptText
        },
        {
            type: "choice",
            choices: [
                { text: "주점으로 돌아가기", action: "return_tavern" }
            ]
        }
    ], player);
}

window.return_tavern = function(player){
    player.location = "tavern";

    startScene(getLocationScene(player), player);
};

function findQuest(questId){
    return (
        QUESTS?.[questId] ||
        MATIN_QUESTS?.[questId] ||
        SORA_QUESTS?.[questId] ||
        null
    );
}

function addQuestProgress(player, enemyId){
    initQuestData(player);

    addSingleQuestProgress(player.quest.active, enemyId);

    player.quest.subActive.forEach(active => {
        addSingleQuestProgress(active, enemyId);
    });

    savePlayer(player);

    function addSingleQuestProgress(active, enemyId){
        if (!active) return;

        const quest = findQuest(active.id);
        if (!quest) return;

        if (quest.type === "hunt"){
            if (quest.targetEnemy !== enemyId) return;
        }

        else if (quest.type === "boss"){
            if (quest.targetBoss !== enemyId) return;
        }

        else if (quest.type === "investigate"){
            if (!player.flags?.[quest.targetFlag]) return;
            active.progress = quest.requiredKill;
            return;
        }

        else {
            return;
        }

        active.progress = Math.min(
            (active.progress || 0) + 1,
            quest.requiredKill
        );
    }
}

function completeQuest(player){
    initQuestData(player);

    const active = player.quest.active;
    if (!active) return;

    const quest = findQuest(active.id);
    if (!quest) return;

    if ((active.progress || 0) < quest.requiredKill) return;

    const isGoblin03SkipReport =
        quest.id === "undercity_story_03" &&
        player.flags?.undercity_story_04_ready;

    const isGoblin04Report =
        quest.id === "undercity_story_04" &&
        player.flags?.undercity_story_04_ready;

    changeGold(player, quest.rewardGold || 0);

    if (!player.quest.completed.includes(quest.id)){
        player.quest.completed.push(quest.id);
    }

    if (typeof quest.onComplete === "function"){
        quest.onComplete(player);
    }

    // 03 받았는데 고블린킹까지 잡고 온 루트
    if (isGoblin03SkipReport){
        if (!player.quest.completed.includes("undercity_story_04")){
            player.quest.completed.push("undercity_story_04");
        }

        player.flags.undercity_story_04_done = true;
        player.flags.undercity_story_04_ready = false;
        player.flags.undercity_story_04_skip_by_03 = true;
    }

    // 04 정식으로 받고 고블린킹 잡고 온 루트
    if (isGoblin04Report){
        player.flags.undercity_story_04_done = true;
        player.flags.undercity_story_04_ready = false;
    }

    player.quest.active = null;

    savePlayer(player);

    const completeText = isGoblin03SkipReport
        ? "마틴은 당신이 고블린동굴에 들어가서 포로들까지 구해왔다는 것에 말을 잃었다. 그는 5초 정도의 시간 동안 아무 말도 하지 않고 있다가 고개를 끄덕였다. <br><br>\"에릭에게는 내가 전해둘게.\""
        : quest.completeText || "의뢰를 완료했다.";

    startScene([
        { type: "text", value: completeText },
        {
            type: "choice",
            choices: [
                { text: "주점으로 돌아가기", action: "return_tavern" }
            ]
        }
    ], player);
}