/* This snippet is an improved version of the one in my leo-lov exercise. */

/* "import type only imports declarations to be used for type annotations and declarations. It always gets fully erased, 
so there’s no remnant of it at runtime. Similarly, export type only provides an export that can be used for type contexts, 
and is also erased from TypeScript’s output."
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
*/
import type { ImgHTMLAttributes } from "../../../node_modules/@types/react/index";

/* Source for way to fold regions in .jsx files: https://stackoverflow.com/questions/58882591/region-for-jsx */
// #region Sources for making attributes truly required even though they can be undefined by default (e.g. loading attribute)
/* Initial note to explain the point of the following sources: 
With the following interface and types, the images will still be displayed if "mandatory" attributes are missing, 
but the text editor will display squiggly lines in the code to show that there is a problem to address (something missing).
My idea/desire was to create atoms that flagged attributes to provide in the HTML file in order to comply with 
best practices in search-engine optimisation. 

Please note that there is a major inconvenient to using a custom interface that does not extend native HTML elements 
or one of React's generic types, which I will explain. Another option would be to not use an interface at all,
but that is not an option when using TypeScript and importing images since an interface is required for that.

INCONVENIENT: The interface has to include all HTML-element attributes that the developer might want to use. 
If one adds attributes that are not in the interface, such as className, an error is thrown. 
This happens whether one uses NonNullable<T> or not. It is the interface that is restrictive.
In order to add styling to an image that has such a restrictive interface, it is necessary to
use the selector of an ancestor and then use a CSS selector plus img/... as a child selector in order to apply styling 
to the image.

Sources that lead me to the solution:

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

The easiest solution that I found, at first, was to assign the type  any  to the loading attribute (loading: any;) 
but this defeated the purpose of trying to require a loading attribute to be defined (a choice to be made).
I found that unsatisfactory solution in a much more complex debate at:
https://stackoverflow.com/questions/39275213/react-and-typescript-interface-or-operator

The essence of that debate is explained by the following source, which didn't provide a solution
to the current problem, but it provided insight.
"Nullable types
TypeScript has two special types, null and undefined, that have the values null and undefined respectively. We mentioned 
these briefly in the Basic Types section.
By default, the type checker considers null and undefined assignable to anything. Effectively, null and undefined are 
valid values of every type. That means it’s not possible to stop them from being assigned to any type, 
even when you would like to prevent it. The inventor of null, Tony Hoare, calls this his “billion dollar mistake”.
The strictNullChecks flag fixes this: when you declare a variable, it doesn’t automatically include 
null or undefined. You can include them explicitly using a union type:"
https://www.typescriptlang.org/docs/handbook/advanced-types.html 

Based on the recommendation from DhiWise, I read the following in MDN, but it might not be possible to use that
inside of an interface (even though one can use | ) because I still got an error.
"The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand 
when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand. (...)
The nullish coalescing operator has the fifth-lowest operator precedence, directly lower than || and 
directly higher than the conditional (ternary) operator."
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

As a consequence, I looked for another solution for the first part of the problem, and I found it here: 

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

The second part of the problem was extending the custom interface.
It is possible to use React's generic interfaces for various HTML elements according to
https://frontguys.fr/front-end/typescript-react-native-attributes/
In the current version, the location where these ready-made interfaces can be found is:
node_modules > @types > react > ts5.0 > index.d.ts 
The strategy consists in creating a condition according to which a new type is equal to
ImgHTMLAttributes<HTMLImageElement>
- or - 
InputHTMLAttributes<HTMLInputElement>
- or - 
IframeHTMLAttributes<HTMLIFrameElement>
- etc. plus (and) - 
a custom interface that the developer defined.

I used that in the code below.
*/
// #endregion
// #region Implementation of the method explained above
interface ImgInterfaceByMariePierreLessard {
    alt: string;
    src: string;
    loading: any;
};

/* The following works: 
type nonNullableImgInterfaceByMariePierreLessard = NonNullable<Pick<ImgInterfaceByMariePierreLessard, "alt" | "src" | "loading">>;
type enhancedGenericInterfaceForImgByMariePierreLessard = ImgHTMLAttributes<HTMLImageElement> & nonNullableImgInterfaceByMariePierreLessard;

But, since there is currently no need for 2 types in this project, the coding can be further simplified as follows.
Now, there is just one type that adds constraints to a custom interface, which itself is an extension 
to React's generic interface for img elements. 
*/
type extendedGenericInterfaceForImgByMariePierreLessard = ImgHTMLAttributes<HTMLImageElement> & NonNullable<Pick<ImgInterfaceByMariePierreLessard, "alt" | "src" | "loading">>;
// #endregion
 
export const ImgComponentByMariePierreLessard = (
        {src, alt, loading, ... rest}: extendedGenericInterfaceForImgByMariePierreLessard
    ) => {
    /* Kasper said that the only attributes that I need to include in the component definition are
    the ones that are required. */
    return (
            <img src={src} alt={alt} loading={loading} {... rest} />
    );
};
