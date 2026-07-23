const NPC_GIFT_CONFIG = {
    matin: {
        reactions: {
            matinFavorite: {
                great: {
                    affection: 7,
                    rage: -5,
                    lust : 0,
                    line: "\"이건...\"<br><br>마틴은 당신과 연어초밥을 번갈아보더니 조심스럽게 한 입 먹었다. <br><br>\"...맛있다.\"<br><br>그는 당신의 시선을 마주하다가 다시 고개를 돌렸다. 그의 눈동자는 어디를 바라보고 있는 걸까."
                },
            
                normal: {
                    affection: 5,
                    rage: -5,
                    lust : 0,
                    line: "\"이건...\"<br><br>마틴은 당신과 연어초밥을 번갈아보더니 조심스럽게 한 입 먹었다. <br><br>\"연어는 낚기 힘들었을 텐데.<br>...고맙다.\"<br><br>그는 희미하게 웃었다. 웃으면서도 그의 눈동자는 어딜 보고 있는 건지, 묘하게 슬퍼보였다."
                },
            
                bad: {
                    affection: 7,
                    rage: -5,
                    lust : 0,
                    line: "\"이건...\"<br><br>마틴은 당신과 연어초밥을 번갈아보더니 조심스럽게 한 입 먹었다. <br><br>\"...그때와 똑같은 맛이네.\"<br><br>그는 조용히 웃었다. 더 이상의 말은 없었지만 어쩐지 표정이 평소보다 부드러웠다."
                }
            },
            matinHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "당신은 마틴의 표정을 읽을 수가 없었다. <br><br>\"...단 건 별로 좋아하지 않아. 하지만 이건 먹을 만하네.\"<br><br>그는 몇 개 더 먹더니 이제 한계라는 듯 다시 음식을 내려놓았다."
                },
            
                normal: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "그는 당신의 음식을 먹더니 음식을 만들 때 몇 가지 부분이 미흡했던 거 같다고 말했다. <br><br>\"다음 번에는 완벽해지겠네.\"<br><br>그는 당신의 음식을 많이는 먹지 않고 내려놓았다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "마틴은 당신의 음식을 먹더니 인상을 찌푸렸다.<br><br>\"...너무... 자극적이야.\"<br><br>그는 용량을 하나하나 가르쳐주었다. 당신의 음식에는 더 이상 손대지 않았다."
                }
            },
            
            lusty: {
                great: {
                    affection: -8,
                    rage: 3,
                    lust : 0,
                    line: "마틴은 음식의 냄새를 맡더니 당신을 쓰레기 보는 시선으로 노려보았다. <br><br>\"더러워.\""
                },

                normal: {
                    affection: -9,
                    rage: 3,
                    lust : 0,
                    line: "마틴은 음식의 냄새를 맡더니 당신을 쓰레기 보는 시선으로 노려보았다. <br><br>\"더러워.\""
                },
            
                bad: {
                    affection: -10,
                    rage: 6,
                    lust : 0,
                    line: "\"윽...\"<br><br>마틴은 냄새를 맡자마자 그대로 뒤로 물러났다. <br><br>\"그거 가지고 당장 나가.\""
                }
            },
            lustyHighAffection : {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "마틴은 음식의 냄새를 맡더니 움찔했다. <br><br>\"이런 악취미는 혼자만 간직해...\"<br><br>고개를 돌리고 있는 그의 귀끝은 붉었다. 그는 당신이 가지 않자 고개를 다시 돌렸다. <br><br>\"...설마 먹어보라는 건 아니지?\""
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "마틴은 음식의 냄새를 맡더니 움찔했다. <br><br>\"...먹을 거면 혼자 먹어.\"<br><br>그는 고개를 돌렸다. 하지만 당신은 그가 곁눈질로 당신을 힐끔힐끔 보고 있다는 걸 알아차렸다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 3,
                    line: "마틴은 음식의 냄새를 맡더니 뒤로 물러섰다. 그는 당신과 안전 거리를 유지하며 고개를 저었다. <br><br>\"안 먹어.\"<br><br>그는 단호했다."
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 고기를 먹으며 고개를 끄덕였다. 그는 많이 느끼하지도 않고 뻑뻑하지도 않아서 먹기 좋다고 말해주었다. 하지만 그는 많이는 먹지 않았다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 음식을 먹으며 고개를 끄덕였다. 그는 고기를 몇 점 먹으며 당신이 부족헀던 곳을 요점만 찝어서 말해주었다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"고기 굽는 건 원래 쉬워보여도 제일 어려워.\"<br><br>그는 당신의 고기를 한 점 먹더니 고개를 끄덕이며 말했다."
                }
            },

            vegetable : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 음식을 먹으며 이런 음식을 먹으면 속이 편해서 좋다고 말해주었다. <br><br>\"...열심히 했네. 잘했어.\""
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 음식을 먹으며 야채는 맛이 없어질 수도 있으니 조심해야 한다고 말했다. <br><br>\"고기보다는 야채를 싫어하는 사람들이 더 많아. 야채가 영양가가 더 높은데도.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 음식을 먹으며 야채는 원래 맛없어지기 쉽다고 말했다. 하지만 그는 맛없는 야채여도 고기보다는 많이 먹었다."
                }
            },

            fish : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 당신의 생선 요리를 맛보더니 고개를 끄덕였다. <br><br>\"...맛있다.\"<br><br>그는 당신의 생선 요리를 다른 요리들보다 훨씬 더 많이 먹었다."
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 당신의 생선 요리를 맛보더니 고개를 끄덕였다. <br><br>\"생선은 몸에 좋아.\"<br><br>마틴은 당신에게 생선 요리 팁을 몇 가지 알려주었다."
                },

                bad : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "그는 낚기 힘들었을 텐데 생선 요리가 조금 실패해서 속상했을 거 같다고 말했다. 당신이 그에게 낚시를 해봤냐고 묻자 그는 고개를 저었다. <br><br>\"...옆에서 봤던 게 다야. 낚는 게 힘들다는 건 알아.\""
                }
            },

            mixed : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 요리를 먹으며 고개를 끄덕였다. <br><br>\"맛있어.\"<br><br>그는 고기 부분보다는 야채 쪽을 더 많이 먹고 있다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 당신의 요리를 먹으며 고개를 끄덕였다. <br><br>\"이정도면 괜찮아.\"<br><br>그는 고기 부분보다는 야채 쪽을 더 많이 먹고 있다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"음...\"<br><br>마틴은 고개를 기울이더니 당신의 부족한 점을 말해주었다."
                }
            },

            bread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...빵은 안 좋아해.\"<br><br>마틴은 당신에게서 고개를 돌렸다. 당신은 주점에서 야채빵, 고기빵은 팔지 않았다는 걸 기억해냈다. 빵은 손님들을 위해 다른 곳에서 사오는 모양이다. 상류도시라든가."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...빵은 안 좋아해.\"<br><br>마틴은 당신에게서 고개를 돌렸다. 당신은 주점에서 야채빵, 고기빵은 팔지 않았다는 걸 기억해냈다. 빵은 손님들을 위해 다른 곳에서 사오는 모양이다. 상류도시라든가."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...빵은 안 좋아해.\"<br><br>마틴은 당신에게서 고개를 돌렸다. 당신은 주점에서 야채빵, 고기빵은 팔지 않았다는 걸 기억해냈다. 빵은 손님들을 위해 다른 곳에서 사오는 모양이다. 상류도시라든가."
                }
            },

            meatBread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...빵은 안 좋아해.\"<br><br>마틴은 당신에게서 고개를 돌렸다. 당신은 주점에서 야채빵, 고기빵은 팔지 않았다는 걸 기억해냈다. 빵은 손님들을 위해 다른 곳에서 사오는 모양이다. 상류도시라든가."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...빵은 안 좋아해.\"<br><br>마틴은 당신에게서 고개를 돌렸다. 당신은 주점에서 야채빵, 고기빵은 팔지 않았다는 걸 기억해냈다. 빵은 손님들을 위해 다른 곳에서 사오는 모양이다. 상류도시라든가."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...빵은 안 좋아해.\"<br><br>마틴은 당신에게서 고개를 돌렸다. 당신은 주점에서 야채빵, 고기빵은 팔지 않았다는 걸 기억해냈다. 빵은 손님들을 위해 다른 곳에서 사오는 모양이다. 상류도시라든가."
                }
            },

            vegetableBread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 물끄러미 바라보다가 한 조각 맛만 보았다. <br><br>\"다른 사람들이라면 좋아할 거야.\"<br><br>그는 맛이 괜찮다는 듯 고개를 끄덕인 후 당신의 음식에서 손을 뗐다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 물끄러미 바라보다가 한 조각 맛만 보았다. <br><br>\"...그럭저럭 괜찮아.\"<br><br>그는 맛이 괜찮다는 듯 고개를 끄덕인 후 당신의 음식에서 손을 뗐다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 물끄러미 바라보다가 한 조각 맛만 보았다. <br><br>\"...별로야. 하지만 못 먹을 맛은 아니야.\"<br><br>그는 당신의 음식을 다시 내려놓았다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 먹으며 고개를 끄덕였다. 그는 앞으로도 이렇게만 한다면 음식점을 운영해도 어떻게든 될 거라고 말했다. 반 정도 먹은 후 그는 음식에서 손을 뗐다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 먹으며 고개를 끄덕였다. \"향도, 간도, 그럭저럭 괜찮아.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 먹으며 당신이 부족했던 점을 요점만 짚어서 말해주었다. 그는 언제나처럼 거의 먹지 않았지만 그래도 고기 요리보다는 많이 먹었다."
                }
            },

            meatRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 먹으며 이정도면 고기의 간이 잘 되었다고 말헀다. <br><br>\"쌀의 점착도도 완벽하고.\"<br><br>그는 당신에게 자본만 있다면 음식점을 열어도 괜찮을 거 같다고 말했다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 음식을 먹으며 이정도면 사람들이 납득하고 먹을 거라고 말했다. <br><br>\"...나는 기름진 걸 먹으면 속이 안 좋아져서.\"<br><br>당신이 마틴을 물끄러미 바라보자 그는 솔직하게 대답해주었다. 당신의 요리가 싫어서 안 먹는 건 아니다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 당신의 음식을 먹더니 당신이 부족했던 점을 요점만 짚어서 말해주었다. <br><br>\"그래도 주방을 태우지는 않았잖아.\"<br><br>...농담한 건가? 무표정이라서 농담이었는지 진담이었는지 잘 구분이 되지 않는다."
                }
            },
            
            default: {
                trash: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"실패한 거야?\"<br><br>마틴은 당신의 음식을 보더니 픽 웃었다. 금방 입꼬리가 내려가긴 했지만 그는 분명 웃었다. 그는 당신에게서 고개를 돌리고 다시 제 일에 집중했다."
                }
            }
        }
    },
    sora: {
        reactions: {
            soraFavorite: {
                great: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            soraHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "소라는 눈을 반짝반짝 빛내며 당신이 준 음식을 바로 먹었다. <br><br>\"달아!\"<br><br>소라는 즐겁다는 듯이 웃었다."
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "소라는 눈을 반짝반짝 빛내며 당신이 준 음식을 바로 먹었다. <br><br>\"달아!\"<br><br>소라는 즐겁다는 듯이 웃었다."
                },
            
                bad: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "소라는 눈을 반짝반짝 빛내며 당신이 준 음식을 바로 먹었다. <br><br>\"달아!\"<br><br>소라는 즐겁다는 듯이 웃었다.<br>...달콤한 맛의 정도를 잘 느끼지 못하는 거 같다."
                }
            },
            
            lusty: {
                great: {
                    affection: 5,
                    rage: 0,
                    lust : 10,
                    line: "소라는 음식을 보자마자 \"흐응~\" 소리를 내며 당신을 지그시 바라보았다. <br><br>\"소라가 먹어주길 바라? {soraTitle}가 원한다면야...\"<br><br>소라는 당신을 바라보며 눈도 깜박이지 않고 당신이 만들어준 음식을 먹었다."
                },

                normal: {
                    affection: 4,
                    rage: 0,
                    lust : 8,
                    line: "소라는 당신의 음식을 보더니 까르르 웃었다. 재밌다는 듯 당신을 보던 그는 당신이 보는 앞에서 그 음식을 남김없이 먹기 시작했다. <br><br>\"나한테 원하는 게 있는 거지? 우린 같은 걸 원하고 있는 거 같은데.\""
                },
            
                bad: {
                    affection: 3,
                    rage: 0,
                    lust : 6,
                    line: "소라는 당신의 음식을 천천히 맛보기 시작했다. 중간에 살짝 인상을 찌푸리긴 했지만 음식을 다 비워내긴 했다. <br><br>\"으응, 맛있네, 이제 더 큰 선물이 딸려오려나?\""
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "당신의 요리에 소라는 미소를 지었다. <br><br>\"고기도 좋지.\"<br><br>그는 당신의 음식을 남김없이 다 먹었다. <br><br>\"헤헤, 맛있어!\""
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "당신의 요리에 소라는 미소를 지었다. <br><br>\"소라는 다음 번에 고기보다는 채소로 부탁해.\"<br><br>어리광부리듯이 그는 말했다. 하지만 당신의 음식을 남김없이 다 먹긴 했다."
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "당신의 요리에 소라는 미소를 지었다. 그는 당신에게 장난을 치며 당신이 준 음식을 남김없이 다 해치웠다."
                }
            },

            vegetable : {
                great : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "당신의 요리에 소라는 감격한 듯 눈을 깜박였다. <br><br>\"너무 맛있어! 소라한테 시집 올래? 아니, 장가인가? 시집? 장가?\"<br><br>소라는 웃으며 당신의 음식을 다 해치웠다. 그는 다음 번에도 가져올 거냐고 물으며 눈을 반짝였다."
                },

                normal : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "당신의 요리에 소라는 감격한 듯 눈을 깜박였다. 그는 당신의 야채 요리라면 언제 가져와도 다 먹을 수 있다고 말하며 그릇을 모조리 깨끗하게 비웠다."
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "\"와, 야채 요리가 맛없을 수도 있구나.\"<br><br>소라는 진심으로 감탄하며 말했다. 하지만 그는 당신이 해준 거니 맛없는 야채요리라도 감수하겠다고 말하며 다 먹었다."
                }
            },

            fish : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 생선 요리를 먹으며 미소를 지었다. <br><br>\"소라도 낚시할 줄 아는데. 다음 번에 낚시 같이 가자.\""
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 생선 요리를 먹으며 당신은 이제 낚시도 잘하는 거냐고 물었다. <br><br>\"역시 소라 옆에 평생 있어줘, 응?\""
                },

                bad : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 생선 요리를 남김없이 비웠다. 맛없지는 않냐는 말에 그는 웃으며 당신꺼라면 뭐든 맛있다고 말했다."
                }
            },

            mixed : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"잘 먹겠습니다~\"<br><br>소라는 고기 부분부터 다 해치운 뒤 마지막에 야채를 싹쓸이했다. <br><br>\"소라는 원래 맛있는 건 가장 뒤에 먹어. 못 참을 때 빼고.\"<br><br>그의 금안이 당신을 의미심장하게 바라본다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹었다. 고기부터 먹고, 그다음에는 야채 싹쓸이. <br><br>\"어떻게 이리 요리를 잘해? 난 정말 못하는데!\""
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹었다. 고기부터 먹고, 그다음에는 야채 싹쓸이. <br><br>\"내 생각에는 고기가 들어가서 야채가 맛이 없어진 거 같아!\"<br><br>꺠끗한 그릇을 당신에게 내밀며 소라는 웃었다."
                }
            },

            bread : {
                great : {
                    affection : 3,
                    rage : 1,
                    lust : 0,
                    line : "소라는 당신의 뺭을 먹으며 웃었다. <br><br>\"소라는 빵을 정말정말 좋아해.\"<br><br>그는 한입에 못 먹는다는 게 아쉬운지 입을 크게 벌려서 빵을 냠냠 먹었다."
                },

                normal : {
                    affection : 3,
                    rage : 1,
                    lust : 0,
                    line : "\"빵은 부드럽고, 아빠가 많이 사주셨었어.\"<br><br>소라는 빵을 먹으며 노래하듯이 말했다. <br><br>\"아빠는 빵을 좋아했거든.\""
                },

                bad : {
                    affection : 3,
                    rage : 1,
                    lust : 0,
                    line : "소라는 빵을 냠냠 먹었다. 당신이 맛이 없지 않냐고 물으며 소라는 고개를 갸웃거렸다. <br><br>\"맛있는데?\"<br><br>...진심일까?"
                }
            },

            meatBread : {
                great : {
                    affection : 1,
                    rage : 2,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹으며 미소를 지었다. <br><br>\"근데 고기랑 빵은 대체 무슨 조합일까? 빵은 빵, 고기는 고기....\"<br><br>소라는 고기빵을 만든 사람이 있으면 얼굴 좀 보고 싶다고 말하며 당신의 요리를 다 해치웠다."
                },

                normal : {
                    affection : 1,
                    rage : 2,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹으며 미소를 지었다. <br><br>\"대체 누가 처음에 고기빵을 만들었던 걸까?\"<br><br>소라는 잠깐 말을 멈췄다. <br><br>\"아. 우리 아빠였지.\""
                },

                bad : {
                    affection : 1,
                    rage : 2,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹으며 미소를 지었다. <br><br>\"음~ 음음~\"<br><br>그는 말없이 흥얼거리며 당신의 요리를 전부 해치웠다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 3,
                    rage : 2,
                    lust : 0,
                    line : "\"빵도 맛있고 야채도 맛있지. 그러면 따로 먹는 게 낫지 않아?\"<br><br>소라는 빵의 겉껍질부터 다 먹더니 그대로 마지막에 야채를 다 입에 넣었다. <br><br>\"환상적이야.\"<br><br>소라는 맛을 음미하고 있다."
                },

                normal : {
                    affection : 2,
                    rage : 2,
                    lust : 0,
                    line : "\"빵도 맛있고 야채도 맛있지.\"<br><br>소라는 우물거리면서 말했다. <br><br>\"그래서 따로 먹어야 더 맛있는 거 같아. 서로가 서로의 맛을 해하잖아.\""
                },

                bad : {
                    affection : 1,
                    rage : 2,
                    lust : 0,
                    line : "\"내 생각엔 빵 때문이야.\"<br><br>소라는 당신의 요리를 먹으면서 말했다. 그는 당신의 요리를 남김없이 다 먹었다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 요리에 즐거워했다. 그는 야채만 먹는 게 더 취향이긴 하지만 쌀알 섞인 것을 어떻게 거부하냐고 너스레를 떨며 당신의 요리를 전부 해치웠다."
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹으며 소라는 요리를 못하니까 당신이 평생 요리를 해줘야 한다고 장난스레 말했다."
                },

                bad : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹으며 이정도 맛이어도 소라는 당신이 주는 음식이라면 다 먹을 수 있다고 말했다. 그는 당신의 요리를 전부 해치웠다."
                }
            },

            meatRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "소라는 오물오물 음식을 씹으며 당신은 고기를 좋아하냐고 물었다. <br><br>\"소라가 고기 요리 나중에 한번 해볼게! 아, 상점 태워먹을 거 같아서 안 되겠다.\""
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "소라는 당신의 요리를 먹으며 당신의 요리가 마틴의 요리보다 더 맛있다고 말했다. 그 말이 진심인지 아닌지 당신은 그의 눈동자만 보고서는 알 수 없다."
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "소라는 오물오물 음식을 씹어 먹었다. 그는 말없이 작게 흥얼거리며 당신의 요리를 다 해치웠다."
                }
            },
            
            default: {
                trash: {
                    affection: -3,
                    rage: 0,
                    lust : 0,
                    line: "당신에게 쓰레기를 받은 소라는 눈을 동그랗게 떴다. <br><br>\"이걸 나한테 주는 거야?\"<br><br>그러더니 그는 까르르 웃으며 손사래를 쳤다.<br><br>\"장난도 심하지!\""
                }
            }
        }
    },
    yuri: {
        reactions: {
            yuriFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            yuriHate: {
                great: {
                    affection: -3,
                    rage: 0,
                    lust : 0,
                    line: "생선탕을 본 유리의 표정이 굳었다. 탕이어서 비린 냄새가 더 심하게 올라온 모양이다.... 유리를 그만 괴롭히는 게 좋겠다."
                },
            
                normal: {
                    affection: -5,
                    rage: 0,
                    lust : 0,
                    line: "유리는 당신의 생선탕에 표정 관리를 하지 못했다. 그는 아이들에게 나눠줄 거면 빨리 나눠주라고 말한 후 그대로 쉘터를 다시 나가버렸다. 생선 냄새가 빠질 때까지는 안 들어올 거 같다..."
                },
            
                bad: {
                    affection: -7,
                    rage: 0,
                    lust : 0,
                    line: "\"...{playerName}.\"<br><br>유리는 조용히 당신을 바라보았다. 그는 숨을 옅게 쉬고 있었다. <br><br>\"설마 나한테 먹으라는 건 아니지? 나 생선탕 싫어하는 거 알잖아.\""
                }
            },


            sweet: {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: "\"와, 정말 맛있다!\"<br><br>유리는 웃으며 당신의 음식을 먹었다. 생각해보니 그는 달콤한 것을 즐기지 않았던 거 같은데, 지금은 웃으며 먹고 있는 걸 보니 예전보다는 잘 먹을 수 있게 된 것처럼 보인다. 아니면 당신을 향한 배려든가."
                },
            
                normal: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "\"맛있어.\"<br><br>유리는 달콤한 음식을 먹으며 미소를 지었다. 그는 쉘터의 아이들도 당신의 음식을 좋아해줄 거라고 말하며 웃었다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"괜찮아.\"<br><br>유리는 당신이 만들어준 음식을 먹으면서 말했다. <br><br>\"요리는 하다보면 늘 거야.\""
                }
            },
            
            lusty: {
                great: {
                    affection: -2,
                    rage: 0,
                    lust : 0,
                    line: "유리는 당신이 가져온 음식을 뚫어지게 응시하다가 작게 한숨을 쉬었다. <br><br>\"음식에 이런 장난을....\"<br><br>그는 어린 아이를 바라보는 시선으로 당신을 보고 있다."
                },

                normal: {
                    affection: -4,
                    rage: 0,
                    lust : 0,
                    line: "유리는 당신이 가져온 음식을 비닐봉지에 담았다. <br><br>\"쉘터에는 이런 음식을 가져오지 않았으면 좋겠어.\""
                },
            
                bad: {
                    affection: -6,
                    rage: 0,
                    lust : 0,
                    line: "유리가 코를 찡그렸다. 그러더니 그는 당신이 만든 음식을 비닐봉투에 담아서 꽁꽁 묶었다. <br><br>\"....\"<br><br>그는 당신을 비난하지 않았다, 그저 쳐다볼 뿐."
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 5,
                    line: "유리는 당신이 가져온 음식을 보더니 바로 그 음식을 손으로 가렸다. 그는 음식을 비닐봉투에 담으며 고개를 저었다. <br><br>\"이런 건...\"<br><br>말을 흐리는 그의 얼굴 위로 홍조가 일었다."
                },

                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 5,
                    line: "유리는 당신이 가져온 음식에 한숨을 쉬더니 비닐봉지를 가져왔다. 그는 비닐봉지 안에 음식을 담으며 이런 장난은 졸업해주면 안 되냐고 물었다. <br><br>\"귀엽긴 하... 음.\"<br><br>그는 목을 가다듬은 후 비닐봉투를 묶었다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 1,
                    line: "유리는 당신이 가져온 음식을 바로 비닐봉투에 넣었다. 그는 어색한 미소를 지으며 당신에게 이거 먹을 거냐고 물었다. <br><br>\"안 먹을 거면 내가 버릴게. 이런 건 몸에 안 좋아.\""
                }
            },

            meat : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신의 요리를 먹으며 감탄했다. <br><br>\"요리는 언제 배운 거야? 마틴?\"<br><br>그는 언젠가 자신도 마틴에게 요리를 배워서 네게 대접해주고 싶다고 말하며 웃었다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신의 요리를 먹으며 고기는 몸에 좋다고 말했다. 그는 먹다가 당신에게 숟가락을 내밀었다. <br><br>\"나만 먹을 수는 없잖아. 자, 아.\"<br><br>어린 시절로 돌아간 느낌이다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신의 요리에 웃음을 터뜨렸다. 그는 자기도 가끔 실패한다고 말하며 다음에 더 잘하면 된다고 말했다."
                }
            },

            vegetable : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "\"와...!\"<br><br>유리의 눈이 놀라서 동그래졌다. 그는 당신에게 어떻게 야채 요리도 이렇게 잘할 수도 있냐고 물었다. <br><br>\"이런 야채 요리라면 언제든 먹을 수 있을 거 같아. 나도, 아이들도.\""
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신의 요리를 먹으며 고개를 끄덕였다. <br><br>\"네 앞에서도 편식은 하면 안 되겠지...\"<br><br>그는 당신이 준 그릇을 꺠끗하게 비웠다."
                },

                bad : {
                    affection : -2,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신과 요리를 번갈아보더니 마음을 굳힌 듯 천천히 당신의 요리를 먹었다."
                }
            },

            fish : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "생선 요리를 본 유리가 뒤로 몇 걸음 물러났다. <br><br>\"미안. 비린 건 못 먹어서. 맛있을 거라는 건 알아.\""
                },

                normal : {
                    affection : -2,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신의 생선 요리 냄새에 힘든 모양이다. 그는 애써 웃어보였다. <br><br>\"다른 사람이라면 좋아할 거야.\""
                },

                bad : {
                    affection : -4,
                    rage : 0,
                    lust : 0,
                    line : "유리의 표정이 굳었다. 그는 당신에게서 몇 걸음 떨어진 후 미안하다고 말했다."
                }
            },

            mixed : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 요리를 보며 맛도 잡고 영양가도 챙긴 최고의 요리라고 말해주었다. 그는 먹으면서도 당신에게 자꾸만 숟가락을 내밀었다. <br><br>\"같이 먹어.\"<br><br>그는 고기를 내밀며 웃었다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 요리를 먹으며 당신은 잘 먹고 다니는 거 맞냐며 걱정했다. 그는 음식에서 고기 부분을 떼어 당신의 입에 넣어주었다."
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"음...\"<br><br>그는 미소를 지었다. 하지만 당신의 요리를 먹어주기는 했다."
                }
            },

            bread : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신이 가져온 빵에 눈을 깜박였다. <br><br>\"이거 비싸지 않아?\"<br><br>그는 머뭇거리다가도 빵을 먹으며 고맙다고 말했다. <br><br>\"한번 더 먹어보고 싶었는데, 고마워.\""
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신이 가져온 빵에 눈을 깜박였다. 그는 자신이 먹어도 정말 괜찮겠냐고 묻다가 결국에는 빵을 입에 물었다. <br>...그는 빵을 먹으며 잠시 생각에 잠겼다. <br><br>\"...고마워. 진심으로.\""
                },

                bad : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신이 가져온 빵에 눈을 깜박였다. 그는 자신이 먹어도 정말로 괜찮겠댜고 묻다가 결국에는 빵을 입에 물었다. 그는 맛을 보더니 이런 맛은 많이 먹어봤다고 말하며 웃었다."
                }
            },

            meatBread : {
                great : {
                    affection : 7,
                    rage : 0,
                    lust : 0,
                    line : "고기빵을 한입에 베어물은 그의 얼굴 위로 행복이 스쳐지나갔다. 그는 당신의 요리를 먹으며 반쪽을 떼어 당신에게 내밀었다. <br><br>\"하류도시에서 이런 빵을 만들 수 있는 사람은 너뿐일 거야.\""
                },

                normal : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "그는 고기빵은 다시는 못 먹을 거라 생각했다고 말하며 당신과 고기빵을 나눠먹었다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "그는 고기빵의 맛에 놀란 표정을 지었다. <br><br>\"...고기가 덜 익은 거 아닐까?\"<br><br>그는 빵 안의 고기를 들여다보며 말했다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"너는 정말 야채빵도 잘 만드는 구나.\"<br><br>유리는 당신의 요리를 먹으며 당신이 준 야채빵은 일주일에 한번 정도는 먹을 수 있을 거 같다고 말했다. <br><br>\"...아니면 두 번?\"<br><br>확신이 없는 목소리다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 야채빵을 먹으며 야채를 좋아하는 아이들이 자랑스럽다고 말했다. <br><br>\"나는 도무지... 좋아하지는 못하겠더라고. 하지만 건강해져야 하니까.\"<br><br>그는 당신의 요리를 계속 먹었다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "그는 세상을 잃은 얼굴로 당신의 요리를 바라보았다. 먹어야 하는 처지보다는 빵을 저 야채에서 구해내지 못헀다는 마음이 더 큰 거 같다. 금방 표정을 고치긴 했지만 당신은 어쩐지 어린 시절의 유리를 본 거 같아서 웃음이 났다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "유리는 밖에 나갈 때 야채보다는 고기를 더 많이 가져오고는 한다. 당신의 훌륭한 요리에도 야채는 은근슬쩍 골라내는 유리를 보며 당신은 자기도 모르게 웃었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "유리는 어렸을 때부터 야채를 별로 좋아하지 않았다. 하지만 지금은 쉘터의 어린 아이들 때문에 싫지 않은 척 야채를 먹는 거 같다. 쉘터의 아이가 들어오자 유리는 가장 큰 야채를 젓가락으로 집어 꿀꺽 삼켰다. 아무렇지도 않은 표정으로."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "유리는 작게 썰어져있는 야채는 먹었지만 크게 썰어져있는 야채에는 도무지 손이 안 가는 모양이었다. 하지만 그는 눈을 꽉 감더니 야채를 먹었다."
                }
            },

            meatRice : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신에게 나중에 고기 굽는 법 좀 알려달라고 말했다. <br><br>\"나는 이렇게 맛있게는 못 굽겠더라고.\"<br><br>그는 웃으며 당신의 요리를 먹었다."
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "유리는 당신의 요리를 즐기고 있다. 그는 당신도 먹으라고 하면서 음식을 당신 쪽으로 내밀었다. <br><br>\"넌 잘 먹고 다니는 거지?\""
                },

                bad : {
                    affection : -2,
                    rage : 0,
                    lust : 0,
                    line : "\"...고기가 좀 덜 익은 거 같아.\"<br><br>그는 고개를 갸웃거리며 당신의 요리를 살폈다."
                }
            },
            
            default: {
                trash: {
                    affection: -5,
                    rage: 0,
                    lust : 0,
                    line: "쓰레기를 받은 유리는 쓰레기와 당신을 번갈아보았다. <br><br>\"...나 주는 거야?\"<br><br>그리고 또 정적이 흘렀다."
                }
            }
        }
    },
    kain: {
        reactions: {
            kainFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            kainHate: {
                great: {
                    affection: -1,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 7,
                    rage: 0,
                    lust : 0,
                    line: "\"이거 네가 만든 거야?\"<br><br>그는 당신이 만든 음식을 먹더니 놀란 표정을 지었다. <br><br>\"이상한 거 넣은 건 아니지?\"<br><br>그는 삐딱하게 말했지만 귀끝의 홍조는 숨기지 못했다. 아니, 귀뿐만 아니라 뺨도 붉었다."
                },
            
                normal: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: "\"어렸을 때 형이 많이 줬었어. 형은 달콤한 거 싫어하거든.\"<br><br>카인은 당신의 음식을 먹으면서 말했다. 옛날 생각을 하는 건지 그의 눈동자는 어두워졌다. 그는 은근슬쩍 당신과의 거리를 좁혀왔다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "\"우웩.\"<br><br>그는 먹자마자 인상을 찌푸렸다. 하지만 당신이 가져가려고 하자 휙 손을 뒤로 내뺐다. <br><br>\"이미 줬잖아. 그럼 내꺼지.\""
                }
            },
            
            lusty: {
                great: {
                    affection: 1,
                    rage: 0,
                    lust : 8,
                    line: "카인은 당신과 음식을 멍하니 번갈아보았다. <br><br>\"너...너 미쳤냐!\"<br><br>그러면서도 그는 당신의 음식을 버리지는 않았다."
                },

                normal: {
                    affection: 0,
                    rage: 3,
                    lust : 8,
                    line: "음식에서 풍겨오는 비릿한 냄새에 카인은 자기도 모르게 뒤로 물러났다. <br><br>\"미친, 미친새끼...\"<br><br>하지만 당신이 음식을 밀어주자 그는 거부하지 못하고 받아버렸다. <br><br>\"미친새끼야...\""
                },
            
                bad: {
                    affection: -2,
                    rage: 3,
                    lust : 8,
                    line: "그는 냄새를 맡자마자 인상을 찌푸렸다. <br><br>\"씨발, 뭔 쓰레기를 가져오냐? 당장 치워.\"<br><br>그는 휙 고개를 돌렸지만 그 음식에서 시선을 떼지는 못했다. <br><br>\"하... 존나 비위 상하는데...\"<br><br>그는 당신에게 성큼성큼 다가오더니 손가락으로 푹 찍어서 맛을 보았다. 우욱, 헛구역질을 하며 그가 고개를 숙였다."
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 15,
                    line: "카인은 당신과 음식을 번갈아보았다. 그의 얼굴이 점점 홍당무처럼 붉어지고 있다. <br><br>\"너, 너.... 다른 사람한테는 이러지 마라!?\"<br><br>그는 훽 당신의 음식을 낚아채듯이 가져갔다."
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 5,
                    line: "카인은 당신과 음식을 번갈아보았다. 그의 얼굴이 점점 홍당무처럼 붉어지고 있다. <br><br>\"씨발, 나 비린 거 못 먹는데... 너 일부러 그러는 거냐?\"<br><br>중얼중얼 욕을 하면서도 그는 당신의 음식을 챙겼다."
                },
            
                bad: {
                    affection: 0,
                    rage: 3,
                    lust : 1,
                    line: "\"우욱.\"<br><br>그는 바로 벽에 손을 짚으며 헛구역질을 했다. 비위가 약한 그에게 이런 음식은 최악이었다. 그는 당신을 노려보았다. <br><br>\"너 설마 나한테 먹으라고 할 건...\"<br><br>그의 동공이 세차게 흔들린다."
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "카인은 당신의 요리에 시큰둥하게 반응했다. 그는 자신은 몸매 관리를 해야 해서 많이는 못 먹는다고 말했다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "카인은 당신이 가져온 요리를 조금 먹다가 그만두었다. <br><br>\"난 많이 먹으면 안 돼.\""
                },

                bad : {
                    affection : -5,
                    rage : 2,
                    lust : 0,
                    line : "\"뭐야. 너 이걸 나한테 먹으라고 가져온 거야?\"<br><br>갖다 치우라는 듯 그는 손짓을 해보였다. <br><br>\"난 안 먹어.\""
                }
            },

            vegetable : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "카인은 당신의 요리에 시큰둥하게 반응했다. 야채는 싫어하냐는 물음에 싫어하지 않는다고 대답하긴 했지만 아무리 봐도 편식하는 거 같다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"난 원래 잘 안 먹어.\"<br><br>카인은 음식을 좀 먹다가 그만두었다."
                },

                bad : {
                    affection : -5,
                    rage : 3,
                    lust : 0,
                    line : "\"...대체 이런 걸 나한테 들고 오는 이유가 뭐야?\"<br><br>그는 화가 난 거 같다.<br><br>\"너나 처먹어.\""
                }
            },

            fish : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "카인은 당신의 생선 요리를 보더니 인상을 찌푸렸다. 편식하는 거냐고 묻자 편식하는 건 아니라고 말했다. 하지만 그는 당신의 요리에 손가락 하나 대지 않았다."
                },

                normal : {
                    affection : -4,
                    rage : 3,
                    lust : 0,
                    line : "\"...비려.\"<br><br>카인은 당신에게 오지 말라는 듯 손을 내저어보였다. <br><br>\"냄새 배는 거 싫으니까 저리 가.\""
                },

                bad : {
                    affection : -8,
                    rage : 5,
                    lust : 0,
                    line : "\"야! 넌 무슨 그런 냄새를 풍기는 음식을!\"<br><br>그는 닿기도 싫다는 듯이 당신에게서 멀리 떨어졌다. <br><br>\"혼자 처먹고 와. 양치질까지 하고 와라?\""
                }
            },

            mixed : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 고기와 야채가 들어간 당신의 요리에 감흥없이 고개를 끄덕였다. 몸매 관리 때문에 많이는 안 먹을 거라는 말에 당신은 달콤한 건 많이 먹지 않냐고 물었다가 그대로 쫓겨날 뻔했다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "카인은 딱히 당신의 요리에 관심이 없는 거 같다. 그는 당신을 흘낏 보더니 다른 사람들이 가져온 건 다 쓰레기통행이라고 말했다. <br><br>\"그나마 너라서.... 아, 씨발.\"<br><br>그는 고개를 돌렸다."
                },

                bad : {
                    affection : -5,
                    rage : 0,
                    lust : 0,
                    line : "\"...너, 나랑 싸우고 싶어?\"<br><br>으르렁거리는 그를 피해 당신은 슬쩍 뒤로 물러났다."
                }
            },

            bread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                }
            },

            meatBread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵을 본 카인은 말이 없었다. 그는 빵은 자신에게 가져오지 말라고 하며 당신을 밀어냈다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "\"야채밥...\"<br><br>그는 작게 한숨을 쉬었다.<br><br>\"마른 사람이라면 야채를 좋아할 거라는 편견은 버려.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 야채밥을 보더니 인상을 찌푸렸다. 그는 몇 입 먹다가 그만두었다."
                },

                bad : {
                    affection : -5,
                    rage : 0,
                    lust : 0,
                    line : "\"...\"<br><br>카인이 당신을 꼴아본다. 곧 있으면 터질 거 같다. 당신은 그가 히스테리를 부리기 전에 물러났다."
                }
            },

            meatRice : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "\"너 그거 아냐? 탄짠탄짠은 죄악이야.\"<br><br>그는 당신의 요리를 먹으며 말했다. <br><br>\"그러니까 나 살 찌면 네 책임이야.\"<br><br>그렇게 말하면서도 그는 많이는 먹지 않았다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 요리를 먹다가 남겼다. 그는 슬쩍 당신의 눈치를 살피더니 남이 준 음식이었다면 한 입도 안 먹고 버렸을 거라고 말했다."
                },

                bad : {
                    affection : -5,
                    rage : 0,
                    lust : 0,
                    line : "\"...야.\"<br><br>짜증 폭발 직전이다. 당신은 슬금슬금 뒤로 물러났고 카인은 그런 당신에게 천천히 다가왔다. 당신이 튀자 그의 욕 섞인 소리가 뒤에서 들려왔다."
                }
            },
            
            default: {
                trash: {
                    affection: -10,
                    rage: 10,
                    lust : 0,
                    line: "\"...뭐야?\"<br><br>카인은 당신의 음식을 그대로 던졌다. 당신의 옆으로 지나간 음식, 그리고 이어서 들리는 쨍그랑 소리. <br><br>\"너나 처먹어.\""
                }
            }
        }
    },
    luke: {
        reactions: {
            lukeFavorite: {
                great: {
                    affection: 10,
                    rage: -4,
                    lust : 2,
                    line: "\"뭐야, 금연 강요냐?\"<br><br>루크는 피식 웃으면서도 당신이 만든 막대사탕을 쪽쪽 빨아먹었다. 그는 사탕 때문에 색이 변한 혀를 내밀어보였다.<br><br>\"왜, 이런 걸 바라고 준 거 아니었어?\""
                },
            
                normal: {
                    affection: 8,
                    rage: -2,
                    lust : 0,
                    line: "루크는 당신이 만든 막대사탕을 먹으며 자신이 처음부터 단 맛을 좋아했던 건 아니었다고 말했다. <br><br>\"뭐, 현재가 제일 중요하긴 하지.\"<br><br>와작, 그는 막대사탕을 씹으며 입꼬리를 올렸다."
                },
            
                bad: {
                    affection: 6,
                    rage: -1,
                    lust : 0,
                    line: "루크는 맛없는 막대사탕에도 뭐라 하지 않았다. 그는 사탕은 어떤 맛이든 다 사탕이라고 말했다. 그가 요리를 못하는 이유를 조금은 알 것만도 같다."
                }
            },
            lukeHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: "\"뭐야, 이건.\"<br><br>퉁명스럽게 대꾸하면서도 그는 당신의 음식을 먹었다. 입안에 단맛이 퍼지자 그의 자안은 놀란 듯 크게 떠졌다.<br><br>\"뭐야, 씨발. 너 음식도 잘해? 존나 맛있네.\""
                },
            
                normal: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: "그는 당신이 가져온 음식을 먹으며 고개를 끄덕였다. 입에 잘 맞는 모양이다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "그는 당신의 음식을 먹더니 인상을 찌푸렸다. <br><br>\"요리 더럽게 못하네.\"<br><br>하지만 그는 당신의 요리를 남김없이 다 먹어주었다."
                }
            },
            
            lusty: {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 5,
                    line: "루크는 당신의 요리를 보더니 비릿하게 웃었다. <br><br>\"미친새끼...\"<br><br>그는 욕을 하면서도 손가락으로 요리를 푹 찍어 당신의 앞에서 맛을 보았다. <br><br>\"...씨발, 뭔데 맛있냐.\"<br><br>그는 이딴 요리가 맛있어서 당황한 모양이다."
                },

                normal: {
                    affection: 1,
                    rage: 0,
                    lust : 5,
                    line: "루크는 당신의 요리를 보더니 비릿하게 웃었다. <br><br>\"미친놈...\"<br><br>그는 욕을 하면서도 손가락으로 요리를 푹 찍어 당신의 앞에서 맛을 보았다. 그는 당신을 보며 입꼬리를 더 올렸다. <br><br>\"왜, 씨발, 하고 싶어? 변태새끼.\""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 10,
                    line: "루크는 비릿한 냄새에 인상을 찌푸렸다가도 재밌다는 듯 웃었다. 그는 손가락으로 찍어 음식을 먹더니 예상대로 존나 맛없다고 말했다. 그는 당신에게 음식을 들이밀었다. <br><br>\"너도 처먹어.\"<br><br>그는 음식이 묻은 손가락을 당신의 입에 물렸다."
                }
            },
            lustyHighAffection : {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 10,
                    line: "루크는 당신과 당신의 요리를 번갈아보더니 피식 웃었다. <br><br>\"간이 크네?\"<br><br>그는 아무렇지도 않게 당신의 음식을 먹었다. <br><br>\"...존나 맛있네?\"<br><br>그는 자신의 혀가 고장났나 생각하고 있다."
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 10,
                    line: "루크는 당신과 당신의 요리를 번갈아보더니 피식 웃었다. 그는 당신의 음식을 먹으면서 위협적으로 몸을 당신 쪽으로 기울였다. <br><br>\"나도 한번 뭘 먹여주긴 해야곘네, {lukeTitle}.\""
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 15,
                    line: "루크는 당신과 당신의 요리를 번갈아보더니 웃음을 터뜨렸다. <br><br>\"냄새 씨발.\"<br><br>그는 당신의 음식을 먹으면서 이런 은혜는 꼭 갚아주겠다고 말했다. 집요하게 당신을 바라보는 그의 자안에 당신의 등골이 오싹해졌다."
                }
            },

            meat : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "루크는 당신이 가져온 요리를 먹으며 사냥은 어디서 했냐고 물었다. <br><br>\"거기 고기 질이 좋은 거 같아서.\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "루크는 당신이 가져온 요리를 먹으며 마틴에게 요리하는 법을 배운 거냐고 물었다. 당신이 루크에게 너는 요리를 안 하냐고 묻자 루크는 눈동자를 굴렸다. <br><br>\"난 안 해. 내가 왜 해.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "루크는 맛없다고 말하면서도 음식은 남기지 않았다."
                }
            },

            vegetable : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "루크는 당신이 가져온 요리를 먹으며 요리로 먹고 살 생각이냐고 물었다. <br><br>\"하긴, 너같은 새끼는 밖에서 나돌아다니다가 개죽음밖에 더 당하냐?\"<br><br>그는 마틴에게 잘 배우라고 말하며 당신의 요리를 끝마쳤다.<br><br>\"그 새끼가 널 봐줄지는 모르겠지만.\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "루크는 당신이 가져온 요리를 먹으며 요리를 싸갖고 다니냐고 물었다. <br><br>\"...도시락에?\"<br><br>뭘 상상한건지 그는 혼자 웃었다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "루크는 맛없다고 하면서도 음식은 남기지 않았다. 그는 당신에게 빈 그릇을 내밀었다."
                }
            },

            fish : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "\"오.\"<br><br>루크는 당신의 생선 요리를 보더니 픽 웃었다. <br><br>\"낚시 잘하나 보네?\"<br><br>그는 당신의 요리를 맛있게 먹었다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 생선 요리를 먹었다. 낚시를 해본 적 있냐는 말에 그는 자신은 손으로 물고기를 잡는다고 말했다. <br>...거짓말이겠지?"
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 비린 냄새가 나는 당신의 생선 요리에도 딱히 별 말은 하지 않았다."
                }
            },

            mixed : {
                great : {
                    affection : 8,
                    rage : 0,
                    lust : 0,
                    line : "당신이 가져온 요리에 루크는 눈을 느리게 깜박였다. <br><br>\"...호화요리네.\"<br><br>그는 작게 중얼거리더니 당신이 해준 요리를 말없이 먹었다. 정적이 흐른다."
                },

                normal : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "당신이 가져온 요리에 루크는 눈을 느리게 깜박였다. 그는 당신의 요리를 먹으면서 아무 말도 하지 않았다. 정적 속에서 그는 그릇을 비웠다."
                },

                bad : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "맛없는 요리였지만 루크는 맛에 대해서는 말을 하지 않았다. 그는 그저 당신이 가져온 요리를 먹을 뿐이다."
                }
            },

            bread : {
                great : {
                    affection : -1,
                    rage : 1,
                    lust : 0,
                    line : "당신이 빵을 가져오자 루크는 이해하지 못하겠다는 표정을 지었다. <br><br>\"비싸기만 하고 영양가도 없는 걸 왜 먹냐.\""
                },

                normal : {
                    affection : -3,
                    rage : 2,
                    lust : 0,
                    line : "당신이 빵을 가져오자 루크는 짜증을 냈다. <br><br>\"맛도 없고 영양가도 없고 비싸기만 한 걸 왜 처먹어?\""
                },

                bad : {
                    affection : -5,
                    rage : 3,
                    lust : 5,
                    line : "당신은 그에게 빵을 내밀었지만 그는 받아주지 않았다. 오히려 그는 빵을 당신의 입에 박아준 후, 빵이 이제야 의미가 있어보인다고 말했다."
                }
            },

            meatBread : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신이 가져온 고기빵을 먹긴 했지만 그다지 즐기는 눈치는 아니었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신이 가져온 고기빵을 먹긴 했지만 그다지 즐기는 눈치는 아니었다."
                },

                bad : {
                    affection : -5,
                    rage : 3,
                    lust : 0,
                    line : "그는 먹는 것보다는 파는 게 낫지 않냐고 말했다. <br><br>\"아. 망해서 어차피 팔아도 원재료값은 안 나오겠군. 그래서 가져온 거냐?\"<br><br>그는 비꼬는 어조로 말했다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 야채빵을 받긴 했지만 순간 먹어야 하나 먹지 말아야 하나 고민한 거 같다. <br><br>\"하...\"<br><br>그는 낮게 한숨을 쉬더니 야채빵을 먹었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "그는 고민하다가 야채빵을 먹었다. <br><br>\"...씨발. 역시 상류도시 새끼들은 이해가 안 가.\""
                },

                bad : {
                    affection : -5,
                    rage : 3,
                    lust : 0,
                    line : "그는 먹는 것보다는 파는 게 낫지 않냐고 말했다. <br><br>\"아. 망해서 어차피 팔아도 원재료값은 안 나오겠군. 그래서 가져온 거냐?\"<br><br>그는 비꼬는 어조로 말했다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "\"자꾸 귀여운 짓을 하네. 꼬리치냐?\"<br><br>그는 시비조로 말하면서도 당신의 요리를 먹었다. 맛있었는지 그의 먹는 속도가 점점 더 빨라졌다."
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신을 힐끗 보았다. <br><br>\"요새 살 만한가봐?\"<br><br>그 말을 끝으로 그는 당신의 요리를 먹기 시작했다. 말없이 먹고 있는 걸 보아 그래도 마음에 들었나 보다."
                },

                bad : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "루크는 당신의 맛없는 요리에도 별 말을 하지 않았다. 그는 그저 당신의 요리를 남김없이 다 먹을 뿐이다."
                }
            },

            meatRice : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "\"존나 맛있네.\"<br><br>그는 당신의 요리를 먹으면서 말했다. <br><br>\"...요리로 나갈 생각이냐?\"<br><br>농담으로 하는 소리가 아닌 거 같다. 당신이 대답을 하기도 전에 루크는 당신에게서 고개를 돌렸다."
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 요리를 먹으며 당신은 어디에다가 두어도 살아남을 수 있을 거 같다고 말했다. 비아냥거리는 건가? 하지만 그의 눈은 짜증이 나있거나 화나보이지는 않았다."
                },

                bad : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"근데 이럴 거면 그냥 파는 게 낫지 않냐? 요리 더럽게 못했네.\"<br><br>그는 딱 그 한 마디를 던지더니 그 후로는 맛 평가는 하지 않았다. 그저 당신의 요리를 깨끗하게 비웠을 뿐이다."
                }
            },
            
            default: {
                trash: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"...주운 거냐?\"<br><br>루크는 당신을 쳐다보았다. 그러더니 어깨를 으쓱였다.<br><br>\"길거리에다 뿌려. 그거라도 먹고 싶어하는 새끼들은 많으니까.\""
                }
            }
        }
    },
    nikolai: {
        reactions: {
            nikolaiFavorite: {
                great: {
                    affection: 7,
                    rage: -5,
                    lust : 0,
                    line: "\"어머, 자기! 이걸 나 위한 거야?\"<br><br>니콜라이는 눈을 반짝이며 당신의 마카롱을 받아들였다. 그는 입을 오물오물거리더니 맛있다고 말하며 당신에게도 한입 베어물라고 하며 마카롱의 남은 부분을 내밀었다."
                },
            
                normal: {
                    affection: 5,
                    rage: -5,
                    lust : 0,
                    line: "\"마카롱은 작고 달콤하고...\"<br><br>그는 당신의 마카롱을 먹다가 남은 것을 당신의 입에 쏙 집어넣었다. <br><br>\"자기같아~\""
                },
            
                bad: {
                    affection: 1,
                    rage: -3,
                    lust : 0,
                    line: "\"으흥, 가끔은 이런 날도 있는 거지.\"<br><br>니콜라이는 당신의 맛없는 마카롱도 맛있게 먹어주었다. 어쩌면 연기일지도 모르겠지만, 그는 당신의 마음을 받아들였다."
                }
            },
            nikolaiHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 6,
                    rage: 0,
                    lust : 0,
                    line: "니콜라이는 당신의 요리를 먹더니 감동먹은 표정으로 제 뺨을 감싸안았다. <br><br>\"너무 맛있다, 자기! 언젠가 내 전속 요리사가 되어주지 않겠어?\""
                },
            
                normal: {
                    affection: 4,
                    rage: 0,
                    lust : 0,
                    line: "그는 당신의 달콤한 요리를 혀로 굴리면서 미소를 지었다. <br><br>\"달콤한 건 언제나 기분을 좋아지게 만들어.\""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"자기야...\"<br><br>그는 충격먹은 얼굴로 당신을 바라보았다. <br><br>\"달콤한 맛이 하나도 느껴지지 않아.\""
                }
            },
            
            lusty: {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 4,
                    line: "니콜라이는 미소를 지었다. <br><br>\"자기, 나랑 자고 싶구나? 근데 나 엄청 비싼데~ 뭐, 자기라면 공짜로 해줄 수도 있고?\"<br><br>그는 장난스럽게 말하며 당신의 요리를 먹었다."
                },

                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 2,
                    line: "니콜라이는 당신의 요리에 키득키득 웃었다. <br><br>\"어쩔까, 넘어가줄까?\"<br><br>그는 꽃받침을 하고 당신에게 장난스러운 시선을 던졌다."
                },
            
                bad: {
                    affection: -2,
                    rage: 0,
                    lust : 0,
                    line: "\"비려.\"<br><br>니콜라이는 단호했다. <br><br>\"정액보다 더 비린 냄새가 나는 거 같아... 이쪽이 취향?\""
                }
            },
            lustyHighAffection : {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 10,
                    line: "니콜라이는 미소를 지었다. <br><br>\"방은 언제로 잡을까? 내일? 오늘? 아니면....\"<br><br>그는 당신쪽으로 몸을 기울였다.<br><br>\"지금 당장?\""
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 7,
                    line: "\"요리는 섹스를 하기 위한 초석이 되기도 하지.\"<br><br>니콜라이는 당신에게 윙크했다. <br><br>\"물론 자기도 이미 알고 있었지?\""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 5,
                    line: "니콜라이는 미소를 지으며 당신의 요리를 치웠다. <br><br>\"이것보다 덜 비리고, 더 맛있는 게 어딨는지 아는데.... 금방 만들 수 있거든?\"<br><br>그의 숨결이 가까워졌다.<br><br>\"맛보고 싶어?\""
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 고기는 잘 안 먹는다고 말해주었다. <br><br>\"기름기 있는 건 별로더라고. 이 요리는 맛있지만.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 고기를 먹다가 남겼다. 그는 아까 컵케이크를 좀 먹었더니 배불러서 못 먹는 거라고 말하며 윙크를 해보였다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"오...\"<br><br>니콜라이는 고기의 탄 부분을 꾹꾹 찔렀다. <br><br>\"자기, 이런 건 몸에 안 좋아.\""
                }
            },

            vegetable : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 채소는 몸에 좋다고 하며 당신의 요리를 맛있게 먹어주었다. 그는 평소보다 더 많이 먹었다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 당신에게 채소를 좋아하냐고 물었다. <br><br>\"나는 어렸을 때 채소를 많이 못 먹어서 그런가, 사실 지금도 그렇게 많이는 못 먹겠더라고.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 당신에게 채소를 좋아하냐고 물었다. <br><br>\"나는 어렸을 때 채소를 많이 못 먹어서 그런가, 사실 지금도 그렇게 많이는 못 먹겠더라고.\""
                }
            },

            fish : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "그는 상류도시의 생선 요리보다 당신의 생선 요리가 더 맛있다고 말하며 엄지를 올려보였다. <br><br>\"자기, 나중에 상류도시에서 주점 차리는 거 어때? 생각보다 잘될지도 몰라.\""
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "\"뼈 있는 거야?\"<br><br>그는 뼈 있는 생선은 먹기 힘들다고 말하며 생선살을 발랐다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"너무 탔다, 자기, 이것도 재능이야!\"<br><br>그는 가끔 요리를 망치는 것도 매력이라 생각하는 사람들이 있다고 말했다. 오타쿠라나?"
                }
            },

            mixed : {
                great : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 야채도 고기도 모두 중요하다고 말하면서 웃었다. <br><br>\"난 이런 반반음식이 좋아.\""
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "마틴은 당신의 요리를 먹으며 고개를 끄덕였다. <br><br>\"이정도면 괜찮아.\"<br><br>그는 고기 부분보다는 야채 쪽을 더 많이 먹고 있다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"반반음식보다 더 중요한 게 뭔지 알아? 바로 맛이지.\"<br><br>니콜라이는 쿡쿡 웃었다."
                }
            },

            bread : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 빵은 상류도시에 가면 지겹게 먹는다고 말했다. <br><br>\"그런데도 어쩜 이렇게 질리지가 않을까?\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"근데 맨빵보다는 역시 달콤한 빵이 좋아. 컵케이크처럼.\"<br><br>니콜라이는 미소를 지어보였다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"어머... 그냥 빵인데도 맛없을 수가 있네. 자기, 진짜 재능 있다.\""
                }
            },

            meatBread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 흥얼거리면서 빵을 먹었다. 하지만 몇 입 먹지 못하고 그는 내려놓았다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 고기빵을 몇 입 먹다가 내려놓았다. 그는 다음 번에는 달콤한 빵을 만드는 건 어떠냐고 조심스레 제안해왔다."
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"...탈날 거 같은 맛이 나는데?\"<br><br>니콜라이는 먹다가 슬쩍 내려놓았다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 오물오물 야채빵을 먹고 있다. 그는 당신은 어떤 빵을 제일 좋아하냐고 물었다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 야채빵을 먹으며 당신은 뭘 좀 먹었냐고 물었다. <br><br>\"아, 근데 남자들한테는 보통 키 작은 게 메리트가 있긴 하더라. 남자들이란.\"<br><br>...자기도 남자면서?"
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"으...\"<br><br>니콜라이는 웃으며 고개를 절레절레 저었다. <br><br>\"우리 이거 버리자. 차라리 내가 컵케이크 가져올게.\""
                }
            },

            vegetableRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 쌀은 탄수화물 덩어리라서 안 먹는 편이지만, 당신의 요리니까 먹어주는 거라고 장난스레 말했다. 당신이 빵보다는 쌀이 나을 거라 말하자 그는 '쉬잇' 해보였다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 야채밥을 꼭꼭 씹어먹으며 당신 때문에 일하다가 쓰러지지는 않을 거 같다고 말했다. <br><br>\"어디서든 체력이 최고거든.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"맛없어.\"<br><br>그는 숟가락을 내려놓고 과장스럽게 울상을 지어보였다."
                }
            },

            meatRice : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 고기밥을 먹으며 당신이 한 요리니 먹어주는 거라고 말했다. <br><br>\"내가 널 얼마나 아끼는지 이제 알겠니?\"<br><br>그는 장난스레 당신에게 윙크했다."
                },

                normal : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "그는 고기와 밥이 들어가자 더 속이 울렁거리는 거 같다고 말했다. 그는 웃는 얼굴로 숟가락을 내려놓았다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "니콜라이는 요리 냄새밖에 안 맡았는데 바로 숟가락을 내려놓았다. <br><br>\"탈날 거 같아.\""
                }
            },
            
            default: {
                trash: {
                    affection: -6,
                    rage: 0,
                    lust : 0,
                    line: "\"어머, 자기, 장난이 너무 심하다!\"<br><br>니콜라이는 깔깔 웃었다. 하지만 그의 눈은 전혀 웃고 있지 않았다."
                }
            }
        }
    },
    sion: {
        reactions: {
            sionFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            sionHate: {
                great: {
                    affection: -1,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: "\"영웅님은 달콤한 거 좋아하세요?\"<br><br>시온은 당신의 요리를 먹으며 미소를 지었다.<br><br>\"단 걸 좋아하는 영웅님이라니, 상상만 해도 너무 귀여운 거 같아요.\""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: "시온은 자신이 달콤한 걸 좋아할 거 같지 생겼냐고 물었다. 그는 자신이 당신에게 어려보일까봐 걱정하는 거 같다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "\"...응?\"<br><br>요리를 먹던 시온이 당신을 쳐다보았다. 그러더니 웃었다. <br><br>\"요리 못하는 영웅님이라니, 귀여워...\""
                }
            },
            
            lusty: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 5,
                    line: "시온은 얼굴이 붉어져서 당신이 내민 요리와 당신의 얼굴을 번갈아보았다. 그의 얼굴은 금방이라도 터질 거 같다..."
                },

                normal: {
                    affection: 3,
                    rage: 0,
                    lust : 5,
                    line: "시온은 붉어진 얼굴로 당신의 요리를 받았다. 그는 고개를 푹 숙인 후 고개를 들지 못하고 있다..."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 5,
                    line: "\"...이, 이런 냄새 좋아하세요...?\"<br><br>시온의 얼굴은 붉다. 그는 요리의 냄새를 맡으며 당신의 눈치를 살폈다."
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 8,
                    rage: 0,
                    lust : 10,
                    line: "\"영웅님..\"<br><br>시온은 붉게 달아오른 얼굴로 당신을 바라보았다. <br><br>\"...저도, 언젠가 대접해드릴게요...\""
                },

                normal: {
                    affection: 8,
                    rage: 0,
                    lust : 10,
                    line: "시온은 당신의 요리와 당신의 얼굴을 번갈아보다가 붉어진 얼굴로 웃었다. <br><br>\"이 빚은 꼭 갚을게요, 영웅님.\""
                },
            
                bad: {
                    affection: 5,
                    rage: 0,
                    lust : 5,
                    line: "\"영웅님은... 이런 냄새 좋아하시는 구나.\"<br><br>시온은 미소를 지었다. 그는 당신의 요리 냄새를 더 맡았다."
                }
            },

            meat : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 고기 요리를 먹다가 당신에게도 고기를 내밀었다. <br><br>\"영웅님도 건강해야 해요.\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "시온은 고기 요리를 먹다가 \"아~\"하며 당신에게 고기를 내밀었다. 내심 당신이 입을 벌려주길 바라고 있다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 고기 요리를 다 먹었다. 그리고 그는 웃었다. <br><br>\"잘 먹었아요, 영웅님.\"<br><br>어쩐지 그가 당신을 귀엽게 여기는 거 같다."
                }
            },

            vegetable : {
                great : {
                    affection : 8,
                    rage : 0,
                    lust : 0,
                    line : "\"영웅님이 절 위해서, 이런 건강식을...\"<br><br>그는 감동한 얼굴로 당신의 요리를 먹다가 당신에게도 요리를 내밀었다."
                },

                normal : {
                    affection : 6,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 야채 요리를 맛있게 먹고 있다. 그는 당신도 먹으라며 당신의 입에 숟가락을 내밀었다."
                },

                bad : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 야채 요리를 다 먹은 후 히죽 웃었다. <br><br>\"...귀여워...\"<br><br>그는 속삭이듯이 중얼거렸다."
                }
            },

            fish : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "\"다음 번에 연어 낚아올게요.\"<br><br>시온은 다짐하듯이 주먹을 쥐었다. 그리고 그는 당신의 요리를 먹다가 당신에게도 요리를 내밀었다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"다음 번에 연어 낚아올게요.\"<br><br>시온은 다짐하듯이 주먹을 쥐었다. 그리고 그는 당신의 요리를 먹다가 당신에게도 요리를 내밀었다."
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 웃으며 다음 번에 생선을 더 낚아올 테니 같이 요리 연습을 하자고 말했다. <br><br>\"같이...\""
                }
            },

            mixed : {
                great : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "\"고기랑 채소, 균형이 좋죠.\"<br><br>시온은 당신에게 \"아~\"하며 말했다. 그는 당신의 건강을 신경쓰고 있다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신과 한 숟가락씩 나눠먹으며 당신의 음식 취향에 대해 물었다."
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 요리를 먹으며 싱글싱글 웃었다. 어쩐지 그가 당신을 귀엽게 여기는 거 같다."
                }
            },

            bread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "시온은 맨빵은 무슨 맛으로 먹는지 모르겠다고 말하며 빵을 먹었다. <br><br>\"헉, 혹시... 영웅님이 좋다면 저도 좋아요.\"<br><br>그는 빠르게 빵을 해치웠다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "시온은 빵을 먹은 적은 거의 없다고 말했다. <br><br>\"사실 본 적도 많이 없어요.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "시온은 빵을 먹다가 인상을 찌푸렸다. <br><br>\"...감사해요, 영웅님. 잘 먹었습니다.\""
                }
            },

            meatBread : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "시온은 고기빵을 먹으며 역시 빵에는 뭔가가 들어가야 맛있다고 말했다. <br><br>\"고기라든지, 야채라든지...\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "시온은 빵 한조각을 떼서 당신의 입에 넣어주다가 얼굴이 붉어졌다."
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 빵을 먹으며 히죽 웃었다. <br><br>\"요리 못하는 영웅님이라니... 귀여워.\"<br><br>그는 작게 중얼거렸다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "시온은 웃으며 빵을 먹었다. 그는 이런저런 얘기를 재잘거리다가 당신의 입에도 빵을 넣어주었다. 그의 손가락이 은근슬쩍 당신의 입술을 스쳤다."
                },

                normal : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신과 빵을 나눠먹으며 상류도시에 갔을 때 당신도 빵을 많이 먹는 편이냐고 물었다."
                },

                bad : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 빵을 먹으며 히죽 웃었다. <br><br>\"요리 못하는 영웅님이라니... 귀여워.\"<br><br>그는 작게 중얼거렸다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "\"밥은 정말 금방 배가 차네요.\"<br><br>시온은 당신의 요리를 먹으며 말했다. 그는 당신에게도 \"아~\"하며 얼굴을 붉혔다."
                },

                normal : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신과 밥을 한숟가락씩 나눠먹으며 웃었다. <br><br>\"신혼부부...들도 이러겠죠?\"<br><br>그의 뺨이 상기됐다."
                },

                bad : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 요리를 먹으며 어떤 상상으로 얼굴을 붉히고 있다. <br>...당신을 귀엽다고 생각하고 있는 걸지도."
                }
            },

            meatRice : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 요리를 먹다가도 큰 고기가 나오면 당신의 입에 넣어주었다. 그는 당신의 오물거리는 입을 사랑스럽다는 듯이 바라보고 있다."
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "시온은 헤실헤실 웃으며 당신과 밥을 나눠먹고 있다. <br><br>\"가끔 영웅님은 아기새같아요....\""
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "시온은 당신의 요리를 먹으며 어떤 상상으로 얼굴을 붉히고 있다. <br>...당신을 귀엽다고 생각하고 있는 걸지도."
                }
            },
            
            default: {
                trash: {
                    affection: -5,
                    rage: 0,
                    lust : 0,
                    line: "시온은 쓰레기와 당신의 얼굴을 번갈아보았다. <br><br>\"...요새 저한테 뭐 화난 거라도 있나요...?\""
                }
            }
        }
    },
    valen: {
        reactions: {
            valenFavorite: {
                great: {
                    affection: 7,
                    rage: 0,
                    lust : 0,
                    line: "\"...꽤 좋아합니다. 남들에게 들키면 안 되겠지만요.\"<br><br>발렌은 당신이 내온 차에 만족하며 다과를 꺼내왔다."
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: "\"달콤한 간식과 함께면 더 맛있습니다.\"<br><br>발렌은 당신의 앞으로 다과를 가져왔다. 하지만 정작 그는 하얀꽃차만 홀짝이고 다과에는 관심을 두지 않았다."
                },
            
                bad: {
                    affection: -3,
                    rage: 0,
                    lust : 0,
                    line: "\"맛없는 차군요.\"<br><br>그는 당신의 하얀꽃차를 내려다보며 미소를 지었디.<br><br>\"다음부터는 요리사한테 맡기는 걸로 하죠.\""
                }
            },
            valenHate: {
                great: {
                    affection: -1,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: "\"달콤한 건 좋아합니다.\"<br><br>발렌은 미소를 지었다.<br><br>\"저랑은 어울리지 않아도 생각하십니까?\""
                },
            
                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "발렌은 당신의 요리를 먹으며 다음 번에는 자신이 요리를 대접하겠다고 말했다."
                },
            
                bad: {
                    affection: -3,
                    rage: 0,
                    lust : 0,
                    line: "발렌은 당신의 요리를 힐끗 보더니 웃는 얼굴로 말했다. <br><br>\"미안합니다. 배가 부르네요.\""
                }
            },
            
            lusty: {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"하류도시는 이런 천박한 음식을 좋아하는 군요.\"<br><br>발렌은 미소를 유지하고 있긴 했지만 당신의 요리를 먹을 생각은 없어 보인다."
                },

                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"하류도시는 이런 천박한 음식을 좋아하는 군요.\"<br><br>발렌은 미소를 유지하고 있긴 했지만 당신의 요리를 먹을 생각은 없어 보인다."
                },
            
                bad: {
                    affection: -5,
                    rage: 3,
                    lust : 0,
                    line: "발렌은 당신의 요리를 보더니 고개를 돌렸다. 그의 미소가 조금은 희미해진 거 같기도 했다. <br><br>\"장난이 심하시군요.\""
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 1,
                    rage: 0,
                    lust : 3,
                    line: "\"당신이 무슨 생각을 하는 지는 잘 알겠습니다.\"<br><br>발렌은 미소를 지었다. 하지만 그는 당신의 요리에는 입도 대지 않았다, 그저 당신을 위아래로 훑어보며 야릇한 미소를 지어보일 뿐."
                },

                normal: {
                    affection: 0,
                    rage: 3,
                    lust : 0,
                    line: "\"...제가 이런 걸 좋아할 거라고 생각하는 겁니까?\"<br><br>발렌은 웃고 있긴 했지만, 웃는 게 웃는 걸로 보이지는 않았다..."
                },
            
                bad: {
                    affection: -3,
                    rage: 0,
                    lust : 0,
                    line: "\"....\"<br><br>발렌은 아무 말 없이 당신을 바라보았다. 당신의 등골이 오싹해졌다."
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 요리를 예의상 맛보면서 고기 요리는 별로 좋아하지 않는다고 말했다. <br><br>\"책상 앞에서 거북해지는 게 싫어서요.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 다음 번에 자신이 상류도시의 고기 요리를 대접해주겠다고 말했다. 그는 당신이 가져온 것에는 입도 대지 않았다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "\"...아카시아에게 하류도시에도 요리를 잘하는 주점이 있다고 들었습니다만.\"<br><br>그는 미소를 지었다. <br><br>\"손수 요리를 하느니 차라리 사먹는 게 어떻겠습니까?\""
                }
            },

            vegetable : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 채소 요리를 먹으며 하류도시에서는 채소가 귀한 거 아니냐고 물었다. <br><br>\"하류도시의 영웅이 제게 채소 요리를, 영광이군요.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 미소를 지으며 다음 번에는 자신이 상류도시의 야채 요리를 대접해주겠다고 말했다. 그는 당신의 요리는 몇 입 먹다가 그만두었다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "\"...아카시아에게 하류도시에도 요리를 잘하는 주점이 있다고 들었습니다만.\"<br><br>그는 미소를 지었다. <br><br>\"손수 요리를 하느니 차라리 사먹는 게 어떻겠습니까?\""
                }
            },

            fish : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 생선 요리는 상류도시에서도 먹기 힘들다고 말했다. <br><br>\"저 말입니까? 저는 물론 적게 먹지는 않았지요. 아카시아가 생선 요리를 좋아하기도 하고요.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 생선 요리를 먹더니 다음 번에는 상류도시의 생선 요리를 대접해주겠다고 말했다. <br><br>\"제게 점수를 따려는 거라면 아쉽군요. 저는 입맛이 까다로워서요.\""
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 요리와 당신을 번갈아보더니 웃었다. <br><br>\"낚시는 힘들다고 들었는데, 낚시한 보람이 없겠군요, 하류도시의 영웅.\""
                }
            },

            mixed : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"균형이 잡힌 요리군요.\"<br><br>발렌은 당신의 요리를 맛보며 말했다. <br><br>\"하류도시에서 건강을 챙기는 건 사치라고 들었습니다. 하지만 하류도시의 영웅인 당신은 건강을 챙겼으면 좋겠군요.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 다음 번에는 상류도시의 요리 코스를 대접해주겠다고 말했다. <br><br>\"...아니면 데릭에게 언질을 해야 하나.\"<br><br>그는 작게 중얼거렸다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 말없이 당신의 요리를 바라보다가 고개를 돌렸다. <br><br>\"정성은 감사합니다.\"<br><br>그는 당신의 요리에는 손도 대지 않았다."
                }
            },

            bread : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신이 가져온 빵에 미소를 지었다. <br><br>\"밀가루로만 만든 빵은 양만 많죠. 물론 그걸 좋아하시는 분들도 꽤 있지만.... 비난하는 건 아닙니다. 취향 차이죠.\"<br><br>그는 몇 입 먹다가 그만두었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 상류도시에서도 아무 것도 들지 않는 빵을 먹는 자와 그 빵을 먹지 않는 자로 나뉜다고 말했다. 그는 당신의 빵을 거의 먹지 않았다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 말없이 미소만 지었다. 그의 시선은 이런 식으로 재료를 낭비하느니 차라리 사먹으라고 말하고 있는 거 같았다."
                }
            },

            meatBread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신에게 고기빵을 많이 먹어봤냐고 물었다. <br><br>\"상류도시 사람들은 고기빵을 즐겨먹습니다.\"<br><br>발렌은 몇 입 먹은 후 내려놓았다. <br><br>\"그래서 많이 준비해놓는 편이죠.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 고기빵이라면 상류도시 축제에서도 마음껏 먹을 수 있다고 말했다. 그는 당신에게 축제 일정을 몇 개 알려주었다."
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 요리를 보고 미소를 지었다. <br><br>\"다음부터는 재료를 아끼시는 게 좋을 거 같습니다. 이정도 맛이면 재료에게도 미안하니까요.\""
                }
            },

            vegetableBread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 야채빵은 상류도시 사람들도 많이 먹는 빵이라고 말했다. <br><br>\"다음 축제 때 손을 빌릴 수 있으면 좋겠군요.\"<br><br>그는 몇 입 먹다가 그만두었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신에게 야채빵을 많이 먹어봤냐고 물었다. <br><br>\"어쩌면 언젠가는 당신도 주식으로 야채빵을 먹게 될지도 모르죠.\"<br><br>그는 조용히 웃었다."
                },

                bad : {
                    affection :-3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 요리를 보고 미소를 지었다. <br><br>\"다음부터는 재료를 아끼시는 게 좋을 거 같습니다. 이정도 맛이면 재료에게도 미안하니까요.\""
                }
            },

            vegetableRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "\"하류도시 사람들의 입맛은...\"<br><br>발렌은 몇 입 먹더니 멈추었다. <br><br>\"저랑은 안 맞는 거 같군요.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 쌀알을 몇 번 건드리더니 미소를 지으며 수저를 내려놓았다. <br><br>\"품위없는 행동이었군요. 죄송합니다. 하지만 이런 상태의 쌀알은 저도 오랜만에 봐서요.\""
                },

                bad : {
                    affection : -3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 미소를 지으며 당신의 요리를 응시했다. 은근하게 치우는 손짓은 명백한 거절을 의미하고 있었다."
                }
            },

            meatRice : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 요리에 제대로 손도 대지 않았다. <br><br>\"이런 건 저한테 주시는 것보다 다른 분들께 드리는 게 나을 거 같군요.\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 쌀알을 몇 번 건드리더니 미소를 지으며 수저를 내려놓았다. <br><br>\"품위없는 행동이었군요. 죄송합니다. 하지만 이런 상태의 쌀알은 저도 오랜만에 봐서요. 고기의 기름기 때문만은 아닌 거 같네요.\""
                },

                bad : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "발렌은 당신의 요리를 물끄러미 쳐다보다가 고개를 돌려 당신과 시선을 마주했다. <br><br>\"하류도시 사람들도 싫어할 거 같은데요. 아, 제가 그들을 너무 과대평가한 걸까요?\""
                }
            },
            
            default: {
                trash: {
                    affection: -10,
                    rage: 0,
                    lust : 0,
                    line: "발렌은 쓰레기를 말없이 바라보았다. 그는 여전히 웃고 있었지만 침묵이 길어질수록 당신의 목뒤로는 식은땀이 흘렀다."
                }
            }
        }
    },

    akasia: {
        reactions: {
            akasiaFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            akasiaHate: {
                great: {
                    affection: -1,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"단 것은 입안이 끈적끈적해져서 싫어합니다.\"<br><br>아카시아는 고개를 저었다. 입에 대고 싶어하지도 않아하는 거 같다."
                },
            
                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "아카시아는 단 것은 손님 대접용으로만 쓴다고 말했다. 그는 당신의 요리를 맛볼 생각이 없다."
                },
            
                bad: {
                    affection: -5,
                    rage: 3,
                    lust : 0,
                    line: "\"달콤한 것에다가 맛이 없는 것이라니.\"<br><br>아카시아는 당신을 쳐다보았다. <br><br>\"저를 모욕하시려는 겁니까?\""
                }
            },
            
            lusty: {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 5,
                    line: "아카시아는 의미심장한 눈으로 당신을 보았다. <br><br>\"뻔한 수작이군요. 하지만 언젠가는.... 일부러 먹어드릴 수도요?\""
                },

                normal: {
                    affection: 1,
                    rage: 0,
                    lust : 3,
                    line: "아카시아는 당신의 요리에 의미심장한 표정을 지었다. <br><br>\"...언젠가는 당신의 요리를 먹어드릴 수도 있죠. 하지만 지금은 아닙니다.\""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"저를 원하신다면 더 노력해야 할 겁니다.\"<br><br>아카시아는 당신을 의미심장한 눈으로 응시하며 말했다."
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 4,
                    rage: 0,
                    lust : 10,
                    line: "아카시아는 당신을 무표정으로 바라보았다. 하지만 그는 당신을 똑바로 바라보며 당신의 앞에서 그 요리를 음미하듯이 먹어주었다. 어쩐지 분위기가 야릇해졌다...."
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 5,
                    line: "그는 말보다는 행동으로 보여주었다. 당신의 앞에서 당신의 요리를 먹으며, 그는 단 한번도 당신의 시선을 피하지 않았다. 오히려 당신의 얼굴이 붉어질 것만 같다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 3,
                    line: "\"더 노력해주세요.\"<br><br>아카시아는 고개를 기울였다. <br><br>\"이런 정성으로는 제가 넘어가드리지 않습니다.\""
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 고기는 별로 좋아하지 않는다고 말했다. <br><br>\"어려서부터 고기는 많이 안 먹어서 익숙하지 않은 걸지도 모르겠네요.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 제 부모님이 자신에게 고기보다는 야채를 더 많이 먹였다고 말했다. <br><br>\"물론 그렇다고 야채를 좋아하는 것도 아니지만요.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"요리를 못하시는 군요. 요리 선생님이라도 붙여드릴까요?\"<br><br>아카시아는 당신의 요리에 손도 대지 않았다."
                }
            },

            vegetable : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 채소 요리를 먹으며 어렸을 떄부터 부모님이 채소를 많이 먹였다고 말했다. <br><br>\"그래서 조금 질렸을지도요. 하지만 당신의 요리는 맛있습니다.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 그냥 채소 요리는 질리는데 밥이랑 같이 먹는 채소 요리는 맛있다고 말했다. <br><br>\"역시 쌀이 맛있는 걸까요?\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"요리를 못하시는 군요. 요리 선생님이라도 붙여드릴까요?\"<br><br>아카시아는 당신의 요리에 손도 대지 않았다."
                }
            },

            fish : {
                great : {
                    affection : 7,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 생선 요리를 먹으며 희미하게 웃었다. <br><br>\"저를 위한 생선 요리인가요? 센스가 좋군요.\"<br><br>그는 맛있게 당신의 생선 요리를 먹었다."
                },

                normal : {
                    affection : 4,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 발렌은 생선 요리를 잘 먹지 않는다고 말했다. <br><br>\"발렌도 어렸을 때부터 생선 요리를 너무 많이 먹은 걸까요?\"<br><br>아카시아는 잠시 멈췄다. <br><br>\"그건 아닐 수도 있겠네요. 아마 제가 생선 요리를 어렸을 때부터 더 많이 먹었을 거 같은데, 전 아직 질리지 않았습니다.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 생선을 아깝다는 듯이 바라보았다. <br><br>\"훌륭한 요리사를 만나지 못했군요...\""
                }
            },

            mixed : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 균형이 잡힌 요리라고 말하며 고개를 끄덕였다. <br><br>\"하류도시의 영웅이라 그런지, 보통 하류도시 사람들이 만들 법한 요리랑은 다른 요리를 만들어주시는 군요.\""
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 요리를 먹으며 간이 좀 아쉽다고 말했다. <br><br>\"뭐가 부족한지는 모르겠지만... 설탕이 아닌 다른 조미료일 겁니다.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 요리를 내려다보더니 낮게 한숨을 쉬었다. <br><br>\"재료가 엉망이 되었군요.\""
                }
            },

            bread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 빵은 질리게 먹었다고 말했다. <br><br>\"저는 뭔가를 넣은 빵보다는 그냥 빵이 좋은 거 같습니다. 담백해서.\"<br><br>아카시아는 당신이 가져온 식빵을 냠냠 먹었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 뺭을 먹었다. 그는 아무 말 없이 몇 입 더 먹다가 그만두었다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"...마틴의 주점에는 빵을 안 팔던데, 그래서 당신이 빵은 못 굽는 걸까요?\"<br><br>아카시아는 당신이 가져온 빵을 먹지 않았다."
                }
            },

            meatBread : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"저는 빵에 뭔가가 들어간 건 좋아하지 않습니다. 먹기는 먹지만.... 여기서까지 먹고 싶지는 않네요.\"<br><br>아카시아는 당신의 빵을 먹을 생각이 없다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 빵을 쳐다보더니 고개를 저었다. <br><br>\"여기서까지 빵을 먹고 싶지는 않습니다.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 빵을 물끄러미 쳐다보았다. <br><br>\"맛없는 빵을 먹고 싶진 않군요.\""
                }
            },

            vegetableBread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "\"저는 빵에 뭔가가 들어간 건 좋아하지 않습니다. 먹기는 먹지만.... 여기서까지 먹고 싶지는 않네요.\"<br><br>아카시아는 당신의 빵을 먹을 생각이 없다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 빵을 쳐다보더니 고개를 저었다. <br><br>\"여기서까지 빵을 먹고 싶지는 않습니다.\""
                },

                bad : {
                    affection :-1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 빵을 물끄러미 쳐다보았다. <br><br>\"맛없는 빵을 먹고 싶진 않군요.\""
                }
            },

            vegetableRice : {
                great : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 야채는 좋아하지 않지만 역시 밥이랑 섞여서 맛있는 거 같다고 말했다. 그는 당신의 요리를 맛있게 먹어주었다."
                },

                normal : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 당신의 요리를 먹으며 쌀이 요리를 살린 거 같다고 말했다. 그는 당신의 요리를 맛있게 먹어주었다."
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 쌀이 들어간 요리가 맛이 없을 수 있다는 것에 충격을 받은 모양이다. <br><br>\"정말 최선을 다한 요리였나요?\""
                }
            },

            meatRice : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 고기는 좋아하지 않지만 역시 밥이랑 섞여서 맛있는 요리로 탄생한 거 같다고 말했다. <br><br>\"달콤한 것에도 쌀이 들어가면 맛있을까요?\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 고기의 기름기에 인상을 쓰긴 했지만 어쨌든 다 먹긴 했다. <br><br>\"다음 번에는 고기는 적게 부탁드려요. 감사합니다.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "아카시아는 쌀이 들어간 요리가 맛이 없을 수 있다는 것에 충격을 받은 모양이다. <br><br>\"...요리를 계속하시는 이유가 있나요?\""
                }
            },
            
            default: {
                trash: {
                    affection: -15,
                    rage: 5,
                    lust : 0,
                    line: "아카시아의 차가운 시선이 당신을 꿰뚫는다. <br><br>\"...의도를 모르겠군요.\"<br><br>당신은 한기뿐만 아니라 살기마저 느꼈다."
                }
            }
        }
    },
    deric : {
        reactions: {
            dericFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            dericHate: {
                great: {
                    affection: -10,
                    rage: 10,
                    lust : 0,
                    line: "데릭은 당신의 연어회를 보더니 인상을 굳혔다. <br><br>\"아가. 난 생선을 싫어한단다.\"<br><br>그는 당신에게 나가라는 듯 손짓을 해보였다."
                },
            
                normal: {
                    affection: -12,
                    rage: 10,
                    lust : 0,
                    line: "당신의 연어회에 그의 녹안이 서늘하게 굳었다. 그는 지금 당장 그 요리를 갖고 나가라는 듯 손짓을 해보였다."
                },
            
                bad: {
                    affection: -15,
                    rage: 15,
                    lust : 0,
                    line: "데릭은 당신의 요리를 믿을 수가 없었다. 그는 비틀거리더니 벽에 기대어서며 그 흉측한 요리를 당장 가지고 나가라고 말했다. 진심으로 화가 난 것 같다."
                }
            },


            sweet: {
                great: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "\"귀부인들이 달콤한 것을 꽤나 좋아하지.\"<br><br>그는 당신의 요리를 먹으며 미소를 지었다. <br><br>\"우리 아가는 귀부인들에게도 사랑받을 줄을 아는 구나.\""
                },
            
                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "데릭은 달콤한 요리를 먹으며 니콜라이는 컵케이크를 좋아한다고 말했다. <br><br>\"상류도시에 오면 언제나 사가더구나.\""
                },
            
                bad: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: "데릭은 한 입 먹더니 미소가 사라졌다. 그는 당신의 요리를 내려놓았다. <br><br>\"아가, 설마 이런 걸 먹고 다니니?\""
                }
            },
            
            lusty: {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 5,
                    line: "데릭은 이런 요리보다는 당신의 나체가 더 자극적이라고 말했다. 그는 당신이 지금 당장이라도 옷을 벗는 걸 기대하고 있는 듯하다."
                },

                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 3,
                    line: "\"...날 꼬시고 싶은 거라면 옷을 벗는 게 어떻니? 아빠의 지갑은 열려있단다.\"<br><br>그는 자신의 지갑을 흔들어보였다, 장난스럽게."
                },
            
                bad: {
                    affection: -2,
                    rage: 3,
                    lust : 0,
                    line: "\"...이런 것보다 더 고급스럽고 효과가 좋은 약을 알고 있단다.\"<br><br>데릭은 당신을 위아래로 훑어보았다. <br><br>\"언젠가 그 맛을 알려줘야 할지도 모르겠구나.\""
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 10,
                    line: "데릭은 미소를 짓더니 당신에게 다가왔다. 그의 그림자가 당신의 그림자를 덮친다. <br><br>\"수락의 의미로 받아들여도 되겠지?\"<br><br>그의 손가락이 당신의 입술을 누른다."
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 5,
                    line: "데릭은 미소를 짓더니 당신에게 다가왔다. 그의 그림자가 당신의 그림자를 덮친다. <br><br>\"수락의 의미로 받아들여도 되겠지?\"<br><br>그의 손가락이 당신의 입술을 누른다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 3,
                    line: "\"노력은 가상하니... 조금 봐줄까?\"<br><br>데릭이 당신의 입술을 엄지로 누르며 말했다. 그는 당신의 반응을 즐기고 있다."
                }
            },

            meat : {
                great : {
                    affection : 5,
                    rage : -5,
                    lust : 0,
                    line : "\"...정말 맛있구나.\"<br><br>데릭은 당신의 고기 요리를 먹으며 칭찬했다. 그는 당신의 요리를 맛있고 우아하게 먹어주었다."
                },

                normal : {
                    affection : 3,
                    rage : -3,
                    lust : 0,
                    line : "데릭은 당신의 요리를 먹으며 아쉬웠던 점을 말해주었다. <br><br>\"다음 번에는 더 잘할 수 있을 거라 믿는단다, 아가.\"<br><br>그는 당신의 요리를 다 먹었다."
                },

                bad : {
                    affection : -1,
                    rage : 1,
                    lust : 0,
                    line : "\"태운 고기 요리는 고기 요리라고 할 수 없단다.\"<br><br>데릭은 당신의 요리를 거부했다."
                }
            },

            vegetable : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 당신의 채소 요리를 먹으며 고개를 끄덕였다. <br><br>\"요리는 어디서 배웠니?\"<br><br>그의 목소리는 부드럽다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 당신의 채소 요리를 먹으며 희미하게 미소를 지었다. <br><br>\"조금 더 노력해야겠구나.\""
                },

                bad : {
                    affection : -2,
                    rage : 0,
                    lust : 2,
                    line : "데릭은 한 입 먹더니 미소가 사라졌다. 그는 당신의 요리를 내려놓았다. <br><br>\"아가, 설마 이런 걸 먹고 다니니?\""
                }
            },

            fish : {
                great : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 생선 요리는 어떻게 먹어도 비려서 싫다고 말했다. <br><br>\"안 비리게 했다고 해도... 안 비렸던 적은 없었단다.\"<br><br>그는 고개를 저었다."
                },

                normal : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"...이렇게 비린 걸 남들은 어떻게 먹는지 모르겠구나.\"<br><br>그는 생선의 눈알을 보더니 고개를 돌렸다. <br><br>\"저 눈도 마음에 안 들고.\""
                },

                bad : {
                    affection : -2,
                    rage : 2,
                    lust : 0,
                    line : "데릭은 한 입 먹더니 미소가 사라졌다. 그는 당신의 요리를 내려놓았다. <br><br>\"아가, 설마 이런 걸 먹고 다니니?\""
                }
            },

            mixed : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 고기와 야채가 섞인 요리를 먹으며 고개를 끄덕였다. <br><br>\"내 동생보다 요리를 잘하는 구나.\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 에릭이 이런 요리를 많이 해줬다고 말했다. <br><br>\"균형 식사.... 그 자식은 맛보다 영양분을 더 따지는 것 같아.\""
                },

                bad : {
                    affection : -2,
                    rage : 2,
                    lust : 0,
                    line : "데릭은 한 입 먹더니 미소가 사라졌다. 그는 당신의 요리를 내려놓았다. <br><br>\"아가, 설마 이런 걸 먹고 다니니?\""
                }
            },

            bread : {
                great : {
                    affection : 3,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 익숙하게 빵을 먹으며 고개를 끄덕였다. <br><br>\"아무 것도 안 들어갔는데 맛있다는 건 네 요리 솜씨가 정말 좋다는 뜻이지.\""
                },

                normal : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 익숙하게 빵을 먹으며 제빵으로 상류도시에서 먹고 사는 사람들도 많다고 말했다. <br><br>\"요새는 레드오션이지만.\""
                },

                bad : {
                    affection : -2,
                    rage : 0,
                    lust : 2,
                    line : "\"이런, 아가. 방금 너의 요리 솜씨가 다 밝혀지고 말았구나.\"<br><br>데릭은 당신의 빵을 내려놓더니 입가를 손수건으로 닦았다."
                }
            },

            meatBread : {
                great : {
                    affection : 7,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 한 입 크기로 먹을 수 있는 고기를 좋아한다고 말했다. <br><br>\"마치 이런 고기빵처럼.\""
                },

                normal : {
                    affection : 5,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 당신의 요리를 먹으며 미소를 지었다. <br><br>\"우리 아가는 센스도 좋지.\""
                },

                bad : {
                    affection : -2,
                    rage : 2,
                    lust : 0,
                    line : "\"...네 요리 솜씨는 정말 놀랍구나.\"<br><br>데릭은 당신의 요리를 한 입 먹고 내려놓았다. <br><br>\"다 태웠어.\""
                }
            },

            vegetableBread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 당신의 야채빵을 먹으며 고개를 끄덕였다. 그는 야채와 빵을 잘 어울리는 조합이라고 말했다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "데릭은 당신의 요리를 먹으며 아쉬웠던 점을 말해주었다. <br><br>\"괜찮아, 아가. 다음 번에는 더 잘할 수 있을 거야.\""
                },

                bad : {
                    affection :-2,
                    rage : 2,
                    lust : 0,
                    line : "\"...네 요리 솜씨는 정말 놀랍구나.\"<br><br>데릭은 당신의 요리를 한 입 먹고 내려놓았다. <br><br>\"정말 맛없구나, 아가.\""
                }
            },

            vegetableRice : {
                great : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"하류도시의 음식을 여기까지 가져온 거니?\"<br><br>데릭은 당신의 요리를 밀어냈다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "\"하류도시의 음식을 여기까지 가져온 거니?\"<br><br>데릭은 당신의 요리를 밀어냈다."
                },

                bad : {
                    affection : -3,
                    rage : 3,
                    lust : 0,
                    line : "\"대단하구나. 맛없는 하류도시의 음식을 여기까지 가져오다니.\"<br><br>그의 미소는 서늘했다."
                }
            },

            meatRice : {
                great : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"...고기가 아깝구나.\"<br><br>데릭은 당신의 요리를 밀어냈다."
                },

                normal : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "\"...고기가 아깝구나.\"<br><br>데릭은 당신의 요리를 밀어냈다."
                },

                bad : {
                    affection : -4,
                    rage : 4,
                    lust : 0,
                    line : "데릭은 당신을 말없이 쳐다보았다.<br><br>\"내가 기뻐할 거라 생각해서 가져온 건 아닐 테고... 그렇게 멍청하지는 않을 테니까 말이야.\"<br><br>그의 입가에는 평소의 가식적인 미소조차 사라져 있었다."
                }
            },
            
            default: {
                trash: {
                    affection: -10,
                    rage: 5,
                    lust : 0,
                    line: "데릭은 당신을 말없이 바라보다가 차가운 미소를 지었다. <br><br>\"아가는 혼나는 걸 좋아하니?\""
                }
            }
        }
    },
    eric : {
        reactions: {
            ericFavorite: {
                great: {
                    affection: 7,
                    rage: -5,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 5,
                    rage: -5,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 7,
                    rage: -5,
                    lust : 0,
                    line: ""
                }
            },
            ericHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "에릭은 당신의 요리를 아무 말 없이 받아들이긴 했지만 먹지는 않았다. 단 것은 싫어하는 모양이다."
                },
            
                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "에릭은 당신의 요리를 아무 말 없이 받아들이긴 했지만 먹지는 않았다. 당신은 이제야 그가 단 것을 먹는 걸 본 적이 없다는 걸 깨달았다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "에릭은 당신의 요리를 받기만 했다. 나중에라도 먹을 것 같지는 않다."
                }
            },
            
            lusty: {
                great: {
                    affection: -1,
                    rage: 3,
                    lust : 0,
                    line: "에릭은 당신을 말없이 쳐다보았다. 음식을 다시 가져가야 할 것만 같다...."
                },

                normal: {
                    affection: -2,
                    rage: 3,
                    lust : 0,
                    line: "에릭은 당신의 요리를 받긴 했지만 표정은 딱딱하게 굳어 있었다. 실수한 것 같다...."
                },
            
                bad: {
                    affection: -5,
                    rage: 6,
                    lust : 0,
                    line: "에릭은 밀려오는 비린내에 자기도 모르게 인상을 썼다. 그는 음식을 받은 후 당신을 말없이 바라보았다. 시선이 무섭다...."
                }
            },
            lustyHighAffection : {
                great: {
                    affection: 1,
                    rage: 0,
                    lust : 2,
                    line: "에릭은 말없이 당신을 바라보다가 그대로 당신을 제 무릎 위로 앉혔다. 그는 요리를 먹는 대신 당신을 안는 걸 택했다."
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "에릭은 당신의 요리와 당신을 번갈아보다가 그대로 당신을 제 무릎 위로 앉혔다. 당신이 당황하자 그는 이런 걸 바란 게 아니었냐고 되물었다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 3,
                    line: "에릭은 당신의 요리와 당신을 번갈아보다가 요리는 치우고 그대로 당신을 제 품으로 끌어안았다. <br><br>\"원하는 거면 그냥 말로 해도 된다.\""
                }
            },

            meat : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 당신의 요리를 먹으며 고개를 끄덕였다. 그는 가리는 게 없었지만 그렇다고 특히나 좋아하는 것도 별로 없었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 당신의 요리를 먹다가 고개를 들어 당신과 시선을 마주했다. <br><br>\"넌 먹었나.\""
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 요리를 먹어주었다."
                }
            },

            vegetable : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 고기보다는 채소를 더 좋아하는 것 같다. <br><br>\"...너는.\"<br><br>그는 먹다가 당신은 식사를 했냐고 물었다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 요리를 먹었다. 그는 당신의 요리를 남기지 않고 다 먹어주었다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 당신의 맛없는 채소 요리에도 딱히 불평은 하지 않았다. 맛없어 하는 게 느껴지긴 했지만...."
                }
            },

            fish : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "말없이 당신의 요리를 먹는 에릭에게 당신은 낚시를 해봤냐고 물었다. <br><br>\"...어렸을 때는.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 요리를 먹었다. 당신과 시선이 마주친 그는 말없이 당신을 응시했다. 그는 당신의 시선을 피하지 않았다."
                },

                bad : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 요리를 먹었다. 당신이 눈치를 보는 기색이 보이자 에릭은 남김없이 당신의 요리를 먹어주었다."
                }
            },

            mixed : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 당신의 요리를 먹었다. 그는 당신의 혼합 요리를 골고루 다 먹었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 요리를 먹었다. 당신이 멀뚱멀뚱 서있자 그는 당신에게는 견과류가 든 병을 던져주었다. 당신은 그의 옆에서 그의 견과류를 먹었다."
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "당신이 눈치를 보는 것이 느껴지자 에릭은 당신을 힐끗 보더니 말없이 당신의 요리를 다 해치워주었다."
                }
            },

            bread : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 당신의 빵을 먹었다. 이런 식빵을 많이 먹어봤냐고 묻자 에릭은 시간이 없을 때는 아무 맛도 없는 빵으로 때운다고 대꾸했다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "말없이 빵을 먹는 에릭에게 당신은 빵을 좋아하냐고 물었다. <br><br>\"간단하게 먹을 때 편하지.\"<br><br>맛에 대한 평가는 하지 않았다."
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 빵을 먹었다. 퍽퍽할 텐데도 그는 물 한 모금과 함께 끝까지 먹어주었다."
                }
            },

            meatBread : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "아무 말 없이 고기빵을 먹는 에릭에게 당신은 어떤 종류의 빵을 좋아하냐고 물었다. <br><br\"...아무 맛도 없는 빵.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 당신의 고기빵을 먹다가 당신을 올려다보았다. <br><br>\"...빵 좋아하나.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 고기빵을 먹었다."
                }
            },

            vegetableBread : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "아무 말 없이 고기빵을 먹는 에릭에게 당신은 어떤 종류의 빵을 좋아하냐고 물었다. <br><br>\"...아무 맛도 없는 빵.\""
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "빵과 밥 중에 뭐가 더 좋냐는 당신의 물음에 에릭은 쌀밥은 많이 안 먹어봤다고 말했다. 어렸을 때 뭘 제일 많이 먹었냐고 묻자 그는 고민없이 대답했다. <br><br>\"라면을 많이 먹었다.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "에릭은 말없이 당신의 야채빵을 먹었다."
                }
            },

            vegetableRice : {
                great : {
                    affection : 2,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 야채밥에 잠시 가만히 있다가 밥은 먹어본 지 오래 됐다고 말했다. 그는 천천히 당신의 야채밥을 먹었다."
                },

                normal : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 야채밥을 먹다가 당신은 식사를 했냐고 물었다. <br><br>\"...자기 몸은 스스로 챙기고 다녀라.\""
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 야채밥을 먹었다. 맛이 없는 게 분명했지만, 그는 당신을 힐끗 보더니 다 먹어주었다."
                }
            },

            meatRice : {
                great : {
                    affection : 1,
                    rage : 0,
                    lust : 0,
                    line : "그는 당신의 고기밥에 잠시 가만히 있다가 밥은 먹어본 지 오래 됐다고 말했다. 그는 천천히 당신의 고기밥을 먹었다."
                },

                normal : {
                    affection : 0,
                    rage : 0,
                    lust : 0,
                    line : "고기밥을 먹는 그에게 당신은 언제 한번 마틴의 주점에 가서 밥을 같이 먹겠냐고 물었다. 에릭은 그 말에 긍정도 부정도 하지 않았다. <br><br>...고민하는 것 같다."
                },

                bad : {
                    affection : -1,
                    rage : 0,
                    lust : 0,
                    line : "그는 고기의 탄 부분도 못 본 척 다 먹어주었다."
                }
            },
            
            default: {
                trash: {
                    affection: -5,
                    rage: 3,
                    lust : 0,
                    line: "에릭은 당신의 쓰레기를 보았다. 그는 당신을 바라보다가 건조한 목소리로 말했다. <br><br>\"불만이 있으면 말로 해.\""
                }
            }
        }
    }
};

