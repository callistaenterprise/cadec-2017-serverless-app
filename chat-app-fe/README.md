##Recompose playground
This project outlines a few functional programming best practices for Javascript 
as well as demonstrating the use of the fantastic Recompose library.  
My aim here is to lay down some of the basic functional programming principles 
and how to apply these with Recompose with React.

###The preamble ..
My gut feeling is, that a total break from *OOP* and then the embracing thereof **functional programming** presents a real revolution 
in the way we approach and build react applications.

The main problem that I and most OOP have beens experience... in starting with react is creating bloated components that do too much.  
JSX is super and it’s easy to just keep on declaring and declaring and nesting and nesting and then ending up with one 
huge monster component, 
why not? your on a deadline and you just want to get something out.  
But then… someone mentions **test** .. and your buggered.  
All of a sudden you spend a sprint or two unravelling those monsters to try and make them testable.  
**It’s better to bring in TEST from the begining.**
**Enzyme is heaven!**
Testing is easy peasy.

So, I wanted to use recompose to continue with this fp dream and show you all some basic examples of it's use.  

###The code
The first place to start is with the tests which outline different scenerios: from considering functional principles, 
immutability, purity, referential integrity, then moving onto function composition and finally onto some examples with recompose.

###Running
- Install ```npm install```
- Tests ```npm run test```
- Run the chat app ```npm start```

###Functional Principles
- immutability
- purity
- referential integrity
- declarative

###Tests
- section_1_functional_mindset.spec.js, basic functional principles and how to enforce them in code.
- section_1_functional_mindset_hofs.spec.js, higher order functions, underscore.compose
- section_3_recompose_hocs.spec.js, higher order components, how to use them with composition, all tests are enzyme
- section_4_recompose_withReducer.spec.js, this is the full blown chat app utilizing enzyme, withReducer, the point of this was to show how easy it is to test components with composition, recompose and enzyme.
- components/, these come from recompose_withReducer but broken out into individual files.
- actions/reducers, this is the interesting part, as the reducers and actions used in recomposeWithReducer are combined with the application store and made global.  
This is a great example of first using withReducer in a container, then (maybe) seeing a need to put it into the app store.  I love this because its totally transparent, 
maintains conformity with redux for state management and reduces abuse of global state.

No styling of the Chat App.. just wanted to stick to the js ..

####Eject
I apologies for ejecting a very basic create-react-app but it was purely to do with wanting to use Mocha instead of Jest.  
Although after perusing the ejected configuration... it kind of gives one a good enough reason to try Jest ... 
I'm converting as we speek (-:
