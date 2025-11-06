$(document).ready(function(){
  var num = 0;

  $("#reset").on("click", function(){
    document.querySelector("body .options").style.display = "none";
    document.querySelector(".child").innerHTML = "";
    document.querySelector(".ans").style.display = "none";
  })
  
  $("#ok").on("click", function(){
    num = document.getElementById("responce").value
    if (num <= 0){
      document.querySelector("body .options").style.display = "none";
    }
    if (num!=0 && num >=1){
      document.querySelector("body .options").style.display = "block";
    }

    if (num <= 3 && num >= 1){
      document.querySelector(".child").innerHTML = "";
      for(let i = 1; i<= num; i++){
        document.querySelector(".child").innerHTML+= `<div class="col-12">
                                                          <input type="number" class="box form-control" id="in${i}" min="0">
                                                        </div>`;

      }
    } else if (num >= 4){
      document.querySelector(".child").innerHTML = "";
      for(let i = 1; i<= num; i++){
        document.querySelector(".child").innerHTML+= `<div class="col-6 col-sm-4 col-lg-3">
                                                          <input type="number" class="box form-control" id="in${i}" min="0">
                                                        </div>`;
  
      }
    }
  })

  $("#random").on("click", function(){
    let randomRange = document.querySelector("#range").value;
    for(let i = 1; i <= num; i++){
      if(randomRange!=0){
        document.getElementById(`in${i}`).value = parseInt(Math.random() * `${randomRange}`);
      } else {
        document.getElementById(`in${i}`).value = parseInt(Math.random() * 100);
      }
    }
  })

  $("#clear").on("click", function(){
    for(let i = 1; i <= num; i++){
      document.getElementById(`in${i}`).value = "";
    }
    document.querySelector(".ans").innerHTML = "";
    document.querySelector(".ans").style.opacity = "1";
  })

  $("#avg").on("click", function(){
    let sum = 0;
    for(let i = 1; i <= num; i++){
      sum +=  Number(document.querySelector(`#in${i}`).value);
    }
    let average = sum/num;
    document.querySelector(".ans").innerHTML = `Average : ${average}`;
    document.querySelector(".ans").style.opacity = "1";
  })

  $("#sum").on("click", function(){
    let sum = 0;
    for(let i = 1; i <= num; i++){
      sum +=  Number(document.querySelector(`#in${i}`).value);
    }
    document.querySelector(".ans").innerHTML = `Sum : ${sum}`;
    document.querySelector(".ans").style.opacity = "1";
  })

  $("#min").on("click", function(){
    let min = Infinity;
    for (let i = 1; i <= num; i++){
      if(Number(document.getElementById(`in${i}`).value) <= min){
        if (Number(document.getElementById(`in${i}`).value != 0)){
          min = document.getElementById(`in${i}`).value;
        }
      }
    }
    document.querySelector(".ans").innerHTML = `Min : ${min}`;
    document.querySelector(".ans").style.opacity = "1";
  })
  $("#max").on("click", function(){
    let max = -Infinity;
    for (let i = 1; i <= num; i++){
      if(Number(document.getElementById(`in${i}`).value) >= max){
        if (Number(document.getElementById(`in${i}`).value != 0)){
          max = document.getElementById(`in${i}`).value;
        }
      }
    }
    document.querySelector(".ans").innerHTML = `Max : ${max}`;
    document.querySelector(".ans").style.opacity = "1";
  })
})