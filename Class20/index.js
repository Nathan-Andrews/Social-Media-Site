const list = [1,2,3,4];

console.log("---------Queue");
list.forEach(element => {console.log(element)});

console.log('--------- stack')
list.slice().reverse().forEach(element => {console.log(element)});

console.log('---------Dictionary/Map/JSON object');
console.log({name:'bob'});

console.log('--------- Graph');
console.log('bob knows phillip who knows mary...so bob is connected to mary by two nodes')

console.log('-------- complexity')
console.log('O(n^2)')
for (let i = 0; i <2; i++) {
    for (let n=0; n < 2; n++) {
        console.log(`${i} -${n}`);
    }
}

console.log('-------- Algorithms');
console.log('Bianry Search');

//set 1 sort the list
function binarySearch(number,items) {
    const sortedList = items.slice().sort((a,b) => a-b)
    let searchList = sortedList;
    let count = 0
    while (true) {
        count += 1;
        const halfwayPoint = Math.ceil(searchList.length /2)
        const middleItem =searchList[halfwayPoint -1];
        if (middleItem === number) {
            return {number,count};
        }
        if (middleItem > number) {
            searchList = searchList.slice(0,halfwayPoint);
        }else {
            searchList = searchList.slice(halfwayPoint)
        }
        if (searchList.length === 0) {
            throw new Error('Not Found');
        }
    }
}

console.log(binarySearch(4 ,list));