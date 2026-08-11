window.HOUSE_DATA = {

    under : {
        id : "under",
        name : "하류도시의 집",
        entrance : "townStreet",
        location : "underHouse",

        price : 9000000,

        farm : {
            startPlots : 1,
            maxPlots : 3,
            
            expansionPrices : {
                2 : 2000000,
                3 : 5000000
            }
        }
    },

    upper : {
        id : "upper",
        name : "상류도시의 집",

        entrance : "richTownStreet",
        location : "upperHouse",

        price : 80000000,
        // 상류도시 영웅 할인
        heroPrice : 60000000,

        farm : {
            startPlots : 2,
            maxPlots : 6,
            
            expansionPrices : {
                3 : 2000000,
                4 : 5000000,
                5 : 8000000,
                6 : 11000000
            }
        }
    }

};


// ==============================
// 가구 데이터
// ==============================

window.FURNITURE_DATA = {

    basicBed : {
        id : "basicBed",
        name : "낡은 침대",
        type : "bed",
        price : 0,
        rest : {
            stamina : 0.3,
            hp : 0.4,
            trauma : -2,
            time : 20
        }
    },

    softBed : {
        id : "softBed",
        name : "푹신한 침대",
        type : "bed",
        price : 1000000,
        rest : {
            stamina : 0.5,
            hp : 0.5,
            trauma : -3,
            time : 20
        }
    },

    luxuryBed : {
        id : "luxuryBed",
        name : "고급 침대",
        type : "bed",
        price : 5000000,
        rest : {
            stamina : 0.7,
            hp : 0.7,
            trauma : -5,
            time : 15
        }
    },

    basicBath : {
        id : "basicBath",
        name : "욕조",
        type : "bath",
        price : 4500000,
        
        cleanse : {
            multiplier : 1.5,
            time : 5
        }
    },
    
    luxuryBath : {
        id : "luxuryBath",
        name : "고급 욕조",
        type : "bath",
        price : 60000000,
        
        cleanse : {
            multiplier : 2,
            time : 5
        }
    },

    bearDoll : {
        id : "bearDoll",
        name : "곰 인형",
        type : "doll",
        price : 1000000
    },

    luxuryTeaSet : {
        id : "luxuryTeaSet",
        name : "고급 찻잔 세트",
        type : "decoration",
        price : 70000000
    }

};


// ==============================
// 플레이어 집 데이터 초기화
// ==============================

window.initPlayerHouses = function(player){

    if (!player.houses){
        player.houses = {};
    }


    // 하류도시 집
    if (!player.houses.under){

        player.houses.under = {

            owned : false,
            residents : [],

            furniture : {
                bed : "basicBed",
                bath : null,
                table : null,
                chair : null,
                doll : null,
                decoration1 : null,
                decoration2 : null,
                decoration3 : null,
                decoration4 : null,
                decoration5 : null,
                decoration6 : null
            },

            farm : {
                plotCount : 1,    
                plots : [
                    null
                ]
            }
        };
    }


    // 상류도시 집
    if (!player.houses.upper){

        player.houses.upper = {

            owned : false,
            residents : [],

            furniture : {
                bed : "basicBed",
                bath : null,
                table : null,
                chair : null,
                doll : null,
                decoration1 : null,
                decoration2 : null,
                decoration3 : null,
                decoration4 : null,
                decoration5 : null,
                decoration6 : null,
                decoration7 : null,
                decoration8 : null,
                decoration9 : null,
                decoration10 : null
            },

            farm : {
                plotCount : 2,    
                plots : [
                    null,
                    null
                ]
            }
        };
    }
};


// 집 소유 여부
window.hasHouse = function(player, houseType){
    initPlayerHouses(player);
    return !!player.houses?.[houseType]?.owned;
};

//집 매물 확인용 함수
window.check_underHouse = function(player){
    const price = getHousePrice(player, "under");
    startScene(
        [
            {
                type : "text",
                value :
                    "길거리 한쪽에 매물로 나온 집이 보인다." +
                    "<br><br>썩 좋은 집은 아니지만, 온전히 당신만의 공간으로 쓸 수 있을 것 같다." +
                    `<br><br>가격은 ${price.toLocaleString()}G다.`
            },
            {
                type : "choice",
                choices : [
                    {
                        text : `${price.toLocaleString()}G를 내고 집을 산다`,
                        action : "buy_underHouse"
                    },
                    {
                        text : "그만둔다",
                        action : "move_townStreet"
                    }
                ]
            }
        ],
        player
    );
};

