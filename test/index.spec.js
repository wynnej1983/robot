/* global describe, it, before */

import chai from 'chai';
import sinon from 'sinon';
import {Robot} from '../lib/robot.js';

chai.expect();

const expect = chai.expect;

let robot;

describe('Robot', () => {
  beforeEach(() => {
    robot = new Robot();
  });
  describe('invalid command', () => {
    it('should ignore command when invalid', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('INVALID');
      expect(robot.position).to.deep.equal({x: 0, y: 0});
      expect(robot.heading).to.equal('NORTH');
    });
  });

  describe('REPORT command', () => {
    it('should ignore command if robot is not on the table', () => {
      let spy = sinon.spy(console, 'log');
      robot.processCommand('REPORT');
      expect(spy.calledWith(null)).to.be.false;
      console.log.restore();
    });

    it('should print the current position and heading', () => {
      let spy = sinon.spy(console, 'log');
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('REPORT');
      expect(spy.calledWith('0,0,NORTH')).to.be.true;
      console.log.restore();
    });
  });

  describe('PLACE command', () => {
    it('should ignore command when invalid position', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('PLACE -1,0,NORTH');
      expect(robot.position).to.deep.equal({x: 0, y: 0});
      expect(robot.heading).to.equal('NORTH');
    });

    it('should ignore command when invalid heading', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('PLACE 0,0,INVALID');
      expect(robot.position).to.deep.equal({x: 0, y: 0});
      expect(robot.heading).to.equal('NORTH');
    });

    it('should place robot at specified position and heading', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      expect(robot.position).to.deep.equal({x: 0, y: 0});
      expect(robot.heading).to.equal('NORTH');
    });
  });

  describe('LEFT command', () => {
    it('should ignore command if robot is not on the table', () => {
      robot.processCommand('LEFT');
      expect(robot.heading).to.equal(null);
    });

    it('should rotate robot 90 degrees left', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('LEFT');
      expect(robot.heading).to.equal('WEST');
      robot.processCommand('LEFT');
      expect(robot.heading).to.equal('SOUTH');
      robot.processCommand('LEFT');
      expect(robot.heading).to.equal('EAST');
      robot.processCommand('LEFT');
      expect(robot.heading).to.equal('NORTH');
    });
  });

  describe('RIGHT command', () => {
    it('should ignore command if robot is not on the table', () => {
      robot.processCommand('RIGHT');
      expect(robot.heading).to.equal(null);
    });

    it('should rotate robot 90 degrees right', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('RIGHT');
      expect(robot.heading).to.equal('EAST');
      robot.processCommand('RIGHT');
      expect(robot.heading).to.equal('SOUTH');
      robot.processCommand('RIGHT');
      expect(robot.heading).to.equal('WEST');
      robot.processCommand('RIGHT');
      expect(robot.heading).to.equal('NORTH');
    });
  });

  describe('MOVE command', () => {
    it('should ignore command if robot is not on the table', () => {
      robot.processCommand('MOVE');
      expect(robot.position).to.equal(null);
      expect(robot.heading).to.equal(null);
    });

    it('should ignore command if move is off the table', () => {
      robot.processCommand('PLACE 0,0,SOUTH');
      robot.processCommand('MOVE');
      expect(robot.position).to.deep.equal({x: 0, y: 0});
      expect(robot.heading).to.equal('SOUTH');
    });

    it('should move robot one unit forward', () => {
      robot.processCommand('PLACE 0,0,NORTH');
      robot.processCommand('MOVE');
      expect(robot.position).to.deep.equal({x: 0, y: 1});
    });
  });
});
