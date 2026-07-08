const WEAPON_SKILLS = {
    "대검" :[
        {
            name: "횡베기",
            cost: 2,
            type: "damage",
            power: 2.5,
            unlock: 20,
            desc : "데미지 2.5배"
        },
        {
            name: "모아베기",
            cost: 3,
            type: "damage",
            power: 3.5,
            unlock: 100,
            desc : "데미지 3.5배"
        },
        {
            name: "광폭화",
            cost: 3,
            type: "buff",
            effect: {
                id : "player_berserk",
                atkMult: 1.5
            },
            duration : 3,
            unlock: 150,
            desc : "3턴간 공격력 1.5배"
        },
        {
            name: "일격필살",
            cost: 6,
            type: "damage",
            power: 7,
            unlock: 200,
            desc : "데미지 7배"
        }
    ],
    "대거" :[
        {
            name: "현란한손짓",
            cost: 2,
            type: "multiHit",
            power: 0.6,
            hits: 4,
            unlock: 20,
            desc : "데미지 0.6배로 4번 연속 공격."
        },
        {
            name: "독바르기",
            cost: 3,
            type: "poison",
            dot: 5,
            duration: 3,
            unlock: 100,
            desc : "3턴간 상대방에게 독 데미지(5)"
        },
        {
            name: "방어자세",
            cost: 3,
            type: "buff",
            effect: {
                id : "player_def_stance",
                defMult: 1.5
            },
            duration : 4,
            unlock: 150,
            desc : "4턴간 방어력 1.5배"
        },
        {
            name: "급소찌르기",
            cost: 3,
            type: "damage",
            power: 3.5,
            unlock: 200,
            desc : "데미지 3.5배"
        }
    ],
    "댄싱대거" :[
        {
            name: "춤사위",
            cost: 3,
            type: "multiHit",
            power: 0.8,
            hits: 5,
            unlock: 20,
            desc : "데미지 0.8배로 5번 연속 공격"
        },
        {
            name: "독무",
            cost: 3,
            type: "poison",
            dot : 5,
            duration: 3,
            unlock: 100,
            desc : "3턴간 상대방에게 독 데미지(5)"
        },
        {
            name: "피의환무",
            cost: 3,
            type: "bleed",
            dot: 5,
            duration: 3,
            unlock: 150,
            desc : "3턴간 상대방에게 출혈 데미지(5)"
        },
        {
            name: "독사의이빨",
            cost: 5,
            type: "poison",
            dot: 10,
            duration: 5,
            unlock: 200,
            desc : "5턴간 상대방에게 독 데미지(10)"
        }
    ],
    "한손검" : [
        {
            name: "버티기",
            cost: 3,
            type: "buff",
            effect: {
                id : "player_endure",
                defMult: 2
            },
            duration : 3,
            unlock: 20,
            desc : "3턴간 방어력 2배"
        },
        {
            name: "돌진공격",
            cost: 2,
            type: "damage",
            power: 2.3,
            unlock: 100,
            desc : "데미지 2.3배"
        },
        {
            name: "집중",
            cost: 3,
            type: "buff",
            effect: {
                id : "player_attention",
                atkMult: 2
            },
            duration : 3,
            unlock: 150,
            desc : "3턴간 공격력 2배"
        },
        {
            name: "배수진",
            cost: 5,
            type: "multiHit",
            power: 0.8,
            hits: 7,
            unlock: 200,
            desc : "데미지 0.8배로 7번 연속 공격"
        }
    ],
    "지팡이": [
        {
            name: "파이어",
            cost: 2,
            type: "damage",
            power: 2.4,
            unlock: 20,
            desc : "데미지 2.4배"
        },
        {
            name: "메가파이어",
            cost: 3,
            type: "damage",
            power: 3.4,
            unlock: 100,
            desc : "데미지 3.4배"
        },
        {
            name: "독가스",
            cost: 5,
            type: "poison",
            dot: 10,
            duration: 5,
            unlock: 150,
            desc : "5턴간 상대방에게 독데미지(10)"
        },
        {
            name: "별똥별",
            cost: 7,
            type: "multiHit",
            power: 0.8,
            hits: 10,
            unlock: 200,
            desc : "데미지 0.8배로 10번 연속 공격"
        }
    ],
    "클럽" :[
        {
            name: "버~틴~다~",
            cost: 2,
            type: "buff",
            effect: {
                id : "player_club_endure",
                defMult: 1.5
            },
            duration : 3,
            unlock: 20,
            desc : "3턴간 방어력 1.5배"
        },
        {
            name: "박~는~다~",
            cost: 1,
            type: "damage",
            power: 1.5,
            unlock: 100,
            desc : "데미지 1.5배"
        },
        {
            name: "마~구~때~린~다~",
            cost: 2,
            type: "multiHit",
            power: 0.4,
            hits: 7,
            unlock: 150,
            desc : "데미지 0.4배로 7번 연속 공격"
        },
        {
            name: "얕~보~지~마~",
            cost: 2,
            type: "damage",
            power: 3,
            unlock: 200,
            desc : "데미지 3배"
        }
    ],
    "도끼HM" : [
        {
            name : "도끼가 쾅 적이 덜 짜부",
            cost : 2,
            type : "damage",
            power : 2.4,
            unlock : 20,
            desc : "데미지 2.4배"
        },
        {
            name : "하이리스크 미디엄리턴",
            cost : 2,
            type : "buff",
            effect : {
                id : "player_axeHM_buffdebuff",
                atkMult : 1.3,
                defMult : 0.7
            },
            duration : 3,
            unlock : 100,
            desc : "3턴간 공격력 1.3배, 방어력 0.7배"
        },
        {
            name : "도끼는 대화 수단이다",
            cost : 3,
            type: "multiHit",
            power: 0.8,
            hits: 4,
            unlock: 150,
            desc : "데미지 0.8배로 4번 연속 공격"
        },
        {
            name : "도끼가 쾅 적이 짜부",
            cost : 4,
            type : "damage",
            power : 4.5,
            unlock : 200,
            desc : "데미지 4.5배"
        }
    ],
    "레플리카 베요네따" : [
        {
            name : "리프샷",
            cost : 2,
            type : "damage",
            power : 2.3,
            unlock : 20,
            desc : "데미지 2.3배, 뒤로 물러나며 위협사격"
        },
        {
            name : "준비 자세",
            cost : 3,
            type : "buff",
            effect : {
                id : "player_replicaBeyonet_readytoFight",
                defMult : 1.3
            },
            duration : 4,
            unlock : 100,
            desc : "4턴간 방어력 1.3배"
        },
        {
            name: "달려들어 찌르기",
            cost: 3,
            type: "damage",
            power: 3.4,
            unlock: 150,
            desc : "데미지 3.4배"
        },
        {
            name : "제대로 된 준비 자세",
            cost : 3,
            type : "buff",
            effect : {
                id : "player_axeHM_buffdebuff",
                defMult : 1.4,
                evaMult : 1.4
            },
            duration : 3,
            unlock : 200,
            desc : "3턴간 회피력 1.4배, 방어력 1.4배"
        }
    ],
    "고블린검" :[
        {
            name: "습격",
            cost: 2,
            type: "damage",
            power: 2.4,
            unlock: 20,
            desc : "데미지 2.4배"
        },
        {
            name: "마구때리기",
            cost: 3,
            type: "multiHit",
            power: 0.9,
            hits : 4,
            unlock: 100,
            desc : "데미지 0.9배로 4번 연속 공격"
        },
        {
            name: "방어굳히기",
            cost: 3,
            type: "buff",
            effect: {
                id : "player_def_endure",
                defMult: 1.5
            },
            duration : 4,
            unlock: 150,
            desc : "4턴간 방어력 1.5배"
        },
        {
            name: "피나게때리기",
            cost: 6,
            type: "bleed",
            dot: 5,
            duration: 8,
            unlock: 200,
            desc : "8턴간 상대방에게 출혈데미지(5)"
        }
    ],
    "투척단검" : [
        {
            name : "단검4 투척",
            cost : 1,
            type : "multiHit",
            power : 0.5,
            hits : 4,
            unlock : 20,
            desc : "데미지 0.5배로 4번 연속 공격"
        },
        {
            name : "단검준비",
            cost : 3,
            type : "buff",
            effect : {
                id : "player_prepare_dagger",
                atkMult : 3
            },
            duration : 2,
            unlock : 100,
            desc : "2턴간 공격력 3배"
        },
        {
            name : "흩뿌려지는 피",
            cost : 3,
            type : "bleed",
            dot : 3,
            duration : 10,
            unlock : 150,
            desc : "10턴간 상대방에게 출혈데미지(3)"
        },
        {
            name : "단검난사",
            cost : 4,
            type : "multiHit",
            power : 0.5,
            hits : 9,
            unlock : 200,
            desc : "데미지 0.5배로 9번 연속 공격"
        }
    ],
    "경계병창" : [
        {
            name : "창모으기",
            cost : 1,
            type : "buff",
            effect : {
                id : "player_prepare_soldierSpear",
                atkMult : 1.2
            },
            duration : 4,
            unlock : 20,
            desc : "4턴간 공격력 1.2배"
        },
        {
            name : "연속찌르기",
            cost : 4,
            type : "multiHit",
            power : 0.9,
            hits : 5,
            unlock : 100,
            desc : "데미지 0.9배로 5번 연속 공격"
        },
        {
            name : "도발",
            cost : 4,
            type : "enemyDebuff",
            effect : {
                id : "soldierSpear_comeOn",
                atkMult : 1.1,
                defMult : 0.7
            },
            duration : 8,
            unlock : 150,
            desc : "8턴간 상대방 공격력 1.1배, 상대방 방어력 0.7배"
        },
        {
            name : "지키기위한마음",
            cost : 1,
            type : "buff",
            effect : {
                id : "player_prepare_soildierSpear_toProtect",
                defMult : 1.3
            },
            duration : 4,
            unlock : 200,
            desc : "4턴간 방어력 1.3배"
        }
    ],
    "은장도" : [
        {
            name : "은빛파고들기",
            cost : 2,
            type : "damage",
            power : 2.6,
            unlock : 20,
            desc : "데미지 2.6배"
        },
        {
            name : "은빛시선",
            cost : 2,
            type : "enemyDebuff",
            effect : {
                id : "silverDagger_eyetoeye",
                defMult : 0.5
            },
            duration : 4,
            unlock : 100,
            desc : "4턴간 상대방 방어력 0.5배"
        },
        {
            name : "은빛나선",
            cost : 4,
            type: "multiHit",
            power: 1.8,
            hits : 3,
            unlock: 150,
            desc : "데미지 1.8배로 3번 연속 공격"
        },
        {
            name : "달빛에반사되는",
            cost : 2,
            type : "buff",
            effect : {
                id : "silverDagger_becomingMoonLight",
                evaMult : 2
            },
            duration : 4,
            unlock : 200,
            desc : "4턴간 회피율/명중률 2배"
        }
    ],
    "뼈대검" : [
        {
            name : "내려찍기",
            cost : 3,
            type : "damage",
            power : 3.4,
            unlock : 20,
            desc : "공격력 3.4배"
        },
        {
            name : "위압감",
            cost : 5,
            type : "enemyDebuff",
            effect : {
                id : "skeletonGreatSwordByebye",
                defMult : 0.7
            },
            duration : 10,
            unlock : 100,
            desc : "10턴간 상대방 방어력 0.7배"
        },
        {
            name : "뼈검찢기",
            cost : 3,
            type : "bleed",
            dot : 15,
            duration : 3,
            unlock : 150,
            desc : "3턴간 상대방에게 출혈데미지(15)"
        },
        {
            name : "강렬한 두 방",
            cost : 4,
            type : "multiHit",
            power : 2.3,
            hits : 2,
            unlock : 100,
            desc : "데미지 2.3배로 두 번 연속공격"
        },
    ],
    "하얀꽃채찍" : [
        {
            name : "하얀 채찍질",
            cost : 2,
            type : "damage",
            power : 2.6,
            unlock : 20,
            desc : "데미지 2.6배"
        },
        {
            name : "꽃채찍의 하얀 독",
            cost : 3,
            type : "poison",
            dot : 15,
            duration : 3,
            unlock : 100,
            desc : "3턴간 독데미지(15)"
        },
        {
            name : "채찍돌리기",
            cost : 2,
            type: "multiHit",
            power: 1.3,
            hits : 3,
            unlock: 150,
            desc : "데미지 1.3배로 3번 연속 공격"
        },
        {
            name : "하얀 춤",
            cost : 3,
            type : "buff",
            effect : {
                id : "player_flower3Dance",
                atkMult : 1.2,
                defMult : 1.3,
                evaMult : 1.3
            },
            duration : 5,
            unlock : 200,
            desc : "4턴간 공격력 1.2배, 방어력 1.3배, 회피력 1.3배"
        }
    ],
    "우산" : [
        {
            name : "칼날개화",
            cost : 3,
            type : "buff",
            effect : {
                id : "umbrella_knife",
                atkMult : 1.4
            },
            duration : 6,
            unlock : 20,
            desc : "6턴간 공격력 1.4배"
        },
        {
            name : "꼬챙이찌르기",
            cost : 3,
            type : "damage",
            power : 3.5,
            unlock : 100,
            desc : "데미지 3.5배"
        },
        {
            name : "우산개화",
            cost : 3,
            type : "buff",
            effect : {
                id : "umbrella_open",
                defMult : 1.3,
                evaMult : 1.2
            },
            duration : 5,
            unlock : 150,
            desc : "5턴간 방어력 1.3배, 회피력/명중률 1.2배"
        },
        {
            name : "우산돌리기",
            cost : 4,
            type : "multiHit",
            power : 1.2,
            hits : 4,
            unlock : 200,
            desc : "공격력 1.2배로 4번 연속 공격"
        }
    ],
    "백화쌍검" : [
        {
            name : "아리따운 춤사위",
            cost : 3,
            type : "multiHit",
            power : 1.2,
            hits : 3,
            unlock : 20,
            desc : "공격력 1.2배로 3번 연속 공격"
        },
        {
            name : "독무쌍검",
            cost : 3,
            type : "poison",
            dot : 20,
            duration : 4,
            unlock : 100,
            desc : "4턴간 독데미지(20)"
        },
        {
            name : "꽃잎이 흔들리며",
            cost : 2,
            type : "buff",
            effect : {
                id : "whiteFlowerTwinDaggers_dance",
                atkMult : 1.4,
                defMult : 0.8,
                evaMult : 1.4
            },
            duration : 5,
            unlock : 150,
            desc : "5턴간 공격력 1.4배, 방어력 0.8배, 회피력/명중률 1.4배"
        },
        {
            name : "끝나지 않는 춤사위",
            cost : 5,
            type : "multiHit",
            power : 1.1,
            hits : 6,
            unlock : 200,
            desc : "1.1배로 6번 연속 공격"
        }
    ],
    "하얀꽃낫" : [
        {
            name : "하얀꽃긋기",
            cost : 3,
            type : "damage",
            power : 3.7,
            unlock : 20,
            desc : "데미지 3.7배 공격"
        },
        {
            name : "하얀꽃독안개",
            cost : 2,
            type : "poison",
            dot : 20,
            duration : 3,
            unlock : 100,
            desc : "3턴간 독데미지(20)"
        },
        {
            name : "꽃잎바람",
            cost : 3,
            type : "multiHit",
            power : 1.3,
            hits : 4,
            unlock : 150,
            desc : "1.3배로 4번 연속 공격"
        },
        {
            name : "마력강화",
            cost : 2,
            type : "buff",
            effect : {
                id : "whiteFlowerRipper",
                atkMult : 2,
                defMult : 0.7
            },
            duration : 5,
            unlock : 200,
            desc : "5턴간 공격력 2배, 방어력 0.7배"
        }
    ],
    "반란의 총검" : [
        {
            name : "뒤로 도약",
            cost : 2,
            type : "buff",
            effect : {
                id : "rebelsReplica_buff",
                defMult : 1.2,
                evaMult : 1.4
            },
            duration : 4,
            unlock : 20,
            desc : "4턴간 방어력 1.2배, 회피력/명중률 1.4배"
        },
        {
            name : "칼 찔러넣기",
            cost : 3,
            type : "damage",
            power : 3.9,
            unlock : 100,
            desc : "데미지 3.9배 공격"
        },
        {
            name : "위협사격",
            cost : 2,
            type : "multiHit",
            power : 1.4,
            hits : 2,
            unlock : 150,
            desc : "데미지 1.4배로 2번 공격"
        },
        {
            name : "사격",
            cost : 4,
            type : "damage",
            power : 5.5,
            unlock : 200,
            desc : "데미지 5.5배 공격"
        }
    ],
    "반란의 대검" : [
        {
            name : "횡베기",
            cost : 2,
            type : "damage",
            power : 2.8,
            unlock : 20,
            desc : "데미지 2.8배 공격"
        },
        {
            name : "대의를 위한 굳건한 방어",
            cost : 3,
            type : "buff",
            effect : {
                id : "rebelsGreatSword_buff",
                defMult : 1.7
            },
            duration : 6,
            unlock : 100,
            desc : "6턴간 방어력 1.7배"
        },
        {
            name : "반란의 칼날",
            cost : 4,
            type : "damage",
            power : 5.7,
            unlock : 150,
            desc : "데미지 5.7배 공격"
        },
        {
            name : "대의를 위한 날카로운 공격",
            cost : 3,
            type : "buff",
            effect : {
                id : "rebelsGreatSword_atkbuff",
                atkMult : 2,
                evaMult : 0.6
            },
            duration: 6,
            unlock : 200,
            desc : "6턴간 공격력 2배, 회피력/명중률 0.6배"
        }
    ],
    "반란의 한손검" : [
        {
            name : "방패치기",
            cost : 2,
            power : 2.8,
            unlock : 20,
            desc : "데미지 2.8배 공격"
        },
        {
            name : "방패굳히기",
            cost : 3,
            type : "buff",
            effect : {
                id : "rebelsShieldSword_defbuff",
                defMult : 1.7
            },
            duration: 6,
            unlock : 100,
            desc : "6턴간 방어력 1.7배"
        },
        {
            name : "한손검 연타",
            cost : 4,
            type : "multiHit",
            power : 1.5,
            hits : 4,
            unlock : 150,
            desc : "데미지 1.5배로 4번 공격"
        },
        {
            name : "무조건 지킨다",
            cost : 3,
            type : "buff",
            effect : {
                id : "rebelsShieldSword_buff",
                defMult : 2,
                evaMult : 1.3,
                atkMult : 0.8
            },
            duration: 6,
            unlock : 100,
            desc : "6턴간 방어력 2배, 회피율 1.3배, 공격력 0.8배"
        }
    ]
};

