
document.addEventListener('DOMContentLoaded', function(){
    var faceitNameInput = document.getElementById("faceitName");
    var textArea = document.getElementById("textArea");
    
    document.getElementById("checkButton").onclick = function(){check()};

    function check() {
        getFaceitGames("________-____-____-____-____________");
    }

    function output(print) {
        textArea.value = print;
    }
    
    function addOutput(print) {
        textArea.value = textArea.value + '\n' + print;
    }
    
    function checkFaceitName(name) {
        return playerId;
    }

    function getFaceitGames(playerId) {
        var playedGames;

        if (!playerId){
            playerId = "________-____-____-____-____________";
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                playedGames = JSON.parse(this.responseText);
                findLowestGames(playedGames);
            }
        };
        xhttp.open("GET", "https://api.faceit.com/stats/v1/stats/time/users/"+playerId+"/games/csgo?size=2147483647", true);
        xhttp.send();
    }

    function findLowestGames(playedGames){  // i6 = kills i8 = tode c2 = kd        
        playedGames.sort((a, b) => parseFloat(a.i6) - parseFloat(b.i6));
        addOutput("///////////////////Kills//////////////////");
        for(var i = 0; i < 10; i++) {
            var obj = playedGames[i];
            addOutput(i+' id:'+obj.matchId+' kills:'+obj.i6+' deaths:'+obj.i8+' kdr:'+obj.c2);
        }

        addOutput("///////////////////KDR//////////////////");
        playedGames.sort((a, b) => parseFloat(a.c2) - parseFloat(b.c2));
        for(var i = 0; i < 10; i++) {
            var obj = playedGames[i];
            addOutput(i+' id:'+obj.matchId+' kills:'+obj.i6+' deaths:'+obj.i8+' kdr:'+obj.c2);
        }

    }
})