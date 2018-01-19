$(".hour > p").text(checkTime(moment().hour()));
$(".minute > p").text(checkTime(moment().minute()));
$(".second > p").text(checkTime(moment().second()));

//"while(true)"
function startTime() {
    var seconds = checkTime(moment().second());
    var minutes = checkTime(moment().minute());
    var hour = checkTime(moment().hour());
    $(".overrideHour > p").text(hour);
    $(".overrideMinute > p").text(minutes);
    $(".overrideSecond > p").text(seconds)
    console.log('ceva');

    //animation
    $(".second").velocity({
        properties: {
            translateY: ("100%"),
        },
        options: {
            duration: 500,
            complete: function (elements) {
                console.log("done!");
                $(".second > p").text(seconds);
                $(".second").velocity({
                    properties: {
                        translateY: ("0%"),

                    },
                    options: {
                        duration: 0,
                    }
                });
            }
        }
    });
    if (seconds == 0) {
        console.log('00');
        $(".minute").velocity({
            properties: {
                translateY: ("100%"),
            },
            options: {
                duration: 500,
                complete: function (elements) {
                    console.log("done!");
                    $(".minute > p").text(minutes);
                    $(".minute").velocity({
                        properties: {
                            translateY: ("0%"),
                        },
                        options: {
                            duration: 0
                        }
                    });
                }
            }
        });
    }
    if (minutes == 0) {
        console.log('00');
        $(".hour").velocity({
            properties: {
                translateY: ("100%"),
            },
            options: {
                duration: 500,
                complete: function (elements) {
                    console.log("done!");
                    $(".hour > p").text(hour);
                    $(".hour").velocity({
                        properties: {
                            translateY: ("0%"),
                        },
                        options: {
                            duration: 0
                        }
                    });
                }
            }
        });
    }
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}