import {Demo} from '../../src/routes/demo/demo'
import {assert, createComponentSuite, Registration, sinon} from "@genesislcap/foundation-testing";
import {User} from "@genesislcap/foundation-user";

Demo;  // reference to avoid tree shaking.
let clock;

// partial User mock
const mocks = [
  Registration.instance(User, {userName: 'Nick'}),
];

// create multiple suites, one for each time of day
const cases = [
  {timeOfDay: 'morning', suite: null, date: new Date(2024, 8, 15, 7, 0)},
  {timeOfDay: 'afternoon', suite: null, date: new Date(2024, 8, 15, 14, 0)},
  {timeOfDay: 'evening', suite: null, date: new Date(2024, 8, 15, 18, 0)},
  {timeOfDay: 'night', suite: null, date: new Date(2024, 8, 15, 22, 0)},
]

cases.forEach(x => {
  x.suite = createComponentSuite<Demo>('Demo', 'demo-route', null, mocks);
  x.suite.before(() => {
    clock = sinon.useFakeTimers({
      now: x.date,
      shouldAdvanceTime: true,
      toFake: ["Date", "setTimeout"],
    });
  });
  x.suite.after(() => clock.restore());
  x.suite(`Contains correct greeting if it's ${x.timeOfDay}`, async ({element}) => {
    const greeting = element.shadowRoot?.querySelector('h1');
    assert.ok(greeting);
    const greetingText = greeting.textContent?.trim();
    assert.equal(greetingText, `Good ${x.timeOfDay}, ${element.user.userName}!`)
  });
  x.suite.run();
})
