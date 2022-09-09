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

  static stringToColour(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

}