window.buy_underHouse = function(player){
    buyHouse(player, "under");
};

window.check_upperHouse = function(player){
    const price =
        getHousePrice(player, "upper");
    const discountText =
        player.flags?.uppercityHero
            ? "<br><br>당신이 다가오자 거래인은 발렌님이 당신에게는 기존 가격보다 더 싼 가격을 제시하라고 미리 말을 해두었다는 말을 하며 고개를 숙였다."
            : "";
    startScene(
        [
            {
                type : "text",
                value :
                    "부유한 거리 한쪽에 매물로 나온 집이 보인다." +
                    "<br><br>넓고 잘 관리된 집이다." +
                    discountText +
                    `<br><br>가격은 ${price.toLocaleString()}G다.`
            },
            {
                type : "choice",
                choices : [
                    {
                        text : `${price.toLocaleString()}G를 내고 집을 산다`,
                        action : "buy_upperHouse"
                    },
                    {
                        text : "그만둔다",
                        action : "move_richTownStreet"
                    }
                ]
            }
        ],
        player
    );
};

window.buy_upperHouse = function(player){
    buyHouse(player, "upper");
};


//집 가격
window.getHousePrice = function(player, houseType){

    const house = HOUSE_DATA[houseType];

    if (!house){
        return 0;
    }
    if (
        houseType === "upper" &&
        player.flags?.uppercityHero
    ){
        return house.heroPrice;
    }
    return house.price;

};


//집 구매
window.buyHouse = function(player, houseType){

    initPlayerHouses(player);

    const house = HOUSE_DATA[houseType];

    if (!house){
        console.warn("존재하지 않는 집:", houseType);
        return;
    }


    if (player.houses[houseType].owned){

        showSingleTextScene(
            "이미 당신이 소유하고 있는 집이다.",
            player
        );

        return;
    }


    const price = getHousePrice(player, houseType);


    if (player.gold < price){

        showSingleTextScene(
            `집을 사기에는 돈이 부족하다.<br><br>필요한 금액 : ${price}G`,
            player
        );

        return;
    }


    changeGold(player, -price);

    player.houses[houseType].owned = true;

    savePlayer(player);


    startScene(
        [
            {
                type : "text",
                value :
                    `${price}G를 지불했다.<br><br>` +
                    `${house.name}이 이제 당신의 것이 되었다.`
            }
        ],
        player,
        {
            onEnd : () => startScene(
                getLocationScene(player),
                player
            )
        }
    );

};


//집 종류 변환
window.getCurrentHouseType = function(player){

    if (player.location === "underHouse"){
        return "under";
    }

    if (player.location === "upperHouse"){
        return "upper";
    }

    return null;

};


//현재 집 데이터
window.getCurrentHouse = function(player){

    initPlayerHouses(player);

    const type = getCurrentHouseType(player);

    if (!type){
        return null;
    }

    return player.houses[type];

};


//집 입장
window.enterHouse = function(player, houseType){
    initPlayerHouses(player);
    const house = HOUSE_DATA[houseType];
    if (!house){
        return;
    }
    if (!player.houses[houseType].owned){

        showSingleTextScene(
            "당신의 집이 아니다.",
            player
        );
        return;
    }

    player.location = house.location;
    savePlayer(player);
    if (checkAllEvents(player)){
        return;
    }
    startScene(
        getLocationScene(player),
        player
    );
};


window.enter_underHouse = function(player){
    enterHouse(player, "under");
};


window.enter_upperHouse = function(player){
    enterHouse(player, "upper");
};


//집에서 나가기
window.leaveHouse = function(player){

    const houseType = getCurrentHouseType(player);

    if (!houseType){
        return;
    }


    const house = HOUSE_DATA[houseType];

    player.location = house.entrance;

    savePlayer(player);


    startScene(
        getLocationScene(player),
        player
    );

};



//집 rest, sleep
window.houseRest = function(player){

    const house = getCurrentHouse(player);

    if (!house){
        return;
    }


    const bedId =
        house.furniture?.bed || "basicBed";


    const bed =
        FURNITURE_DATA[bedId] ||
        FURNITURE_DATA.basicBed;


    const rest = bed.rest;


    changeStamina(
        player,
        Math.floor(
            player.status.maxStamina *
            rest.stamina
        )
    );


    changeHP(
        player,
        Math.floor(
            player.status.maxHp *
            rest.hp
        )
    );


    changeTrauma(
        player,
        rest.trauma
    );


    passTime(
        player,
        rest.time
    );


    savePlayer(player);


    showSingleTextScene(
        `${bed.name}에 몸을 눕히고 잠시 쉬었다.`,
        player,
        {
            onEnd : () => startScene(
                getLocationScene(player),
                player
            )
        }
    );

};

