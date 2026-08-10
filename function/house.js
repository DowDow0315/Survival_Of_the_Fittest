window.HOUSE_DATA = {

    under : {
        id : "under",
        name : "하류도시의 집",

        // 집으로 들어가는 거리
        entrance : "townStreet",

        // 집 내부 location
        location : "underHouse",

        price : 9000000
    },

    upper : {
        id : "upper",
        name : "상류도시의 집",

        entrance : "richTownStreet",
        location : "upperHouse",

        price : 80000000,

        // 상류도시 영웅 할인
        heroPrice : 60000000
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

    bearDoll : {
        id : "bearDoll",
        name : "곰 인형",
        type : "doll",
        price : 1000000
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

            furniture : {
                bed : "basicBed",
                table : null,
                chair : null,
                doll : null,
                decoration1 : null,
                decoration2 : null,
                decoration3 : null,
                decoration4 : null,
                decoration5 : null,
                decoration6 : null
            }

        };

    }


    // 상류도시 집
    if (!player.houses.upper){

        player.houses.upper = {

            owned : false,

            furniture : {
                bed : "basicBed",
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
            }

        };

    }

};


// 집 소유 여부
window.hasHouse = function(player, houseType){

    initPlayerHouses(player);

    return !!player.houses?.[houseType]?.owned;

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
        `눈을 뜨자 몸의 피로가 말끔하게 풀려 있었다.`,
        player,
        {
            onEnd : () => startScene(
                getLocationScene(player),
                player
            )
        }
    );

};