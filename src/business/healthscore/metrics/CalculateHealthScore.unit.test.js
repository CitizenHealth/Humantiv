/* global test */

import {getHealthScore} from './CalculateHealthScore';

const steps = [[],[],[]];
const activities = [[],[],[]];
const sleeps = [[],[],[]];
const results = [{
	"healthData": [], 
	"healthScore": 0
},
{
	"healthData": [], 
	"healthScore": 0
},
{
	"healthData": [], 
	"healthScore": 0
}];

for (var index = 0; index < results.length; index++) {
	let i = index;
	test(`Health Score from steps, sleep, and activity. Test ${i+1}`, () => {
		expect(getHealthScore(steps[i], activities[i], sleeps[i])).toEqual(results[i]);
	});
}