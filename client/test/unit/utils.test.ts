import {createLogicSuite} from "@genesislcap/foundation-testing";
import {convertSnakeToCamel, timeOfDay} from "../../src/utils/util";

const timeOfDaySuite = createLogicSuite('timeOfDay');

timeOfDaySuite('timeOfDay should return correct time of day', ({runCases}) => {
  runCases(timeOfDay, [
    [[0], 'night'],
    [[1], 'night'],
    [[2], 'night'],
    [[3], 'night'],
    [[4], 'night'],
    [[5], 'night'],
    [[6], 'morning'],
    [[7], 'morning'],
    [[8], 'morning'],
    [[9], 'morning'],
    [[10], 'morning'],
    [[11], 'morning'],
    [[12], 'afternoon'],
    [[13], 'afternoon'],
    [[14], 'afternoon'],
    [[15], 'afternoon'],
    [[16], 'afternoon'],
    [[17], 'evening'],
    [[18], 'evening'],
    [[19], 'evening'],
    [[20], 'evening'],
    [[21], 'night'],
    [[22], 'night'],
    [[23], 'night'],
    [[24], 'night'],
    [[25], null],
    [[-1], null],
    [[false], null],
    [['banana'], null],
    [[{foo: 'bar'}], null],
    [[[1, 2, 3]], null],
  ]);
});
timeOfDaySuite.run();

const convertSnakeToCamelSuite = createLogicSuite('convertSnakeToCamel');
convertSnakeToCamelSuite('convertSnakeToCamel should convert strings correctly', ({runCases}) => {
  runCases(convertSnakeToCamel, [
    [['CLIENT_NAME'], 'Client name'],
    [['CLIENT_NAME', true], 'Client Name'],
    [['  CLIENT_NAME  '], 'Client name'],
    [['client_name '], 'Client name'],
    [['client_name ', true], 'Client Name'],
    [[' cLiEnT_NaMe'], 'Client name'],
    [['client name'], 'Client name'],
    [['STATUS  '], 'Status'],
    [['sTaTus'], 'Status'],
    [['   status'], 'Status'],
    [[5], null],
    [[-5], null],
    [[{foo: 'bar'}], null],
    [[[1, 2, 3]], null],
    [[true], null],
    [[false], null],
    [[null], null],
    [[undefined], null],
  ]);
});
convertSnakeToCamelSuite.run();

