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

        acceptText: "마틴은 당신에게 의뢰서를 주었다. <br><br>\"깊은 곳까지 갈 거면 알아서 판단해. 돌아오지 못한 사람들도 많으니까.\"",
        cancelText: "마틴은 무표정으로 당신에게서 의뢰서를 다시 받았다.",
        completeText: "마틴은 의뢰서를 확인하더니 동전을 내밀었다."
    },

    skeleton_hunt: {
        id: "skeleton_hunt",
        title: "Hㅐ골 4Mㅏ리 퇴치",
        type: "hunt",
        repeatable : true,
        giver: "martin",

        desc: "공동묘지에서 따닥따닥거리는 소리가 자꾸만 들려온다고 한다. 소음 공해를 막기 위해 4마리 정도 해치우자.",
        targetEnemy: "skeleton",
        requiredKill: 4,

        rewardGold: 100,

        acceptText: "마틴은 당신에게 의뢰서를 주었다. <br><br>\"모든 것들은 자신에게 없는 것을 탐내지. 그들에게는 온기가 없어.\"",
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
        bossName: "고블린킹",
        requiredKill : 1,

        rewardGold : 400,

        require : {
            completedQuest : "undercity_story_04",
            count : 1
        },

        act3Disable : true,

        acceptText : "마틴은 당신에게 의뢰서를 주었다.",
        cancelText : "마틴은 무표정으로 당신에게서 의뢰서를 다시 받았다.",
        completeText : "마틴은 의뢰서를 확인하더니 동전을 내밀었다. 그는 당신이 구출한 사람들은 모두 인도됐다고 말했다. 어디로 인도된지는 말해주지 않았다."
    },

    bandit_cleanup : {
        id : "bandit_cleanup",
        title : "도적떼 소탕",
        type : "boss",
        bossName : "도적떼",
        repeatable : true,
        giver : "matin",

        desc : "도적떼는 하나만 있는 것이 아니다. 여전히 그들의 습격은 반복되고 있다. 누군가는 도적이라 부르고, 누군가는 굶주린 사람들이라 부르는 그들을 토벌하자.",
        activeDesc : "끊어진 가도 근처의 도적떼 진지를 소탕하자.",
        readyDesc : "또 하나의 도적떼를 소탕했다. 주점으로 돌아가 마틴에게 보고하자.",
        targetBoss : "banditBoss",
        requiredKill : 1,

        rewardGold : 1000,

        require : {
            completedQuest : "undercity_story_06",
            count : 1
        },

        act3Disable : true,
        
        acceptText : "당신이 도적떼를 소탕하는 의뢰를 받아들이자 마틴의 눈동자가 순간 평소와 달라보였다. 착각이었을까? 마틴은 당신에게 의뢰서를 주었다.",
        cancelText : "마틴은 무표정으로 당신에게서 의뢰서를 다시 받았다.",
        completeText : "마틴은 의뢰서를 확인하더니 고개를 끄덕였다. 그는 당신이 구출한 사람들은 모두 인도됐다고 말했다. 어디로 인도된건지 묻자 마틴은 자기도 그건 모른다고 말했다."
    },

    whiteFlowerLab_cleanup : {
        id : "whiteFlowerLab_cleanup",
        title : "하얀꽃 연구소 지부 폭파",
        type : "investigate",
        targetName: "하얀꽃 연구소 지부 폭파",
        repeatable : true,
        giver : "valen",
        
        desc : "발렌이 말한 연구시설 외에도 하얀꽃 연구소는 여러 곳에 남아있는 모양이다. 꽃감염자들이 경계병들이나 지나가는 사람들을 습격한다는 소식이 자주 들려온다. 연구소를 폭파시켜 그들의 발생지를 없애버리자.",        
        activeDesc : "연구소 제어실에 도달해야 한다.",
        readyDesc : "연구소는 폭발과 함께 완전히 무너졌다.",
        
        targetFlag : "whiteFlowerLab_cleanup_done",
        requiredKill : 1,    
        rewardGold : 3000,

        require : {
            completedQuest : "uppercity_story_01",
            count : 1
        },

        act3Disable : true,
        
        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.whiteFlowerLab_cleanup_done = false;
            changeNPCEmotionWithCap("valen", "affection", 1, 10);
            changeNPCEmotionWithCap("akasia", "affection", 1, 20);
        },

        acceptText : "당신은 하얀꽃 연구소를 폭발시키는 의뢰를 받아들였다. 마틴은 당신에게 의뢰서를 주었다. 아무 말도 없었지만 그는 당신을 힐끔 보았다가 다시 고개를 돌렸다.",
        completeText : "마틴은 당신의 보고에 고개를 끄덕였다. <br><br>\"믿고 있었습니다, 하류도시의 영웅.\"<br><br>마틴은 그릇을 닦으며 말했다.<br><br>\"네가 그 의뢰를 받는다는 소식을 들었을 때 발렌이 임무를 마치고 온 네게 전해달라고 한 말이야.\"" 
    },

    slaverCamp_cleanup: {
        id: "slaverCamp_cleanup",
        title: "인신매매단 임시 진지 소탕",
        type: "boss",
        bossName: "인신매매상 간부",
        repeatable: true,
        giver: "matin",
        
        desc: "인신매매단이 또 사람들을 끌고 간 모양이다. 흔적을 추적해 임시 진지를 찾아내고 수장을 쓰러뜨리자.",
        activeDesc: "인신매매단의 흔적을 추적해 임시 진지를 찾아야 한다.",
        readyDesc: "인신매매단 임시 진지를 무너뜨렸다. 주점으로 돌아가 보고하자.",
        
        targetBoss: "trafficker4",
        requiredKill: 1,
        
        rewardGold: 4000,
        
        require: {
            completedQuest: "rebel_story_01",
            count: 1
        },

        act3Disable : true,
        
        acceptText: "마틴은 당신에게 의뢰서를 내밀었다.<br><br>\"...흔적은 경계병 제2초소 근처에서 끊겼다고 해.\"",
        cancelText: "마틴은 의뢰서를 다시 받아갔다.",
        completeText: "마틴은 당신의 보고를 듣고 고개를 끄덕였다.<br><br>\"끝난 건 아니겠지만... 잘했어. 네게 고마워하는 사람들이 많을 거야.\"<br><br>그의 표정이 조금은 부드러워진 거 같다."
    },

    //스토리퀘스트
    undercity_story_01: {
        id : "undercity_story_01",
        title : "하수구 깊은 곳",
        type : "boss",
        bossName : "거지들의 우두머리",
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
                     "그는 당신에게서 시선을 돌렸디. 당신은 그의 말이 이어지길 기다렸지만, 그는 더 이상 말을 하지 않았다. 당신은 의뢰서를 쥐고 나갔다.",

        cancelText : "마틴은 당신에게서 의뢰서를 받아갔다. 그는 당신이 안 할 줄 알았다는 듯이 덤덤하게 굴었다. 그는 의뢰서를 다시 게시판에 붙여놓은 후 당신은 쳐다도 보지 않고 일을 했다.",

        completeText : "마틴은 당신이 가져온 증거를 확인하더니 고개를 끄덕였다. <br><br>\"이제 조금은 잠잠해지겠지. 다시 생기긴 하겠지만.... 잘했어.\"<br><br>당신은 그의 표정을 보고 싶었지만, 그가 바로 고개를 돌려버려 그의 표정을 볼 수 없었다."
        
    },
    
    undercity_story_02: {
        id : "undercity_story_02",
        title : "하수구 깊은 곳의 의문",
        type : "boss",
        bossName : "거지들의 우두머리",
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
        targetName : "고블린 동굴 수색",
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

        acceptText : "마틴은 당신이 의뢰를 받겠다고 말하자 무표정으로 고개를 끄덕였다.",
        cancelText : "당신이 의뢰를 취소하겠다고 말하자 마틴은 아무 말 없이 당신에게서 의뢰서를 다시 받아갔다.",
        completeText : "마틴은 당신이 고블린동굴을 찾았다고 했을 때 처음에는 믿지 못했다. 그는 멍하니 당신을 바라보다가 고개를 끄덕였다. 그는 에릭에게 전보를 보내기 위해 에릭의 새를 불렀다."
    },

    undercity_story_04 : {
        id : "undercity_story_04",
        title : "고블린동굴 실종자 구출 작전",
        type : "boss",
        bossName : "고블린킹",
        repeatable : false,
        giver : "eric",
        
        desc : "당신이 게시판에 다가갔을 때 마틴이 당신을 불렀다. 그는 에릭에게서 고블린동굴을 찾은 이에게 이 의뢰서를 보여주라고 했다는 전언이 날아왔다고 했다. 고블린동굴 실종자 구출 작전이다." +
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
            player.flags.story_goblin_cave_visible = false;
        },

        acceptText : "당신이 의뢰를 받는다고 하자 마틴은 뭐라 말하려다가 그만두고 다시 그릇 닦는 일에 전념했다.",
        cancelText : "당신이 의뢰를 취소하자, 마틴은 고개를 끄덕였다.",
        completeText : "당신이 실종자들을 구출헀다고 보고하자 마틴은 잠시 말이 없었다. <br><br>\"수고했어.\"<br><br>그는 서신 하나를 새의 발목에 묶으면서 말했다. 그는 작게 경비병들이 지 일도 제대로 못한다고 중얼거렸다. <br><br>\"쓰레기새끼들...\""
    },

    undercity_story_05 : {
        id : "undercity_story_05",
        title : "끊어진 가도의 도적떼",
        type : "investigate",
        targetName : "도적떼 근거지 수색",
        repeatable : false,
        giver : "matin",

        desc : "도적떼의 하류도시 마을입구 습격 후, 마을사람들의 불안이 커졌다. 그래도 마을 안은 도적떼들로부터 안전하다고 생각했는데 그날의 습격건은 마을사람들의 생각을 정면으로 충돌해버리는 일이었던 것이다." +
               " 살아남은 도적들은 깊은 숲 너머의 끊어진 가도 쪽으로 도망갔다고 한다. 이번 의뢰는 고블린 동굴 때와 똑같이 도적떼의 흔적을 찾아내는 것이다. 당신이 그 의뢰서를 가져오자 마틴은 입을 열었다." +
               "<br>\"경비병들이 움직이긴 할 거다. 물론 그 새끼들이 제대로 움직일지는 모르겠지만.\"",
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
    },

    undercity_story_06 : {
        id : "undercity_story_06",
        title : "습격은 습격으로",
        type : "boss",
        bossName : "도적떼 대장",
        repeatable : false,
        giver : "matin",
        
        desc : "끊어진 가도 너머에서 도적떼의 소굴로 이어지는 흔적을 찾았다. 이제 그 근거지를 소탕해야 한다.",
        activeDesc : "도적떼 소굴에 들어가 도적대장을 쓰러뜨려야 한다.",
        readyDesc : "도적대장을 쓰러뜨렸다. 주점으로 돌아가 마틴에게 보고하자.",
        
        targetBoss : "banditBoss",
        requiredKill : 1,
        rewardGold : 1200,
        
        require : {
            completedQuest : "undercity_story_05",
            count : 1
        },

        onComplete : (player) => {
            player.flags = player.flags || {};
            player.flags.undercity_story_06_done = true;
            player.flags.undercity_story_06_done_day = getCurrentDay(player);
            player.flags.banditHideout_cleared = true;
            player.flags.bandit_hideout_found = false;
            player.flags.eric_victim_collect_event01_unlocked = true;
        },

        acceptText : "당신이 의뢰를 맡겠다고 하자 고개를 끄덕였다. <br>\"준비됐으면 가.\"",
        cancelText : "마틴은 당신이 의뢰를 취소해도 뭐라 하지 않았다. 그저 당신의 손에서 의뢰서를 가져갈 뿐이었다.",
        completeText : "마틴은 당신의 보고를 듣고 한동안 말이 없었다. 그는 도적떼가 끝났다고 말하지 않았다. 다만 이번 소동은 끝났다고만 말했다."
    },

    undercity_story_07 : {
        id: "undercity_story_07",
        title: "반란군 수장 처형",
        type: "boss",
        bossName : "반란군 수장",
        repeatable: false,
        giver: "eric",
        source : "event",
        
        desc: "에릭은 반란군 수장을 제거하라는 명령을 내렸다.",
        activeDesc: "반란군 진지로 들어가 수장을 쓰러뜨려야 한다.",
        readyDesc: "반란군 수장을 쓰러뜨렸다.",
        
        targetBoss: "rebelLeader",
        requiredKill: 1,
        rewardGold: 1500,
        
        require: {
            flag: "undercity_story_06_done"
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.undercity_story_07_done = true;
        },
        
        acceptText: "에릭은 당신의 수락에 고개를 끄덕였다. <br>경계병 제1초소, 그곳은 깊은 숲에서 더 걸어가야 나오는 곳이다. 반란군은 대체 무슨 생각으로 거길 지나치려 하는 걸까. <br><br>그곳까지가, 그나마 안전한 경계선일 텐데.",
        completeText: "반란군 수장은 쓰러졌다."
    },

    //act2
    //상류도시
    uppercity_story_01 : {
        id : "uppercity_story_01",
        title : "상류도시를 위하여",
        type : "investigate",
        targetName : "연구시설 중추실 장치 작동",
        repeatable : false,
        giver : "valen",
        source : "event",
        
        desc : "발렌은 연구시설 중추실에 있는 장치를 작동시켜달라고 부탁했다.",        
        activeDesc : "연구시설 중추실에 도달해야 한다.",
        readyDesc : "장치는 정상적으로 작동했다.<br>...설마 연구시설이 무너질 줄은 몰랐지만.",
        
        targetFlag : "uppercity_quest01_done",
        requiredKill : 1,    
        rewardGold : 2000,
        
        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.uppercity_story_01_done = true;
            player.flags.uppercity_story_01_done_day = getCurrentDay(player);
        },

        acceptText : "",
        completeText : "마틴은 당신의 보고에 고개를 끄덕였다. 그는 상류도시에 전령을 보내놓겠다고 말했다. 마틴의 전령이 발렌에게 닿으려면 조금 오래 걸릴 것이다.... 발렌이 당신을 정말로 신경쓰고 있다면 오래 걸리지 않을 수도 있고."
    },

    uppercity_story_02 : {
        id : "uppercity_story_02",
        title : "하얀꽃무덤에서 내려온 마물",
        type: "boss",
        bossName : "마물",
        repeatable : false,
        giver : "akasia",
        
        desc : "하얀꽃무덤에서 내려온 마물이 있다고 한다. 경계병 제3초소 근처에서 수색하자.",        
        activeDesc : "당신은 경계병 제3초소에서부터 마물의 흔적을 쫓아서 가야 한다.",
        readyDesc : "...마물은 죽었다. 주점에 가서 보고하자.",
        
        targetBoss: "erwin",
        requiredKill: 1,
        rewardGold: 2500,

        require : {
            flag : "uppercity_story_02_quest_unlocked"
        },
        
        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.uppercity_story_02_done = true;
            player.flags.uppercity_story_02_done_day = getCurrentDay(player);
            player.flags.uppercity_story_02_quest_unlocked = false;
        },

        acceptText : "당신이 의뢰서를 가져오자 마틴은 힐끗 당신을 보았다. <br><br>\"....\"<br><br>당신은 의뢰를 받았다.",
        completeText : "\"...안색이 왜 그래?\"<br><br>당신의 보고를 받던 마틴이 당신에게 물었다. <br><br>\"피곤하면 쉘터에 가서 쉬도록 해. 수고했어.\""
    },

    uppercity_story_03 : {
        id : "uppercity_story_03",
        title : "또 다른 연구소",
        type : "investigate",
        targetName : "오래된 연구소 깊은 곳 장치 작동",
        repeatable : false,
        giver : "valen",
        
        desc : "발렌은 또, 연구소의 가장 깊은 곳에 있는 장치를 작동시켜달라고 부탁했다. 경계병 제3초소 근처에 있다.",        
        activeDesc : "연구시설 가장 깊은 곳에 도달해야 한다.",
        readyDesc : "장치는 정상적으로 작동했다.<br>이제 100년 전의 진실을 아는 자는 몇 명 남지 않았다.",
        
        targetFlag : "uppercity_quest03_done",
        requiredKill : 1,    
        rewardGold : 4000,

        require : {
            flag : "uppercity_story_03_quest_unlocked"
        },
        
        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.uppercity_story_03_done = true;
            player.flags.uppercity_story_03_done_day = getCurrentDay(player);
        },

        acceptText : "당신은 발렌의 의뢰서를 떼어냈다.",
        completeText : "당신이 퀘스트를 보고하자 마틴은 고개를 끄덕였다. 그는 상류도시에 전령을 보내놓겠다고 말했다."
    },

    //반란군 스토리
    rebel_story_01 : {
        id : "rebel_story_01",
        title : "유리가 찾아낸 흔적",
        type: "boss",
        bossName : "인신매매단 간부",
        repeatable : false,
        giver : "yuri",
        source : "event",
        
        desc : "쉘터의 아이들을 위해 당신은 유리의 옆에 서기로 했다.",        
        activeDesc : "당신은 경계병 제2초소에서부터 유리가 찾아낸 인신매매단 거점으로 가야 한다.",
        readyDesc : "모든 아이들을 구해내지는 못했지만, 당신과 유리는 많은 목숨들을 구하긴 했다. 주점에 가서 마틴에게 보고하자.",
        
        targetBoss: "trafficker4",
        requiredKill: 1,
        rewardGold: 1500,
        
        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.rebel_story_01_done = true;
            player.flags.rebel_story_01_done_day = getCurrentDay(player);
        },

        acceptText : "",
        completeText : "쉘터의 아이들을 구해냈다. 하지만 쉘터가 더 이상 안전하지 않다는 사실이 유리의 목을 조여오는 거 같다..."
    },

    rebel_story_02 : {
        id : "rebel_story_02",
        title : "반란의 씨앗을 찾아",
        type: "investigate",
        targetName : "반란군 소탕",
        repeatable : false,
        giver : "valen",
        source : "event",
        
        desc : "당신은 발렌의 명에 따라 상류도시를 공격했던 반란군 근거지를 소탕하기로 했다.",        
        activeDesc : "당신은 백색 군단과 함께 반란군 근거지를 소탕해야 한다.",
        readyDesc : "끝났다. 발렌은 하류도시에 돌아가서 주점에 퀘스트 완료를 보고하길 원한다. 그는 하류도시에도 당신의 행적을 널리 알릴 생각이다.",
        
        targetFlag : "rebel_story02_done",
        requiredKill: 1,
        rewardGold: 5000,
        
        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.rebel_story_02_done = true;
            player.flags.rebel_story_02_done_day = getCurrentDay(player);
        },

        acceptText : "",
        completeText : "당신은 하류도시의 주점에서 반란군 소탕을 마쳤다고 보고했다. 하류도시의 영웅이 반란군을 소탕했다는 소식은 전역에 널리 퍼질 것이다."
    }
};