const MASTER_SKILLS = {
    "한손검": {
        requiredMastery: 300,
        skillName: "버티기"
    },
    "대검": {
        requiredMastery: 300,
        skillName: "모아베기"
    },
    "대거": {
        requiredMastery: 300,
        skillName: "방어자세"
    },
    "댄싱대거": {
        requiredMastery: 300,
        skillName: "피의환무"
    },
    "도끼HM" : {
        requiredMastery : 300,
        skillName : "하이리스크 미디엄리턴"
    },
    "레플리카 베요네따" : {
        requiredMastery : 300,
        skillName : "준비 자세"
    },
    "지팡이": {
        requiredMastery: 300,
        skillName: "독가스"
    },
    "클럽": {
        requiredMastery: 300,
        skillName: "얕~보~지~마~"
    },
    "고블린검": {
        requiredMastery: 300,
        skillName: "마구때리기"
    },
    "투척단검" : {
        requiredMastery : 300,
        skillName : "단검난사"
    },
    "경계병창" : {
        requiredMastery : 300,
        skillName : "지키기위한마음"
    },
    "은장도" : {
        requiredMastery : 300,
        skillName : "달빛에반사되는"
    },
    "뼈대검" : {
        requiredMastery : 300,
        skillName : "뼈검찢기"
    },
    "하얀꽃채찍" : {
        requiredMastery : 300,
        skillName : "꽃채찍의 하얀 독"
    },
    "우산" : {
        requiredMastery : 300,
        skillName : "칼날개화"
    },
    "백화쌍검" : {
        requiredMastery : 300,
        skillName : "끝나지 않는 춤사위"
    },
    "하얀꽃낫" : {
        requiredMastery : 300,
        skillName : "꽃잎바람"
    },
    "반란의 총검" : {
        requiredMastery : 300,
        skillName : "뒤로 도약"
    },
    "반란의 대검" : {
        requiredMastery : 300,
        skillName : "반란의 칼날"
    },
    "반란의 한손검" : {
        requiredMastery : 300,
        skillName : "방패굳히기"
    }
};

const DEFAULT_WEAPON = {
    name: "맨주먹",
    type: "weapon",
    stats: {}
};

const ITEMS ={
    weapon: {
        dagger: {
            name: "대거",
            type: "weapon",
            price: 1000,
            stats: {
                str: 2,
                dex: 6
            }
        },

        dancingdagger: {
            name: "댄싱대거",
            type: "weapon",
            price: 2000,
            stats: {
                dex:5,
                charm:5
            }
        },

        sword: {
            name: "한손검",
            type: "weapon",
            price: 2000,
            stats: {
                str:5,
                dex:7,
            }
        },

        bigsword: {
            name: "대검",
            type: "weapon",
            price: 2000,
            stats: {
                str:10,
                dex:-2
            }
        },

        magicstick:{
            name: "지팡이",
            type: "weapon",
            price: 2000,
            tags : ["magicStick"],
            stats: {
                int:7,
                charm:3
            }
        },

        club: {
            name : "클럽",
            type : "weapon",
            price : 1500,
            tags: ["club"],
            stats : {
                str:6,
                int:3
            }
        },

        axeHM : {
            name : "도끼HM",
            type : "weapon",
            desc : "이니셜 HM님의 소망이 들어간 도끼. 그래서인지 스킬이 공격에 치중되어 있다.",
            price : 2000,
            stats : {
                str : 9,
                dex : -1
            }
        },

        replicaBayonet : {
            name: "레플리카 베요네따",
            type: "weapon",
            desc : "버려진 장식용 총이지만, 살기 위해 사람들이 무기를 개조했다. 개머리판에 날카로운 칼날을 달았으며 총알이 나오긴 나온다.",
            price: 2000,
            stats: {
                str: 4,
                dex: 6
            }
        },

        goblinSword: {
            name: "고블린검",
            type: "weapon",
            price: 2000,
            stats: {
                str:6,
                dex:3
            }
        },

        throwingSword : {
            name : "투척단검",
            type : "weapon",
            price : 2500,
            stats : {
                str:3,
                dex:8
            }
        },

        soldierSpear : {
            name : "경계병창",
            type : "weapon",
            desc : "경계병들이 사용하는 창. 도시를 지키고자 하는 마음이 담겨있다.",
            price : 2600,
            stats : {
                str: 9,
                dex: 2
            }
        },

        silverDagger : {
            name : "은장도",
            type: "weapon",
            desc : "아카시아에게서 받은 은장도. 아카시아향이 미약하게 난다.",
            price: 2800,
            tags : ["magicStick"],
            stats: {
                int: 10,
                charm: 2
            } 
        },

        skeletonGreatSword : {
            name : "뼈대검",
            type : "weapon",
            desc : "큰 해골이 들고 있던 대검. 보통 대검보다 크기가 크다.",
            price : 2900,
            stats : {
                str : 15,
                dex : -4
            }
        },

        flowerleash : {
            name : "하얀꽃채찍",
            type : "weapon",
            desc : "백발의 꽃인간이 들고 있었던 하얀꽃채찍. 채찍을 휘두르면 가끔씩 하얀꽃잎이 날린다.",
            price : 2900,
            stats : {
                str : 3,
                dex : 9
            }
        },

        umbrella : {
            name : "우산",
            type : "weapon",
            desc : "누군가의 비 오는 날 추억이 담겨져 있다. 밀크쉐이크를 같이 먹은 사이일지도?",
            price : 2900,
            stats : {
                str : -2,
                dex : 11,
                chamrm : 3
            }
        },

        whiteFlowerTwinDagger : {
            name : "백화쌍검",
            type : "weapon",
            desc : "말없는 춤, 그것이 세상에서 가장 무서운 춤일지도 모른다.",
            price : 3000,
            stats : {
                str : 1,
                dex : 10,
                charm : 3
            }
        },

        whiteFlowerRipper :{
            name: "하얀꽃낫",
            type: "weapon",
            desc : "자신은 사신처럼 고귀하게 사람들의 목숨을 가져가는 것이라 착각하던 남자의 말로.",
            price: 3000,
            tags : ["magicStick"],
            stats: {
                dex : 2,
                int: 11,
                charm: 1
            }
        },

        rebelsReplica : {
            name : "반란의 총검",
            type : "weapon",
            desc : "들어라, 의지가 다할 때까지. 쏴라, 목숨이 다할 때까지.",
            price : 3000,
            stats : {
                str : 6,
                dex : 7,
                int : 1
            }
        },

        rebelsGreatSword : {
            name : "반란의 대검",
            type : "weapon",
            desc : "지켜라, 몸이 스러질 때까지. 버텨라, 동료가 일어날 때까지",
            price : 3000,
            stats : {
                str : 10,
                dex : 3,
                charm : 1
            }
        },

        rebelsShieldSword : {
            name : "반란의 한손검",
            type : "weapon",
            desc : "우리는 쓰러지지 않는다, 아직 죽지 않았으니까.",
            price : 3000,
            stats : {
                str : 6,
                dex : 4,
                int : 4
            }
        }
    },

    top: {
        tshirt : {
            name: "반팔",
            type: "top",
            price: 200,
            stats: {}
        },

        tanktop : {
            name: "탱크탑",
            type: "top",
            price: 500,
            stats: {
                dex:2
            }
        },

        croptshirt: {
            name: "크롭티",
            type: "top",
            price: 1000,
            stats: {
                dex:2,
                charm:2
            },
            tags : ["easyAccess"]
        },

        overshirt: {
            name: "오버핏셔츠",
            type: "top",
            price: 1500,
            stats: {
                str:4,
                charm:2
            }
        },

        hoodie: {
            name: "후디",
            type: "top",
            price: 1500,
            stats: {
                str:5
            }
        },

        tavernUpper : {
            name : "주점알바상의",
            type : "top",
            price : 1000,
            stats : {
                charm:4
            },
            tags : ["easyAccess"]
        },

        banditArmorTop : {
            name : "도적의 상의",
            type : "top",
            price : 1500,
            stats : {
                str: 3,
                dex : 4
            },
        },

        soldierTop : {
            name : "경계병 갑옷 상의",
            type : "top",
            price : 2000,
            stats : {
                str: 10,
                dex : -3
            },
        },

        whiteUppercityTop : {
            name : "백색제복 상의",
            type : "top",
            price : 2500,
            stats : {
                int : 7,
                dex : 2
            }
        },

        rebelsTop : {
            name : "반란군 상의",
            type : "top",
            price : 2500,
            stats : {
                str : 5,
                dex : 4
            }
        }
    },

    bra : {
        basicBra : {
            name : "기본브라",
            type : "bra",
            price : 3000,
            stats : {}
        },
        dotBra : {
            name : "도트브라",
            type : "bra",
            price : 4000,
            stats : {
                charm : 1
            }
        },
        ribonBra : {
            name : "리본브라",
            type : "bra",
            price : 4000,
            stats : {
                charm : 1
            }
        },
        raceBra : {
            name : "레이스브라",
            type : "bra",
            desc : "'레이스브라는 있어야 하는 거 아닌가요?'라는 누군가의 소망으로 생성된 브라. 예쁘다.",
            price : 4000,
            stats : {
                charm : 1
            }
        },
        strapLessBra : {
            name : "끈없는브라",
            type : "bra",
            desc : "D로 시작하는 게임에서 어떤 예쁜 캐릭터가 입고 있었던 브라다. 역시 예쁘다.",
            price : 4000,
            stats : {
                charm : 1
            }
        },
        whiteFlowerBra : {
            name : "하얀꽃잎브라",
            type : "bra",
            desc : "금방이라도 흐트러질 거 같지만 흐트러지지 않는다. 하얀꽃의 생명력은 길다.",
            price : 0,
            stats : {
                charm : 3
            }
        }
    },
 
    bottom : {
        pants: {
            name: "바지",
            type: "bottom",
            price: 200,
            stats: {}
        },

        bluejeams: {
            name: "청바지",
            type: "bottom",
            price: 1500,
            stats: {
                str:2,
                int:2
            }
        },

        blackjeams: {
            name: "블랙진",
            type: "bottom",
            price: 1500,
            stats: {
                str:2,
                int:2
            }
        },

        hotpants: {
            name: "핫팬츠",
            type: "bottom",
            price: 2000,
            stats: {
                dex:3,
                charm:2
            },
            tags : ["easyAccess"]
        },

        skirts: {
            name:"치마",
            type:"bottom",
            price: 200,
            stats: {},
            tags : ["easyAccess"]
        },

        longskirts: {
            name: "긴치마",
            type: "bottom",
            price: 1000,
            stats: {
                str:2,
                int:2
            }
        },

        shortskirts: {
            name: "숏치마",
            type: "bottom",
            price: 2000,
            stats: {
                dex: 3,
                charm: 2
            },
            tags : ["easyAccess"]
        },

        tavernBottom : {
            name : "주점알바하의",
            type : "bottom",
            price : 1000,
            stats : {
                charm:4
            },
            tags : ["easyAccess"]
        },

        banditArmorBottom : {
            name : "도적의 하의",
            type : "bottom",
            price : 1500,
            stats : {
                str: 1,
                dex : 6
            },
        },

        soldierBottom : {
            name : "경계병 갑옷 하의",
            type : "bottom",
            price : 2000,
            stats : {
                str: 10,
                dex : -4
            },
        },

        whiteUppercityBottom : {
            name : "백색제복 하의",
            type : "bottom",
            price : 2500,
            stats : {
                str : 4,
                charm : 5
            }
        },

        rebelsBottom : {
            name : "반란군 하의",
            type : "bottom",
            price : 2500,
            stats : {
                dex : 5,
                str : 4
            }
        }
    },

    underwear: {
        basic: {
            name: "팬티",
            type: "underwear",
            price: 3000,
            stats: {}
        },

        racepants: {
            name: "레이스팬티",
            type: "underwear",
            price: 5000,
            stats: {
                charm:2
            }
        },

        ribonpants: {
            name: "리본팬티",
            type: "underwear",
            price: 5000,
            stats: {
                charm:2
            }
        },

        hundosiHM : {
            name : "훈도시HM",
            type : "underwear",
            price : 5000,
            stats : {
                str : 2,
                int : -2
            }
        },

        whiteFlowerPants : {
            name : "하얀꽃잎팬티",
            type : "underwear",
            desc : "금방이라도 흐트러질 거 같지만 흐트러지지 않는다. 하얀꽃의 생명력은 길다.",
            price : 0,
            stats : {
                charm : 3
            }
        }
    },

    accessary : {
        footPiercing : {
            name : "발피어싱",
            type : "accessary",
            price : 0,
            tags : ["locked"],
            stats : {
                charm : 5,
                str : -10,
                dex : -10
            }
        },

        whiteFlowerLabBracelet : {
            name : "하얀꽃팔찌",
            desc : "당신의 도덕성과 교환한, 시든 하얀꽃팔찌. 시들었는데도 하얀꽃들은 서로 이어져 있다.",
            type : "accessary",
            price : 5000,
            stats : {
                charm : 2,
                dex : 1,
                int : 1,
                str : 1
            }
        },

        whiteFlowerRing : {
            name : "하얀꽃반지",
            desc : "시들지 않는 하얀꽃반지, 꿈속에서 만난 그대가 시들지 않기를.",
            type : "accessary",
            price : 2000,
            stats : {
                charm : 2,
                dex : 1
            }
        },

        //npc 관련 악세사리
        flowerCrown : {
            name : "꽃왕관",
            desc : "소라가 만들어준 꽃왕관. 분명 알록달록한 꽃으로 만들었던 거 같은데 점점 하얀색으로 변해가고 있다. 시들지도 않는다.",
            type : "accessary",
            price : 100,
            stats : {
                charm : 2
            }
        },
        lukeNecklace : {
            name : "부적 목걸이",
            desc : "삐뚤삐뚤한 부적이 달린 목걸이, 어쩐지 루크의 글씨체와 닮았다.",
            type : "accessary",
            stats : {
                str : 2,
                dex : 1
            },
            price : 50
        },
        yuriRebelRing : {
            name : "유리의 수호반지",
            desc : "인장이 박혀있는 반지다. 자세히 보면 인장에서는 전문가의 솜씨가 전혀 느껴지지 않는다.",
            type : "accessary",
            stats : {
                str : 1,
                dex : 3,
                charm : 1
            },
            price : 5000
        }
    },

    consumable : {
        smallPotion : {
            name: "요구르트(25)",
            type: "heal",
            value: 25,
            price: 700
        },
        mediumPotion : {
            name: "비타민(50)",
            type: "heal",
            value: 50,
            price: 1200
        },
        highPotion : {
            name: "핫드링크(70)",
            type: "heal",
            value: 70,
            price: 1500
        },
        fullPotion: {
            name: "수혈팩(100)",
            type: "heal",
            value: 100,
            price: 2000
        },
        meatPotion : {
            name : "무언가의고기(10)",
            type : "heal",
            value : 10,
            price : 10
        },
        regenPotion: {
            name: "재생 물약(20*3)",
            type: "regen",
            price: 1800,
            effect: {
                heal: 20,
                duration: 3
            }
        },
        regenPotion2: {
            name: "상급 재생 물약(30*4)",
            type: "regen",
            price: 2500,
            effect: {
                heal: 30,
                duration: 4
            }
        },
        smallStaminaPotion : {
            name : "에너지바(30)",
            type : "stamina",
            value : 30,
            price : 1500
        },
        mediumStaminaPotion : {
            name : "커피(60)",
            type : "stamina",
            value : 60,
            price : 2500
        },
        largeStaminaPotion : {
            name : "에너지드링크(100)",
            type : "stamina",
            value : 100,
            price : 3500
        },
        calmPotion : {
            name : "진정제(30)",
            type : "arousal",
            value : 30,
            price : 2000
        },
        beer : {
            name : "맥주",
            type : "alcohol",
            price : 800,
            alcohol: 10,
            trauma : -5
        },
        whiskey : {
            name : "위스키",
            type : "alcohol",
            price : 1800,
            alcohol : 15,
            trauma : -10
        },
        soju : {
            name : "소주",
            type : "alcohol",
            price : 1200,
            alcohol : 30,
            trauma : -10
        },
        sensitivityADownPotion: {
            key: "sensitivityADownPotion",
            name: "A둔감제",
            type: "sensitivityDown",
            price: 1500,
            target: "aSensitivity",
            value: 10
        },
        sensitivityCDownPotion: {
            key: "sensitivityCDownPotion",
            name: "C둔감제",
            type: "sensitivityDown",
            price: 1500,
            target: "cSensitivity",
            value: 10
        },
        sensitivityMDownPotion: {
            key: "sensitivityMDownPotion",
            name: "M둔감제",
            type: "sensitivityDown",
            price: 1500,
            target: "mSensitivity",
            value: 10
        },
        sensitivityBDownPotion: {
            key: "sensitivityBDownPotion",
            name: "B둔감제",
            type: "sensitivityDown",
            price: 1500,
            target: "bSensitivity",
            value: 10
        },


        //음식들
        greatFruitStirFry : {
            name : "훌륭한 과일볶음",
            type : "heal",
            value : 20,
            tags : ["gift", "sweet", "great"],
            price : 200         
        },
        normalFruitStirFry : {
            name : "과일볶음",
            type : "heal",
            value : 10,
            tags : ["gift", "sweet", "normal"],
            price : 150       
        },
        badFruitStirFry : {
            name : "맛없는 과일볶음",
            type : "heal",
            value : 5,
            tags : ["gift", "sweet", "bad"],
            price : 50       
        },
        trash : {
            name : "쓰레기",
            type : "heal",
            value : -20,
            tags : ["gift", "trash"],
            price : 0      
        },

        greatFruitberryberry : {
            name : "훌륭한 고급과일볶음",
            type : "heal",
            value : 30,
            tags : ["gift", "sweet", "great"],
            price : 300       
        },
        normalFruitberryberry : {
            name : "고급과일볶음",
            type : "heal",
            value : 20,
            tags : ["gift", "sweet", "normal"],
            price : 200       
        },
        badFruitberryberry : {
            name : "맛없는 고급과일볶음",
            type : "heal",
            value : 10,
            tags : ["gift", "sweet", "bad"],
            price : 100      
        },

        greatFruitNectar : {
            name : "훌륭한 꿀과일볶음",
            type : "heal",
            value : 50,
            tags : ["gift", "sweet", "great"],
            price : 600      
        },
        normalFruitNectar : {
            name : "꿀과일볶음",
            type : "heal",
            value : 40,
            tags : ["gift", "sweet", "normal"],
            price : 500 
        },
        badFruitNectar : {
            name : "맛없는 꿀과일볶음",
            type : "heal",
            value : 30,
            tags : ["gift", "sweet", "bad"],
            price : 400    
        },

        greatSmoothJelly : {
            name : "훌륭한 미끄덩젤리",
            type : "heal",
            value : 15,
            tags : ["gift", "sweet", "great"],
            price : 200 
        },
        normalSmoothJelly : {
            name : "미끄덩젤리",
            type : "heal",
            value : 10,
            tags : ["gift", "sweet", "normal"],
            price : 150 
        },
        badSmoothJelly : {
            name : "맛없는 미끄덩젤리",
            type : "heal",
            value : 5,
            tags : ["gift", "sweet", "bad"],
            price : 50 
        },

        greatFruitSlimeLiquid : {
            name : "불미스러운 것이 들어간 훌륭한 과일 요리",
            type : "arousal",
            value : -25,
            tags : ["gift", "lusty", "great"],
            price : 170  
        },
        normalFruitSlimeLiquid : {
            name : "불미스러운 것이 들어간 과일 요리",
            type : "arousal",
            value : -15,
            tags : ["gift", "lusty", "normal"],
            price : 160  
        },
        badFruitSlimeLiquid : {
            name : "불미스러운 것이 들어간 맛없는 과일 요리",
            type : "arousal",
            value : -5,
            tags : ["gift", "lusty", "bad"],
            price : 50 
        },

        greatWTFSlimeLiquid : {
            name : "훌륭하게 만들어진 불미스러운 수프",
            type : "arousal",
            value : -40,
            tags : ["gift", "lusty", "great"],
            price : 150 
        },
        normalWTFSlimeLiquid : {
            name : "불미스러운 수프",
            type : "arousal",
            value : -20,
            tags : ["gift", "lusty", "normal"],
            price : 130
        },
        badWTFSlimeLiquid : {
            name : "맛없게 만들어진 불미스러운 수프",
            type : "arousal",
            value : -10,
            tags : ["gift", "lusty", "bad"],
            price : 0
        },

        greatGrilledMeat : {
            name : "훌륭한 구운 고기 요리",
            type : "heal",
            value : 10,
            tags : ["gift", "meat", "great"],
            price : 60     
        },
        normalGrilledMeat : {
            name : "구운 고기 요리",
            type : "heal",
            value : 7,
            tags : ["gift", "meat", "normal"],
            price : 50    
        },
        badGrilledMeat : {
            name : "맛없는 구운 고기 요리",
            type : "heal",
            value : 5,
            tags : ["gift", "meat", "bad"],
            price : 40     
        },

        greatMeatSkewer : {
            name : "훌륭한 고기 꼬치",
            type : "heal",
            value : 25,
            tags : ["gift", "meat", "great"],
            price : 240
        },
        normalMeatSkewer : {
            name : "고기 꼬치",
            type : "heal",
            value : 20,
            tags : ["gift", "meat", "normal"],
            price : 220
        },
        badMeatSkewer : {
            name : "맛없는 고기 꼬치",
            type : "heal",
            value : 15,
            tags : ["gift", "meat", "bad"],
            price : 180
        },

        greatMeatVegetableSkewer : {
            name : "훌륭한 고기야채꼬치",
            type : "heal",
            value : 50,
            tags : ["gift", "mixed", "great"],
            price : 450
        },
        normalMeatVegetableSkewer : {
            name : "고기야채꼬치",
            type : "heal",
            value : 40,
            tags : ["gift", "mixed", "normal"],
            price : 420
        },
        badMeatVegetableSkewer : {
            name : "맛없는 고기야채꼬치",
            type : "heal",
            value : 30,
            tags : ["gift", "mixed", "bad"],
            price : 390
        },
        
        greatVegetableSkewer : {
            name : "훌륭한 야채꼬치",
            type : "heal",
            value : 70,
            tags : ["gift", "vegetable", "great"],
            price : 550
        },
        normalVegetableSkewer : {
            name : "야채꼬치",
            type : "heal",
            value : 60,
            tags : ["gift", "vegetable", "normal"],
            price : 520
        },
        badVegetableSkewer : {
            name : "맛없는 야채꼬치",
            type : "heal",
            value : 40,
            tags : ["gift", "vegetable", "bad"],
            price : 450
        },

        greatMushroomSoup : {
            name : "훌륭한 버섯수프",
            type : "heal",
            value : 55,
            tags : ["gift", "vegetable", "great"],
            price : 520
        },
        normalMushroomSoup : {
            name : "버섯수프",
            type : "heal",
            value : 45,
            tags : ["gift", "vegetable", "normal"],
            price : 510
        },
        badMushroomSoup : {
            name : "맛없는 버섯수프",
            type : "heal",
            value : 30,
            tags : ["gift", "vegetable", "bad"],
            price : 440
        },

        greatPotatoSmash : {
            name : "훌륭한 감자 스매시",
            type : "heal",
            value : 55,
            tags : ["gift", "vegetable", "great"],
            price : 520
        },
        normalPotatoSmash : {
            name : "감자 스매시",
            type : "heal",
            value : 45,
            tags : ["gift", "vegetable", "normal"],
            price : 510
        },
        badPotatoSmash : {
            name : "맛없는 감자 스매시",
            type : "heal",
            value : 30,
            tags : ["gift", "vegetable", "bad"],
            price : 440
        },

        greatCabbageSoup : {
            name : "훌륭한 배추 수프",
            type : "heal",
            value : 55,
            tags : ["gift", "vegetable", "great"],
            price : 520
        },
        normalCabbageSoup : {
            name : "배추 수프",
            type : "heal",
            value : 45,
            tags : ["gift", "vegetable", "normal"],
            price : 510
        },
        badCabbageSoup : {
            name : "맛없는 배추 수프",
            type : "heal",
            value : 30,
            tags : ["gift", "vegetable", "bad"],
            price : 440
        },

        greatMeatVegetableShoot : {
            name : "훌륭한 고기야채볶음",
            type : "heal",
            value : 70,
            tags : ["gift", "mixed", "great"],
            price : 460
        },
        normalMeatVegetableShoot : {
            name : "고기야채볶음",
            type : "heal",
            value : 50,
            tags : ["gift", "mixed", "normal"],
            price : 430
        },
        badMeatVegetableShoot : {
            name : "맛없는 고기야채볶음",
            type : "heal",
            value : 30,
            tags : ["gift", "mixed", "bad"],
            price : 400
        },

        greatVegetableMix : {
            name : "훌륭한 야채볶음",
            type : "heal",
            value : 75,
            tags : ["gift", "vegetable", "great"],
            price : 580
        },
        normalVegetableMix : {
            name : "야채볶음",
            type : "heal",
            value : 65,
            tags : ["gift", "vegetable", "normal"],
            price : 550
        },
        badVegetableMix : {
            name : "맛없는 야채볶음",
            type : "heal",
            value : 45,
            tags : ["gift", "vegetable", "bad"],
            price : 500
        },

        greatBread : {
            name : "훌륭한 빵",
            type : "heal",
            value : 30,
            tags : ["gift", "bread", "great"],
            price : 620
        },
        normalBread : {
            name : "빵",
            type : "heal",
            value : 20,
            tags : ["gift", "bread", "normal"],
            price : 600
        },
        badBread : {
            name : "맛없는 빵",
            type : "heal",
            value : 10,
            tags : ["gift", "bread", "bad"],
            price : 550
        },

        greatMeatBread : {
            name : "훌륭한 고기빵",
            type : "heal",
            value : 30,
            tags : ["gift", "meatBread", "great"],
            price : 380
        },
        normalMeatBread : {
            name : "고기빵",
            type : "heal",
            value : 20,
            tags : ["gift", "meatBread", "normal"],
            price : 340
        },
        badMeatBread : {
            name : "맛없는 고기빵",
            type : "heal",
            value : 10,
            tags : ["gift", "meatBread", "bad"],
            price : 300
        },

        greatVegetableBread : {
            name : "훌륭한 야채빵",
            type : "heal",
            value : 40,
            tags : ["gift", "vegetableBread", "great"],
            price : 600
        },
        normalVegetableBread : {
            name : "야채빵",
            type : "heal",
            value : 30,
            tags : ["gift", "vegetableBread", "normal"],
            price : 560
        },
        badVegetableBread : {
            name : "맛없는 야채빵",
            type : "heal",
            value : 20,
            tags : ["gift", "vegetableBread", "bad"],
            price : 520
        },

        greatMeatRice : {
            name : "훌륭한 고기주먹밥",
            type : "heal",
            value : 75,
            tags : ["gift", "meatRice", "great"],
            price : 480
        },
        normalBread : {
            name : "고기주먹밥",
            type : "heal",
            value : 65,
            tags : ["gift", "meatRice", "normal"],
            price : 440
        },
        badBread : {
            name : "맛없는 고기주먹밥",
            type : "heal",
            value : 50,
            tags : ["gift", "meatRice", "bad"],
            price : 400
        },

        greatVegetableRice : {
            name : "훌륭한 야채주먹밥",
            type : "heal",
            value : 90,
            tags : ["gift", "vegetableRice", "great"],
            price : 700
        },
        normalVegetableRice : {
            name : "야채주먹밥",
            type : "heal",
            value : 80,
            tags : ["gift", "vegetableRice", "normal"],
            price : 660
        },
        badVegetableRice : {
            name : "맛없는 야채주먹밥",
            type : "heal",
            value : 60,
            tags : ["gift", "vegetableRice", "bad"],
            price : 620
        },

        greatGoblinGoblinMeat : {
            name : "훌륭한 고블린고기볶음",
            type : "heal",
            value : 40,
            tags : ["gift", "meat", "great"],
            price : 400
        },
        normalGoblinGoblinMeat : {
            name : "고블린고기볶음",
            type : "heal",
            value : 30,
            tags : ["gift", "meat", "normal"],
            price : 340
        },
        badGoblinGoblinMeat : {
            name : "맛없는 고블린고기볶음",
            type : "heal",
            value : 20,
            tags : ["gift", "meat", "bad"],
            price : 280
        },

        greatSmallFishFry : {
            name : "훌륭한 생선튀김",
            type : "stamina",
            value : 40,
            tags : ["gift", "fish", "great"],
            price : 700
        },
        normalSmallFishFry : {
            name : "생선튀김",
            type : "stamina",
            value : 30,
            tags : ["gift", "fish", "normal"],
            price : 650
        },
        badSmallFishFry : {
            name : "맛없는 생선튀김",
            type : "stamina",
            value : 10,
            tags : ["gift", "fish", "bad"],
            price : 550
        },

        greatMediumFishFry : {
            name : "훌륭한 생선찜",
            type : "stamina",
            value : 60,
            tags : ["gift", "fish", "great"],
            price : 1000
        },
        normalMediumFishFry : {
            name : "생선찜",
            type : "stamina",
            value : 50,
            tags : ["gift", "fish", "normal"],
            price : 950
        },
        badMediumFishFry : {
            name : "맛없는 생선찜",
            type : "stamina",
            value : 20,
            tags : ["gift", "fish", "bad"],
            price : 850
        },

        greatBigFishFry : {
            name : "훌륭한 생선탕",
            type : "stamina",
            value : 80,
            tags : ["gift", "yuriHate", "fish", "great"],
            price : 1300
        },
        normalBigFishFry : {
            name : "생선탕",
            type : "stamina",
            value : 70,
            tags : ["gift", "yuriHate", "fish", "normal"],
            price : 1250
        },
        badBigFishFry : {
            name : "맛없는 생선탕",
            type : "stamina",
            value : 40,
            tags : ["gift", "yuriHate", "fish", "bad"],
            price : 1000
        },

        greatAllFish : {
            name : "훌륭한 생선모듬",
            type : "stamina",
            value : 100,
            tags : ["gift", "fish", "great"],
            price : 1300
        },
        normalAllFish : {
            name : "생선모듬",
            type : "stamina",
            value : 80,
            tags : ["gift", "fish", "normal"],
            price : 1200
        },
        badAllFish : {
            name : "맛없는 생선모듬",
            type : "stamina",
            value : 40,
            tags : ["gift", "fish", "bad"],
            price : 850
        },

        greatAllFish : {
            name : "훌륭한 생선모듬",
            type : "stamina",
            value : 100,
            tags : ["gift", "fish", "great"],
            price : 1300
        },
        normalAllFish : {
            name : "생선모듬",
            type : "stamina",
            value : 80,
            tags : ["gift", "fish", "normal"],
            price : 1200
        },
        badAllFish : {
            name : "맛없는 생선모듬",
            type : "stamina",
            value : 40,
            tags : ["gift", "fish", "bad"],
            price : 850
        },

        greatSalmonSalmon : {
            name : "훌륭한 연어회(25*4)",
            type : "regen",
            effect : {
                heal : 25,
                duration : 4
            },
            tags : ["gift", "fish", "great"],
            price : 1800
        },
        normalSalmonSalmon : {
            name : "연어회(20*4)",
            type : "regen",
            effect : {
                heal : 20,
                duration : 4
            },
            tags : ["gift", "fish", "normal"],
            price : 1600
        },
        badSalmonSalmon : {
            name : "맛없는 연어회(15*4)",
            type : "regen",
            effect : {
                heal : 15,
                duration : 4
            },
            tags : ["gift", "fish", "bad"],
            price : 1400
        },

        greatSalmonSushi : {
            name : "훌륭한 연어초밥(25*3)",
            type : "regen",
            effect : {
                heal : 25,
                duration : 3
            },
            tags : ["gift", "matinFavorite", "fish", "great"],
            price : 1400
        },
        normalSalmonSushi : {
            name : "연어초밥(20*3)",
            type : "regen",
            effect : {
                heal : 20,
                duration : 3
            },
            tags : ["gift", "matinFavorite", "fish", "normal"],
            price : 1200
        },
        badSalmonSushi : {
            name : "맛없는 연어초밥(15*3)",
            type : "regen",
            effect : {
                heal : 15,
                duration : 3
            },
            tags : ["gift", "matinFavorite", "fish", "bad"],
            price : 1000
        }

    
    },
    misc : {
        tornClothes: {
            name: "찢어진 천조각",
            type: "junk",
            price: 20
        },
        animalMeatPieces: {
            name: "고기조각(동물)",
            desc : "깔끔하게 잘라내는 게 잘 안 됐다....",
            type: "food",
            price: 15
        },
        animalMeat: {
            name: "고기(동물)",
            type: "food",
            price: 60
        },
        dearCrown: {
            name: "사슴뿔",
            type: "food",
            price: 35
        },
        potato: {
            name: "감자",
            type: "food",
            price: 170
        },
        cabbage: {
            name: "배추",
            type: "food",
            price: 170
        },
        mushroom: {
            name: "버섯",
            type: "food",
            price: 170
        },
        wheat: {
            name: "밀",
            type: "food",
            price: 200
        },
        rice: {
            name: "쌀",
            type: "food",
            price: 300
        },
        rustyRing: {
            name: "녹슨반지",
            type: "junk",
            price: 30
        },
        slimeJelly: {
            name: "슬라임젤리",
            type: "food",
            price: 50
        },
        slimeCore: {
            name: "슬라임코어",
            type: "junk",
            price: 80
        },
        slimeLiquid: {
            name: "슬라임에서 나온 정체모를 액체.",
            desc : "과연 만지고 싶은 사람이 있을까?",
            type: "food",
            price: 40
        },
        goblinStick: {
            name: "고블린의 나무몽둥이.",
            type: "junk",
            price: 120
        },
        goldRing: {
            name: "금반지",
            type: "junk",
            price: 250
        },
        goblinMeat: {
            name: "고블린고기",
            type: "food",
            price: 100
        },
        flower: {
            name: "하얀꽃",
            type: "food",
            price: 200
        },
        flowerNectar: {
            name: "넥타르",
            type: "food",
            price: 300
        },
        flowerLeaf: {
            name: "꽃잎",
            type: "junk",
            price: 150
        },
        wildFruit: {
            name: "야생열매",
            type: "food",
            price: 50
        },
        rareFruit: {
            name: "희귀한 숲열매",
            type: "food",
            price: 150
        },
        bloodycloth : {
            name : "핏자국 남은 천조각",
            type : "junk",
            price : 40
        },
        pieceofwhiteflower : {
            name : "하얀꽃잎조각들",
            type : "food",
            price : 100
        },
        skull : {
            name : "뼛조각",
            type: "junk",
            price : 25
        },
        drug : {
            name : "싸구려 마약",
            type : "junk",
            price : 100
        },
        druggy : {
            name : "일반 마약",
            type : "junk",
            price : 200
        },
        silverChain : {
            name : "쇠사슬",
            type : "junk",
            price : 75
        },
        jewerlyPieces : {
            name : "보석가루",
            type : "junk",
            price : 250
        },
        smallJewelry : {
            name : "작은보석",
            type : "junk",
            price : 400
        },
        jewelry : {
            name : "보석",
            type : "junk",
            price : 500
        },
        goldenBar : {
            name : "골드바",
            type : "junk",
            price : 1000 
        },
        lumpOfFlesh : {
            name : "살점덩어리",
            type : "junk",
            desc : "누가 이런 물건을 원할 것인가.",
            price : 100
        },
        twistedBone : {
            name : "뒤틀린 뼈",
            type : "junk",
            desc : "흉물에 뒤엉켜있었던 뼈, 심하게 변형되어 있지만 인간의 뼈로 보인다.",
            price : 150
        },
        mutantHeart : {
            name : "오염된 심장",
            type : "junk",
            price : 700
        },
        blackBlood : {
            name : "검은피주머니",
            type : "junk",
            price : 300
        },
        abominationSmallEgg : {
            name : "흉물의 작은 알",
            type : "junk",
            desc : "상류도시에 이걸 가져가면 사형이다. 하지만 몇몇은 이 알을 상류도시에 판다는 소문이 있다.",
            price : 900
        },
        abominationBigEgg : {
            name : "흉물의 큰 알",
            type : "junk",
            desc : "상류도시에 이걸 가져가면 사형이다. 하지만 몇몇은 이 알을 상류도시에 판다는 소문이 있다.",
            price : 1300
        },

        //강화재료
        ironOre: {
            name : "철광석",
            type : "ore",
            price : 400
        },
        silverOre: {
            name : "은광석",
            type : "ore",
            price : 500
        },
        goldOre: {
            name : "금광석",
            type : "ore",
            price : 650
        },
        whiteFlowerLeafStone: {
            name : "백화석",
            type : "ore",
            price : 1000
        },
        whiteHeart: {
            name : "백심장",
            type : "ore",
            desc : "하얀꽃의 심장이다. 잘 들어보면 쿵쿵 심장이 뛰고 있는 소리가 들린다.",
            price : 10000
        },
        ruby : {
            name : "루비",
            type : "ore",
            price : 8000
        },
        sapphire : {
            name : "사파이어",
            type : "ore",
            price : 8000
        },
        aquamarine : {
            name : "아쿠아마린",
            type : "ore",
            price : 8000
        },
        diamond : {
            name : "다이아몬드",
            type : "ore",
            price : 8000
        },
        pickaxe : {
            name : "곡괭이",
            type : "misc",
            price : 1000,
            desc : "광석을 캘 때 사용한다. 10번 사용하면 부서진다.",
            maxDurability : 10
        },

        //낚시
        fisherRod : {
            name : "낚시대",
            type : "misc",
            price : 1000,
            desc : "낚시를 할 때 사용한다. 15번 사용하면 부서진다.",
            maxDurability : 15
        },
        stone : {
            name : "돌",
            type : "junk",
            price : 10,
            desc : "걱정마! 언젠가 쓸모가 생길지도 모르잖아!"
        },
        smallFish : {
            name : "작은 생선",
            type : "food",
            price : 200
        },
        mediumFish : {
            name : "생선",
            type : "food",
            price : 300
        },
        bigFish : {
            name : "큰 생선",
            type : "food",
            price : 400
        },
        salmon : {
            name : "연어",
            type : "food",
            price : 500
        },

        //퀘스트물품
        beggersEars : {
            name : "거지들의 귀, 누가 가지려고 하겠는가.",
            type : "junk",
            price : 0
        },


        //중요물품
        matinLocket : {
            name : "낡은 하트모양 목걸이",
            desc : "누군가의 중요한 목걸이같다. 팔면 안 될 거 같은 느낌이 든다",
            type : "key",
            price : 2000
        },
        honorMedal : {
            name : "상류도시 훈장",
            desc : "상류도시가 하류도시 출신에게 내리는 훈장.",
            type : "key",
            price : 5000
        },
        dericLetter : {
            name : "데릭의 친필 서신",
            desc : "기울어진 데릭의 글씨체는 우아하다. 하지만 하류도시의 사람들 기준으로는 읽기 힘들다.",
            type : "key",
            price : 5000
        },
        lukeWFLSoldier : {
            name : "경비병의 훈장",
            desc : "루크의 삐뚤거리는 글씨가 새겨져있는 경비병의 훈장. 막사에 있는 루크에게 가져다주면 반응을 보일지도 모른다.",
            type : "key",
            price : 300
        },
        valenAdmission : {
            name : "발렌의 출입 허가증",
            desc : "상류도시의 인장이 찍혀있는 발렌의 출입 허가증.",
            type : "key",
            price : 0
        },
        graveYardKey : {
            name : "공동묘지 석관 열쇠",
            desc : "마틴이 준 열쇠. 공동묘지의 석관을 열 수 있는 열쇠라고 한다.",
            type : "key",
            price : 500
        },
        soraFatherFlowerNecklace : {
            name : "압화 목걸이(하얀꽃)",
            desc : "누군가의 딸이 아버지를 위해 만든 압화 목걸이. 그 딸은 하얀꽃을 좋아했다.",
            type : "key",
            price : 200
        },
        lukeHouseKey : {
            name : "루크의 집 열쇠",
            desc : "루크는 거의 집에 없을 것이다. 하지만 당신이 루크를 만나지 못하고 그의 집에 머무르다가 떠났다고 하더라도 그는 당신이 자신의 집에 머물렀었다는 것을 늦게라도 알게 될 것이다.",
            type : "key",
            price : 1000
        }
    }
};

