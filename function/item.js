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
            unlock: 300,
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
            power: 0.6,
            hits: 6,
            unlock: 20,
            desc : "데미지 0.6배로 6번 연속 공격"
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
            unlock: 300,
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
            power : 4.8,
            unlock : 20,
            desc : "데미지 4.8배"
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
            unlock: 300,
            desc : "8턴간 상대방에게 출혈데미지(5)"
        }
    ],
    "투척단검" : [
        {
            name : "단검4 투척",
            cost : 1,
            type : "multiHit",
            power : 0.3,
            hits : 4,
            unlock : 20,
            desc : "데미지 0.3배로 4번 연속 공격"
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
            unlock : 300,
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
            cost : 3,
            type : "multiHit",
            power : 0.5,
            hits : 7,
            unlock : 100,
            desc : "데미지 0.5배로 7번 연속 공격"
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
            duration : 4,
            unlock : 150,
            desc : "4턴간 상대방 공격력 1.1배, 상대방 방어력 0.7배"
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
            unlock : 300,
            desc : "4턴간 방어력 1.3배"
        }
    ],
    "은장도" : [
        {
            name : "은빛파고들기",
            cost : 2,
            type : "damage",
            power : 2.4,
            unlock : 20,
            desc : "데미지 2.4배"
        },
        {
            name : "은빛시선",
            cost : 3,
            type : "enemyDebuff",
            effect : {
                id : "silverDagger_eyetoeye",
                defMult : 0.7
            },
            duration : 3,
            unlock : 100,
            desc : "3턴간 상대방 방어력 0.7배"
        },
        {
            name : "은빛나선",
            cost : 4,
            type: "multiHit",
            power: 0.7,
            hits : 6,
            unlock: 100,
            desc : "데미지 0.7배로 6번 연속 공격"
        },
        {
            name : "달빛에반사되는",
            cost : 2,
            type : "buff",
            effect : {
                id : "silverDagger_becomingMoonLight",
                evaMult : 2
            },
            duration : 3,
            unlock : 200,
            desc : "3턴간 회피율/명중률 2배"
        }
    ]
};

