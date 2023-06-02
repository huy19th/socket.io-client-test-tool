export default class Utils {

    static generateArray(arr, ...props) {
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

    static validateJSON(value) {
        try {
            JSON.parse(value);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    static parseObjectValues(obj) {
        let parsedObj = {};
        Object.keys(obj).forEach(key => {
            try {
                parsedObj[key] = JSON.parse(obj[key]);
            }
            catch (err) {
                parsedObj[key] = obj[key];
            }
        });
        return parsedObj
    }

    static parseAllArrayElements(arr) {
        return arr.map(item => {
            try {
                return JSON.parse(item);
            }
            catch (err) {
                return item;
            }
        })
    }

    static beautifyStringIfValidJSON(text) {
        let beautified;
        if (validateJSON(text)) {
            beautified = JSON.stringify(JSON.parse(text), null, "\t");
        }
        return beautified.length === text.length ? JSON.stringify(JSON.parse(text)) : beautified;
    }
}

export const {
    generateArray,
    validateJSON,
    parseObjectValues,
    parseAllArrayElements,
    beautifyStringIfValidJSON
} = Utils;