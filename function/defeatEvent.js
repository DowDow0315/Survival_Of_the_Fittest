const DEFEAT_EVENTS = {
    rapistM : [
        {
            id: "rapistM_defeat",
            weight: 50,
            scene : [
                {
                    type : "text",
                    value : {
                        male : [
                            "남자는 쓰러진 당신을 질질 구석으로 끌고 가더니 별 말 없이 당신의 배를 바닥에 붙여서 눕혔다. 당신이 정신을 차리기도 전에 남자는 당신의 머리를 길바닥에 찍어누르고 그대로 당신의 엉덩이에 자신의 성기를 삽입했다. 움찔하는 당신의 몸을 억누른 채 남자는 계속 추삽질을 이어나갔다. 남자의 성기가 당신의 깊은 곳을 누를 때마다 당신의 몸은 목각인형처럼 삐걱거렸다.<br>",
                            "\"암캐년. 이렇게 뒷구멍이 쫄깃한 주제에 어디 가서 수컷이라고 말하고 다니면 누가 믿어줘?\"<br>",
                            "남자는 뒷구멍을 찔리는데도 반응하는 당신을 비웃으며 계속 추삽질을 이어갔다. 당신의 배가 그의 성기 윤곽에 따라 볼록해졌다가 들어가는 것을 반복했다. 남자의 숨소리가 점점 거칠어진다. 당신의 그의 거친 숨소리 밑에서 저항 하나 못하고 암캐처럼 엉덩이만 떨어야만 했다. 당신의 깊은곳을 찌르던 남자가 움직임을 멈추더니 당신의 배 쪽으로 손을 들이밀어 당신의 엉덩이를 자신의 몸에 더 붙게 했다. 더 깊게 들어오는 남자의 성기에 당신의 몸은 자지러졌다. 남자는 몇 번을 더 찌르다가 당신의 가장 깊은 곳에 정액을 싸질렀다.",
                            "남자는 당신의 애널에 성기를 꽂은 채로 당신의 엉덩이를 짜악 때렸다. 정액이 범벅된 당신의 엉덩이 안에서 몇 초간 성기를 부르르 떨던 그는 자리에서 일어나더니 당신을 방치한 채 다른 길로 사라져갔다."
                        ],
                        female : [
                            "남자는 쓰러진 당신을 질질 구석으로 끌고 가더니 당신을 길바닥에 집어던졌다. 그러더니 당신의 두 손목을 잡아 위로 올리고 발로 당신의 발을 차서 당신의 다리를 억지로 벌러버렸다. 그는 당신이 다시 다리를 오므리지 못하게 단단한 허벅지로 막은 후, 자신의 성기를 그대로 당신의 보지에 처넣었다. 배려 따위는 없는 삽입에 당신은 고통스러워 머리를 뒤로 젖혔다. 하지만 머리를 뒤로 젖혀봤자 당신의 뒤통수가 벽에 닿을 뿐이었다. 남자는 웃으며 추삽질을 이어갔다.<br>",
                            "\"걸레면 걸레답게 굴어.\"<br>",
                            "남자는 억지로 당신에게 키스를 하며 계속 교배를 이어갔다. 남자가 당신에게 추삽질할 때마다 당신의 벌어진 다리는 위아래로 절뚝절뚝 흔들렸다. 당신이 몸의 중심을 주체하지 못하고 남자의 품으로 쓰러질 때까지 남자는 당신의 보지를 박아댔다. 계속 키스를 하며 남자는 점점 더 빠르게 추삽질을 행했다.",
                            "절정에 이르렀을 때 남자는 당신의 보지에 그대로 정액을 싸질렀다. 그는 정액을 한 방울이라도 흘리는 걸 용납하지 않았다. 성기를 박은 채 거친 숨을 몰아쉬던 남자는 웃으며 당신의 머리를 쓰다듬었다. 다음 번에 또 보자는 위협이다. 그는 자리에서 일어나더니 당신을 방치한 채 다른 길로 사라져갔다."
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -10);
                    changeStamina(player, -10);
                    changeArousal(player, 20);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 5
                    );
                    passTime(player, 20)

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 8);
                   addBodyFluid(player, "a", 10);
                   } else {
                   changeSensitivity(player, "cSensitivity", 8);
                   changeSensitivity(player, "mSensitivity", 8);
                   addBodyFluid(player, "c", 20);
                   }
                   }
                }
            ]
        },
        {
            id : "rapistM_training",
            weight : 50,
            scene : [
                {
                    type : "effect",
                    run: (player) => {
                        startTraining(player, {
                            trainerId: "rapistM",
                            maxTurns : 12,
                            introLog : "남자는 당신의 입을 막고 구석으로 끌고 갔다. 쉽게 끝내주지 않을 생각인 거 같다.",
                            onEnd: () => {
                                showSingleTextScene("남자는 당신을 길바닥에 던지고 가버렸다.",
                                    player
                                );
                            }
                        });

                        return true;
                    }
                }
            ]
        }
    ],
    rapistF : [
        {
            id: "rapistF_defeat",
            weight: 50,
            scene : [
                {
                    type : "text",
                    value : {
                        male : [
                            "여자는 당신을 구석으로 이끌었다. 여자는 당신을 눕히고 그 위로 올라탔다. 당신의 성기를 품은 채 여자는 허리를 흔들며 교성을 내질렀다. 당신이 조금이라도 움직이려고 하면 여자는 당신을 교정하듯이 당신의 몸을 내리쳤다.",
                            "자신이 절정할 때까지 당신을 인간딜도로 이용한 여자는 곧 미소를 지으며 당신의 위에서 내려왔다. 성욕이 남기고 잔 자리에는 당신의 굴욕밖에 남지 않았다."
                        ],
                        female : [
                            "여자는 당신을 구석으로 이끌었다. 그러더니 당신에게 키스를 강요하면서 당신의 보지 안으로 제 손가락을 집어넣었다. 몇 번이고 손가락으로 당신의 보지를 쑤시던 여자는 이윽고 자신의 보지를 당신의 보지에 맞대면서 몸을 흔들었다.",
                            "언제 가져왔는지 당신과 여자의 보지 사이에는 투명한 병같은 것이 있었다. 그걸로 동시 삽입하면서 여자는 당신의 고통과 쾌락을 즐겼다. 여자는 자신이 절정하고 나서야 당신을 놓아주었다."
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -10);
                    changeStamina(player, -10);
                    changeArousal(player, 20);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 5
                    );
                    passTime(player, 20)

                   if (player.gender === "male"){
                   changeSensitivity(player, "cSensitivity", 8);
                   } else {
                   changeSensitivity(player, "cSensitivity", 8);
                   changeSensitivity(player, "mSensitivity", 8);
                   }
                   }
                }
            ]
        },
        {
            id : "rapistF_training",
            weight : 50,
            scene : [
                {
                    type : "effect",
                    run: (player) => {
                        startTraining(player, {
                            trainerId: "rapistF",
                            maxTurns : 12,
                            introLog : "여자는 당신을 끌고 구석으로 들어갔다. 그는 웃으면서 당신의 몸에 자신의 몸을 밀착했다. 쉽게 끝내주지 않을 생각인 모양이다.",
                            onEnd: () => {
                                showSingleTextScene("여자는 쓰러져있는 당신을 흘낏 보더니 휙 가버렸다.",
                                    player
                                );
                            }
                        });

                        return true;
                    }
                }
            ]
        }
    ],
    begger: [
         {
            id: "begger_defeat",
            weight: 100,
            scene : [
                {
                    type : "text",
                    value : {
                        male : [
                            "거지는 그대로 당신의 몸을 덮쳐누르고 당신의 구멍을 유린하기 시작했다. 그는 당신의 가슴을 밀가루 반죽하듯이 주무르면서 계속 뒤로는 성기를 삽입했다. 거지의 성기 크기에 점점 익숙해진 엉덩이 구멍은 시간이 지나면서 점점 쫀득하게 움직였다. 거지의 성기가 나감과 들어감에 따라서 당신의 엉덩이 구멍은 쭈압쭈압 벌어졌다 오므려지는 것을 반복했다.",
                            "어느 정도 성욕을 푼 거지는 당신의 돈을 가져가기 위해 당신의 소지품을 뒤졌다. 당신의 소지품을 뒤지려던 누군가의 그림자에 흠칫 놀라더니 그대로 도망가버렸다. 거지가 도망간 후, 당신은 간신히 일어났다."
                        ],
                        female : [
                            "거지는 그대로 당신의 몸을 덮쳐누르고 당신의 구멍을 유린하기 시작했다. 그는 당신의 가슴을 밀가루 반죽하듯이 주무르면서 계속 뒤로는 성기를 삽입했다. 거지의 성기 크기에 점점 익숙해진 보지는 시간이 지나면서 점점 쫀득하게 움직였다. 거지의 성기가 나감과 들어감에 따라서 당신의 보지는 쭈압쭈압 벌어졌다 오므려지는 것을 반복했다.",
                            "어느 정도 성욕을 푼 거지는 당신의 돈을 가져가기 위해 당신의 소지품을 뒤졌다. 당신의 소지품을 뒤지려던 누군가의 그림자에 흠칫 놀라더니 그대로 도망가버렸다. 거지가 도망간 후, 당신은 간신히 일어났다."
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -10);
                    changeStamina(player, -10);
                    changeArousal(player, 20);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 5
                    );
                    passTime(player, 20)

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 10);
                   addBodyFluid(player, "a", 20);
                   } else {
                   changeSensitivity(player, "cSensitivity", 10);
                   addBodyFluid(player, "c", 20);
                   }

                   const stealAmount = player.gold >= 500 ? 500 : player.gold;
                   changeGold(player, -stealAmount);
                   }
                }
            ]
        }
    ],
    beggers: [
         {
            id: "beggers_defeat",
            weight: 100,
            scene : [
                {
                    type : "text",
                    value : {
                        male : [
                            "끔찍한 시간이었다. 그대로 거지들에게 끌려간 당신은 모든 구멍을 거지들에게 유린당했다. 당신은 엉덩이와 입을 무차별적으로 범해지면서 고깃덩어리처럼 흔들려야만 했다. 그들은 당신을 인간으로 보고 있지도 않은 모양이었다. 몇 시간이고 유린당하며 시선을 돌렸을 때, 당신은 시체를 보았다. 먹을 것 하나 못 받고 강간만 당하다가 결국 죽어버린 시체들이다. 당신의 온몸에 소름이 돋았다.",
                            "엉덩이구멍과 입구멍에 감각도 느껴지지 않을 때쯔음, 차례대로 몰려오던 거지들은 지쳤는지 당신을 옆에다 두고 거적떼기 위에서 잠에 들었다. 당신은 지금이 기회라는 걸 알았다. 당신은 조용히 몸을 질질 끌고 그들에게서 도망갔다. 미처 닫히지 못한 구멍에서 정액이 흘러 당신의 흔적을 남기긴 헀지만, 어쨌든 지금 당신은 도망가야만 했다."
                        ],
                        female : [
                            "끔찍한 시간이었다. 그대로 거지들에게 끌려간 당신은 모든 구멍을 거지들에게 유린당했다. 당신은 엉덩이와 입, 그리고 보지를 무차별적으로 범해지면서 고깃덩어리처럼 흔들려야만 했다. 그들은 당신을 인간으로 보고 있지도 않은 모양이었다. 몇 시간이고 유린당하며 시선을 돌렸을 때, 당신은 시체를 보았다. 먹을 것 하나 못 받고 강간만 당하다가 결국 죽어버린 시체들이다. 당신의 온몸에 소름이 돋았다.",
                            "엉덩이구멍과 입구멍, 그리고 보지에 감각도 느껴지지 않을 때쯔음, 차례대로 몰려오던 거지들은 지쳤는지 당신을 옆에다 두고 거적떼기 위에서 잠에 들었다. 당신은 지금이 기회라는 걸 알았다. 당신은 조용히 몸을 질질 끌고 그들에게서 도망갔다. 미처 닫히지 못한 구멍에서 정액이 흘러 당신의 흔적을 남기긴 헀지만, 어쨌든 지금 당신은 도망가야만 했다."
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -40);
                    changeStamina(player, -40);
                    changeArousal(player, 40);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 10
                    );
                    passTime(player, 80)

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 25);
                   changeSensitivity(player, "mSensitivity", 25);
                   changeSensitivity(player, "bSensitivity", 25);
                   addBodyFluid(player, "a", 40);
                   addBodyFluid(player, "m", 30);
                   } else {
                   changeSensitivity(player, "cSensitivity", 25);
                   changeSensitivity(player, "aSensitivity", 25);
                   changeSensitivity(player, "mSensitivity", 25);
                   changeSensitivity(player, "bSensitivity", 25);
                   addBodyFluid(player, "a", 30);
                   addBodyFluid(player, "m", 30);
                   addBodyFluid(player, "c", 40);
                   }

                   const stealAmount = player.gold >= 500 ? 500 : player.gold;
                   changeGold(player, -stealAmount);
                   }
                }
            ]
        }
    ],
    slime: [
        {
            id: "slime_defeat",
            weight: 100,
            scene: [
                {
                    type : "text",
                    value : {
                        male : [
                            "당신은 슬라임에게 삼켜져 제대로 움직일 수 없다. 팔을 휘저어보아도, 다리로 차보아도, 젤리만이 당신의 몸을 감싸고 있을 뿐이다. 슬라임은 당신의 엉덩이 안으로 스멸스멸 들어왔다. 당신이 움찔거리며 슬라임을 떼내려고 해도 슬라임은 당신의 몸에 끈적하게 달라붙어 떨어지지 않았다.",
                            "그 순간 당신의 엉덩이 구멍 안으로 차가운 것이 느껴졌다. 느껴지는 한기에 당신은 몸을 꼬았지만 슬라임은 이미 당신의 구멍에 침입한 지 오래였다. 점점 부풀어오르는 배에 당신의 안색이 창백해졌다. 슬라임의 움직임에 따라 당신의 배가 울렁였다. 불편한 속을 붙잡고 있는 당신이 입으로 젤리가 들어온다. 당신은 막아보려고 했지만 액체를 막을 수는 없었다.",
                            "결국 당신은 슬라임 안에서 모든 구멍을 침범당한 채 유린당했다. 몇 번이고 당신의 안속을 헤집던 슬라임은 시간이 꽤 흐르고 나서야 당신을 풀어주었다. 슬라임에서 나온 직후 당신이 기침을 하자 슬라임 젤리가 당신의 입에서 꾸역꾸역 튀어나왔다. 벌어진 당신의 엉덩이 구멍에서도 슬라임젤리가 당신의 다리를 타고 뚝뚝 흘러져내린다.",
                            "하지만 어쨌든 당신은 살아남았다. 오늘도."
                        ],
                        female : [
                            "당신은 슬라임에게 삼켜져 제대로 움직일 수 없다. 팔을 휘저어보아도, 다리로 차보아도, 젤리만이 당신의 몸을 감싸고 있을 뿐이다. 슬라임은 당신의 엉덩이 안으로 스멸스멸 들어왔다. 당신이 움찔거리며 슬라임을 떼내려고 해도 슬라임은 당신의 몸에 끈적하게 달라붙어 떨어지지 않았다.",
                            "당신의 두 구멍 안팎으로 차가운 것이 느껴졌다. 이제야 상황을 깨달은 당신이 막으려고 했지만 액체를 막을 방법은 없었다. 슬라임은 출렁거리며 당신의 배를 앞뒤로 괴롭혔다. 부풀어오른 배에 괴로워하며 당신은 몸을 가눌 수가 없었다. 몸을 가누지 못하는 당신의 입까지 침범하며 슬라임은 당신의 모든 구멍을 장악했다. 끈적한 것이 당신의 목구멍을 막고, 장에서 요동친다.",
                            "결국 당신은 슬라임 안에서 모든 구멍을 침범당한 채 유린당했다. 몇 번이고 당신의 안속을 헤집던 슬라임은 시간이 꽤 흐르고 나서야 당신을 풀어주었다. 슬라임에서 벗어난 직후 당신의 입, 보지, 엉덩이에서 전부 슬라임 젤리가 떨어져나왔다. 배에 힘을 줄 때마다 슬라임 젤리가 당신의 모든 구멍에서 쏟아져나왔다.",
                            "하지만 어쨌든 당신은 살아남았다. 오늘도."
                        ]
                    } 
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -20);
                    changeStamina(player, -10);
                    changeArousal(player, 30);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 5
                    );
                    passTime(player, 20)

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 10);
                   changeSensitivity(player, "mSensitivity", 10);
                   addBodyFluid(player, "a", 30);
                   addBodyFluid(player, "m", 30);
                   } else {
                   changeSensitivity(player, "aSensitivity", 10);
                   changeSensitivity(player, "cSensitivity", 12);
                   changeSensitivity(player, "mSensitivity", 10);
                   addBodyFluid(player, "a", 30);
                   addBodyFluid(player, "m", 30);
                   addBodyFluid(player, "c", 30);
                   }
                   }
                }
            ]
        }
    ],

    goblin: [
        {
            id: "goblin_defeat",
            weight: 30,
            scene: [
                {
                    type: "text",
                    value: {
                        male : [
                            "고블린의 승리에 찬 울음 소리에 다른 고블린들이 몰려왔다. 그들은 당신에게 달려들어서 이곳저곳에 붙었다. 한 고블린은 당신의 엉덩이에 성기를 맞대고 있었고, 한 고블린은 당신의 입에 성기를 맞대고 있었다. 몇몇은 당신의 손에 자신의 성기를 비비며 히죽거렸다. 그리고 그들의 유린은 예고도 없이 시작되었다. 입에 처넣은 고블린 성기가 빠르게 당신의 입에서 왕복했다. 당신이 침을 삼킬 시간도 없이, 당신의 입은 고블린의 성기에 다물지도 제대로 벌리지도 못한 채 농락당했다. 당신의 엉덩이 구멍에는 고블린 성기가 2개나 들어가있었다. 마치 방아를 찧듯이 번갈아서 삽입되는 고블린의 성기에 당신의 입에서는 무의식적인 신음 소리가 흘러나왔다.",
                            "당신의 입과 애널에 정액을 쏟아부은 고블린은 낄낄 웃었다. 당신은 순간 이것이 끝이라고 생각했다. 하지만 차례를 기다리던 다른 고블린들이 당신의 구멍을 차지했을 때 당신이 미약하게나마 품었던 희망은 박살났다. 짐승같은 소리를 내며 당신의 몸이 흔들렸다. 벌어진 다리는 이미 제 기능을 상실하고 덜덜덜 떨리고 있었다. 고블린 몇몇은 당신의 다리를 더 벌리며 낄낄 웃었다. 남성기를 가격하는 고블린이 주먹에 당신의 눈앞에 별이 번뜩였다.",
                            "몇 번이고 정액이 쏟아졌지만 그들의 유린은 끝나지 않았다. 계속 차례대로 그들은 당신을 범했다. 당신의 의식이 흐려진 걸 확인한 고블린들이 무어라 서로 얘기를 했다. 그들이 밧줄을 찾고 있을 때 당신은 간신히 일어나서 도망갔다. 지금 도망가지 않으면 끌려갈 거라는 절망이 그의 발을 움직이게 했다."
                        ],
                        female : [
                            "고블린의 승리에 찬 울음 소리에 다른 고블린들이 몰려왔다. 그들은 당신에게 달려들어서 이곳저곳에 붙었다. 한 고블린은 당신의 엉덩이에 성기를 맞대고 있었고, 한 고블린은 당신의 입에 성기를 맞대고 있었고, 한 고블린은 당신의 보지에 성기를 겨누고 있었다. 몇몇은 당신의 손에 자신의 성기를 비비며 히죽거렸다. 그리고 그들의 유린은 예고도 없이 시작되었다. 입에 처넣은 고블린 성기가 빠르게 당신의 입에서 왕복했다. 당신이 침을 삼킬 시간도 없이, 당신의 입은 고블린의 성기에 다물지도 제대로 벌리지도 못한 채 농락당했다. 고블린은 당신을 후배위 자세로 만들더니 앞에서는 보지를, 뒤에서는 엉덩이를 성기로 쑤셔댔다. 엇박자로 쑤셔대는 고블린의 성기에 당신의 몸이 불규칙하게 일렁였다. 그들의 추삽질은 너무 빨라서 당신은 대응 하나 못하고 그들이 당신의 구멍에 정액을 싸지를 때까지 앞으로 엎어졌다가 강제로 다시 일어나는 것을 반복했다",
                            "끝없어 보이는 유린의 끝에서 당신은 배와 입속에 뜨거운 것이 가득찬 걸 느꼈다. 이제 끝난 걸까? 하지만 당신의 희망은 차례를 기다리고 있던 고블린들이 당신에게 성기를 다시 들이밀면서 산산조각나버렸다. 당신이 정액으로 끈적끈적해진 손을 휘둘러봤자 고블린들은 침략을 멈추지 않았다. 당신은 다시 그들에게 머리채를 잡힌 채 억지로 자세를 고정당하고 강간당했다. 고블린의 웃음 소리가 당신의 귓전을 때린다.",
                            "몇 번이고 정액이 쏟아졌지만 그들의 유린은 끝나지 않았다. 계속 차례대로 그들은 당신을 범했다. 당신의 의식이 흐려진 걸 확인한 고블린들이 무어라 서로 얘기를 했다. 그들이 밧줄을 찾고 있을 때 당신은 간신히 일어나서 도망갔다. 지금 도망가지 않으면 끌려갈 거라는 절망이 그의 발을 움직이게 했다."
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -40);
                    changeStamina(player, -30);
                    changeArousal(player, 50);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 7
                    );
                    passTime(player, 40)

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 18);
                   changeSensitivity(player, "mSensitivity", 18);
                   addBodyFluid(player, "a", 50);
                   addBodyFluid(player, "m", 50);
                   } else {
                   changeSensitivity(player, "aSensitivity", 20);
                   changeSensitivity(player, "cSensitivity", 20);
                   changeSensitivity(player, "mSensitivity", 20);
                   addBodyFluid(player, "a", 50);
                   addBodyFluid(player, "m", 50);
                   addBodyFluid(player, "c", 50);
                   }
                   }
                }
            ]
        },
        {
            id : "goblin_training",
            weight : 30,
            scene : [
                {
                    type : "effect",
                    run: (player) => {
                        startTraining(player, {
                            trainerId: "goblin",
                            maxTurns : 14,
                            introLog : "고블린은 쓰러진 당신의 위로 올라탔다. 그는 당신을 쉽게 보내줄 생각이 없어보인다.",
                            onEnd: () => {
                                showSingleTextScene("당신을 능욕한 고블린은 이내 당신을 묶을 것을 찾는지 잠시 당신을 시야밖에 두었다. 지금이 기회다. 당신은 어떻게든 그 사이에 도망갔다.",
                                    player
                                );
                            }
                        });

                        return true;
                    }
                }
            ]
        },
        {
            id : "goblin_capture",
            weight : 40,
            scene : [
                {
                    type: "text",
                    value : [
                        "고블린은 당신을 밧줄로 묶기 시작했다. 당신은 저항하려고 했지만 고블린은 당신에게 기회를 주지 않았다. 고블린은 당신의 손과 발을 묶은 후 당신의 목에 올가미를 씌었다. 당신은 숨이 막혀서 켁켁거렸다. 고블린은 올가미의 정도를 조절한 후 낄낄거리며 당신을 가축처럼 끌고 갔다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        startGoblinCaptureTraining(player);
                        return true;
                    }
                }
            ]
        }
    ],
    goblinKing : [
        {
            id : "goblinKing_capture",
            weight : 100,
            scene : [
                {
                    type: "text",
                    value : [
                        "고블린킹은 늘어진 당신의 몸을 훑어보더니 그대로 자신의 차례를 기다리고 있던 고블린들에게 던졌다. 당신은 그대로 고블린들에게 묶여 질질 끌려갔다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        startGoblinCaptureTraining(player);
                        return true;
                    }
                }
            ]
        }
    ],
    skeleton : [
        {
            id : "skeleton_defeat",
            weight : 100,
            scene : [
                {
                    type : "text",
                    value : [
                        "해골은 당신의 온기를 탐하기 시작했다. 그것들은 욕정으로 당신을 만지는 것이 아니다. 그것들은 당신을 죽여서라도 온기를 빼앗는 걸 원한다. 차가운 뼈가 당신의 온기를 빼앗는다. 깊게 파고든 뼈다귀가 당신의 온구멍을 침범하기 시작한다. 당신의 겉보다 당신의 속이 따듯하다는 걸 본능적으로 아는 것이리라.",
                        "죽음. 죽음이 점점 당신에게 가까워진다. 이 세상에서 죽음은 가까우면서도 낯선 존재였다. 쿵. 쿵. 쿵. 당신은 당신의 체온이 식어가는 걸 느꼈다."
                    ]
                }
            ]
        }
    ],
    flower : [
        {
            id: "flower_defeat",
            weight: 100,
            scene : [
                {
                    type : "text",
                    value : {
                        male : [
                            "꽃인간은 까르르 웃더니 당신의 몸을 감싸안았다. 꽃줄기 하나가 당신의 머리를 쓰다듬더니 그대로 밑으로 내려가 당신의 목을 졸라왔다. 의식을 놓지 않을 정도로만 숨통을 조이며 꽃인간은 당신에게 달콤하게 속삭였다, 너에게 쾌락을 줄게. 희미해지는 시야 속, 당신의 모든 구멍이 한번에 침범당한다. 고통의 한계를 넘어선 당신의 몸이 바르르 떨렸지만 꽃인간은 괘념치 않았다. 쑤컹쑤컹하는 소리와 함께 당신의 모든 구멍이 벌어졌다가 조여드는 것을 반복한다. 몇 번이고 꿀물을 받아낸 구멍들에서 줄줄 꿀물이 흘러나왔다.",
                            "특히 당신의 엉덩이 구멍은 입구멍과는 다르게 조임없이 그저 벌어져있었다. 줄기 4~5개를 받아들인 당신의 엉덩이는 이미 꼬치처럼 후들후들 흔들리고 있었다. 꽃인간은 아프지 않게 해주겠다고 말하며 당신의 의식이 날아가기 전에 입구멍으로 꿀물을 흘렸다. 쓴 맛이 안 나는, 달콤한 맛이었다. 꿀물을 마시자마자 이상하게도 당신의 의식은 또렷해졌다. 의식이 또렷해진 만큼 잘 느껴지는 쾌락과 고통에 당신은 울부짖고 싶었지만, 입에는 이제 촉수가 2~3개를 달라붙어 소리를 낼 수가 없었다. 게다가, 꿀물을 삼키면 삼킬수록 당신의 몸이 달아올랐다. 꽃인간은 당신도 나처럼 꿀이 나왔으면 좋겠다고 속삭였다.<br>",
                            "\"그러면 우리는 함께 더 달콤해질 거야. 세상을 달콤하게 바꾸자.\"<br>",
                            "꽃인간은 까르르 웃으며 촉수로 당신의 가슴을 주무르기 시작했다. 탁, 탁, 탁, 마치 파이즈리를 하는 것처럼 긴 촉수 줄기가 당신의 가슴골 사이에 껴있었고, 당신의 납작한 가슴으로는 파이즈리 흉내도 버거웠지만, 나머지 촉수는 계속해서 당신의 가슴을 자극했다. 쓰다듬기도 하고 쥐어짜기도 하면서... 그리고 그 순간 믿기지 않는 일이 일어났다. 당신의 가슴에서 꿀물이 나오기 시작한 거다. 꽃인간도 놀랐는지 당신을 바라보았다. 그러더니 그는 웃었다. 웃음 소리는 아까보다 더 무거웠고 아름다웠다.<br>",
                            "\"역시 너는....\"<br>",
                            "꽃인간은 당신의 이마 위로 키스를 했다. 그는 당신에게 아프지 말라고 속삭였다.<br>",
                            "\"다음에 또 보자, 예쁜이.\""
                        ],
                        female : [
                            "꽃인간은 까르르 웃더니 당신의 몸을 감싸안았다. 꽃줄기 하나가 당신의 머리를 쓰다듬더니 그대로 밑으로 내려가 당신의 목을 졸라왔다. 의식을 놓지 않을 정도로만 숨통을 조이며 꽃인간은 당신에게 달콤하게 속삭였다, 너에게 쾌락을 줄게. 희미해지는 시야 속, 당신의 모든 구멍이 한번에 침범당한다. 고통의 한계를 넘어선 당신의 몸이 바르르 떨렸지만 꽃인간은 괘념치 않았다. 쑤컹쑤컹하는 소리와 함께 당신의 모든 구멍이 벌어졌다가 조여드는 것을 반복한다. 몇 번이고 꿀물을 받아낸 구멍들에서 줄줄 꿀물이 흘러나왔다.",
                            "특히 당신의 보지 구멍과 엉덩이 구멍은 입구멍과는 다르게 조임없이 그저 벌어져있었다. 줄기 4~5개를 받아들인 당신의 보지와 엉덩이는 이미 꼬치처럼 후들후들 흔들리고 있었다. 꽃인간은 아프지 않게 해주겠다고 말하며 당신의 의식이 날아가기 전에 입구멍으로 꿀물을 흘렸다. 쓴 맛이 안 나는, 달콤한 맛이었다. 꿀물을 마시자마자 이상하게도 당신의 의식은 또렷해졌다. 의식이 또렷해진 만큼 잘 느껴지는 쾌락과 고통에 당신은 울부짖고 싶었지만, 입에는 이제 촉수가 2~3개를 달라붙어 소리를 낼 수가 없었다. 게다가, 꿀물을 삼키면 삼킬수록 당신의 몸이 달아올랐다. 꽃인간은 당신도 나처럼 꿀이 나왔으면 좋겠다고 속삭였다.<br>",
                            "\"그러면 우리는 함께 더 달콤해질 거야. 세상을 달콤하게 바꾸자.\"<br>",
                            "꽃인간은 까르르 웃으며 촉수로 당신의 가슴을 주무르기 시작했다. 탁, 탁, 탁, 마치 파이즈리를 하는 것처럼 긴 촉수 줄기가 당신의 가슴골 사이에 껴있었고 나머지 촉수는 계속해서 당신의 가슴을 자극했다. 당신의 가슴이 촉수를 조여오자 꽃인간은 황홀한 듯이 고개를 뒤로 젖히고 신음 소리를 냈다. 쓰다듬기도 하고 쥐어짜기도 하면서... 그리고 그 순간 믿기지 않는 일이 일어났다. 당신의 가슴에서 꿀물이 나오기 시작한 거다. 꽃인간도 놀랐는지 당신을 바라보았다. 그러더니 그는 웃었다. 웃음 소리는 아까보다 더 무거웠고 아름다웠다.<br>",
                            "\"역시 너는....\"<br>",
                            "꽃인간은 당신의 이마 위로 키스를 했다. 그는 당신에게 아프지 말라고 속삭였다.<br>",
                            "\"다음에 또 보자, 예쁜이.\""
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeArousal(player, 80);
                    passTime(player, 10)

                   if (player.gender === "male"){
                   changeSensitivity(player, "bSensitivity", 25);
                   changeSensitivity(player, "aSensitivity", 25);
                   changeSensitivity(player, "mSensitivity", 25);
                   addBodyFluid(player, "m", 50);
                   addBodyFluid(player, "a", 50);
                   } else {
                   changeSensitivity(player, "bSensitivity", 25);
                   changeSensitivity(player, "cSensitivity", 25);
                   changeSensitivity(player, "mSensitivity", 25);
                   changeSensitivity(player, "aSensitivity", 25);
                   addBodyFluid(player, "c", 50);
                   addBodyFluid(player, "m", 50);
                   addBodyFluid(player, "a", 50);
                   }
                   }
                }
            ]
        }
    ],
    bandit1 : [
        {
            id : "bandits_defeat",
            weight : 70,
            scene : [
                {
                    type : "text",
                    value : {
                        male : [
                            "하급도적은 당신의 몸에 손을 뻗었다. 욕정을 푸는 손길보다는 돈을 찾는 손길에 더 가까웠다. 그는 당신의 몸을 구석구석 뒤져 돈을 챙겼다. 그는 당신에게서 빼앗은 돈을 손가락으로 튕기며 널부러져 있는 당신을 내려다보았다. 그는 당신의 머리채를 잡아 돌려 엎드리게 하더니 그대로 당신의 위로 엎드렸다. 바닥의 먼지와 축축한 습기가 뒤엉켜 엉망이 된 당신의 몸으로 그의 뜨거운 성기가 들어온다. 당신의 애널은 이물질이 들어오자마자 반감으로 꽈악 조여왔다. 하급도적이 웃었다. <br>\"보지보다 더 기분이 좋은 거 같은데? 아. 뒷보지니까 어차피 똑같은 보지인가.\"<br>그는 당신의 저항을 무게로 억누르며 계속 추삽질을 해댔다. 그는 당신의 팔을 뒤로 꺾더니 그대로 꺾인 두 팔을 제 쪽으로 들어올렸다. 허리가 휜 채로 본능적으로 고개를 젖히며 끅끅거리는 소리를 내는 당신의 귓가로 뜨거운 숨결을 토해내며 하급도적은 욕망 배출을 이어갔다. 천박하게 수축하는 당신의 애널에 하급 도적은 정신없이 자신의 욕정을 쏟아냈다. 그는 모험가보다는 이런 일이 네 적성에 맞는 거 아니냐, 니콜라이의 글로리홀에서 일하는 게 낫지 않곘냐 등 당신을 매도했다. 휘어진 상체는 그의 손에 가슴부터 잡혀서 굽힐 수가 없다. 찰진 소리가 위와 아래에서 서로 경쟁하듯이 솟구친다. 찹, 찹, 찹, 찹, 당신의 몸은 성한 곳이 없다.",
                            "모든 욕정을 쏟아낸 후, 하급도적은 뻗어버린 당신을 어떻게 해야 할지 고민하는 것처럼 보였다. 다행히도, 그는 아직 선을 넘는 걸 망설이고 있는 거 같다... 그 기회를 틈타서 당신은 그가 뒤를 돌고 있을 때 어떻게든 도망갔다. 그리고 구석진 자리에서 그대로 까무룩 기절해버렸다."
                        ],
                        female : [
                            "하급도적은 당신의 몸에 손을 뻗었다. 욕정을 푸는 손길보다는 돈을 찾는 손길에 더 가까웠다. 그는 당신의 몸을 구석구석 뒤져 돈을 챙겼다. 그는 당신에게서 빼앗은 돈을 손가락으로 튕기며 널부러져 있는 당신을 내려다보았다. 그는 당신의 머리채를 잡아 돌려 자신을 보는 자세로 눕게 하더니 그대로 당신의 위로 올라탔다. 바닥의 먼지와 축축한 습기가 뒤엉켜 엉망이 된 당신의 몸으로 그의 뜨거운 성기가 들어온다. 당신의 보지가 그의 것을 삼키자 하급도적이 웃었다. <br>\"꾸물거리는 거 봐라, 음탕한 년. 그냥 처음부터 자지를 먹고 싶다고 말하지 그랬어?\"<br>그는 당신의 저항을 무게로 억누르며 계속 추삽질을 해댔다. 폭력적인 마찰에 당신의 몸이 기형적으로 펄떡이고, 보지 구멍은 주륵주륵 애액을 쏟아내기 시작했다. 그리고 하급 도적은 그 애액을 윤활유 삼아 더 깊게 당신의 안으로 파고들었다. 가장 깊숙한 곳을 찌르자 당신의 허리가 더 날뛰었다. 천박하게 수축하는 당신의 보지에 하급 도적은 정신을 차리지 못했다. <br>\"미친년이, 좆 끊어먹으려고 작정을 했나.\"<br>욕은 하고 있지만 그의 입술은 탐욕으로 번들거리고 있다. 그는 당신의 가슴을 마구 비벼대며 계속 욕정을 쏟아냈다. 찰진 소리가 위와 아래에서 서로 경쟁하듯이 솟구친다. 찹, 찹, 찹, 찹, 당신의 몸은 성한 곳이 없다.",
                            "모든 욕정을 쏟아낸 후, 하급도적은 뻗어버린 당신을 어떻게 해야 할지 고민하는 것처럼 보였다. 다행히도, 그는 아직 선을 넘는 걸 망설이고 있는 거 같다... 그 기회를 틈타서 당신은 그가 뒤를 돌고 있을 때 어떻게든 도망갔다. 그리고 구석진 자리에서 그대로 까무룩 기절해버렸다."
                        ]
                    }
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -40);
                    changeStamina(player, -30);
                    changeArousal(player, 30);
                    changeGold(player, -500);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 4
                    );
                    passTime(player, 20);

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 9);
                   changeSensitivity(player, "bSensitivity", 9);
                   addBodyFluid(player, "a", 20);
                   } else {
                   changeSensitivity(player, "cSensitivity", 9);
                   changeSensitivity(player, "bSensitivity", 9);
                   addBodyFluid(player, "c", 20);
                   }
                   }
                }
            ]
        },
        {
            id : "bandits_training",
            weight : 15,
            scene : [
                {
                    type : "effect",
                    run: (player) => {
                        startTraining(player, {
                            trainerId: "bandits",
                            maxTurns : 18,
                            introLog : "쓰러진 당신 뒤로 발자국 소리들이 들려왔다. 싸우는 소리에 도적들이 몰려버린 모양이다....",
                            onEnd: () => {
                                showSingleTextScene("도적떼들이 당신의 처우를 머리를 맞대고 의논하고 있을 때, 당신은 그 기회를 놓치지 않고 도망갔다...!",
                                    player
                                );
                            }
                        });

                        return true;
                    }
                }
            ]
        },
        {
            id : "bandits_capture",
            weight : 40,
            scene : [
                {
                    type: "text",
                    value : [
                        "하급도적은 쓰러진 당신을 비웃더니 그대로 당신을 초소로 끌고 갔다. 머리채를 잡힌 채 바닥에 피부가 긁히며 당신은 질질 끌려갔다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        startBanditsCapture(player);
                        return true;
                    }
                }
            ]
        }
    ],
    bandit2 : [
        {
            id : "bandits_defeat",
            weight : 60,
            scene : [
                {
                    type : "text",
                    value : [
                        "상급도적은 당신의 몸에 손을 뻗었다. 욕정을 푸는 손길보다는 돈을 찾는 손길에 더 가까웠다. 그는 당신의 몸을 구석구석 뒤져 돈을 챙겼다. 그는 당신에게서 빼앗은 돈을 손가락으로 튕기며 널부러져 있는 당신을 내려다보았다. <br>\"마약은 많이 안 먹어봤지?\"<br>그는 마약을 이 사이로 물더니 그대로 자신의 입술을 당신의 입술에 짓누르듯 맞부딪혔다. 거부할 틈도 없이 흘러드는 몽롱한 기운에 당신의 숨이 턱 막혔다. 거지들이 쓰는 마약과는 달랐다. 목구멍 뒤로 넘어가자마자 마약이 당신의 몸을 달콤하게 장악해왔다. 흐릿해진 시야 사이로 상급 도적이 낄낄 웃고 있는 것이 보인다.<br>\"고마운 줄 알아. 널 위한 아주 강렬한 맛이라고.\"",
                        "그의 말대로 약효과는 강렬했다. 미약한 정신 사이로 살과 뼈를 부딪히는 둔탁한 소리가 울려퍼졌다. 당신의 허리를 쾌락을 좇아 그의 움직임에 따라 허리를 흔들고 있었다. 엎드린 채로 마치 개새끼마냥 입을 벌리며, 당신은 멍하니 당신의 입에서부터 뚝뚝 떨어지는 침을 느꼈다. 헥, 헥... 무슨 소리인지 했더니 당신의 벌어진 입에서 나오는 소리였다. 상급도적은 당신이 정신을 차리자 엉덩이뺨을 짝짝 때리며 더 흔들라고 명령했다. 다시 당신의 의식이 멀어진다... 구멍을 파고드는 그의 열기가 너무 기분이 좋았다. 헥헥거리는 소리가 앙앙거리는 소리로 바뀐 것을 당신은 뒤늦게서야 인지했다. 하지만 기분이 너무 좋아서 멈출 수가 없었다. 당신의 두 다리 사이로 정액이 흘러내린다. 그가 당신을 음란한 년이라 매도하는 소리가 들린다. 당신의 이성이 점점 흐려진다...",
                        "다시 눈을 떴을 때 상급도적은 무력화된 당신을 확인하고 잠시 자리를 비운 모양이었다. 지금이 기회다. 당신은 움직여야만 한다... 간신히 기어가서 몸을 숨긴 후 당신의 시야는 그대로 암전됐다."
                    ]
                },
                {
                    type : "effect",
                    run: (player) => {
                    changeHP(player, -40);
                    changeStamina(player, -30);
                    changeArousal(player, 50);
                    changeGold(player, -800);
                    player.status.trauma = Math.min(
                        player.status.maxTrauma,
                        player.status.trauma + 6
                    );
                    passTime(player, 20);

                   if (player.gender === "male"){
                   changeSensitivity(player, "aSensitivity", 11);
                   addBodyFluid(player, "a", 20);
                   } else {
                   changeSensitivity(player, "cSensitivity", 11);
                   addBodyFluid(player, "c", 20);
                   }
                   }
                }
            ]
        },
        {
            id : "bandits_training",
            weight : 20,
            scene : [
                {
                    type : "effect",
                    run: (player) => {
                        startTraining(player, {
                            trainerId: "bandits",
                            maxTurns : 18,
                            introLog : "쓰러진 당신 뒤로 발자국 소리들이 들려왔다. 싸우는 소리에 도적들이 몰려버린 모양이다....",
                            onEnd: () => {
                                showSingleTextScene("도적떼들이 당신의 처우를 머리를 맞대고 의논하고 있을 때, 당신은 그 기회를 놓치지 않고 도망갔다...!",
                                    player
                                );
                            }
                        });

                        return true;
                    }
                }
            ]
        },
        {
            id : "bandits_capture",
            weight : 40,
            scene : [
                {
                    type: "text",
                    value : [
                        "상급도적은 쓰러진 당신을 비웃더니 그대로 당신을 초소로 끌고 갔다. 머리채를 잡힌 채 바닥에 피부가 긁히며 당신은 질질 끌려갔다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        startBanditsCapture(player);
                        return true;
                    }
                }
            ]
        }
    ],
    banditBoss : [
        {
            id : "bandits_capture",
            weight : 100,
            scene : [
                {
                    type: "text",
                    value : [
                        "도적대장은 당신의 배에 주먹을 박아넣었다. 숨이 빠지는 소리와 함께 당신의 허리가 굽어졌다. 도적대장은 충격으로 입을 벌린 채 침을 질질 흘리고 있는 당신을 제 부하들에게 보여주며 입꼬리를 올렸다."+
                        "<br><br>\"이게 바로 우리에게 개긴 암캐의 말로다!\"<br><br>"+
                        "그리고 그는 당신을 한손으로 들어올리더니 그들의 앞에서 당신의 다리를 벌려버렸다. 개구리 자세로 그의 허리에 바짝 붙은 채, 당신은 여전히 충격에서 벗어나지 못해 입을 다물지 못하고 있다. 도적대장은 입구멍부터가 야한데 아랫구멍이 안 야할 리 없다는 말을 하며 그대로 당신에게 박아댔다. 당신은 모두의 앞에서 치부가 드러난 채로 강간당했다.... 흔들리는 당신의 시야로 당신의 벌어진 틈을 보며 자위를 하는 도적놈들이 보인다..."+
                        " 불행하게도 당신의 수모는 공개강간쇼로 끝나지 않았다.... 무자비하게 강간당한 당신은 그대로 도적떼들에게 끌려가버렸다..."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        changeGold(player, -1000);
                        changeTrauma(player, 8);
                        if (player.gender === "male"){
                            changeSensitivity(player, "aSensitivity", 11);
                            addBodyFluid(player, "a", 20);
                        } else {
                            changeSensitivity(player, "cSensitivity", 11);
                            addBodyFluid(player, "c", 20);
                        }                        
                        startBanditsCapture(player);
                        return true;
                    }
                }
            ]
        }
    ]
};