window.houseSleep = function(player){

    const house = getCurrentHouse(player);

    if (!house){
        return;
    }


    const bedId =
        house.furniture?.bed || "basicBed";


    const bed =
        FURNITURE_DATA[bedId] ||
        FURNITURE_DATA.basicBed;


    player.status.hp =
        player.status.maxHp;

    player.status.stamina =
        player.status.maxStamina;


    changeTrauma(player, -4);

    passTime(player, 80);

    savePlayer(player);


    showSingleTextScene(
        `${bed.name}에서 푹 잠들었다.<br><br>` +
        `당신의 집이라서 그런지, 당신은 조금 더 편안하게 잘 수 있었다. 피로가 회복됐다.`,
        player,
        {
            onEnd : () => startScene(
                getLocationScene(player),
                player
            )
        }
    );
};

//농작물
window.CROP_DATA = {

    potato : {
        id : "potato",
        name : "감자",

        seedItem : "potatoSeed",
        harvestItem : "potato",

        requiredWaterings : 5,
        harvestAmount : 4
    },

    cabbage : {
        id : "cabbage",
        name : "배추",

        seedItem : "cabbageSeed",
        harvestItem : "cabbage",

        requiredWaterings : 6,
        harvestAmount : 3
    },

    mushroom : {
        id : "mushroom",
        name : "버섯",

        seedItem : "mushroomSeed",
        harvestItem : "mushroom",

        requiredWaterings : 5,
        harvestAmount : 4
    },

    wheat : {
        id : "wheat",
        name : "밀",

        seedItem : "wheatSeed",
        harvestItem : "wheat",

        requiredWaterings : 10,
        harvestAmount : 3
    },

    rice : {
        id : "rice",
        name : "쌀",

        seedItem : "riceSeed",
        harvestItem : "rice",

        requiredWaterings : 12,
        harvestAmount : 3
    },

    pepper : {
        id : "pepper",
        name : "고추",

        seedItem : "pepperSeed",
        harvestItem : "pepper",

        requiredWaterings : 22,
        harvestAmount : 3
    }
};

//농사
window.openHouseFarm = function(player){

    const houseType = getCurrentHouseType(player);
    const house = getCurrentHouse(player);

    if (!houseType || !house?.farm){
        return;
    }

    const farm = house.farm;

    const choices = farm.plots.map((plot, index) => {

        if (!plot){
            return {
                text : `밭 ${index + 1} - 비어 있음`,
                action : `openFarmPlot_${index}`
            };
        }

        const crop = CROP_DATA[plot.crop];

        if (!crop){
            return {
                text : `밭 ${index + 1} - 알 수 없는 작물`,
                action : `openFarmPlot_${index}`
            };
        }

        const ready =
            plot.waterCount >= crop.requiredWaterings;

        return {
            text :
                `밭 ${index + 1} - ${crop.name} ` +
                `${ready ? "(수확 가능)" : `(${plot.waterCount}/${crop.requiredWaterings})`}`,
            action : `openFarmPlot_${index}`
        };
    });


    const houseData = HOUSE_DATA[houseType];

    if (farm.plotCount < houseData.farm.maxPlots){

        const nextCount = farm.plotCount + 1;
        const price =
            houseData.farm.expansionPrices[nextCount];

        choices.push({
            text :
                `밭을 확장한다 ` +
                `(${nextCount}칸 / ${price}G)`,
            action : "expandHouseFarm"
        });
    }


    choices.push({
        text : "돌아간다",
        action : "returnToHouseScene"
    });


    startScene(
        [
            {
                type : "text",
                value :
                    `당신은 집의 텃밭을 살펴보았다.` +
                    `<br><br>현재 사용할 수 있는 밭은 ${farm.plotCount}칸이다.`
            },
            {
                type : "choice",
                choices
            }
        ],
        player
    );
};

