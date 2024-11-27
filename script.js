document.addEventListener('DOMContentLoaded', function () {
    const bar = document.getElementById('barra'); // Botão de abrir o menu
    const fechar = document.getElementById('fechar'); // Botão de fechar o menu
    const nav = document.getElementById('nav-barra'); // O menu móvel

    // Abrir o menu
    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active'); // Adiciona a classe para exibir o menu
        });
    }

    // Fechar o menu
    if (fechar) {
        fechar.addEventListener('click', () => {
            nav.classList.remove('active'); // Remove a classe para esconder o menu
        });
    }

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !bar.contains(event.target)) {
            nav.classList.remove('active'); // Fecha o menu
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions-list');

    // Dados das sugestões com links
    const suggestions = [
        { name: 'Orquídea Phalaenopsis', imgSrc: 'images/pagina_flores/Orquídea Phalaenopsis.jpg', link: 'sproduct.html' },
        { name: 'Flor do Campo', imgSrc: 'images/pagina_flores/Flor do Campo.jpg', link: '2_sproduct.html' },
        { name: 'Lírios', imgSrc: 'images/pagina_flores/Lírios.jpg', link: '3_sproduct.html' },
        { name: 'Girassol', imgSrc: 'images/pagina_flores/Girassol.jpg', link: '4_sproduct.html' },
        { name: 'Suculentas', imgSrc: 'images/pagina_flores/Suculentas.jpg', link: '5_sproduct.html' },
        { name: 'Astromélias', imgSrc: 'images/pagina_flores/Astromélias.jpg', link: '6_sproduct.html' },
        { name: 'Gérberas', imgSrc: 'images/pagina_flores/gerberas (3).jpg', link: '7_sproduct.html' },
        { name: 'Rosas', imgSrc: 'images/pagina_flores/Rosas.jpg', link: '8_sproduct.html' },
        { name: 'Tulipas', imgSrc: 'images/pagina_flores/Tulipas.jpg', link: '9_sproduct.html' },
        { name: 'Gazânia', imgSrc: 'images/pagina_flores/Gazânia.jpg', link: '10_sproduct.html' },
        { name: 'Dália', imgSrc: 'images/pagina_flores/Dália.jpg', link: '11_sproduct.html' },
        { name: 'Bromélia', imgSrc: 'images/pagina_flores/Bromélia.jpg', link: '12_sproduct.html' },
        { name: 'Camélia', imgSrc: 'images/pagina_flores/Camélia.jpg', link: '14_sproduct.html' },
        { name: 'Amaranthus', imgSrc: 'images/pagina_flores/Amaranthus.jpg', link: '13_sproduct.html' },
        { name: 'Hibisco', imgSrc: 'images/pagina_flores/Hibisco.jpg', link: '15_sproduct.html' },
        { name: 'Helicônia', imgSrc: 'images/pagina_flores/Helicônia.jpg', link: '16_product.html' }
    ];


    // Remove acentos e normaliza texto
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Mostra as sugestões com links e imagens
    function showSuggestions(query) {
        suggestionsList.innerHTML = ''; // Limpa as sugestões anteriores

        if (query) {
            const filteredSuggestions = suggestions.filter(item =>
                removeAccents(item.name).includes(removeAccents(query))
            );

            filteredSuggestions.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('suggestion-item');

                // Adiciona a imagem, texto e funcionalidade de redirecionamento
                li.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <span>${item.name}</span>
                `;
                li.onclick = function () {
                    window.location.href = item.link; // Redireciona para o link do produto
                };

                suggestionsList.appendChild(li);
            });

            // Exibe a lista se houver sugestões
            suggestionsList.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        } else {
            suggestionsList.style.display = 'none'; // Esconde se a busca estiver vazia
        }
    }

    // Atualiza as sugestões quando o usuário digitar
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        showSuggestions(query);
    });

    // Esconde a lista ao clicar fora
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.search')) {
            suggestionsList.style.display = 'none';
        }
    });

    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('userInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        userInput.value = '';

        setTimeout(() => {
            const botReply = getBotResponse(message);
            addMessage('bot', botReply);
        }, 500);
    }
});

const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

// Abrir/fechar o chat
chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
});

// Enviar mensagem
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage('user', message);
    userInput.value = '';

    setTimeout(() => {
        const botReply = getBotResponse(message);
        addMessage('bot', botReply);
    }, 500);
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const lowercaseMessage = message.toLowerCase();

    if (lowercaseMessage.includes('oi') || lowercaseMessage.includes('olá')) {
        return 'Olá! Como posso ajudar você?';
    } else if (lowercaseMessage.includes('tchau')) {
        return 'Tchau! Até a próxima.';
    } else if (lowercaseMessage.includes('como você está')) {
        return 'Estou bem, obrigado por perguntar! E você?';
    } else {
        return 'Desculpe, não entendi. Pode reformular?';
    }
}

    fetch('chatbot.html')
        .then(response => response.text())
        .then(data => {
        document.getElementById('chatbot-container').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o chatbot:', error));


const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotTogller = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {

}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Pensando...", "incoming"));
        generateResponse();
    }, 600);

}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotTogller.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
