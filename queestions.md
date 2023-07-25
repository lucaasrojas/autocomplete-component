1. What is the difference between Component and PureComponent? Give
   an example where it might break my app.

- Not sure

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

- ShouldComponentUpdate could be triggered by Context

3. Describe 3 ways to pass information from a component to its PARENT.

- callback function, ref, dispatch(redux)

4. Give 2 ways to prevent components from re-rendering.

- Use React.memo

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

- It is a wrapper or element that helps you to render JSX without setting any HTML element

6. Give 3 examples of the HOC pattern.

- Compontent that styles a child, set some attributes, a factory of components

7. What's the difference in handling exceptions in promises, callbacks
   and async…await?
8. How many arguments does setState take and why is it async.

- The first value, it is optional. Because it has its own excution in the stack

9. List the steps needed to migrate a Class to Function Component.

- Replace the constructor with an useEffect, the state has to be done using the useState hook, remove the render method and leave the return statement with the JSx inside. all the methods have to be change to functions or arrow functions

10. List a few ways styles can be used with components.

- CSS Modules, SCSS, styled components, inline style (style={{color: "red"}}), css classes

11. How to render an HTML string coming from the server

- Using dangerously in the element (it is dangerous due to the injections)
