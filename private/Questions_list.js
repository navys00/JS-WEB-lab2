var connection = require("./db");

function getQuestions () {
    let result;
    connection.query('SELECT * FROM testq', function (err, output) {
        if (err) {
            console.log(err);
            return;
        }
        else{

            result = []
            for (let i = 0; i < output.rows.length; i++) {
                result[i]=[output.rows[i].id, output.rows[i].question1,output.rows[i].question2,output.rows[i].question3];
                
            }
            console.log(result);   
            
        }      
    })
    
    return result;
    
}

function sendAnsw(arr){
    var tmp =arr;
    for(let i=0;i<tmp.length;i++){
        tmp[i]=tmp[i].toString();
    }
    connection.query('INSERT INTO testq(question1, question2, question3) VALUES($1,$2,$3)',[arr[0],arr[1],arr[2]]), function (err, output) {
        if (err) {
            console.log(err);
            return;
        }
    }
}
module.exports = {getQuestions,sendAnsw};