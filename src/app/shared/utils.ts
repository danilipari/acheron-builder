export default class Utils {

  static convertObjectToArray = (obj: any) => {
    const arr = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push({
          key,
          value: obj[key],
        });
      }
    }
    return arr;
  }

}
