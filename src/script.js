//Buttons for numbers/operators
const numBtns = document.querySelectorAll("[data-num]");
const optBtns = document.querySelectorAll("[data-opt]");

//Buttons for equals,delete,clear
const eqBtn = document.querySelector("[data-eq]");
const delBtn = document.querySelector("[data-del]");
const acBtn = document.querySelector("[data-ac]");

//Text elements for previous/current operand
const prevOpdTxt = document.querySelector("[data-prev]");
const currOpdTxt = document.querySelector("[data-curr]");

//CALCULATOR CLASS
class Calculator{

    //Saves previous/current operand text elements and clears
    constructor(prevOpdTxt,currOpdTxt){
        this.prevOpdTxt = prevOpdTxt;
        this.currOpdTxt = currOpdTxt;
        this.clear();
    }

    //Sets operands and operator empty
    clear(){
        this.currOpd = "";
        this.prevOpd = "";
        this.opt = undefined;
    }

    //Deletes latest digit
    delete(){
        this.currOpd = this.currOpd.toString().slice(0,-1);
    }

    //Appends digit to operand
    appendDigit(num){
        console.log("append");
        //Only allows 1 decimal
        if(num == "." && this.currOpd.includes(num)){
            return;
        }

        this.currOpd = this.currOpd.toString() + num.toString();
        console.log(this.currOpd);
    }

    //Chooses operator
    chooseOpt(opt){
        console.log("choosing");
        if(this.currOpd == ""){
            return;
        }

        //Chains expressions
        if(this.prevOpd != ""){
            this.compute();
        }

        this.opt = opt;
        this.prevOpd = this.currOpd;
        this.currOpd = "";
    }

    //Computes current expression
    compute(){
        let computation;
        const prevNum = parseFloat(this.prevOpd);
        const currNum = parseFloat(this.currOpd);

        if(isNaN(prevNum) || isNaN(currNum)){
            return;
        }

        switch(this.opt){
            case("+"):
                computation = prevNum + currNum;
                break;
            case("-"):
                computation = prevNum - currNum;
                break;
            case("*"):
                computation = prevNum * currNum;
                break;
            case("/"):
                computation = prevNum / currNum;
                break;
            case("%"):
                computation = prevNum % currNum;
                break;
            default:
                return;
        }

        this.currOpd = computation;
        this.opt = undefined;
        this.prevOpd = "";
    }

    //Updates display
    update(){
        console.log("updating")
        this.currOpdTxt.innerText = this.#displayNum(this.currOpd);

        //Moves operand and operator up
        if(this.opt != null){
            this.prevOpdTxt.innerText = (`${this.#displayNum(this.prevOpd)} ${this.opt}`);
        }
        else{
            this.prevOpdTxt.innerText = "";
        }
    }

    //Handles commas for operands
    #displayNum(num){
        const strNum = num.toString();
        const intDigits = parseFloat(strNum.split(".")[0]);
        const decimalDigits = strNum.split(".")[1];
        let intDisplay;

        //Integer digits before decimal
        if(isNaN(intDigits)){
            intDisplay = "";
        }
        else{
            intDisplay = intDigits.toLocaleString("en", {maximumFractionDigits: 0});
        }

        //Digits after decimal
        if(decimalDigits != null){
            return (`${intDisplay}.${decimalDigits}`);
        }
        else{
            return (`${intDisplay}`);
        }
    }
}

//Click Functions

function numBtnClicked(){
    calculator.appendDigit(this.innerText);
    calculator.update();
}

function optBtnClicked(){
    calculator.chooseOpt(this.innerText);
    calculator.update();
}

function eqBtnClicked(){
    calculator.compute();
    calculator.update();
}

function acBtnClicked(){
    calculator.clear();
    calculator.update();
}

function delBtnClicked(){
    calculator.delete();
    calculator.update();
}

//Sets listeners
function init(){
    numBtns.forEach(numBtn => numBtn.addEventListener("click",numBtnClicked));
    optBtns.forEach(optBtn => optBtn.addEventListener("click",optBtnClicked));
    eqBtn.addEventListener("click",eqBtnClicked);
    acBtn.addEventListener("click",acBtnClicked);
    delBtn.addEventListener("click",delBtnClicked);
}

//Single instance of Calculator
const calculator = new Calculator(prevOpdTxt,currOpdTxt);
init();

