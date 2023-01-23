/**
 * Takes text in CSV format, and returns a function that will take any text as input
 * and replace the names of cities in it with a string.
 *
 * @param csv city info in csv format.
 * @returns {function(*): *}  receives text, returns enriched text.
 */
function editCityCSV(csv) {
    let city = csv
        .split('\n')
        .filter(arr => arr.length > 1 && !arr.includes('#', 0))
        .map(arr => arr.split(','))
        .reduce(function (target, item) {
            target.push({x: item[0], y: item[1], name: item[2], population: item[3]});
            return target
        }, [])
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce(function (target, item, currentIndex) {
            target[item.name] = {population: item.population, rating: currentIndex + 1};
            return target;
        }, {})

  return (txt) => txt.replace(new RegExp(Object.keys(city).join('|'), "gi"), (key) =>
      `${key} (${city[key].rating} місце в ТОП-10 найбільших міст України, населення ${city[key].population} чоловік)`);

}

/*
 * Test.
 */
let csv = '44.38,34.33,Алушта,31440,\n' +
    '49.46,30.17,Біла Церква,200131,\n' +
    '49.54,28.49,Бердичів,87575,\n' +
    '\n' +
    '#\n' +
    '46.49,36.58,Бердянськ,121692,\n' +
    '49.15,28.41,Вінниця,356665,\n' +
    '45.40,34.29,Джанкой,43343,\n' +
    '45.40,34.29,Любешів,3000,\n' +
    '45.40,34.29,Львів,1200000,\n' +
    '45.40,34.29,Київ,2000000,\n' +
    '45.40,34.29,Зарудчі,100,\n' +
    '45.40,34.29,Люблін,1412512,\n' +
    '45.40,34.29,Одеса,930532,\n' +
    '45.40,34.29,Голуби,123412,\n' +
    '45.40,34.29,Харків,1231231,\n' +
    '45.40,34.29,Миколаїв,367011,\n' +

    '\n' +
    '# в этом файле три строки-коммента :)';
let editCity = editCityCSV(csv)
let str = 'Київ і Харків - столиці України';

console.log(editCity(str));
