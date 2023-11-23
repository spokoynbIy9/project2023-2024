
// добавление нового элемента, остальные методы (get, put, patch, delete) работаю по такой же логике

// fetch("http://localhost:3000/todos", {
//   method: "post",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   //make sure to serialize your JSON body
//   body: JSON.stringify({
//     id: '5',
//     text: 'do',
//     completed: true,
//     meta: {
//         author: 'dssad',
//         createdAt: 'today'
//     }
//   })
// })

// поиск сравнивает, чтобы хоть какое-то поле равнялось значению q
// fetch("http://localhost:3000/todos?q=do").then(res => res.json()).then(console.log)


// поиск по конкретному полю
//  fetch("http://localhost:3000/todos?text=Sleep").then(res => res.json()).then(console.log)

// сортировка по конкретному полю конкретным порядокм
// fetch("http://localhost:3000/todos?_sort=id&_order=desc").then(res => res.json()).then(console.log)

// поиск по id
// fetch("http://localhost:3000/todos/2").then(res => res.json()).then(console.log)
import * as lk from './scripts/lk.js';
import * as index from './scripts/lk.js'

const url = "http://localhost:3000/todos";


async function getData(url, parent_node) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return;
    }
    const data = await response.json();
    console.log(data);


    data.forEach((element) => {
        const node = document.createElement('div');
        node.classList.add('application-header');
        node.textContent = `Заявка № ${element.id}`;
        parent_node.append(node);

        node.id = `bid_${element.id}`;

        node.addEventListener("click", (event) => {
            if (event.target == node) {
                if (document.querySelector(`#${node.id}body`)) {
                    const child_node = document.querySelector(`#${node.id}body`);
                    child_node.remove();
                }
                else {
                    const child_node = document.createElement('div');
                    child_node.classList.add('application-body');
                    child_node.textContent = `${element.fio}`
                    node.append(child_node);

                    child_node.id = node.id + `body`;
                }
            }
        });

        // console.log(`${index + 1} объект`);
        // console.log(`id: ${element.id}`);
        // console.log(`text: ${element.text}`);
        // console.log(`completed: ${element.completed}`);
        // if (element.meta !== undefined) {
        //     console.log(`author: ${element.meta.author}`);
        //     console.log(`createdAt: ${element.meta.createdAt}`);
        // }
        // console.log();

    });
}

const grey_container = document.querySelector(".grey-container");
getData(url, grey_container);



// getData(url);




