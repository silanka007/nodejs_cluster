class FibonacciSeries {
  constructor() {}
  calculateFibonacciValue(number) {
    let s = 0;
    if (number == 0 || !number) {
      return s;
    }
    if (number === 1) {
      s += 1;
      return s;
    }
    return (
      this.calculateFibonacciValue(number - 1) +
      this.calculateFibonacciValue(number - 2)
    );
  }
}

module.exports = new FibonacciSeries()