const MASTER_SKILLS = {
    "한손검": {
        requiredMastery: 400,
        skillName: "버티기"
    },
    "대검": {
        requiredMastery: 400,
        skillName: "모아베기"
    },
    "대거": {
        requiredMastery: 400,
        skillName: "방어자세"
    },
    "댄싱대거": {
        requiredMastery: 400,
        skillName: "피의환무"
    },
    "도끼HM" : {
        requiredMastery : 400,
        skillName : "하이리스크 미디엄리턴"
    },
    "지팡이": {
        requiredMastery: 400,
        skillName: "독가스"
    },
    "클럽": {
        requiredMastery: 400,
        skillName: "얕~보~지~마~"
    },
    "고블린검": {
        requiredMastery: 400,
        skillName: "마구때리기"
    },
    "투척단검" : {
        requiredMastery : 400,
        skillName : "단검난사"
    },
    "경계병창" : {
        requiredMastery : 400,
        skillName : "지키기위한마음"
    },
    "은장도" : {
        requiredMastery : 400,
        skillName : "달빛에반사되는"
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
                str:4,
                int:3
            }
        },

        axeHM : {
            name : "도끼HM",
            type : "weapon",
            price : 2000,
            stats : {
                str : 9,
                int : -1
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
            price : 2600,
            stats : {
                str: 9,
                dex: 2
            }
        },

        silverDagger : {
            name : "은장도",
            type: "weapon",
            price: 2800,
            tags : ["magicStick"],
            stats: {
                int: 10,
                charm: 2
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
            price : 5000,
            stats : {
                charm : 1
            }
        },
        ribonBra : {
            name : "리본브라",
            type : "bra",
            price : 5000,
            stats : {
                charm : 1
            }
        },
        raceBra : {
            name : "레이스브라",
            type : "bra",
            price : 5000,
            stats : {
                charm : 1
            }
        },
        whiteFlowerBra : {
            name : "하얀꽃잎브라",
            type : "bra",
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
            type : "top",
            price : 2000,
            stats : {
                str: 10,
                dex : -4
            },
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
            type : "accessary",
            price : 5000,
            stats : {
                charm : 2,
                dex : 1,
                int : 1,
                str : 1
            }
        },

        //npc 관련 악세사리
        flowerCrown : {
            name : "꽃왕관",
            type : "accessary",
            price : 100,
            stats : {
                charm : 2
            }
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
            price : 200,           
        },
        normalFruitStirFry : {
            name : "과일볶음",
            type : "heal",
            value : 10,
            tags : ["gift", "sweet", "normal"],
            price : 150,           
        },
        badFruitStirFry : {
            name : "맛없는 과일볶음",
            type : "heal",
            value : 5,
            tags : ["gift", "sweet", "bad"],
            price : 50,           
        },
        trash : {
            name : "쓰레기",
            type : "heal",
            value : -20,
            tags : ["gift", "trash"],
            price : 0,           
        },

        greatFruitberryberry : {
            name : "훌륭한 고급과일볶음",
            type : "heal",
            value : 30,
            tags : ["gift", "sweet", "great"],
            price : 300,           
        },
        normalFruitberryberry : {
            name : "고급과일볶음",
            type : "heal",
            value : 20,
            tags : ["gift", "sweet", "normal"],
            price : 200,           
        },
        badFruitberryberry : {
            name : "맛없는 고급과일볶음",
            type : "heal",
            value : 10,
            tags : ["gift", "sweet", "bad"],
            price : 100,           
        },

        greatFruitNectar : {
            name : "훌륭한 꿀과일볶음",
            type : "heal",
            value : 50,
            tags : ["gift", "sweet", "great"],
            price : 600,           
        },
        normalFruitNectar : {
            name : "꿀과일볶음",
            type : "heal",
            value : 40,
            tags : ["gift", "sweet", "normal"],
            price : 500,           
        },
        badFruitNectar : {
            name : "맛없는 꿀과일볶음",
            type : "heal",
            value : 30,
            tags : ["gift", "sweet", "bad"],
            price : 400,           
        },

        greatSmoothJelly : {
            name : "훌륭한 미끄덩젤리",
            type : "heal",
            value : 15,
            tags : ["gift", "sweet", "great"],
            price : 200,           
        },
        normalSmoothJelly : {
            name : "미끄덩젤리",
            type : "heal",
            value : 10,
            tags : ["gift", "sweet", "normal"],
            price : 150,           
        },
        badSmoothJelly : {
            name : "맛없는 미끄덩젤리",
            type : "heal",
            value : 5,
            tags : ["gift", "sweet", "bad"],
            price : 50,           
        },

        greatFruitSlimeLiquid : {
            name : "불미스러운 것이 들어간 훌륭한 과일 요리",
            type : "arousal",
            value : -25,
            tags : ["gift", "lusty", "great"],
            price : 150,           
        },
        normalFruitSlimeLiquid : {
            name : "불미스러운 것이 들어간 과일 요리",
            type : "arousal",
            value : -15,
            tags : ["gift", "lusty", "normal"],
            price : 100,           
        },
        badFruitSlimeLiquid : {
            name : "불미스러운 것이 들어간 맛없는 과일 요리",
            type : "arousal",
            value : -5,
            tags : ["gift", "lusty", "bad"],
            price : 50,           
        },

        greatWTFSlimeLiquid : {
            name : "훌륭하게 만들어진 불미스러운 수프",
            type : "arousal",
            value : -40,
            tags : ["gift", "lusty", "great"],
            price : 10,           
        },
        normalWTFSlimeLiquid : {
            name : "불미스러운 수프",
            type : "arousal",
            value : -20,
            tags : ["gift", "lusty", "normal"],
            price : 5,           
        },
        badWTFSlimeLiquid : {
            name : "맛없게 만들어진 불미스러운 수프",
            type : "arousal",
            value : -10,
            tags : ["gift", "lusty", "bad"],
            price : 0,           
        }
    },
    misc : {
        tornClothes: {
            name: "찢어진 천조각",
            type: "junk",
            price: 20
        },
        rustyRing: {
            name: "녹슨반지",
            type: "junk",
            price: 30
        },
        slimeJelly: {
            name: "슬라임젤리",
            type: "junk",
            price: 50
        },
        slimeCore: {
            name: "슬라임코어",
            type: "junk",
            price: 80
        },
        slimeLiquid: {
            name: "슬라임에서 나온 정체모를 액체. 만지고 싶지는 않다.",
            type: "junk",
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
            type: "junk",
            price: 100
        },
        flower: {
            name: "하얀꽃",
            type: "junk",
            price: 200
        },
        flowerNectar: {
            name: "넥타르",
            type: "junk",
            price: 300
        },
        flowerLeaf: {
            name: "꽃잎",
            type: "junk",
            price: 150
        },
        wildFruit: {
            name: "야생열매",
            type: "junk",
            price: 50
        },
        rareFruit: {
            name: "희귀한 숲열매",
            type: "junk",
            price: 150
        },
        bloodycloth : {
            name : "핏자국 남은 천조각",
            type : "junk",
            price : 40
        },
        pieceofwhiteflower : {
            name : "하얀꽃잎조각들",
            type : "junk",
            price : 100
        },
        skull : {
            name : "뼛조각",
            type: "junk",
            price : 25
        },
        drug : {
            name : "마약, 거지들도 구할 수 있을 정도의 싸구려 마약이다.",
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

        //강화재료
        ironOre: {
            name : "철광석",
            type : "junk",
            price : 500
        },
        silverOre: {
            name : "은광석",
            type : "junk",
            price : 650
        },
        goldOre: {
            name : "금광석",
            type : "junk",
            price : 800
        },
        whiteFlowerLeafStone: {
            name : "백화석",
            type : "junk",
            price : 1000
        },
        whiteHeart: {
            name : "백심장",
            type : "junk",
            price : 10000
        },
        ruby : {
            name : "루비",
            type : "junk",
            price : 8000
        },
        sapphire : {
            name : "사파이어",
            type : "junk",
            price : 8000
        },
        aquamarine : {
            name : "아쿠아마린",
            type : "junk",
            price : 8000
        },
        diamond : {
            name : "다이아몬드",
            type : "junk",
            price : 8000
        },
        pickaxe : {
            name : "곡괭이",
            type : "misc",
            price : 1000,
            desc : "광석을 캘 때 사용한다. 10번 사용하면 부서진다.",
            maxDurability : 10
        },

        //퀘스트물품
        beggersEars : {
            name : "거지들의 귀, 누가 가지려고 하겠는가.",
            type : "junk",
            price : 0
        },


        //중요물품
        matinLocket : {
            name : "낡은 하트모양 목걸이<br>누군가의 중요한 목걸이같다. 팔면 안 될 거 같은 느낌이 든다.",
            type : "key",
            price : 2000
        },
        honorMedal : {
            name : "상류도시 훈장",
            type : "key",
            price : 5000
        },
        dericLetter : {
            name : "데릭의 친필 서신",
            type : "key",
            price : 5000
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

function updateDerivedStats(player){
    player.derivedStats = player.derivedStats || {};
    const total = calculateTotalStats(player);

    player.derivedStats.atk =
        total.str * 1.1 + total.dex * 0.5;

    player.derivedStats.def =
        total.str * 0.7 + total.charm * 0.7;

    const fluidPenalty = (typeof getBodyFluidTotal === "function")
        ? Math.floor(getBodyFluidTotal(player) / 30)
        : 0;

    player.derivedStats.eva =
        Math.max(0, total.dex * 1.1 + total.int * 0.4 + total.charm * 0.5 - fluidPenalty);

    player.derivedStats.bodyFluidPenalty = fluidPenalty;

    player.derivedStats.mag =
        total.int * 1.2 + total.charm * 0.5;
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
            return invItem.uid === item.uid;
        }

        return invItem.key === item.key;
    });

    if (index === -1) return false;

    player.inventory.splice(index, 1);
    savePlayer(player);
    return true;
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

const RECIPES = {
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

    SmoothJelly : {
        name : "미끄덩젤리",
        desc : "미끄덩한 슬라임젤리 3개를 합쳐서 만든 요리, 재료만 모르면 맛있다!",

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
    }
};