const sliceCounter = count => {
    const countToNumber = +count.replaceAll(',', '')

console.log(countToNumber);

    const abbreviations = [
        { value: 1e18, symbol: "E" },
        { value: 1e15, symbol: "P" },
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "G" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" }
    ];

    if (countToNumber < 1000) {
        return countToNumber.toString();
    }

    const abbreviation = abbreviations.find((item) => countToNumber >= item.value);
    if (!abbreviation) {
        return countToNumber.toString();
    }

    const abbreviatedNumber = (countToNumber / abbreviation.value).toFixed(1);
    return abbreviatedNumber + abbreviation.symbol;


}

export { sliceCounter }