window.openFarmPlot = function(player, plotIndex){

    const house = getCurrentHouse(player);

    if (!house?.farm){
        return;
    }

    const plot = house.farm.plots[plotIndex];

    if (!plot){

        startScene(
            [
                {
                    type : "text",
                    value :
                        `밭 ${plotIndex + 1}은 비어 있다.` +
                        `<br><br>무엇을 심을까?`
                },
                {
                    type : "choice",
                    choices : buildSeedChoices(
                        player,
                        plotIndex
                    )
                }
            ],
            player
        );

        return;
    }

    const crop = CROP_DATA[plot.crop];

    if (!crop){
        return;
    }


    const ready =
        plot.waterCount >=
        crop.requiredWaterings;


    const today =
        getCurrentDay(player);


    const wateredToday =
        plot.lastWateredDay === today;


    const choices = [];


    if (ready){

        choices.push({
            text : `${crop.name}을 수확한다`,
            action : `harvestFarmPlot_${plotIndex}`
        });

    } else {

        choices.push({
            text :
                wateredToday
                    ? "오늘은 이미 물을 줬다"
                    : "물을 준다 (스테미너 -10)",
            action :
                wateredToday
                    ? `farmAlreadyWatered_${plotIndex}`
                    : `waterFarmPlot_${plotIndex}`
        });

    }


    choices.push({
        text : "돌아간다",
        action : "openHouseFarm"
    });


    startScene(
        [
            {
                type : "text",
                value :
                    `${crop.name}이 자라고 있다.` +
                    `<br><br>성장도 : ${plot.waterCount} / ${crop.requiredWaterings}` +
                    (
                        ready
                            ? `<br><br>충분히 자랐다. 이제 수확할 수 있다.`
                            : wateredToday
                                ? `<br><br>오늘은 이미 물을 줬다.`
                                : `<br><br>오늘은 아직 물을 주지 않았다.`
                    )
            },
            {
                type : "choice",
                choices
            }
        ],
        player
    );
};

for (let i = 0; i < 6; i++){
    window[`openFarmPlot_${i}`] = function(player){
        openFarmPlot(player, i);
    };
}

for (let i = 0; i < 6; i++){
    window[`farmAlreadyWatered_${i}`] = function(player){
        showSingleTextScene(
            "오늘은 이미 이 작물에 물을 줬다.",
            player,
            {
                onEnd : () =>
                    openFarmPlot(player, i)
            }
        );
    };
}

window.buildSeedChoices = function(player, plotIndex){

    const choices = [];


    Object.values(CROP_DATA).forEach(crop => {

        const hasSeed =
            player.inventory?.some(
                item =>
                    item.key === crop.seedItem
            );


        if (!hasSeed){
            return;
        }


        choices.push({
            text : `${crop.name}을 심는다`,
            action :
                `plant_${crop.id}_${plotIndex}`
        });

    });


    if (choices.length === 0){

        choices.push({
            text : "심을 수 있는 씨앗이 없다",
            action : "noFarmSeeds"
        });

    }
    choices.push({
        text : "돌아간다",
        action : "openHouseFarm"
    });
    return choices;
};

window.noFarmSeeds = function(player){
    showSingleTextScene(
        "가지고 있는 씨앗이 없다.",
        player,
        {
            onEnd : () => openHouseFarm(player)
        }
    );
};

Object.keys(CROP_DATA).forEach(cropId => {

    for (let i = 0; i < 6; i++){

        window[`plant_${cropId}_${i}`] =
            function(player){

                plantCrop(
                    player,
                    i,
                    cropId
                );

            };

    }

});