function addItem(player, item){
    const cloned = cloneItem(item);

    cloned.key = getItemKey(item);

    if (isEquipmentItem(cloned)){
        cloned.uid ??= crypto.randomUUID();
        cloned.enhance ??= 0;
    }

    player.inventory.push(cloned);

    localStorage.setItem("playerData", JSON.stringify(player));
}

function cloneItem(item){
    return JSON.parse(JSON.stringify(item));
}

function hasItem(player, itemName){
    return player.inventory.some(item => item.name === itemName);
}

function hasItemKey(player, key){
    return player.inventory.some(item => item.key === key);
}

//계산식
function calculateTotalStats(player){
    let total = {
        str: player?.stats?.str || 0,
        dex: player?.stats?.dex || 0,
        int: player?.stats?.int || 0,
        charm: player?.stats?.charm || 0
    };

    Object.values(player?.equipment || {}).forEach(item=>{
        if (!item || !item.stats) return;
        
        for (let key in item.stats){
            const baseValue = item.stats[key] || 0;
            const autoBonus = getAutoEnhanceBonus(item, key);
            const customBonus = item.enhanceCustom?.[key] || 0;
            
            total[key] = (total[key] || 0) + baseValue + autoBonus + customBonus;
        }
    });

    for (const key of ["str", "dex", "int", "charm"]){
        total[key] = Math.floor(total[key] * getAlcoholStatModifier(player, key));
    }
    return total;
}

