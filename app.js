document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    const quotesContainer = document.getElementById('quotes-container');
    async function fetchQuotes() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            quotesContainer.innerHTML = '';
            const shortList = data.slice(0, 2);
            
            shortList.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('quote-card');
                card.innerHTML = `<p>"${item.title}"</p>`;
                quotesContainer.appendChild(card);
            });
        } catch (error) {
            quotesContainer.innerHTML = '<p>შეცდომაა</p>';
        }
    }
    fetchQuotes();

    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    addTodoBtn.addEventListener('click', () => {
        const text = todoInput.value;
        if (text === '') return;

        const li = document.createElement('li');
        li.innerHTML = `<span>${text}</span> <i class="fa-solid fa-trash delete-btn"></i>`;

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });

        li.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            }
        });

        todoList.appendChild(li);
        todoInput.value = '';
    });

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (!localStorage.getItem('cookieAccepted')) {
        cookieBanner.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.classList.add('hidden');
    });

});