import split from 'split';
import Robot from './robot.js';

const robot = new Robot();

process.stdin.pipe(split()).on('data', robot.processCommand.bind(robot));

export { Robot };