function getTotalStat(player, stat){
    if (typeof calculateTotalStats === "function" && ["str", "dex", "int", "charm"].includes(stat)){
        return calculateTotalStats(player)[stat] || 0;
    }
    return player?.stats?.[stat] || 0;
}

function scaleStat(x) {
    if (x >= 0) return Math.sqrt(x);
    return -Math.sqrt(-x);
}

function updateDerivedStats(player){
    player.derivedStats = player.derivedStats || {};
    const total = calculateTotalStats(player);

    player.derivedStats.atk =
        scaleStat(total.str) * 6.0 +
        scaleStat(total.dex) * 1.5;

    player.derivedStats.def =
        scaleStat(total.str) * 3.0 +
        scaleStat(total.charm) * 3.0;

    const fluidPenalty = (typeof getBodyFluidTotal === "function")
        ? Math.floor(getBodyFluidTotal(player) / 30)
        : 0;

    player.derivedStats.eva =
        scaleStat(total.dex) * 4.4 +
        scaleStat(total.int) * 2.2 +
        scaleStat(total.charm) * 2.0 -
        fluidPenalty;

    player.derivedStats.mag =
        scaleStat(total.int) * 6.0 +
        scaleStat(total.charm) * 2.0;

    player.derivedStats.bodyFluidPenalty = fluidPenalty;
}