function pickDefeatEvent(enemyId, player){
    let list = DEFEAT_EVENTS[enemyId];

    if (!list || list.length === 0){
        return null;
    }

    if (
        player?.dungeon?.active &&
        player.dungeon.id === "banditHideout"
    ){
        list = list.filter(event => event.id !== "bandits_capture");
    }

    let total = list.reduce((sum, event) => sum + event.weight, 0);
    let roll = Math.random() * total;

    for (const event of list){
        roll -= event.weight;

        if (roll <= 0){
            return event;
        }
    }

    return list[0];
}

function runDefeatEvent(player, enemy, options = {}){
    const enemyId = enemy.id;
    const event = pickDefeatEvent(enemyId, player);

    if (!event){
        if (options.onAfterDefeat){
            options.onAfterDefeat();
            return;
        }

        startScene(getLocationScene(player), player);
        return;
    }

    runScene(event.scene, player, {
        onEnd: () => {
            if (options.onAfterDefeat){
                options.onAfterDefeat();
                return;
            }

            startScene(getLocationScene(player), player);
        }
    });
}

//각자 capture Event 함수

//고블린
function getGoblinCaptureState(player){
    player.captureState = player.captureState || {};
    player.captureState.goblin = player.captureState.goblin || {
        ropeDamage: 0,
        escapeAttempts: 0
    };
    return player.captureState.goblin;
}