function initQuestData(player){
    player.quest = player.quest || {};

    player.quest.active = player.quest.active || null;        // 주점/스토리 퀘스트 1개
    player.quest.subActive = player.quest.subActive || [];    // 서브퀘스트 여러 개
    player.quest.completed = player.quest.completed || [];
    player.quest.completedCounts = player.quest.completedCounts || {};
}

window.open_tavernQuests = function(player){
    initQuestData(player);

    const choices = [];

    Object.values(QUESTS).forEach(quest => {
        if (quest.source === "event") return;
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
                `목표: ${getQuestGoalText(quest)}<br>` +
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

function getQuestGoalText(quest){
    if (quest.type === "hunt"){
        return `${quest.requiredKill}마리 처치`;
    }

    if (quest.type === "boss"){
        return `${quest.bossName} 처치`;
    }

    if (quest.type === "investigate"){
        return `${quest.targetName}`;
    }

    return `목표 달성`;
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

    if (player.quest.completedCounts?.[questId]){
        return player.quest.completedCounts[questId];
    }

    return player.quest.completed.includes(questId) ? 1 : 0;
}

function canShowQuest(player, quest){

    if (quest.act3Disable && player.flags?.act3CollapseDone){
        return false;
    }

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

    if (
        quest.id === "undercity_story_01" ||
        quest.id === "undercity_story_02"
    ){
        player.flags = player.flags || {};
        delete player.flags.defeated_sewer_beggers;
    }

    if (quest.id === "goblin_cave_cleanup"){
        player.flags = player.flags || {};
        delete player.flags.defeated_goblinCave_goblinKing;
    }

    if (quest.id === "whiteFlowerLab_cleanup"){
        player.flags = player.flags || {};
        player.flags.whiteFlowerLab_cleanup_done = false;
        delete player.flags.defeated_whiteFlowerLabRepeated_infectedSoldier;
    }

    if (quest.id === "slaverCamp_cleanup"){
        player.flags = player.flags || {};
        delete player.flags.defeated_slaverCamp_trafficker4;
        
        player.slaverRaid = {
            active: false,
            progress: 0,
            maxProgress: getRandomSlaverRaidMaxProgress(),
            prisonerEventDone: false,
            campFound: false
        };
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

    player.quest.completedCounts = player.quest.completedCounts || {};
    player.quest.completedCounts[quest.id] = (player.quest.completedCounts[quest.id] || 0) + 1;

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
        player.flags.story_goblin_cave_visible = false;
        player.flags.undercity_story_04_skip_by_03 = true;
        player.flags.undercity_story_04_done_day = getCurrentDay(player);
    }

    // 04 정식으로 받고 고블린킹 잡고 온 루트
    if (isGoblin04Report){
        player.flags.undercity_story_04_done = true;
        player.flags.undercity_story_04_ready = false;
        player.flags.story_goblin_cave_visible = false;
    }

    if (quest.id === "goblin_cave_cleanup"){
        player.flags = player.flags || {};
        player.flags.goblin_cave_visible = false;
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

//섭퀘 관련
function findQuest(questId){
    return (
        QUESTS?.[questId] ||
        MATIN_QUESTS?.[questId] ||
        SORA_QUESTS?.[questId] ||
        null
    );
}

function acceptSubQuest(player, questId){
    initQuestData(player);

    const quest = findQuest(questId);
    if (!quest || quest.category !== "sub") return false;

    const alreadyActive = player.quest.subActive.some(q => q.id === questId);
    const alreadyCompleted = player.quest.completed.includes(questId);

    if (alreadyActive || alreadyCompleted) return false;

    player.quest.subActive.push({
        id: questId,
        progress: 0
    });

    savePlayer(player);
    return true;
}

function completeSubQuest(player, questId){
    initQuestData(player);

    const quest = findQuest(questId);
    if (!quest || quest.category !== "sub") return false;

    const active = player.quest.subActive.find(q => q.id === questId);
    if (!active) return false;

    if ((active.progress || 0) < quest.requiredKill) return false;

    player.quest.subActive = player.quest.subActive.filter(
        q => q.id !== questId
    );

    player.quest.completedCounts = player.quest.completedCounts || {};
    player.quest.completedCounts[questId] =
        (player.quest.completedCounts[questId] || 0) + 1;

    if (!player.quest.completed.includes(questId)){
        player.quest.completed.push(questId);
    }

    if (typeof quest.onComplete === "function"){
        quest.onComplete(player);
    }

    changeGold(player, quest.rewardGold || 0);

    savePlayer(player);
    return true;
}

//act3 붕괴 함수
function clearCollapsedAreaQuest(player) {

    const active = player.quest?.active;
    if (!active) return;

    const quest = findQuest(active.id);

    if (quest?.act3Disable){
        player.quest.active = null;
        savePlayer(player);
    }
}