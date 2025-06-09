# HOMELO - Site Web pentru Vânzarea de Proprietăți

## 📋 Descriere
HOMELO este un site web modern și responsive pentru vânzarea de proprietăți premium. Site-ul oferă o experiență de utilizare excepțională cu un design minimalist și funcționalități complete pentru explorarea și achiziționarea de proprietăți.

## ✨ Funcționalități

### 🏠 Gestionarea Proprietăților
- **Bază de date proprietăți**: Colecție completă de case, apartamente și vile
- **Filtrare avansată**: Filtrare după tipul proprietății (toate, case, apartamente, vile)
- **Căutare în timp real**: Căutare după locație, nume sau tip
- **Pagini detaliate**: Fiecare proprietate are o pagină detaliată cu specificații complete

### 🛒 Sistem de Coș de Cumpărături
- **Favorite**: Adăugare proprietăți în lista de favorite
- **Sidebar cart**: Interfață elegantă pentru gestionarea proprietăților selectate
- **Persistență**: Coșul se salvează local și se păstrează între sesiuni
- **Notificări**: Feedback instant pentru acțiunile utilizatorului

### 📝 Proces de Comandă
- **Checkout complet**: Formulare detaliate pentru contactul cu agenții
- **Tipuri de solicitări**: Programare vizionare, solicitare informații, oferte
- **Validare formulare**: Validare completă a datelor de contact
- **Confirmare**: Mesaje de confirmare și notificări

### 📱 Design Responsive
- **Mobile-first**: Optimizat pentru toate dimensiunile de ecran
- **Modern UI**: Design minimalist cu animații fluide
- **UX optimizat**: Navigare intuitivă și experiență plăcută

## 🚀 Structura Proiectului

```
HOMELO/
├── index.html          # Pagina principală
├── styles.css          # Stiluri CSS moderne și responsive
├── script.js           # Funcționalități JavaScript
└── README.md           # Documentația proiectului
```

## 🎨 Tehnologii Utilizate
- **HTML5**: Structură semantică modernă
- **CSS3**: Flexbox, Grid, animații, variabile CSS
- **JavaScript ES6+**: Funcționalități interactive moderne
- **Font Awesome**: Iconuri vectoriale
- **Google Fonts**: Tipografia Inter pentru un look modern

## 📊 Obiectele JavaScript

### Proprietăți
Fiecare proprietate conține:
- **Informații de bază**: ID, titlu, locație, tip, preț
- **Specificații**: Dormitoare, băi, suprafață
- **Facilități**: Parcare, grădină, piscină, terasă, etc.
- **Detalii tehnice**: An construcție, clasă energetică, orientare

### Exemplu de proprietate:
```javascript
{
    id: 1,
    title: "Vilă Modernă Herastrău",
    location: "Herastrău, București",
    type: "vila",
    price: 750000,
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    description: "Vilă excepțională cu design modern...",
    features: {
        parking: 3,
        garden: true,
        pool: true,
        // ... alte facilități
    },
    yearBuilt: 2020,
    energyClass: "A+",
    orientation: "Sud-Est"
}
```

## 🔧 Cum să folosești site-ul

### Pentru Dezvoltatori
1. Deschide `index.html` în browser
2. Toate funcționalitățile sunt gata configurate
3. Proprietățile sunt definite în `script.js` în variabila `properties`
4. Pentru a adăuga proprietăți noi, extinde array-ul `properties`

### Pentru Utilizatori
1. **Explorează proprietățile**: Navighează prin secțiunea "Proprietăți"
2. **Filtrează și caută**: Folosește filtrele și bara de căutare
3. **Vezi detalii**: Click pe "Detalii" pentru informații complete
4. **Adaugă în favorite**: Click pe "Adaugă" pentru a salva proprietatea
5. **Finalizează comanda**: Accesează coșul și completează formularul

## 📋 Funcționalități Incluse

### ✅ Implementat
- [x] Design responsive modern
- [x] Sistem de navigare smooth
- [x] Bază de date proprietăți
- [x] Filtrare și căutare
- [x] Modal pentru detalii proprietăți
- [x] Sistem de coș de cumpărături
- [x] Proces complet de checkout
- [x] Notificări interactive
- [x] Formulare de contact
- [x] Persistența datelor (localStorage)

### 🔄 Extensii Posibile
- [ ] Integrare cu backend real
- [ ] Sistem de autentificare
- [ ] Comparare proprietăți
- [ ] Hartă interactivă
- [ ] Galerie foto pentru proprietăți
- [ ] Reviews și rating-uri
- [ ] Chat în timp real cu agenții

## 🎯 Caracteristici Speciale

### Design Modern
- **Culori**: Paletă profesională cu albastru (#2563eb) ca accent
- **Tipografie**: Font Inter pentru lizibilitate optimă
- **Animații**: Tranziții fluide și efecte hover elegante
- **Layout**: Grid și Flexbox pentru structuri flexibile

### UX/UI Optimizat
- **Loading states**: Feedback vizual pentru toate acțiunile
- **Error handling**: Gestionarea cazurilor de eroare
- **Accessibility**: Markup semantic și navigare cu keyboard
- **Performance**: Cod optimizat și imagini placeholder

### Funcționalități JavaScript
- **Debouncing**: Pentru căutare eficientă
- **Local Storage**: Persistența coșului de cumpărături
- **Event delegation**: Gestionare eficientă a evenimentelor
- **Module pattern**: Cod organizat și reutilizabil

## 📞 Contact și Suport
Pentru întrebări sau personalizări, contactează echipa de dezvoltare.

---

**HOMELO** - Găsește-ți casa de vis! 🏠✨ 