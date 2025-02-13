let cards = [];

// Inicializar cards
function initializeCards() {
    cards = loadInitialCards();
    updateStats();
    renderCards();
}

function addCard() {
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    const mnemonic = document.getElementById('mnemonic').value;
    const contributor = document.getElementById('contributor').value || 'Anônimo';

    if (!subject || !topic || !question || !answer) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const card = {
        id: Date.now(),
        subject,
        topic,
        question,
        answer,
        mnemonic,
        contributor,
        isCustom: true
    };

    cards.push(card);
    saveCards();
    updateStats();
    renderCards();
    clearForm();
}

function contributeCard() {
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    const mnemonic = document.getElementById('mnemonic').value;
    const contributor = document.getElementById('contributor').value;

    if (!subject || !topic || !question || !answer || !contributor) {
        alert('Por favor, preencha todos os campos obrigatórios, incluindo seu nome!');
        return;
    }

    const issueBody = `
Subject: ${subject}
Topic: ${topic}
Question: ${question}
Answer: ${answer}
Mnemonic: ${mnemonic}
Contributor: ${contributor}
    `.trim();

    const issueTitle = '[NEW CARD] ' + subject + ' - ' + topic;
    const issueUrl = `https://github.com/seu-usuario/flash-cards/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
    
    window.open(issueUrl, '_blank');
    clearForm();
}

function deleteCard(id) {
    const card = cards.find(c => c.id === id);
    if (!card.isCustom) {
        const confirmDelete = confirm('Este é um card padrão. Tem certeza que deseja deletá-lo?');
        if (!confirmDelete) return;
    }
    
    cards = cards.filter(card => card.id !== id);
    saveCards();
    updateStats();
    renderCards();
}

function toggleCard(element) {
    element.classList.toggle('flipped');
}

function saveCards() {
    localStorage.setItem('flashcards', JSON.stringify(cards));
}

function clearForm() {
    document.getElementById('subject').value = '';
    document.getElementById('topic').value = '';
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
    document.getElementById('mnemonic').value = '';
    document.getElementById('contributor').value = '';
}

function updateStats() {
    const total = cards.length;
    const defaultCount = cards.filter(card => !card.isCustom).length;
    const customCount = cards.filter(card => card.isCustom).length;

    document.getElementById('totalCards').textContent = total;
    document.getElementById('defaultCards').textContent = defaultCount;
    document.getElementById('customCards').textContent = customCount;
}

function filterCards() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    return cards.filter(card => 
        card.subject.toLowerCase().includes(searchTerm) ||
        card.topic.toLowerCase().includes(searchTerm) ||
        card.question.toLowerCase().includes(searchTerm)
    );
}

function filterByType(type) {
    let filteredCards = filterCards();
    
    if (type === 'default') {
        filteredCards = filteredCards.filter(card => !card.isCustom);
    } else if (type === 'custom') {
        filteredCards = filteredCards.filter(card => card.isCustom);
    }

    renderCards(filteredCards);
}

function renderCards(cardsToRender = filterCards()) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    cardsToRender.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.isCustom ? 'custom-card' : 'default-card'}`;
        cardElement.onclick = () => toggleCard(cardElement);

        const frontContent = `
            <div class="card-front">
                <span class="card-type">${card.isCustom ? 'Personalizado' : 'Padrão'}</span>
                <button class="delete-btn" onclick="event.stopPropagation(); deleteCard(${card.id})">X</button>
                <h3>${card.subject} - ${card.topic}</h3>
                <p><strong>Pergunta:</strong></p>
                <p>${card.question}</p>
                <p><em>Clique para ver a resposta</em></p>
            </div>
        `;

        const backContent = `
            <div class="card-back">
                <span class="card-type">${card.isCustom ? 'Personalizado' : 'Pa