window.plantCrop = function(
    player,
    plotIndex,
    cropId
){

    const house =
        getCurrentHouse(player);

    if (!house?.farm){
        return;
    }


    if (house.farm.plots[plotIndex]){
        showSingleTextScene(
            "이미 무언가가 심어져 있다.",
            player
        );
        return;
    }


    const crop =
        CROP_DATA[cropId];

    if (!crop){
        return;
    }


    const removed =
        removeItemByKey(
            player,
            crop.seedItem,
            1
        );


    if (removed < 1){

        showSingleTextScene(
            "필요한 씨앗이 없다.",
            player
        );

        return;
    }


    house.farm.plots[plotIndex] = {

        crop : cropId,

        waterCount : 0,

        lastWateredDay : null

    };


    savePlayer(player);


    startScene(
        [
            {
                type : "text",
                value :
                    `${crop.name} 씨앗을 밭에 심었다.` +
                    `<br><br>이제 꾸준히 물을 줘야 한다.`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseFarm(player)
        }
    );
};

window.waterFarmPlot = function(
    player,
    plotIndex
){

    const house =
        getCurrentHouse(player);

    const plot =
        house?.farm?.plots?.[plotIndex];


    if (!plot){
        return;
    }


    const crop =
        CROP_DATA[plot.crop];

    if (!crop){
        return;
    }


    if (
        plot.waterCount >=
        crop.requiredWaterings
    ){

        showSingleTextScene(
            "이미 충분히 자랐다.",
            player
        );

        return;
    }


    const today =
        getCurrentDay(player);


    if (
        plot.lastWateredDay === today
    ){

        showSingleTextScene(
            "오늘은 이미 물을 줬다.",
            player
        );

        return;
    }

    if (
        player.status.stamina < 10
    ){

        showSingleTextScene(
            "너무 지쳐서 물을 줄 수 없다.",
            player
        );

        return;
    }
    changeStamina(
        player,
        -10
    );
    plot.waterCount += 1;
    plot.lastWateredDay =
        today;
    passTime(
        player,
        5
    );
    savePlayer(player);
    const ready =
        plot.waterCount >=
        crop.requiredWaterings;
    startScene(
        [
            {
                type : "text",
                value :
                    `${crop.name}에 물을 줬다.` +
                    `<br><br>성장도 : ${plot.waterCount} / ${crop.requiredWaterings}` +
                    (
                        ready
                            ? `<br><br>${crop.name}이 충분히 자랐다. 이제 수확할 수 있다.`
                            : ""
                    )
            }
        ],
        player,
        {
            onEnd : () =>
                openFarmPlot(
                    player,
                    plotIndex
                )
        }
    );
};

for (let i = 0; i < 6; i++){
    window[`waterFarmPlot_${i}`] = function(player){
        waterFarmPlot(player, i);
    };
}

window.harvestCrop = function(
    player,
    plotIndex
){

    const house =
        getCurrentHouse(player);

    const plot =
        house?.farm?.plots?.[plotIndex];


    if (!plot){
        return;
    }


    const crop =
        CROP_DATA[plot.crop];


    if (!crop){
        return;
    }


    if (
        plot.waterCount <
        crop.requiredWaterings
    ){

        showSingleTextScene(
            "아직 수확하기에는 이르다.",
            player
        );

        return;
    }


    const item =
        ITEMS.misc?.[
            crop.harvestItem
        ];


    if (!item){

        console.warn(
            "수확 아이템을 찾을 수 없음:",
            crop.harvestItem
        );

        return;
    }


    for (
        let i = 0;
        i < crop.harvestAmount;
        i++
    ){

        addItem(
            player,
            item
        );

    }


    // 밭 초기화
    house.farm.plots[plotIndex] =
        null;


    savePlayer(player);


    startScene(
        [
            {
                type : "text",
                value :
                    `${crop.name}을 수확했다.` +
                    `<br><br>${crop.name} × ${crop.harvestAmount} 획득!`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseFarm(player)
        }
    );
};

for (let i = 0; i < 6; i++){
    window[`harvestFarmPlot_${i}`] = function(player){
        harvestCrop(player, i);
    };
}

window.expandHouseFarm = function(player){

    const houseType =
        getCurrentHouseType(player);

    const house =
        getCurrentHouse(player);


    if (!houseType || !house?.farm){
        return;
    }


    const data =
        HOUSE_DATA[houseType]?.farm;


    if (!data){
        return;
    }


    const current =
        house.farm.plotCount;


    if (current >= data.maxPlots){

        showSingleTextScene(
            "더 이상 밭을 늘릴 공간이 없다.",
            player
        );

        return;
    }


    const next =
        current + 1;


    const price =
        data.expansionPrices[next];


    if (
        player.gold < price
    ){

        showSingleTextScene(
            `밭을 늘리기에는 돈이 부족하다.` +
            `<br><br>필요한 금액 : ${price}G`,
            player
        );

        return;
    }


    changeGold(
        player,
        -price
    );


    house.farm.plotCount =
        next;


    house.farm.plots.push(
        null
    );


    savePlayer(player);


    startScene(
        [
            {
                type : "text",
                value :
                    `${price}G를 들여 텃밭을 넓혔다.` +
                    `<br><br>이제 밭 ${next}칸을 사용할 수 있다.`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseFarm(player)
        }
    );
};

window.returnToHouseScene = function(player){

    startScene(
        getLocationScene(player),
        player
    );

};

//가구 사기
window.initFurnitureInventory = function(player){
    if (!player.furnitureInventory){
        player.furnitureInventory = [];
    }
};

window.buyFurniture = function(player, furnitureId){
    initFurnitureInventory(player);
    const furniture =
        FURNITURE_DATA[furnitureId];
        
    if (!furniture){
        return;
    }
        
    if (player.gold < furniture.price){
        addLog("돈이 부족하다.");
        return;
    }
        
    changeGold(
        player,
        -furniture.price
    );
        
    player.furnitureInventory.push(
        furnitureId
    );
        
    savePlayer(player);
        
    addLog(
        `${furniture.name} 구매!`
    );
};

window.openHouseFurniture = function(player){
    const house = getCurrentHouse(player);
    
    if (!house){
        return;
    }

    const choices = [
        {
            text : "침대를 바꾼다",
            action : "openHouseBedFurniture"
        },
        {
            text : "욕조를 바꾼다",
            action : "openHouseBathFurniture"
        },
        {
            text : "인형을 배치한다",
            action : "openHouseDollFurniture"
        },
        {
            text : "장식품을 배치한다",
            action : "openHouseDecorationFurniture"
        },
        {
            text : "돌아간다",
            action : "returnToHouseScene"
        }
    ];

    startScene(
        [
            {
                type : "text",
                value :
                    "집에 놓인 가구를 살펴보았다." +
                    "<br><br>무엇을 바꿀까?"
            },
            {
                type : "choice",
                choices
            }
        ],
        player
    );
};

window.openHouseBedFurniture = function(player){
    openFurnitureTypeMenu(
        player,
        "bed",
        "침대"
    );
};

window.openHouseBathFurniture = function(player){
    openFurnitureTypeMenu(
        player,
        "bath",
        "욕조"
    );
};

window.openHouseDollFurniture = function(player){
    openFurnitureTypeMenu(
        player,
        "doll",
        "인형"
    );
};

window.openFurnitureTypeMenu = function(
    player,
    furnitureType,
    typeName
){
    initFurnitureInventory(player);
    const house = getCurrentHouse(player);
    if (!house){
        return;
    }

    const choices = [];

    const ownedFurniture =
        player.furnitureInventory.filter(
            furnitureId =>
                FURNITURE_DATA[furnitureId]?.type ===
                furnitureType
        );

    // 중복 가구는 버튼 하나로만 표시
    const uniqueIds =
        [...new Set(ownedFurniture)];

    uniqueIds.forEach(furnitureId => {
        const furniture =
            FURNITURE_DATA[furnitureId];

        const count =
            ownedFurniture.filter(
                id => id === furnitureId
            ).length;

        choices.push({
            text :
                `${furniture.name}` +
                `${count > 1 ? ` ×${count}` : ""}`,
            action :
                `installFurniture_${furnitureId}`
        });
    });

    if (uniqueIds.length === 0){
        choices.push({
            text : `보유한 ${typeName}가 없다`,
            action : "noOwnedFurniture"
        });

    }

    // 현재 설치된 가구를 빼는 기능
    const current =
        house.furniture?.[furnitureType];
    if (
        current &&
        current !== "basicBed"
    ){
        choices.push({
            text : "현재 가구를 치운다",
            action :
                `removeFurniture_${furnitureType}`
        });
    }

    choices.push({
        text : "돌아간다",
        action : "openHouseFurniture"
    });

    startScene(
        [
            {
                type : "text",
                value :
                    `보유한 ${typeName}를 살펴보았다.` +
                    (
                        current
                            ? `<br><br>현재 배치 : ${
                                FURNITURE_DATA[current]?.name ||
                                "알 수 없음"
                            }`
                            : `<br><br>현재 배치된 ${typeName}가 없다.`
                    )
            },
            {
                type : "choice",
                choices
            }
        ],
        player
    );
};

window.installFurniture = function(
    player,
    furnitureId
){
    initFurnitureInventory(player);
    const house =
        getCurrentHouse(player);
    const furniture =
        FURNITURE_DATA[furnitureId];

    if (!house || !furniture){
        return;
    }

    const index =
        player.furnitureInventory.indexOf(
            furnitureId
        );

    if (index === -1){
        showSingleTextScene(
            "가지고 있지 않은 가구다.",
            player
        );
        return;
    }

    if (furniture.type === "decoration"){
        installDecoration(
            player,
            furnitureId
        );
        return;
    }

    const slot = furniture.type;
    const oldFurniture = house.furniture?.[slot];

    // 기존 가구가 있으면 회수
    // 기본 침대는 집 기본 제공이라 회수하지 않음
    if (
        oldFurniture &&
        oldFurniture !== "basicBed"
    ){

        player.furnitureInventory.push(
            oldFurniture
        );
    }

    player.furnitureInventory.splice(
        index,
        1
    );

    house.furniture[slot] =
        furnitureId;
    savePlayer(player);

    startScene(
        [
            {
                type : "text",
                value :
                    `${furniture.name}을/를 집에 배치했다.`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseFurniture(player)
        }
    );
};

Object.keys(FURNITURE_DATA).forEach(
    furnitureId => {
        window[
            `installFurniture_${furnitureId}`
        ] = function(player){
            installFurniture(
                player,
                furnitureId
            );
        };
    }
);

window.removeFurniture = function(
    player,
    furnitureType
){
    initFurnitureInventory(player);
    const house =
        getCurrentHouse(player);
    if (!house){
        return;
    }
    const current =
        house.furniture?.[furnitureType];
    if (!current){
        return;
    }
    if (current === "basicBed"){
        return;
    }
    player.furnitureInventory.push(
        current
    );
    house.furniture[furnitureType] =
        furnitureType === "bed"
            ? "basicBed"
            : null;
    savePlayer(player);

    startScene(
        [
            {
                type : "text",
                value :
                    `${FURNITURE_DATA[current]?.name || "가구"}을 치웠다.`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseFurniture(player)
        }
    );
};

window.removeFurniture_bed = function(player){
    removeFurniture(player, "bed");
};

window.removeFurniture_bath = function(player){
    removeFurniture(player, "bath");
};

window.removeFurniture_doll = function(player){
    removeFurniture(player, "doll");
};

window.noOwnedFurniture = function(player){
    showSingleTextScene(
        "배치할 수 있는 가구를 가지고 있지 않다.",
        player,
        {
            onEnd : () =>
                openHouseFurniture(player)
        }
    );
};

window.openHouseDecorationFurniture = function(player){
    initFurnitureInventory(player);
    const house = getCurrentHouse(player);
    if (!house){
        return;
    }

    const choices = [];

    const ownedDecorations =
        player.furnitureInventory.filter(
            furnitureId =>
                FURNITURE_DATA[furnitureId]?.type === "decoration"
        );
    const uniqueIds =
        [...new Set(ownedDecorations)];
    uniqueIds.forEach(furnitureId => {
        const furniture =
            FURNITURE_DATA[furnitureId];
        const count =
            ownedDecorations.filter(
                id => id === furnitureId
            ).length;
        choices.push({
            text :
                `${furniture.name}을/를 배치한다` +
                `${count > 1 ? ` ×${count}` : ""}`,

            action :
                `installFurniture_${furnitureId}`
        });
    });

    const decorationSlots =
        Object.keys(house.furniture)
            .filter(key =>
                key.startsWith("decoration")
            );

    const installedDecorations =
        decorationSlots.filter(
            slot =>
                !!house.furniture[slot]
        );

    installedDecorations.forEach(slot => {
        const furnitureId =
            house.furniture[slot];
        const furniture =
            FURNITURE_DATA[furnitureId];
        choices.push({
            text :
                `${furniture?.name || "장식품"}을 치운다`,
            action :
                `removeDecoration_${slot}`
        });
    });

    if (
        uniqueIds.length === 0 &&
        installedDecorations.length === 0
    ){
        choices.push({
            text : "보유하거나 배치한 장식품이 없다",
            action : "noOwnedFurniture"
        });
    }
    choices.push({
        text : "돌아간다",
        action : "openHouseFurniture"
    });

    startScene(
        [
            {
                type : "text",
                value :
                    "집의 장식품을 살펴보았다." +
                    `<br><br>` +
                    `배치된 장식품 : ${installedDecorations.length} / ${decorationSlots.length}`
            },
            {
                type : "choice",
                choices
            }
        ],
        player
    );
};

window.installDecoration = function(
    player,
    furnitureId
){
    initFurnitureInventory(player);
    const house = getCurrentHouse(player);
    const furniture = FURNITURE_DATA[furnitureId];
    if (!house || !furniture){
        return;
    }

    const inventoryIndex =
        player.furnitureInventory.indexOf(
            furnitureId
        );

    if (inventoryIndex === -1){
        showSingleTextScene(
            "가지고 있지 않은 장식품이다.",
            player
        );
        return;
    }

    // 비어 있는 장식 슬롯 찾기
    const decorationSlots =
        Object.keys(house.furniture)
            .filter(key =>
                key.startsWith("decoration")
            );

    const emptySlot =
        decorationSlots.find(
            key =>
                !house.furniture[key]
        );

    if (!emptySlot){
        showSingleTextScene(
            "더 이상 장식품을 놓을 공간이 없다.",
            player
        );
        return;
    }

    // 보유 목록에서 1개 제거
    player.furnitureInventory.splice(
        inventoryIndex,
        1
    );

    // 빈 슬롯에 설치
    house.furniture[emptySlot] =
        furnitureId;
    savePlayer(player);

    startScene(
        [
            {
                type : "text",
                value :
                    `${furniture.name}을 집에 장식했다.`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseFurniture(player)
        }
    );
};

window.removeDecoration = function(
    player,
    slot
){
    initFurnitureInventory(player);
    const house =
        getCurrentHouse(player);
    if (!house){
        return;
    }

    const furnitureId =
        house.furniture?.[slot];

    if (!furnitureId){
        return;
    }

    const furniture =
        FURNITURE_DATA[furnitureId];

    player.furnitureInventory.push(
        furnitureId
    );

    house.furniture[slot] =
        null;
    savePlayer(player);

    startScene(
        [
            {
                type : "text",
                value :
                    `${furniture?.name || "장식품"}을 치웠다.`
            }
        ],
        player,
        {
            onEnd : () =>
                openHouseDecorationFurniture(player)
        }
    );
};

for (let i = 1; i <= 10; i++){
    const slot =
        `decoration${i}`;
    window[`removeDecoration_${slot}`] =
        function(player){
            removeDecoration(
                player,
                slot
            );
        };
}

//동거 관련
window.addHouseResident = function(
    player,
    houseType,
    npcId
){
    initPlayerHouses(player);
    const house =
        player.houses?.[houseType];
    if (!house){
        return;
    }
    if (!house.residents.includes(npcId)){
        house.residents.push(npcId);
    }
    savePlayer(player);
};

window.removeHouseResident = function(
    player,
    houseType,
    npcId
){
    initPlayerHouses(player);
    const house =
        player.houses?.[houseType];
    if (!house){
        return;
    }
    house.residents =
        house.residents.filter(
            id => id !== npcId
        );
    savePlayer(player);
};

window.hasAnyCurrentHouseResident = function(player){
    const houseType =
        getCurrentHouseType(player);
    if (!houseType){
        return false;
    }
    const residents =
        player.houses?.[houseType]?.residents;
    return (
        Array.isArray(residents) &&
        residents.length > 0
    );
};

window.canNpcVisitHouse = function(
    player,
    npcId
){
    const time =
        getTimePeriod(player);
    // 이 NPC가 현재 집 동거인이면
    // '방문' 이벤트는 나오지 않음
    if (
        currentHouseHasResident(
            player,
            npcId
        )
    ){
        return false;
    }
    // 현재 집에 동거인이 있고
    // 밤/새벽이면 외부 방문 금지
    if (
        (
            time === "night" ||
            time === "dawn"
        ) &&
        hasAnyCurrentHouseResident(player)
    ){
        return false;
    }
    return true;
};

//helper
window.houseHasFurniture = function(
    player,
    houseType,
    furnitureId
){
    initPlayerHouses(player);
    const furniture =
        player.houses?.[houseType]?.furniture;

    if (!furniture){
        return false;
    }

    return Object.values(
        furniture
    ).includes(
        furnitureId
    );
};

window.currentHouseHasFurniture = function(
    player,
    furnitureId
){
    const houseType =
        getCurrentHouseType(player);
    if (!houseType){
        return false;
    }
    return houseHasFurniture(
        player,
        houseType,
        furnitureId
    );
};

window.houseHasResident = function(
    player,
    houseType,
    npcId
){
    initPlayerHouses(player);
    const residents =
        player.houses?.[houseType]?.residents;
    if (!residents){
        return false;
    }
    return residents.includes(
        npcId
    );
};

window.currentHouseHasResident = function(
    player,
    npcId
){
    const houseType =
        getCurrentHouseType(player);

    if (!houseType){
        return false;
    }
    return houseHasResident(
        player,
        houseType,
        npcId
    );
};