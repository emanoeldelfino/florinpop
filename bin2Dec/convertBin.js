export default function binToDec(bits) {
  const invalidInput = [..."23456789"].some((num) => bits.includes(num));

  if (invalidInput) {
    throw new Error(
      "Invalid input. Binary numbers are composed only by 0s and 1s."
    );
  } else {
    let isNegative = bits[0] === "-" ? true : false; 

    let total = 0;
    const oneInd = bits.indexOf("1");

    let bin = negative ? bits.slice(1) : bits;
    bin = oneInd > 0 ? bits.slice(oneInd) : bits;

    for (let bit of bin) {
      total *= 2;
      total += Number(bit);
    }

    return isNegative ? -Number(total) : Number(total);
  }
}
