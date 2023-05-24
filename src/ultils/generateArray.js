export default function generateArray(arr, ...props) {
    let result = arr.map(smallArr => {
        let obj = {};
        smallArr.forEach((prop, index) => {
            if (props[index]) {
                obj[props[index]] = prop;
            }
            else {
                obj[`prop${index}`] = prop;
            }
        });
        return obj;
    });
    return result;
}