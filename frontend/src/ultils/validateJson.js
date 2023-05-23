export default function validateJSON(value) {
    try {
        JSON.parse(value);
        return true;
    }
    catch (err) {
        return false;
    }
}