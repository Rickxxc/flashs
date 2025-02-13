// Dados iniciais dos flash cards
const defaultCards = [
    {
        id: 1,
        subject: "Matemática",
        topic: "Trigonometria",
        question: "Qual é a fórmula para calcular a hipotenusa?",
        answer: "a² = b² + c², onde 'a' é a hipotenusa e 'b' e 'c' são os catetos",
        mnemonic: "Pitágoras ficou famoso por essa!",
        contributor: "sistema"
    },
    {
        id: 2,
        subject: "História",
        topic: "Brasil Colônia",
        question: "Quando foi o descobrimento do Brasil?",
        answer: "22 de abril de 1500",
        mnemonic: "Em 1500 o Brasil foi achado, por Pedro Álvares Cabral foi descobrado",
        contributor: "sistema"
    },
    {
        id: 3,
        subject: "Biologia",
        topic: "Fotossíntese",
        question: "Quais são os elementos necessários para a fotossíntese?",
        answer: "Água, gás carbônico, luz solar e clorofila",
        mnemonic: "Água com gás na luz do sol deixa a planta verde de vida",
        contributor: "sistema"
    }
];

// Função para carregar os cards iniciais
function loadInitialCards() {
    const savedCards = JSON.parse(localStorage.getItem('flashcards')) || [];
    
    if (savedCards.length === 0) {
        localStorage.setItem('flashcards', JSON.stringify(defaultCards));
        return defaultCards;
    }
    
    return savedCards;
}