function startGoblinCaptureTraining(player, escapeAttempts = 0){
    player.location = "goblinCave";
    player.flags = player.flags || {};
    player.flags.goblinCaptured = true;

    startTraining(player, {
        trainerId: "goblin",
        maxTurns: 8,
        onEnd: () => {
            startScene([
                {
                    type: "text",
                    value: "고블린들이 잠시 자리를 비웠다. 지금이 기회일지도 모른다."
                },
                {
                    type: "choice",
                    choices: [
                        {
                            text: "목 올가미의 밧줄을 자른다.",
                            action: "goblin_capture_cut_rope"
                        },
                        {
                            text: "지금이 기회다! 탈출한다!",
                            action: "goblin_capture_escape"
                        },
                        {
                            text: "지금은 안 될 거 같다. 당신은 기력을 아꼈다.",
                            action: "goblin_capture_continue"
                        }
                    ]
                }
            ], player, {
                escapeAttempts
            });
        }
    });
}

function sendPlayerToGoblinCaptureRoom(player){
    const dungeon = DUNGEONS.goblinCave;

    player.location = "goblinCave";

    player.dungeon = {
        active: true,
        id: "goblinCave",
        room: dungeon.captureRoom,
        visited: [dungeon.captureRoom]
    };

    player.flags = player.flags || {};
    player.flags.goblinCaveShortcut = true;
    player.flags.goblinCaptured = false;

    if (player.captureState?.goblin){
        player.captureState.goblin = null;
    }

    localStorage.setItem("playerData", JSON.stringify(player));

    renderMap(player);
    startScene(buildDungeonScene(player), player);
}

