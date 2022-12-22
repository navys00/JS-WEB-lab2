var express = require("express");
var app = express();
const path=require('path');
var fs = require("fs");
const db = require("./private/Questions_list");


let urlParser = express.urlencoded({extended: false});
let score=0;
var ansArray;
app.use(urlParser);
app.use(express.static(__dirname + '/css'));

app.set('view engine', 'ejs');

var currentQuiz;

app.get('/',async function(req,res){
    
    currentQuiz = 0;
    score = 0;
    ansArray=[];
    
    
    db.getQuestions();
    

    let Questions = fs.readFileSync('./private/Questions.json','utf8');

    Questions = JSON.parse(Questions);

    res.render('index',{
        Question : Questions[currentQuiz],
        questNum : 1
    })
});
app.post('/',urlParser, function (req,res){    
    let Questions = fs.readFileSync('./private/Questions.json','utf8');    
    Questions = JSON.parse(Questions);

    if(!(typeof req.body.variant === "undefined")){
        if( currentQuiz < req.body.nextQuestion){
            currentQuiz++;
            if(Questions[currentQuiz-1].answers[req.body.variant-1].correct){
                score++;
                ansArray.push(true);
            }
            else
            {
                ansArray.push(false);
            }
            
        }
    }
    if(currentQuiz == 0){
        res.render('index',{
            Question : Questions[currentQuiz],
            questNum : 1
        })
    }
    else{

        if(currentQuiz < Questions.length) {

            res.render('index', {

                Question: Questions[currentQuiz],
                questNum : currentQuiz+1
            })
        }
        else{
        if(ansArray.length==3){
            db.sendAnsw(ansArray);
        }
        res.render('result',{
            ansArray:ansArray,
            score: score,
            length:Questions.length
        });
        }
    }

});
 app.listen(8080);

