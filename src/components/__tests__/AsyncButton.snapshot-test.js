import React from 'react';
import AsyncButton from '../AsyncButton';
import renderer from 'react-test-renderer';

const expectToMatchSnapshot = component => {
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
};

describe('<AsyncButton /> Snapshots', () => {
  it('should have sane defaults', () => {
    expectToMatchSnapshot(<AsyncButton />);
  });

  it('should delegate text, className & disabled props', () => {
    expectToMatchSnapshot(
      <AsyncButton className="btn btn-default" text="Save" disabled={true} />
    );
  });
});

describe('Block form :- <AsyncButton></AsyncButton>', () => {
  it('should have sane defaults', () => {
    expectToMatchSnapshot(<AsyncButton>Save</AsyncButton>);
  });

  it('should delegate text, className & disabled props', () => {
    expectToMatchSnapshot(
      <AsyncButton className="btn btn-default" text="Save" disabled={true}>
        {({ buttonText, isPending }) =>
          <span>
            {buttonText}
          </span>}
      </AsyncButton>
    );
  });
});