function getAlcoholStatModifier(player, stat){
    const level = typeof getAlcoholLevel === "function" ? getAlcoholLevel(player) : 0;

    if (level === 0) return 1;

    if (stat === "charm"){
        if (level === 1) return 1.1;
        if (level === 2) return 1.2;
        if (level === 3) return 1.3;
    }

    if (level === 1) return 0.9;
    if (level === 2) return 0.75;
    if (level === 3) return 0.5;

    return 1;
}

function findItemByKey(key){
    for (const category in ITEMS){
        if (ITEMS[category][key]){
            return ITEMS[category][key];
        }
    }
    return null;
}

function removeItem(player, item){
    const index = player.inventory.findIndex(invItem => {
        if (isEquipmentItem(item)){
            return invItem.uid && item.uid && invItem.uid === item.uid;
        }

        if (item.uid){
            return invItem.uid === item.uid;
        }

        if (item.key){
            return invItem.key === item.key;
        }

        return invItem.name === item.name;
    });

    if (index === -1) return false;

    player.inventory.splice(index, 1);
    savePlayer(player);
    return true;
}

function removeItemByKey(player, key, count = 1){
    const baseItem = findItemByKey(key);
    let removed = 0;

    for (let i = player.inventory.length - 1; i >= 0 && removed < count; i--){
        const item = player.inventory[i];

        if (
            item.key === key ||
            (baseItem && item.name === baseItem.name)
        ){
            player.inventory.splice(i, 1);
            removed++;
        }
    }

    if (removed > 0) savePlayer(player);

    return removed;
}

