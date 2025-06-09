const properties = [
    {
        id: 1,
        title: "Modern Villa in Herastrau",
        location: "Herastrau, Bucharest",
        type: "villa",
        price: 750000,
        bedrooms: 5,
        bathrooms: 4,
        area: 380,
        description: "Exceptional modern villa located in the prestigious Herastrau area. Features spacious rooms, premium finishes and a beautifully landscaped garden.",
        features: {
            parking: 3,
            garden: true,
            pool: true,
            terrace: true,
            fireplace: true,
            airConditioning: true,
            security: true,
            storage: 2
        },
        yearBuilt: 2020,
        energyClass: "A+",
        orientation: "South-East",
        images: ["vila.jpg", "vila.jpg", "vila.jpg"],
        featured: true
    },
    {
        id: 2,
        title: "Luxury Apartment Primaverii",
        location: "Primaverii, Bucharest",
        type: "apartment",
        price: 320000,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        description: "Elegant 3-room apartment in the exclusive Primaverii complex. Panoramic view and superior quality finishes.",
        features: {
            parking: 2,
            garden: false,
            pool: false,
            terrace: true,
            fireplace: false,
            airConditioning: true,
            security: true,
            storage: 1
        },
        yearBuilt: 2019,
        energyClass: "A",
        orientation: "West",
        images: ["vila.jpg", "vila.jpg"],
        featured: false
    },
    {
        id: 3,
        title: "Traditional House Aviatorilor",
        location: "Aviatorilor, Bucharest",
        type: "house",
        price: 280000,
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        description: "House with traditional Romanian architecture, recently renovated. Perfect for a family that appreciates authenticity and comfort.",
        features: {
            parking: 2,
            garden: true,
            pool: false,
            terrace: true,
            fireplace: true,
            airConditioning: false,
            security: false,
            storage: 1
        },
        yearBuilt: 1985,
        energyClass: "B",
        orientation: "South",
        images: ["vila.jpg", "vila.jpg"],
        featured: false
    },
    {
        id: 4,
        title: "Ultra-Modern Villa Baneasa",
        location: "Baneasa, Bucharest",
        type: "villa",
        price: 1200000,
        bedrooms: 6,
        bathrooms: 5,
        area: 500,
        description: "Spectacular villa with contemporary architecture and smart technologies. The most luxurious property in our portfolio.",
        features: {
            parking: 4,
            garden: true,
            pool: true,
            terrace: true,
            fireplace: true,
            airConditioning: true,
            security: true,
            storage: 3
        },
        yearBuilt: 2022,
        energyClass: "A++",
        orientation: "South-West",
        images: ["vila.jpg", "vila.jpg", "vila.jpg"],
        featured: true
    },
    {
        id: 5,
        title: "Compact Apartment Old Town",
        location: "Old Town, Bucharest",
        type: "apartment",
        price: 150000,
        bedrooms: 2,
        bathrooms: 1,
        area: 65,
        description: "Recently renovated apartment in the heart of the Old Town. Ideal for young professionals or investors.",
        features: {
            parking: 0,
            garden: false,
            pool: false,
            terrace: false,
            fireplace: false,
            airConditioning: true,
            security: false,
            storage: 0
        },
        yearBuilt: 1920,
        energyClass: "C",
        orientation: "North",
        images: ["vila.jpg"],
        featured: false
    },
    {
        id: 6,
        title: "Family House Floreasca",
        location: "Floreasca, Bucharest",
        type: "house",
        price: 420000,
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        description: "Perfect house for families with children, in the quiet Floreasca area. Large garden and close to good schools.",
        features: {
            parking: 2,
            garden: true,
            pool: false,
            terrace: true,
            fireplace: true,
            airConditioning: true,
            security: true,
            storage: 2
        },
        yearBuilt: 2010,
        energyClass: "A",
        orientation: "East",
        images: ["vila.jpg", "vila.jpg"],
        featured: false
    },
    {
        id: 7,
        title: "Penthouse Calea Victoriei",
        location: "Calea Victoriei, Bucharest",
        type: "apartment",
        price: 890000,
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        description: "Exclusive penthouse with panoramic city views. Premium location in the heart of Bucharest.",
        features: {
            parking: 2,
            garden: false,
            pool: false,
            terrace: true,
            fireplace: true,
            airConditioning: true,
            security: true,
            storage: 1
        },
        yearBuilt: 2018,
        energyClass: "A+",
        orientation: "South",
        images: ["vila.jpg", "vila.jpg"],
        featured: true
    },
    {
        id: 8,
        title: "Modern Duplex Pipera",
        location: "Pipera, Bucharest",
        type: "apartment",
        price: 380000,
        bedrooms: 3,
        bathrooms: 2,
        area: 140,
        description: "Contemporary duplex in a gated community. Modern amenities and excellent connectivity.",
        features: {
            parking: 2,
            garden: false,
            pool: true,
            terrace: true,
            fireplace: false,
            airConditioning: true,
            security: true,
            storage: 1
        },
        yearBuilt: 2021,
        energyClass: "A",
        orientation: "East",
        images: ["duplex1.jpg"],
        featured: false
    },
    {
        id: 9,
        title: "Countryside Villa Snagov",
        location: "Snagov, Ilfov",
        type: "villa",
        price: 550000,
        bedrooms: 5,
        bathrooms: 4,
        area: 300,
        description: "Peaceful villa near Snagov Lake. Perfect for those seeking tranquility without sacrificing modern comfort.",
        features: {
            parking: 3,
            garden: true,
            pool: true,
            terrace: true,
            fireplace: true,
            airConditioning: false,
            security: true,
            storage: 2
        },
        yearBuilt: 2017,
        energyClass: "A",
        orientation: "South",
        images: ["villa3.jpg", "villa3_2.jpg"],
        featured: false
    },
    {
        id: 10,
        title: "Studio Apartment Amzei",
        location: "Amzei, Bucharest",
        type: "apartment",
        price: 95000,
        bedrooms: 1,
        bathrooms: 1,
        area: 35,
        description: "Compact and efficient studio in premium location. Perfect for young professionals or as an investment.",
        features: {
            parking: 0,
            garden: false,
            pool: false,
            terrace: false,
            fireplace: false,
            airConditioning: true,
            security: true,
            storage: 0
        },
        yearBuilt: 2019,
        energyClass: "A",
        orientation: "West",
        images: ["studio1.jpg"],
        featured: false
    },
    {
        id: 11,
        title: "Luxury Villa Iancu Nicolae",
        location: "Iancu Nicolae, Bucharest",
        type: "villa",
        price: 980000,
        bedrooms: 6,
        bathrooms: 5,
        area: 450,
        description: "Exclusive villa in gated community. Top-tier finishes and premium amenities throughout.",
        features: {
            parking: 4,
            garden: true,
            pool: true,
            terrace: true,
            fireplace: true,
            airConditioning: true,
            security: true,
            storage: 3
        },
        yearBuilt: 2020,
        energyClass: "A+",
        orientation: "South-East",
        images: ["villa4.jpg", "villa4_2.jpg", "villa4_3.jpg"],
        featured: true
    },
    {
        id: 12,
        title: "Renovated Apartment Universitate",
        location: "Universitate, Bucharest",
        type: "apartment",
        price: 180000,
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        description: "Completely renovated apartment near University Square. Great investment opportunity in central location.",
        features: {
            parking: 0,
            garden: false,
            pool: false,
            terrace: false,
            fireplace: false,
            airConditioning: true,
            security: false,
            storage: 0
        },
        yearBuilt: 1960,
        energyClass: "B",
        orientation: "East",
        images: ["apt3.jpg"],
        featured: false
    },
    {
        id: 13,
        title: "Criss",
        location: "Universitate, Bucharest",
        type: "apartment",
        price: 180000,
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        description: "Completely renovated apartment near University Square. Great investment opportunity in central location.",
        features: {
            parking: 0,
            garden: false,
            pool: false,
            terrace: false,
            fireplace: false,
            airConditioning: true,
            security: false,
            storage: 0
        },
        yearBuilt: 1960,
        energyClass: "B",
        orientation: "East",
        images: ["apt3.jpg"],
        featured: false
    }
];

const featuredProperties = properties.filter(property => property.featured);

const getPropertiesByType = (type) => {
    return properties.filter(property => property.type === type);
};

const getPropertiesByPriceRange = (min, max) => {
    return properties.filter(property => property.price >= min && property.price <= max);
};

const searchProperties = (query) => {
    const searchTerm = query.toLowerCase();
    return properties.filter(property => 
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.type.toLowerCase().includes(searchTerm)
    );
};

const getPropertyById = (id) => {
    return properties.find(property => property.id === id);
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        properties,
        featuredProperties,
        getPropertiesByType,
        getPropertiesByPriceRange,
        searchProperties,
        getPropertyById
    };
} 