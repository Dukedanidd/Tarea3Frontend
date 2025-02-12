class Calculator {
  constructor() {
    this.display = document.getElementById("display")
    this.currentValue = ""
    this.previousValue = ""
    this.operation = null
    this.shouldResetDisplay = false

    this.initializeEventListeners()
  }

  initializeEventListeners() {
    document.querySelectorAll(".number, .operator").forEach(button => {
      button.addEventListener("click", () => this.handleButton(button.dataset.value))
    })
  }

  handleButton(value) {
    if (!isNaN(value) || value === ".") {
      this.handleNumber(value)
    } else {
      this.handleOperator(value)
    }
    this.updateDisplay()
  }

  handleNumber(value) {
    if (this.shouldResetDisplay) {
      this.currentValue = ""
      this.shouldResetDisplay = false
    }
    if (value === "." && this.currentValue.includes(".")) return
    this.currentValue += value
  }

  handleOperator(value) {
    switch (value) {
      case "clear":
        this.clear()
        break
      case "backspace":
        this.backspace()
        break
      case "=":
        this.calculate()
        break
      default:
        this.setOperation(value)
    }
  }

  clear() {
    this.currentValue = ""
    this.previousValue = ""
    this.operation = null
  }

  backspace() {
    this.currentValue = this.currentValue.slice(0, -1)
  }

  setOperation(operator) {
    if (this.currentValue === "") return
    if (this.previousValue !== "") {
      this.calculate()
    }
    this.operation = operator
    this.previousValue = this.currentValue
    this.shouldResetDisplay = true
  }

  calculate() {
    if (this.previousValue === "" || this.currentValue === "") return

    const prev = parseFloat(this.previousValue)
    const current = parseFloat(this.currentValue)
    let result

    switch (this.operation) {
      case "+":
        result = prev + current
        break
      case "-":
        result = prev - current
        break
      case "*":
        result = prev * current
        break
      case "/":
        result = prev / current
        break
      default:
        return
    }

    this.currentValue = result.toString()
    this.operation = null
    this.previousValue = ""
    this.shouldResetDisplay = true
  }

  updateDisplay() {
    this.display.textContent = this.currentValue
  }
}

// Initialize calculator
new Calculator()
