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

const bookPage = {
  booking_request: {
    en: "Booking request",
    pt: "Pedido de reserva",
  },
  summary: {
    en: "Summary",
    pt: "Resumo",
  },
  total_of_nights: {
    en: "Total of nights",
    pt: "Total de noites",
  },
  nights: {
    en: "nights",
    pt: "noites",
  },
  total_of_guests: {
    en: "Total of guests",
    pt: "Total de hóspedes",
  },
  adults: {
    en: "adults",
    pt: "adultos",
  },
  children: {
    en: "children",
    pt: "crianças",
  },
  babies: {
    en: "babies",
    pt: "bebês",
  },
  detaild_price: {
    en: "Detaild Price",
    pt: "Preço detalhado",
  },
  bed_sheets_towels: {
    en: "Bed sheets and towels",
    pt: "Lençóis e toalhas",
  },
  included: {
    en: "Included",
    pt: "Incluído",
  },
  deposit: {
    en: "Security deposit",
    pt: "Caução",
  },
  payment_terms: {
    en: "Payment terms",
    pt: "Condições de pagamento",
  },
  first_payment: {
    en: "First payment",
    pt: "Primeiro pagamento",
  },
  first_payment_text: {
    en: "To confirm your reservation you will have to make a payment corresponding to 30% of the reservation value.",
    pt: "Para confirmar a sua reserva terá que realizar um pagamento coorespondente a 30% do valor da reserva.",
  },
  second_payment: {
    en: "Second payment",
    pt: "Segundo pagamento",
  },
  second_payment_text: {
    en: "You will have to pay the remaining amount until the day of check-in.",
    pt: "Terá que pagar o restante do valor até ao dia do check-in.",
  },
  of_deposit: {
    en: "of security deposit",
    pt: "de caução",
  },
  personal_details: {
    en: "Personal details",
    pt: "Dados pessoais",
  },
  agree_terms_message: {
    pt: "Você precisa concordar com os termos e condições e a política de privacidade.",
    en: "You need to agree to the terms and conditions and privacy policy.",
  },
  first_name: {
    pt: "Primeiro nome",
    en: "First name",
  },
  last_name: {
    pt: "Último nome",
    en: "First name",
  },
  phone_number: {
    pt: "Número de telefone",
    en: "Phone number",
  },
  country: {
    pt: "País",
    en: "Country",
  },
  tax_number: {
    pt: "Número fiscal",
    en: "TAX Number",
  },
  book_message: {
    en: "Live us a message (Optional)",
    pt: "Deixe-nos uma mensagem (Opcional)",
  },
  mandatory_fields: {
    en: "* Required fields.",
    pt: "* Campos obrigatórios.",
  },
  request_booking: {
    en: "Request booking",
    pt: "Solicitar reserva",
  },
  pending_estimate: {
    en: "Pending estimate",
    pt: "Estimativa pendente",
  },
};

const mainStrings = {
  // Property
  Overview: {
    en: "Overview",
    pt: "Visão Geral",
  },
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
  Photos: {
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
  "Cancelation policy": {
    en: "Cancelation policy",
    pt: "Política de cancelamento",
  },
  Dias: {
    en: "Days",
    pt: "Dias",
  },
  "General rules": {
    en: "General rules",
    pt: "Regras gerais",
  },
  "Children are welcome": {
    en: "Children are welcome",
    pt: "Crianças são bem-vindas",
  },
  "Children are not welcome": {
    en: "Children are not welcome",
    pt: "Crianças não são bem-vindas",
  },
  "No parties or events": {
    en: "No parties or events",
    pt: "Sem festas ou eventos",
  },
  "Parties or events allowed": {
    en: "Parties or events allowed",
    pt: "Festas ou eventos permitidos",
  },
  "Smoking allowed": {
    en: "Smoking is allowed",
    pt: "Fumar é permitido",
  },
  "No smoking": {
    en: "No smoking",
    pt: "Proibido fumar",
  },
  "Pets allowed": {
    en: "Pets allowed",
    pt: "Animais de estimação permitidos",
  },
  "No pets": {
    en: "Pets are not allowed",
    pt: "Proibido animais de estimação",
  },
  Deposit: {
    en: "Deposit",
    pt: "Caução",
  },
  "Entre em contacto": {
    en: "Get in touch",
    pt: "Entre em contacto",
  },
  "contact message": {
    en: "If you have any questions about the property, feel free to reach out to us.",
    pt: "Se tiver alguma dúvida sobre a propriedade, não hesite em contactar-nos.",
  },
  back: {
    en: "Back",
    pt: "Voltar",
  },
  ...bookPage,
} as const;

type MainStringsType = typeof mainStrings;

export const mainStringsResolver = (
  key: keyof MainStringsType | string,
  lang: string
) => {
  // @ts-expect-error - Ignore dynamic key access issue
  return mainStrings?.[key]?.[lang] || `{${key}}`;
};
