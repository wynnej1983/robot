/* global describe, it, before */

import chai from 'chai';
import {Robot} from '../lib/robot.js';

chai.expect();

const expect = chai.expect;

let robot;

describe('Robot', () => {
  before(() => {
    robot = new Robot();
  });
  describe('PLACE command', () => {
    it('should return the position and heading', () => {
      robot.sendCommand('PLACE 0,0,NORTH');
      expect(robot.position).to.deep.equal({x: 0, y: 0});
      expect(robot.heading).to.equal('NORTH');
    });
  });
});
