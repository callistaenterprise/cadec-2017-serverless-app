import React from 'react';
import ReactDOM from 'react-dom';
import {pipe, compose} from 'ramda';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('can compose functions', () => {

  const greet    = name => "hi: " + name;
  const exclaim  = statement => statement.toUpperCase() + "!";
  console.log('----', greet(exclaim('steve')));

  const hocs = pipe(exclaim, greet);
  console.log('---- pipe', hocs('pipe') );

  const comps = compose(greet, exclaim);
  console.log('---- comps', hocs('compose') );
});

it('can compose components', () => {
  const hoc = bc => props => {
    return `----- hoc ${props.name} \n
            ${bc(props)}   \n
              -------`;
  };

  const baseComponent = props => `the bc ${props.innername}`

  const c = hoc(baseComponent);
  console.log('---- c', c({name:'outer', innername:'inner'}));

  const comps = compose(hoc)(baseComponent);
  console.log('---- c comps', comps({name:'outer', innername:'inner'}));
});


