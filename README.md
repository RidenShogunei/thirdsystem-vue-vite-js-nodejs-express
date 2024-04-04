# thirdsystem-vue-vite-js-nodejs-express
三系统的主题是英语学习!总之先定下主题了.
1.在Vue 3中，计算属性在模板中被自动解包，也就是说在模板中可以直接访问它的值，而不是.ref对象。这就是你可能没有看到.value这个属性，但仍然可以正常工作的原因。
然而，在JavaScript或者TypeScript代码中，事情就有所不同了。在这些脚本块中，访问计算属性实际上会返回一个ComputedRef对象。要获取计算属性的值，就必须通过这个ComputedRef对象的.value属性。这是Vue 3的响应性系统的一部分，使得可以追踪和响应计算属性值的变化。
换句话说，如果你在模板中，可以直接使用计算属性的名称获取其值，不需要附加.value。但在JavaScript或TypeScript代码块中，你需要使用.value来访问其值。
2.如果是这样写const getwordApi = (params) => post('http://localhost:5000/getword', params);就是直接返回的是吧
是的，你是对的。在你的这个 `getwordApi` 函数中，由于箭头函数后面立即跟随的就是 `post` 方法的调用，所以 `post` 方法的返回值将直接作为 `getwordApi` 函数的返回值。这是箭头函数的简写形式，当箭头函数的函数体只有一条语句，且该语句的结果就是函数的返回值时，可以省略花括号和 `return` 关键字。
因此，你的这个 `getwordApi` 函数写法是正确的。当调用 `getwordApi` 函数时，会直接返回 `post` 方法的返回值，也就是一个 Promise 对象。
const getwordApi = (params) => post('http://localhost:5000/getword', params);
这个的意思是：定义一个名为 `getwordApi` 的函数，接受一个参数 `params`，函数体执行 `post('http://localhost:5000/getword', params)` 方法，然后返回其结果。
3.服务器配置的时候记得加一个base:/