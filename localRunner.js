
import { handler } from './index.js';
import mockEvent from './mockEvent.js';

console.log('-------- running locally --------');
await handler(mockEvent);
console.log('------------ finish! ------------');
