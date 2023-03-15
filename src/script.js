const numBtns = document.querySelectorAll("[data-num]")
const opBtns = document.querySelectorAll("[data-op]")

const eqBtn = document.querySelector("[data-eq]")
const delBtn = document.querySelector("[data-del]")
const acBtn = document.querySelector("[data-ac]")

const prevOpTxt = document.querySelector("[data-prev]")
const currOpTxt = document.querySelector("[data-curr]")

class Calc{
    constructor(prevOpTxt,currOpTxt){
        this.prevOpTxt = prevOpTxt;
        this.currOpTxt = currOpTxt;
        this.clear();
    }

    clear(){
        this.currOp = "";
        this.prevOp = "";
        this.op = undefined;
    }

    delete(){
        this.currOp = this.currOp.toString().slice(0,-1);
    }

    appendDigit(num){
        console.log("append");
        if(num == "." && this.currOp.includes(num)) return
        this.currOp = this.currOp.toString() + num.toString()
    }

    chooseOp(op){
        console.log("choosing");
        if(this.currOp == "") return;
        if(this.prevOp != ""){
            this.compute()
        }
        this.op = op;
        this.prevOp = this.currOp;
        this.currOp = "";
    }

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

    update(){
        console.log("updating")
        this.currOpTxt.innerText = this.#displayNum(this.currOp)
        if(this.op != null){
            this.prevOpTxt.innerText = `${this.#displayNum(this.prevOp)} ${this.op}`
        }
        else{
            this.prevOpTxt.innerText = "";
        }
        
    }

    #displayNum(num){
        const strNum = num.toString();
        const intDigits = parseFloat(strNum.split(".")[0])
        const decimalDigits = strNum.split(".")[1]
        let intDisplay;

        if(isNaN(intDigits)){
            intDisplay = "";
        }
        else{
            intDisplay = intDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`
        }
        else{
            return `${intDisplay}`
        }
    }


}

const calculator = new Calc(prevOpTxt,currOpTxt);

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

