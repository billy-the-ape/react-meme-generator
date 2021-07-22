import React from 'react';
import { render } from '@testing-library/react';
import { MemeGenerator } from '.'


describe('ExampleComponent', () => {
  it('matches snapshot', () => {
    expect(render(<MemeGenerator />)).toMatchSnapshot()
  })
})
