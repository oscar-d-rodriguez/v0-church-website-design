export interface ChurchEvent {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  date: string;
  time: string;
  locationEn: string;
  locationEs: string;
  imageUrl: string;
  category: "worship" | "youth" | "community" | "special";
}

export const events: ChurchEvent[] = [
  {
    id: "sunday-worship-experience",
    titleEn: "Sunday Worship Experience",
    titleEs: "Experiencia de Adoracion Dominical",
    descriptionEn: "Join us for a powerful time of worship, fellowship, and the Word.",
    descriptionEs: "Unete a nosotros para un tiempo poderoso de adoracion, comunion y la Palabra.",
    date: "Every Sunday",
    time: "10:00 AM",
    locationEn: "Main Sanctuary",
    locationEs: "Santuario Principal",
    imageUrl: "/events/sunday-worship.jpg",
    category: "worship",
  },
  {
    id: "youth-night-revival",
    titleEn: "Youth Night Revival",
    titleEs: "Noche de Avivamiento Juvenil",
    descriptionEn: "An electrifying night of worship, games, and community for young people.",
    descriptionEs: "Una noche electrizante de adoracion, juegos y comunidad para jovenes.",
    date: "June 15, 2026",
    time: "7:00 PM",
    locationEn: "Youth Center",
    locationEs: "Centro Juvenil",
    imageUrl: "/events/youth-night.jpg",
    category: "youth",
  },
  {
    id: "summer-family-picnic",
    titleEn: "Summer Family Picnic",
    titleEs: "Picnic Familiar de Verano",
    descriptionEn: "Bring your family for food, fun, and fellowship in the sun!",
    descriptionEs: "Trae a tu familia para comida, diversion y comunion bajo el sol!",
    date: "July 4, 2026",
    time: "12:00 PM",
    locationEn: "Church Grounds",
    locationEs: "Terrenos de la Iglesia",
    imageUrl: "/events/family-picnic.jpg",
    category: "community",
  },
  {
    id: "womens-conference-2026",
    titleEn: "Women's Conference 2026",
    titleEs: "Conferencia de Mujeres 2026",
    descriptionEn: "A weekend of empowerment, worship, and sisterhood.",
    descriptionEs: "Un fin de semana de empoderamiento, adoracion y hermandad.",
    date: "August 21-23, 2026",
    time: "9:00 AM",
    locationEn: "Main Sanctuary",
    locationEs: "Santuario Principal",
    imageUrl: "/events/womens-conference.jpg",
    category: "special",
  },
  {
    id: "mens-breakfast",
    titleEn: "Men's Brotherhood Breakfast",
    titleEs: "Desayuno de Hermandad de Hombres",
    descriptionEn: "Start your Saturday with fellowship, food, and faith.",
    descriptionEs: "Comienza tu sabado con comunion, comida y fe.",
    date: "First Saturday of Month",
    time: "8:00 AM",
    locationEn: "Fellowship Hall",
    locationEs: "Salon de Comunion",
    imageUrl: "/events/mens-breakfast.jpg",
    category: "community",
  },
  {
    id: "christmas-cantata",
    titleEn: "Christmas Cantata",
    titleEs: "Cantata de Navidad",
    descriptionEn: "Celebrate the birth of Christ with our annual musical celebration.",
    descriptionEs: "Celebra el nacimiento de Cristo con nuestra celebracion musical anual.",
    date: "December 20, 2026",
    time: "6:00 PM",
    locationEn: "Main Sanctuary",
    locationEs: "Santuario Principal",
    imageUrl: "/events/christmas-cantata.jpg",
    category: "special",
  },
];
