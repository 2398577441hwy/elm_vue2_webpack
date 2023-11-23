const array1 = [{id:5}, {id:12}, {id:8}, {id:130}, {id:44}];

const found = array1.forEach(ele=>{
    if(ele.id===5){ ele.id=7}
});

console.log(array1);

