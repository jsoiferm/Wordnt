export default class timer {
    constructor(root, root2) {
      var letter= document.getElementById("Letter").textContent.toString();
      const letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      var previous=[]
      this.el = {
        hideMe: root.querySelector(".hideMe"),
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        timer_part: root.querySelector(".timer__part"),
        play: root2.querySelector("#PLAY_BUTTON"),
      };
      this.el.play.addEventListener("click", () => {
        document.getElementById("Letter").textContent= letters[Math.floor(Math.random()*letters.length)];
        previous=[];
        this.el.hideMe.classList.remove("hideMe");
        this.interval = null;
        this.remainingSeconds= 120;
        this.secondsPassed= 0;
        this.updateInterfaceTime();
        this.start();
      });
      
      document.getElementById('Submit_Button').addEventListener("click", () => {
        letter= document.getElementById("Letter").textContent.toString();
        var score= document.getElementById("Score").textContent;
        var input= document.getElementById("INPUT");
        var userInput= input.value.toString();
        input.value='';
        if(userInput!=''){
          fetch('https://api.datamuse.com/words?sp='+userInput)
            .then(response => response.json())
            .then(data => {
              if (data.length > 0) {
                if(userInput.charAt(0).toLowerCase()===letter.toLowerCase() && previous.includes(userInput.toLowerCase())===false){
                  score=score-0+(100*userInput.length);
                  document.getElementById("Score").textContent= score;
                  previous.push(userInput.toLowerCase());
                }else{
                  if(score>0){
                    score=score-100;
                    document.getElementById("Score").textContent= score;
                  }
                }
              } else {
                if(score>0){
                  score=score-100;
                  document.getElementById("Score").textContent= score;
                }
              }
            })
            .catch(console.error);
        }
      });
      document.getElementById("INPUT").addEventListener("keydown", function(event){
        if(event.key==="Enter"){
          letter= document.getElementById("Letter").textContent.toString();
          var score= document.getElementById("Score").textContent;
          var input= document.getElementById("INPUT");
          var userInput= input.value.toString();
          input.value='';
          if(userInput!=''){
            fetch('https://api.datamuse.com/words?sp='+userInput)
              .then(response => response.json())
              .then(data => {
                if (data.length > 0) {
                  if(userInput.charAt(0).toLowerCase()===letter.toLowerCase() && previous.includes(userInput.toLowerCase())===false){
                    score=score-0+(100*userInput.length);
                    document.getElementById("Score").textContent= score;
                    previous.push(userInput.toLowerCase());
                  }else{
                    if(score>0){
                      score=score-100;
                      document.getElementById("Score").textContent= score;
                    }
                  }
                } else {
                  if(score>0){
                    score=score-100;
                    document.getElementById("Score").textContent= score;
                  }
                }
              })
              .catch(console.error);
          }
        }
      });
    }
    updateInterfaceTime() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
  
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    start() {
      const letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      document.getElementById("Score").textContent= 0;
      document.getElementById("PLAY_BUTTON").style.display="none";
      document.getElementById("HOW_TO_PLAY_BUTTON").style.display="none";
      document.getElementById("title").style.display= "none";
      document.getElementById("Letter").style.display="block";
      document.getElementById("INPUT").style.display="block";
      document.getElementById("Submit_Button").style.display="block";
  
      if (this.remainingSeconds === 0) return;
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.secondsPassed++;
        this.updateInterfaceTime();
        if (this.remainingSeconds === 0) {
          this.stop();
        }
        if (this.secondsPassed === 20){
          document.getElementById("Letter").textContent= letters[Math.floor(Math.random()*letters.length)];
          this.secondsPassed=0;
        }
      }, 1000);
    }
  
    stop() {
      var score= document.getElementById("Score").textContent;
      var high_score= document.getElementById("High_Score").textContent;
      console.log(score);
      console.log(high_score);
      if(parseInt(score)>parseInt(high_score)){
        high_score=score;
        document.getElementById("High_Score").textContent= high_score;
      }
      document.getElementById("PLAY_BUTTON").style.display="block";
      document.getElementById("title").style.display= "block";
      document.getElementById("HOW_TO_PLAY_BUTTON").style.display="block";
      document.getElementById("Letter").style.display= "none";
      document.getElementById("INPUT").style.display="none";
      document.getElementById("Submit_Button").style.display="none";
      clearInterval(this.interval);
  
      this.interval = null;

      this.el.hideMe.classList.add("hideMe");
    }
  }