function getItemKey(targetItem){
    for (const category in ITEMS){
        for (const key in ITEMS[category]){
            if (ITEMS[category][key] === targetItem){
                return key;
            }
        }
    }
    return null;
}

function getItemKeyByName(name){
    for (const category in ITEMS){
        for (const key in ITEMS[category]){
            if (ITEMS[category][key].name === name){
                return key;
            }
        }
    }
    return null;
}

window.RECIPES = {
    fruitStirFry: {
        name: "과일볶음",
        desc : "야생열매 3개로 볶아 만드는 간단한 요리",

        ingredients: {
            wildFruit: 3
        },

        results: {
            great: "greatFruitStirFry",
            normal: "normalFruitStirFry",
            bad: "badFruitStirFry",
            disaster : "trash"
        }
    },

    fruitberryberry : {
        name : "고급과일볶음",
        desc : "야생열매 2개와 희귀한 숲열매 1개로 만드는 간단한 요리",

        ingredients : {
            wildFruit : 2,
            rareFruit : 1
        },

        results : {
            great: "greatFruitberryberry",
            normal: "normalFruitberryberry",
            bad: "badFruitberryberry",
            disaster : "trash"
        }
    },

    fruitNectar : {
        name : "꿀과일볶음",
        desc : "야생열매 1개, 희귀한 숲열매 1개를 볶은 과일요리 위로 하얀꽃 꿀을 올리는 간단하지만 꽤 맛있는 요리",

        ingredients : {
            wildFruit : 1,
            rareFruit : 1,
            flowerNectar : 1
        },

        results : {
            great: "greatFruitNectar",
            normal: "normalFruitNectar",
            bad: "badFruitNectar",
            disaster : "trash"
        }
    },

    smoothJelly : {
        name : "미끄덩젤리",
        desc : "미끄덩한 슬라임젤리 3개를 합쳐서 만든 요리, 재료만 모르면 맛있다! 물론 알고서도 맛있어하는 사람도 있을 테고!",

        ingredients : {
            slimeJelly : 3
        },

        results : {
            great: "greatSmoothJelly",
            normal: "normalSmoothJelly",
            bad: "badSmoothJelly",
            disaster : "trash"
        }
    },

    fruitSlimeLiquid : {
        name : "불미스러운 것이 들어간 과일요리",
        desc : "슬라임에서 나온 정체모를 액체를 왜 과일요리 위에 뿌린 걸까. 의문이다.",

        ingredients : {
            wildFruit : 2,
            slimeLiquid : 1
        },

        results : {
            great: "greatFruitSlimeLiquid",
            normal: "normalFruitSlimeLiquid",
            bad: "badFruitSlimeLiquid",
            disaster : "trash"
        }
    },

    WTFSlimeLiquid : {
        name : "불미스러운 수프",
        desc : "슬라임에서 나온 정체모를 액체를... 끓여버렸다.",

        ingredients : {
            slimeLiquid : 3
        },

        results : {
            great: "greatWTFSlimeLiquid",
            normal: "normalWTFSlimeLiquid",
            bad: "badWTFSlimeLiquid",
            disaster : "trash"
        }
    },

    grilledMeat : {
        name : "구운 고기 요리",
        desc : "별다른 테크닉이나 재료없이 그저 고기조각들을 볶은 요리. 그래도 맛있긴 하다.",

        ingredients : {
            animalMeatPieces : 3
        },

        results : {
            great : "greatGrilledMeat",
            normal : "normalGrilledMeat",
            bad : "badGrilledMeat",
            disaster : "trash"
        }
    },

    meatSkewer : {
        name : "고기꼬치",
        desc : "괜찮은 고기 3개를 구워서 만든 꼬치 요리",

        ingredients : {
            animalMeat : 3
        },
        
        results : {
            great : "greatMeatSkewer",
            normal : "normalMeatSkewer",
            bad : "badMeatSkewer",
            disaster: "trash"
        }
    },

    meatVegetableSkewer : {
        name : "고기야채꼬치",
        desc : "고기 하나, 배추 하나, 감자 하나를 구워서 만든 꼬치 요리",

        ingredients : {
            animalMeat : 1,
            cabbage : 1,
            potato : 1
        },

        results : {
            great : "greatMeatVegetableSkewer",
            normal : "normalMeatVegetableSkewer",
            bad : "badMeatVegetableSkewer",
            disaster: "trash"
        }
    },

    vegetableSkewer : {
        name : "야채꼬치",
        desc : "버섯 1개와 감자 2개를 구운 다음에 꽂아서 만든 꼬치 요리",

        ingredients : {
            potato : 2,
            mushroom : 1
        },

        results : {
            great : "greatVegetableSkewer",
            normal : "normalVegetableSkewer",
            bad : "badVegetableSkewer",
            disaster: "trash"
        }
    },

    mushroomSoup : {
        name : "버섯수프",
        desc : "버섯 3개로 만든 수프 요리",

        ingredients : {
            mushroom : 3
        },

        results : {
            great : "greatMushroomSoup",
            normal : "normalMushroomSoup",
            bad : "badMushroomSoup",
            disaster: "trash"
        }
    },

    potatoSmash : {
        name : "감자 스매시",
        desc : "감자 3개를 으스러뜨려서 만든 감자 스매시. 뻑뻑할 수도 있지만 괜찮아! 감자니까!",

        ingredients : {
            potato : 3
        },

        results : {
            great : "greatPotatoSmash",
            normal : "normalPotatoSmash",
            bad : "badPotatoSmash",
            disaster: "trash"
        }
    },

    cabbageSoup : {
        name : "배추 수프",
        desc : "배추 3개로 만든 수프 요리",

        ingredients : {
            cabbage : 3
        },

        results : {
            great : "greatCabbageSoup",
            normal : "normalCabbageSoup",
            bad : "badCabbageSoup",
            disaster: "trash"
        }
    },

    meatVegetableShoot : {
        name : "고기야채볶음",
        desc : "고기 하나와 버섯, 그리고 배추를 넣어 맛없을 수가 없는 고기 요리",

        ingredients : {
            animalMeat : 1,
            mushroom : 1,
            cabbage : 1
        },

        results : {
            great : "greatMeatVegetableShoot",
            normal : "normalMeatVegetableShoot",
            bad : "badMeatVegetableShoot",
            disaster: "trash"
        }
    },

    vegetableMix : {
        name : "야채볶음",
        desc : "배추, 감자, 그리고 버섯을 넣어만든 건강한 요리",

        ingredients : {
            cabbage : 1,
            potato : 1,
            mushroom : 1
        },

        results : {
            great : "greatVegetableMix",
            normal : "normalVegetableMix",
            bad : "badVegetableMix",
            disaster: "trash"
        }
    },

    bread : {
        name : "빵",
        desc : "정말 아무 것도 넣지 않고 밀만 3개 넣어서 만든 빵이다. 양이 엄청나다.",

        ingredients : {
            wheat : 3
        },

        results : {
            great : "greatBread",
            normal : "normalBread",
            bad : "badBread",
            disaster: "trash"
        } 
    },

    meatRice : {
        name : "고기주먹밥",
        desc : "고기 2개를 볶은 후 손으로 조물조물해서 만든 고기주먹밥",

        ingredients : {
            animalMeat : 2,
            rice : 1
        },

        results : {
            great : "greatMeatRice",
            normal : "normalMeatRice",
            bad : "badMeatRice",
            disaster: "trash"
        }
    },

    vegetableRice : {
        name : "야채주먹밥",
        desc : "배추와 버섯을 넣고 만든 야채주먹밥",

        ingredients : {
            cabbage : 1,
            mushroom : 1,
            rice : 1
        },

        results : {
            great : "greatVegetableRice",
            normal : "normalVegetableRice",
            bad : "badVegetableRice",
            disaster: "trash"
        }
    },

    meatBread : {
        name : "고기빵",
        desc : "고기 2개를 볶은 후 그대로 반죽된 밀의 속에 넣어 만든 고기빵",

        ingredients : {
            animalMeat : 2,
            wheat : 1
        },

        results : {
            great : "greatMeatBread",
            normal : "normalMeatBread",
            bad : "badMeatBread",
            disaster: "trash"
        }
    },

    vegetableBread : {
        name : "야채빵",
        desc : "감자와 배추를 넣고 만든 야채빵",

        ingredients : {
            cabbage : 1,
            potato : 1,
            wheat : 1
        },

        results : {
            great : "greatVegetableBread",
            normal : "normalVegetableBread",
            bad : "badVegetableBread",
            disaster: "trash"
        }
    },

    goblinGoblinMeat : {
        name : "고블린고기볶음",
        desc : "고블린 고기를 3개 넣고 만든 고블린고기볶음. 질겨서 그렇게 맛있지는 않다.",

        ingredients : {
            goblinMeat : 3
        },

        results : {
            great : "greatGoblinGoblinMeat",
            normal : "normalGoblinGoblinMeat",
            bad : "badGoblinGoblinMeat",
            disaster: "trash"
        }
    },

    smallFishFry : {
        name : "생선튀김",
        desc : "작은 생선 3마리를 넣고 그대로 튀긴 요리",

        ingredients : {
            smallFish : 3
        },

        results : {
            great : "greatSmallFishFry",
            normal : "normalSmallFishFry",
            bad : "badSmallFishFry",
            disaster: "trash"
        }
    },

    mediumFishFry : {
        name : "생선찜",
        desc : "생선 3마리 찜",

        ingredients : {
            mediumFish : 3
        },

        results : {
            great : "greatMediumFishFry",
            normal : "normalMediumFishFry",
            bad : "badMediumFishFry",
            disaster: "trash"
        }
    },

    bigFishFry : {
        name : "생선탕",
        desc : "큰 생선 3마리를 넣고 끓인 탕",

        ingredients : {
            bigFish : 3
        },

        results : {
            great : "greatBigFishFry",
            normal : "normalBigFishFry",
            bad : "badBigFishFry",
            disaster: "trash"
        }
    },

    allFish : {
        name : "생선모듬",
        desc : "작은 생선, 생선, 큰 생선을 모아 만든 모듬 요리",

        ingredients : {
            smallFish : 1,
            mediumFish : 1,
            bigFish : 1
        },

        results : {
            great : "greatAllFish",
            normal : "normalAllFish",
            bad : "badAllFish",
            disaster: "trash"
        }
    },

    salmonSalmon : {
        name : "연어회",
        desc : "연어 3마리를 그대로 회친 것",

        ingredients : {
            salmon : 3
        },

        results : {
            great : "greatSalmonSalmon",
            normal : "normalSalmonSalmon",
            bad : "badSalmonSalmon",
            disaster: "trash"
        }
    },

    salmonSushi : {
        name : "연어초밥",
        desc : "연어 하나와 밥으로 연어초밥을 만들고 위에 꿀까지 바른 맛난 요리",

        ingredients : {
            salmon : 1,
            rice : 1,
            flowerNectar : 1
        },

        results : {
            great : "greatSalmonSushi",
            normal : "normalSalmonSushi",
            bad : "badSalmonSushi",
            disaster: "trash"
        }
    }


};