window.goblin_capture_cut_rope = function(player){
    const capture = getGoblinCaptureState(player);
    const str = getTotalStat(player, "str");
    const stamina = player.status?.stamina || 0;
    const chance = Math.min(0.85, 0.25 + str / 120 + stamina / 500);
    const gain = 1 + Math.floor(str / 30); // STR 30마다 +1

    changeStamina(player, -10);

    if (Math.random() < chance){
        capture.ropeDamage = Math.min(5, capture.ropeDamage + gain);
        localStorage.setItem("playerData", JSON.stringify(player));
        showSingleTextScene(
            `당신은 간신히 밧줄 일부를 약하게 만들었다. 탈출 가능성이 조금 올랐다. (${capture.ropeDamage}/5)`,
            player
        );
    } else {
        localStorage.setItem("playerData", JSON.stringify(player));
        showSingleTextScene("당신은 밧줄을 끊어보려 했지만 손만 아파올 뿐이었다.", player);
    }
};

window.goblin_capture_escape = function(player){
    const capture = getGoblinCaptureState(player);
    const charm = getTotalStat(player, "charm");

    const baseChance = 0.10;
    const ropeBonus = capture.ropeDamage * 0.12;
    const charmBonus = Math.min(0.25, charm / 200);
    const chance = Math.min(0.85, baseChance + ropeBonus + charmBonus);

    if (Math.random() < chance){
        player.captureState.goblin = null;
        player.flags.goblinCaptured = false;

        localStorage.setItem("playerData", JSON.stringify(player));

        showSingleTextScene("당신은 약해진 밧줄을 비틀어 겨우 빠져나왔다. 주변을 살펴보니, 당신은 이곳이 고블린 동굴 깊은 곳이라는 것을 깨달았다.", player, {
            onEnd: () => {
                sendPlayerToGoblinCaptureRoom(player);
            }
        });
        return;
    }
    capture.escapeAttempts = (capture.escapeAttempts || 0) + 1;
    localStorage.setItem("playerData", JSON.stringify(player));
    showSingleTextScene(
        "당신은 탈출하려 했지만 밧줄이 목을 조였다. 곧 고블린들이 돌아와 당신을 다시 끌고 갔다.",
        player,
        {
            onEnd: () => startGoblinCaptureTraining(player, capture.escapeAttempts)
        }
    );
    return;
};

window.goblin_capture_continue = function(player){
    startGoblinCaptureTraining(player);
};