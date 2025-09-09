const amenities = {
  pool: {
    en: "Swimming Pool",
    pt: "Piscina",
  },
  golf: {
    en: "Golf",
    pt: "Golfe",
  },
  jacuzzi: {
    en: "Jacuzzi",
    pt: "Jacuzzi",
  },
  gym: {
    en: "Gym",
    pt: "Ginásio",
  },
  parking: {
    en: "Parking",
    pt: "Estacionamento",
  },
  wifi: {
    en: "Wifi",
    pt: "Wi-Fi",
  },
  airConditioning: {
    en: "Air Conditioning",
    pt: "Ar Condicionado",
  },
  tv: {
    en: "TV",
    pt: "TV",
  },
  washingMachine: {
    en: "Washing Machine",
    pt: "Máquina de Lavar Roupa",
  },
  garden: {
    en: "Garden",
    pt: "Jardim",
  },
  beachfront: {
    en: "Beachfront",
    pt: "Frente de Praia",
  },
  seaView: {
    en: "Sea View",
    pt: "Vista Mar",
  },
  privatePool: {
    en: "Private Pool",
    pt: "Piscina Privada",
  },
  swimmingPool: {
    en: "Swimming Pool",
    pt: "Piscina",
  },
  garage: {
    en: "Garage",
    pt: "Garagem",
  },
  parkingSpace: {
    en: "Parking Space",
    pt: "Lugar de Estacionamento",
  },
  dishwasher: {
    en: "Dishwasher",
    pt: "Máquina de Lavar Loiça",
  },
  bbq: {
    en: "BBQ",
    pt: "Churrasqueira",
  },
  outdoorDining: {
    en: "Outdoor Dining",
    pt: "Zona de Refeições Exterior",
  },
  outdoorFurniture: {
    en: "Outdoor Furniture",
    pt: "Mobiliário de Exterior",
  },
  balcony: {
    en: "Balcony",
    pt: "Varanda",
  },
  terrace: {
    en: "Terrace",
    pt: "Terraço",
  },
  heater: {
    en: "Heater",
    pt: "Aquecedor",
  },
  fireplace: {
    en: "Fireplace",
    pt: "Lareira",
  },
  elevator: {
    en: "Elevator",
    pt: "Elevador",
  },
  securitySystem: {
    en: "Security System",
    pt: "Sistema de Segurança",
  },
  smartTv: {
    en: "Smart TV",
    pt: "Smart TV",
  },
  coffeeMaker: {
    en: "Coffee Maker",
    pt: "Máquina de Café",
  },
  microwave: {
    en: "Microwave",
    pt: "Micro-ondas",
  },
  oven: {
    en: "Oven",
    pt: "Forno",
  },
  fridge: {
    en: "Fridge",
    pt: "Frigorífico",
  },
  freezer: {
    en: "Freezer",
    pt: "Congelador",
  },
  hairDryer: {
    en: "Hair Dryer",
    pt: "Secador de Cabelo",
  },
  iron: {
    en: "Iron",
    pt: "Ferro de Engomar",
  },
  clothesDryer: {
    en: "Clothes Dryer",
    pt: "Máquina de Secar Roupa",
  },
  workspace: {
    en: "Workspace",
    pt: "Espaço de Trabalho",
  },
  babyEquipment: {
    en: "Baby Equipment",
    pt: "Equipamento para Bebé",
  },
  bicycles: {
    en: "Bicycles",
    pt: "Bicicletas",
  },
  beachEquipment: {
    en: "Beach Equipment",
    pt: "Equipamento de Praia",
  },
  soundSystem: {
    en: "Sound System",
    pt: "Sistema de Som",
  },
};

const categories = {
  General: {
    en: "General",
    pt: "Geral",
  },
  Kitchen: {
    en: "Kitchen",
    pt: "Cozinha",
  },
  "Living Room": {
    en: "Living Room",
    pt: "Sala de Estar",
  },
  Bedrooms: {
    en: "Bedrooms",
    pt: "Quartos",
  },
  Bathrooms: {
    en: "Bathrooms",
    pt: "Casas de Banho",
  },
  Outside: {
    en: "Outside",
    pt: "Exterior",
  },
  View: {
    en: "View",
    pt: "Vista",
  },
  Other: {
    en: "Other",
    pt: "Outros",
  },
};

const mainStrings = {
  // Property
  people: {
    en: "people",
    pt: "pessoas",
  },
  bedrooms: {
    en: "bedrooms",
    pt: "quartos",
  },
  double_beds: {
    en: "double beds",
    pt: "camas de casal",
  },
  single_beds: {
    en: "single beds",
    pt: "camas de solteiro",
  },
  sofa_beds: {
    en: "sofa beds",
    pt: "sofás-camas",
  },
  wc: {
    en: "wc",
    pt: "wc",
  },
  license: {
    en: "License number: ",
    pt: "Licença número: ",
  },
  photos: {
    en: "Photos",
    pt: "Fotos",
  },
  facilities: {
    en: "Facilities",
    pt: "O espaço",
  },
  // Property Facilities
  "Swimming pool": {
    en: "Swimming pool",
    pt: "Piscina",
  },
  "Air conditioning": {
    en: "Air conditioning",
    pt: "Ar condicionado",
  },
  Garden: {
    en: "Garden",
    pt: "Jardim",
  },
  "Streaming services": {
    en: "Streaming services",
    pt: "Serviços de streaming",
  },
  "Coffee Machine": {
    en: "Coffee Machine",
    pt: "Máquina de café",
  },
  "Available Parking": {
    en: "Available Parking",
    pt: "Estacionamento disponível",
  },
  Beachfront: {
    en: "Beachfront",
    pt: "Frente para a praia",
  },
  "Free Wifi": {
    en: "Free Wifi",
    pt: "Wifi grátis",
  },
  Jacuzzi: {
    en: "Jacuzzi",
    pt: "Jacuzzi",
  },
  Golf: {
    en: "Golf",
    pt: "Golfe",
  },
  Garage: {
    en: "Garage",
    pt: "Garagem",
  },
  ...amenities,
  ...categories,
  location: {
    en: "Location",
    pt: "Localização",
  },
  "Important Details": {
    en: "Important Details",
    pt: "Detalhes Importantes",
  },
  Free: {
    en: "Free",
    pt: "Grátis",
  },
} as const;

type MainStringsType = typeof mainStrings;

export const mainStringsResolver = (
  key: keyof MainStringsType | string,
  lang: string
) => {
  // @ts-expect-error
  return mainStrings?.[key]?.[lang] || `{${key}}`;
};
