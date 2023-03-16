//Buttons for numbers/operators
const numBtns = document.querySelectorAll("[data-num]");
const opBtns = document.querySelectorAll("[data-op]");

//Buttons for equals,delete,clear
const eqBtn = document.querySelector("[data-eq]")
const delBtn = document.querySelector("[data-del]")
const acBtn = document.querySelector("[data-ac]")

//Text elements for previous/current operand
const prevOpTxt = document.querySelector("[data-prev]")
const currOpTxt = document.querySelector("[data-curr]")

//CALCULATOR CLASS
class Calc{

    //Saves previous/current operand text elements and clears
    constructor(prevOpTxt,currOpTxt){
        this.prevOpTxt = prevOpTxt;
        this.currOpTxt = currOpTxt;
        this.clear();
    }

    //Sets operands and operator empty
    clear(){
        this.currOp = "";
        this.prevOp = "";
        this.op = undefined;
    }

    //Deletes latest digit
    delete(){
        this.currOp = this.currOp.toString().slice(0,-1);
    }

    //Appends digit to operand
    appendDigit(num){
        console.log("append");
        //Only allows 1 decimal
        if(num == "." && this.currOp.includes(num)) return
        this.currOp = this.currOp.toString() + num.toString()
        console.log(this.currOp);
    }

    //Chooses operator
    chooseOp(op){
        console.log("choosing");
        if(this.currOp == "") return;

        //Chains expressions
        if(this.prevOp != ""){
            this.compute()
        }

        this.op = op;
        this.prevOp = this.currOp;
        this.currOp = "";
    }

    //Computes current expression
    compute(){
        let computation;
        const prevNum = parseFloat(this.prevOp);
        const currNum = parseFloat(this.currOp);

        if(isNaN(prevNum) || isNaN(currNum)) return;

        switch(this.op){
            case("+"):
                computation = prevNum + currNum;
                break
            case("-"):
                computation = prevNum - currNum;
                break
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

        this.currOp = computation;
        this.op = undefined;
        this.prevOp = "";
    }

    //Updates display
    update(){
        console.log("updating")
        this.currOpTxt.innerText = this.#displayNum(this.currOp)

        //Moves operand and operator up
        if(this.op != null){
            this.prevOpTxt.innerText = `${this.#displayNum(this.prevOp)} ${this.op}`
        }
        else{
            this.prevOpTxt.innerText = "";
        }
        
    }

    //Handles commas for operands
    #displayNum(num){
        const strNum = num.toString();
        const intDigits = parseFloat(strNum.split(".")[0])
        const decimalDigits = strNum.split(".")[1]
        let intDisplay;

        //Integer digits before decimal
        if(isNaN(intDigits)){
            intDisplay = "";
        }
        else{
            intDisplay = intDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }

        //Digits after decimal
        if(decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`
        }
        else{
            return `${intDisplay}`
        }
    }
}

numBtns.forEach(btn => {btn.addEventListener("click", () => {
    calculator.appendDigit(btn.innerText)
    calculator.update()
})});

opBtns.forEach(btn => {btn.addEventListener("click", () => {
    calculator.chooseOp(btn.innerText)
    calculator.update()
})});

eqBtn.addEventListener("click", button => {
    calculator.compute()
    calculator.update()
}
)

acBtn.addEventListener("click", button => {
    calculator.clear()
    calculator.update()
})

delBtn.addEventListener("click", button => {
    calculator.delete()
    calculator.update()
})

//Single instance of Calc
const calculator = new Calc(prevOpTxt,currOpTxt);

