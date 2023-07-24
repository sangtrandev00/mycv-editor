import fs from 'fs';

const matches = fs.readFileSync("data.csv", {
    encoding: "utf8",
}).split("\n").map((row: string): string[] => {
    return row.split(",");
});

for(let i = 0; i < matches.length; i++) {
    console.log(matches[i]);
}