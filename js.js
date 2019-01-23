
document.addEventListener('DOMContentLoaded', function(){
    var faceitNameInput = document.getElementById("faceitName");
    var textArea = document.getElementById("textArea");
    
    document.getElementById("checkButton").onclick = function(){getPlayerId(document.getElementById("faceitName").value)};

    function overrideOutput(print) {
        textArea.value = print;
    }
    
    function addOutput(print) {
        textArea.value = textArea.value + '\n' + print;
    }
    
    function getPlayerId(faceitName) {
        var xhttp = new XMLHttpRequest();
        var playerId;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                playerId=JSON.parse(this.responseText).payload.guid;
                getFaceitGames(playerId);
                }
        }
        xhttp.open("GET", "https://api.faceit.com/core/v1/nicknames/"+faceitName , true);
        xhttp.send();
    }

    function getFaceitGames(playerId) {
        var playedGames;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                overrideOutput('');
                playedGames = JSON.parse(this.responseText);
                findLowestGames(playedGames);
            }
        }
        xhttp.open("GET", "https://api.faceit.com/stats/v1/stats/time/users/"+playerId+"/games/csgo?size=2147483647", true);
        xhttp.send();
    }

    function findLowestGames(playedGames){  // i6 = kills i8 = tode c2 = kd        
        if(playedGames){
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
    }
})