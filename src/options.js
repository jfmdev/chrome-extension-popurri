import App from './svelte/main.svelte';

console.log('Hello World!');

const app = new App({
    target: document.getElementById('root'), // entry point in ../public/index.html
});

export default app;
