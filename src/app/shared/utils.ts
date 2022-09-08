export default class Utils {

  static convertObjectToArray(obj: any): Array<any> {
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

  static power_of_2(n: number): boolean {

    return (n % 2) == 0 ? false : true;
  }

}