function openGiveFoodMenu(player, npcId){
    const foods = player.inventory.filter(item =>
        item.tags?.includes("gift")
    );

    if (foods.length === 0){
        startScene([
            {
                type: "text",
                value: "건넬 만한 음식이 없다."
            }
        ], player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        return;
    }

    const choices = foods.map((item, index) => ({
        text: item.name,
        action: `${npcId}_giveFood_${index}`
    }));

    choices.push({
        text: "돌아간다",
        action: `${npcId}_otherTalk`
    });

    window.__giveFoodTemp = {
        npcId,
        foods
    };

    startScene([
        {
            type: "text",
            value: "어떤 음식을 건넬까?"
        },
        {
            type: "choice",
            choices
        }
    ], player);
}

function getGiftTaste(item, npcId){
    const tags = item.tags || [];

    if (tags.includes(`${npcId}Favorite`)) return `${npcId}Favorite`;
    if (tags.includes(`${npcId}Hate`)) return `${npcId}Hate`;

    if (tags.includes("sweet")) return "sweet";
    if (tags.includes("fish")) return "fish";
    if (tags.includes("lusty")) return "lusty";
    if (tags.includes("meat")) return "meat";
    if (tags.includes("vegetable")) return "vegetable";
    if (tags.includes("mixed")) return "mixed";
    if (tags.includes("bread")) return "bread";
    if (tags.includes("vegetableBread")) return "vegetableBread";
    if (tags.includes("meatBread")) return "meatBread";
    if (tags.includes("vegetableRice")) return "vegetableRice";
    if (tags.includes("meatRice")) return "meatRice";

    return "default";
}

function getGiftGrade(item){
    const tags = item.tags || [];

    if (tags.includes("trash")) return "trash";
    if (tags.includes("great")) return "great";
    if (tags.includes("bad")) return "bad";
    return "normal";
}

function giveFoodToNpc(player, npcId, item){
    const config = NPC_GIFT_CONFIG[npcId];

    if (!config){
        console.warn(`선물 설정이 없는 NPC입니다: ${npcId}`);
        return;
    }

    const grade = getGiftGrade(item);
    const taste = getGiftTaste(item, npcId);

    const affection = NPC_DATA[npcId]?.emotion?.affection || 0;

    let reaction =
        config.reactions?.[taste]?.[grade] ||
        config.reactions?.default?.[grade];

    
        //러스트 반응(NPC별)
        if (
            npcId === "matin" &&
            taste === "lusty" &&
            affection >= 80
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "yuri" &&
            taste === "lusty" &&
            affection >= 90
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "kain" &&
            taste === "lusty" &&
            affection >= 50
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }
        
        if (
            npcId === "luke" &&
            taste === "lusty" &&
            affection >= 80
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "nikolai" &&
            taste === "lusty" &&
            affection >= 60
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "sion" &&
            taste === "lusty" &&
            affection >= 50
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "valen" &&
            taste === "lusty" &&
            affection >= 70
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "akasia" &&
            taste === "lusty" &&
            affection >= 60
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "deric" &&
            taste === "lusty" &&
            affection >= 60
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "eric" &&
            taste === "lusty" &&
            affection >= 100
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }


        if (!reaction){
            console.warn(`선물 반응이 없습니다: ${npcId}, ${taste}, ${grade}`);
            return;
        }
        
        if (reaction.affection){
            if (
                npcId === "matin" &&
                !player.flags?.matinAffectionCapUnlocked
            ){
                const current = NPC_DATA["matin"].emotion.affection || 0;
                
                if (current < 50 && current < 70 ){
                    const gain = Math.min(reaction.affection, 50 - current);
                    
                    if (gain > 0){
                        changeEmotion("matin", "affection", gain);
                    }
                }
            }
            else {
                changeEmotion(npcId, "affection", reaction.affection);
            }
        }
        
        if (reaction.rage){
            changeEmotion(npcId, "rage", reaction.rage);
        }
        
        if (reaction.lust){
            changeEmotion(npcId, "lust", reaction.lust);
        }
        
        removeItem(player, item.key);
        savePlayer(player);
        
        let line = reaction.line || "상대는 음식을 받아들였다.";

        const processorName = `process${npcId.charAt(0).toUpperCase()}${npcId.slice(1)}Text`;
        
        if (typeof window[processorName] === "function"){
            line = window[processorName](line, player);
        }

        startScene([
            {
                type: "text",
                value: line
            }
        ], player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
}

function registerGiftActions(npcId){
    const actions = {};

    for (let i = 0; i < 100; i++){
        actions[`giveFood_${i}`] = (player) => {
            const temp = window.__giveFoodTemp;

            if (!temp || temp.npcId !== npcId){
                startScene(getLocationScene(player), player);
                return;
            }

            const item = temp.foods[i];

            if (!item){
                startScene(getLocationScene(player), player);
                return;
            }

            giveFoodToNpc(player, npcId, item);
        };
    }

    registerActions(npcId, actions);
}