document.addEventListener('DOMContentLoaded', function () {
    const bar = document.getElementById('barra');
    const fechar = document.getElementById('fechar');
    const nav = document.getElementById('nav-barra');

    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }

    if (fechar) {
        fechar.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }

    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !bar.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions-list');

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

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function showSuggestions(query) {
        suggestionsList.innerHTML = '';

        if (query) {
            const filteredSuggestions = suggestions.filter(item =>
                removeAccents(item.name).includes(removeAccents(query))
            );

            filteredSuggestions.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('suggestion-item');

                li.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <span>${item.name}</span>
                `;
                li.onclick = function () {
                    window.location.href = item.link;
                };

                suggestionsList.appendChild(li);
            });

            suggestionsList.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        } else {
            suggestionsList.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        showSuggestions(query);
    });

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


const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btnn");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

const scrollToBottom = () => {
    chatbox.scrollTop = chatbox.scrollHeight;
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing"
        ? `<p>${message}</p>`
        : `<img src="images/passaro.png" class="bird" alt="Passaro"><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

function getBotResponse(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('oi') || lowercaseMessage.includes('olá')) {
        return 'Olá! Como posso ajudar você?';
    } else if (lowercaseMessage.includes('tchau')) {
        return 'Tchau! Até a próxima.';
    } else if (lowercaseMessage.includes('como você está')) {
        return 'Estou bem, obrigado por perguntar! E você?';
    } else if (lowercaseMessage.includes('orquídea phalaenopsis')) {
        return 'A Orquídea Phalaenopsis é conhecida por suas flores elegantes e duradouras, sendo perfeita para decoração de interiores.';
    } else if (lowercaseMessage.includes('flor do campo')) {
        return 'As Flores do Campo são um mix de flores coloridas e vibrantes, ideais para quem busca um visual natural e alegre.';
    } else if (lowercaseMessage.includes('lírios')) {
        return 'Os Lírios simbolizam pureza e sofisticação, sendo muito usados em arranjos florais para ocasiões especiais.';
    } else if (lowercaseMessage.includes('girassol')) {
        return 'Os Girassóis representam felicidade e energia positiva, além de serem um símbolo de lealdade.';
    } else if (lowercaseMessage.includes('suculentas')) {
        return 'As Suculentas são plantas resistentes e de baixa manutenção, ideais para decoração e presentes.';
    } else if (lowercaseMessage.includes('astromélias')) {
        return 'As Astromélias simbolizam amizade e dedicação, com suas cores vibrantes e pétalas delicadas.';
    } else if (lowercaseMessage.includes('gérberas')) {
        return 'As Gérberas são conhecidas por suas cores vibrantes e simbolizam alegria e simplicidade.';
    } else if (lowercaseMessage.includes('rosas')) {
        return 'As Rosas são clássicas e atemporais, simbolizando amor, paixão e beleza.';
    } else if (lowercaseMessage.includes('tulipas')) {
        return 'As Tulipas são elegantes e versáteis, representando amor perfeito e prosperidade.';
    } else if (lowercaseMessage.includes('gazânia')) {
        return 'As Gazânias são flores resistentes que florescem ao sol, ideais para jardins e áreas externas.';
    } else if (lowercaseMessage.includes('dália')) {
        return 'As Dálias são flores sofisticadas e volumosas, simbolizando força e criatividade.';
    } else if (lowercaseMessage.includes('bromélia')) {
        return 'As Bromélias são exóticas e resistentes, perfeitas para decoração de ambientes internos e externos.';
    } else if (lowercaseMessage.includes('camélia')) {
        return 'As Camélias representam beleza e perfeição, com suas pétalas delicadas e elegantes.';
    } else if (lowercaseMessage.includes('amaranthus')) {
        return 'O Amaranthus é uma planta ornamental única, usada em arranjos sofisticados para um toque exótico.';
    } else if (lowercaseMessage.includes('hibisco')) {
        return 'O Hibisco é uma flor tropical vibrante, simbolizando delicadeza e calor.';
    } else if (lowercaseMessage.includes('helicônia')) {
        return 'A Helicônia é uma flor exótica e chamativa, ideal para compor arranjos tropicais e modernos.';
    } else {
        return 'Desculpe, não entendi. Pode reformular?';
    }
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    setTimeout(() => {
        const thinkingMessage = createChatLi("Pensando...", "incoming");
        chatbox.appendChild(thinkingMessage);
        scrollToBottom();

        setTimeout(() => {
            thinkingMessage.remove();
            const botResponse = getBotResponse(userMessage);
            chatbox.appendChild(createChatLi(botResponse, "incoming"));
            scrollToBottom();
        }, 1000);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChat();
});