/* Source for way to fold regions in .jsx files: https://stackoverflow.com/questions/58882591/region-for-jsx */
// #region Sources for making attributes required even though they can be undefined by default
/* Initial note: the images will still be displayed if "mandatory" attributes are missing, 
but the text editor will display squiggly lines in the code to show that there is a problem to address.

"When the TypeScript compiler throws the error "type string undefined is not assignable to type string," 
it indicates a mismatch between the expected type and the actual value type. This error often occurs when a variable 
expected to be a type string is assigned a value that could be undefined. (...)
When undefined is introduced, the variable could either be a string or have no value at all, which is not the same issue 
as having a type string. (...)
The type undefined in TypeScript represents the absence of a value. It is a subtype of null, but they are 
not the same. Undefined is the default value for an uninitialized variable, while null is an assignment value 
indicating that a variable intentionally has no value. (...)
This code snippet shows how to use the nullish coalescing operator to provide a default value 
when the original value is undefined."
https://www.dhiwise.com/post/understand-error-type-string-undefined-is-not-assignable 

The easiest solution that I found is to assign the type  any  to the loading attribute (loading: any;) 
but it defeats the point of trying to require a loading attribute to be defined (a choice to be made).
I found that unsatisfactory solution in a much more complex debate at:
https://stackoverflow.com/questions/39275213/react-and-typescript-interface-or-operator

The essence of that debate is explained by the following source, which doesn't provide a solution
to the current problem, but it provides insight.
"Nullable types
TypeScript has two special types, null and undefined, that have the values null and undefined respectively. We mentioned 
these briefly in the Basic Types section.
By default, the type checker considers null and undefined assignable to anything. Effectively, null and undefined are 
valid values of every type. That means it’s not possible to stop them from being assigned to any type, 
even when you would like to prevent it. The inventor of null, Tony Hoare, calls this his “billion dollar mistake”.
The strictNullChecks flag fixes this: when you declare a variable, it doesn’t automatically include 
null or undefined. You can include them explicitly using a union type:"
https://www.typescriptlang.org/docs/handbook/advanced-types.html 

Based on the recommendation from DhiWise, I read the following in MDN, but it migh not be possible to use that
inside of an interface (even though one should at least be able to use | ) because I still got an error.
"The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand 
when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand. (...)
The nullish coalescing operator has the fifth-lowest operator precedence, directly lower than || and 
directly higher than the conditional (ternary) operator."
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

As a consequence, I looked for another solution, and I found it here: 

"Why Use NonNullable<T>
In many applications, especially those dealing with complex data structures or external data sources, it’s common 
to encounter variables that might be null or undefined. While TypeScript's type system allows for the explicit declaration 
of such possibilities (e.g., string | null), there are cases where it's necessary to enforce that a variable cannot be 
null or undefined after a certain point in the code. This is where NonNullable<T> becomes invaluable. (...)
Integration with TypeScript’s Advanced Types
NonNullable<T> can be combined with other advanced TypeScript types like Partial<T>, Readonly<T>, and Pick<T, K>, 
among others, to create even more powerful and flexible type definitions. (...)
NonNullable<T> with Pick<T, K>
Pick<T, K> creates a type by picking a set of properties K from T. When used with NonNullable<T>, you can selectively 
make certain properties non-nullable, providing a fine-grained approach to null safety within your types."
https://medium.com/@gabrielairiart.gi/the-power-of-nonnullable-t-in-typescript-9cf156beb8da
*/
// #endregion
// #region Implementation of the method explained above
interface BtnInterfaceByMariePierreLessard {
    type: any;
    // #region Expanation to team members
    /* This interface gives an alternative:
    use value or children to show text or HTML elements on the button. 
    
    This being said, it is not necessary to include all native attributes that one might want to use in the interface.
    They are native.
    It is also always possible to create additional interfaces that extend a basic interface with custom functions, 
    - for instance thanks to a spread operator; see: 
    https://stackoverflow.com/questions/43621934/typescript-interface-with-spread-members
    - or, as Kasper said, by extending the native HTML attributes as it is explained in this source: 
    "What happens if we want this to be a password input? Hide the value? Have a minimum length? To be required?
    Do we have to add all the relevant HTML attributes for our input to CustomInputProps?
    Should we create a new component?
    Nope! We can use the InputHTMLAttributes interface exported from React. 
    React exports a set of generic interfaces that correspond to various HTML elements. (...)
    We can create a new TypeScript type which combines our custom interface and the InputHTMLAttributes interface.
    Screenshot of a typescript type extending the  InputHTMLAttributes interface. The full code is available at the sandbox link below."
    https://frontguys.fr/front-end/typescript-react-native-attributes/
    */
    // #endregion 
    value?: string;
    /* Source for the following key-value pair: 
    https://dev.to/lico/i-ruined-my-react-components-by-using-optional-props-3o64 */
    children?: React.ReactNode | string;
    // #region Expanation to team members
    /* Kasper said that if I included the following, there would be a problem if the function ever had
    to receive arguments or to return something. A void function is indeed a function at the end of its call stack
    if I understood that concept properly. Since this button component is intended for all uses, it's interface 
    should be extended once the purpose of the button is decided. See notes above about extending an interface.
    onClick?: ()=>void;
 
    Course notes/reminder: Kasper wrote on Teams:
    // Hvis den tager en string som argument
    interface btnProps {
        onClick: (myArgument: string) => void
    }
    // Eller hvis den returnerer eks. en string
    interface btnProps {
        onClick: () => myString: string
    }
    */
    /* Reminder to team members: it would be advantageous to use the following button attributes:
    disabled (to deactivate the button of players unless it is their turn to play)
    command (to open and close a modal in a dialog element)
    form (in cases where the button is outside of the form to which it should be associated)
    */
    // #endregion 
};

type nonNullableBtnPropsByMariePierreLessard = NonNullable<Pick<BtnInterfaceByMariePierreLessard, "type" >>;
// #endregion

export const BtnComponentByMariePierreLessard = (props: nonNullableBtnPropsByMariePierreLessard) => {
    /* Kasper said that the only attributes that I need to include in the component definition are
    the ones that are required. */
    return (
        <button type={props.type}></button>
    );
};
