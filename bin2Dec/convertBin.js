export default function bin2Dec(binary) {
  if ([..."23456789"].some((num) => binary.includes(num))) {
    throw new Error(
      "Invalid input. Binary numbers are composed only by 0s and 1s."
    );
  } else {
    const bits = Math.abs(Number(binary));

    let total = 0;
    for (let bit of String(bits)) {
      total *= 2;
      total += Number(bit);
    }

    return bits === Number(binary) ? total : -total;
  }
}
