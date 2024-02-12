// //import { v4 as uuidv4 } from 'uuid'; Du kan använda denna om du vill ha en unik id för varje todo. Eller datum eller något annat.
// // Definera egen typ för en todo
// type Todo = {
//     id: string,
//     text: string,
//     completed: boolean
// }
// // Global variabel för att lagra alla todos
// const todos = []
// // Läs in listan på sidin
// function renderList(todos: Todo[]) {
// // Använd map för att skapa en lista med alla todos
// const html = todos.map(todo => {
//     return `
//         <li class="todo" data-id=${todo.id}>${todo.text}</li>
//     `
// })
// }
// // Lägga till en todo
// function addTodo() {
//     const newTodo: Todo = {
//         id: uuidv4(), // uuid eller eller Date() eller annat
//         text: "hej", // Hämta från input
//         completed: false,
//     }
//     todos.push(newTodo)
// }
// // Uppdatera en todo (VG)
// function updatedTodo(id: string, text: string) {
//     // Filtera ut den todo som ska uppdateras
//     updatedTodo = todos.filter(todo => id === todo.id)
//     // Använd spread operator ... 
//     const t = {...updatedTodo, text: "new text"}
// }
// // Ta bort en todo 
// function removeTodo(id: string) {
//     // Filtera ut den todo som ska tas bort
//     const removeTodo = todos.filter( todo => id !== todo.id)
// // }