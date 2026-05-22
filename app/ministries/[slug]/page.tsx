import { notFound } from "next/navigation";
import { MinistryPage } from "@/components/ministry-page";

const ministryData = {
  worship: {
    titleEn: "Worship Ministry",
    titleEs: "Ministerio de Adoracion",
    descriptionEn: "Our Worship Ministry leads the congregation in heartfelt praise and worship. Through music, prayer, and creative arts, we create an atmosphere where people can encounter God's presence. Join us as we lift our voices together in worship.",
    descriptionEs: "Nuestro Ministerio de Adoracion dirige a la congregacion en alabanza y adoracion sincera. A traves de la musica, la oracion y las artes creativas, creamos un ambiente donde las personas pueden encontrar la presencia de Dios.",
    image: "/images/worship.jpg",
    activities: [
      { en: "Sunday Worship Services", es: "Servicios de Adoracion Dominical" },
      { en: "Choir Practice", es: "Practica del Coro" },
      { en: "Music Training", es: "Capacitacion Musical" },
      { en: "Special Events", es: "Eventos Especiales" },
    ],
    schedule: { en: "Sundays at 2:00 PM", es: "Domingos a las 2:00 PM" },
    contact: "iglesia.hosanna@gmail.com",
  },
  children: {
    titleEn: "Children's Ministry",
    titleEs: "Ministerio de Ninos",
    descriptionEn: "Our Children's Ministry provides a safe, fun, and faith-filled environment for kids to learn about Jesus. Through engaging lessons, worship, and activities, we help children grow in their relationship with God.",
    descriptionEs: "Nuestro Ministerio de Ninos proporciona un ambiente seguro, divertido y lleno de fe para que los ninos aprendan sobre Jesus. A traves de lecciones interesantes, adoracion y actividades, ayudamos a los ninos a crecer en su relacion con Dios.",
    image: "/images/community.jpg",
    activities: [
      { en: "Sunday School", es: "Escuela Dominical" },
      { en: "Bible Stories", es: "Historias Biblicas" },
      { en: "Crafts & Games", es: "Manualidades y Juegos" },
      { en: "Vacation Bible School", es: "Escuela Biblica de Vacaciones" },
    ],
    schedule: { en: "Sundays at 2:00 PM", es: "Domingos a las 2:00 PM" },
    contact: "iglesia.hosanna@gmail.com",
  },
  men: {
    titleEn: "Men's Ministry",
    titleEs: "Ministerio de Hombres",
    descriptionEn: "Our Men's Ministry exists to help men grow as spiritual leaders in their homes, workplaces, and community. Through fellowship, Bible study, and accountability, we equip men to live with purpose and integrity.",
    descriptionEs: "Nuestro Ministerio de Hombres existe para ayudar a los hombres a crecer como lideres espirituales en sus hogares, lugares de trabajo y comunidad. A traves de la comunion, el estudio biblico y la responsabilidad, equipamos a los hombres para vivir con proposito e integridad.",
    image: "/images/prayer.jpg",
    activities: [
      { en: "Men's Bible Study", es: "Estudio Biblico para Hombres" },
      { en: "Fellowship Breakfasts", es: "Desayunos de Comunion" },
      { en: "Mentorship Program", es: "Programa de Mentoria" },
      { en: "Service Projects", es: "Proyectos de Servicio" },
    ],
    schedule: { en: "Saturdays at 8:00 AM", es: "Sabados a las 8:00 AM" },
    contact: "iglesia.hosanna@gmail.com",
  },
  women: {
    titleEn: "Women's Ministry",
    titleEs: "Ministerio de Mujeres",
    descriptionEn: "Our Women's Ministry provides opportunities for women to connect, grow, and serve together. Through Bible studies, retreats, and fellowship events, we encourage women to deepen their faith and support one another.",
    descriptionEs: "Nuestro Ministerio de Mujeres brinda oportunidades para que las mujeres se conecten, crezcan y sirvan juntas. A traves de estudios biblicos, retiros y eventos de comunion, alentamos a las mujeres a profundizar su fe y apoyarse mutuamente.",
    image: "/images/community.jpg",
    activities: [
      { en: "Women's Bible Study", es: "Estudio Biblico para Mujeres" },
      { en: "Prayer Groups", es: "Grupos de Oracion" },
      { en: "Women's Retreats", es: "Retiros de Mujeres" },
      { en: "Community Outreach", es: "Alcance Comunitario" },
    ],
    schedule: { en: "Thursdays at 10:00 AM", es: "Jueves a las 10:00 AM" },
    contact: "iglesia.hosanna@gmail.com",
  },
  outreach: {
    titleEn: "Outreach Ministry",
    titleEs: "Ministerio de Alcance",
    descriptionEn: "Our Outreach Ministry is dedicated to sharing God's love with our community and beyond. Through local service projects, missions, and community events, we seek to be the hands and feet of Jesus.",
    descriptionEs: "Nuestro Ministerio de Alcance esta dedicado a compartir el amor de Dios con nuestra comunidad y mas alla. A traves de proyectos de servicio local, misiones y eventos comunitarios, buscamos ser las manos y los pies de Jesus.",
    image: "/images/hero-2.jpg",
    activities: [
      { en: "Community Service", es: "Servicio Comunitario" },
      { en: "Food Drives", es: "Colectas de Alimentos" },
      { en: "Mission Trips", es: "Viajes Misioneros" },
      { en: "Homeless Ministry", es: "Ministerio a Personas sin Hogar" },
    ],
    schedule: { en: "Various times", es: "Varios horarios" },
    contact: "iglesia.hosanna@gmail.com",
  },
  prayer: {
    titleEn: "Prayer Ministry",
    titleEs: "Ministerio de Oracion",
    descriptionEn: "Our Prayer Ministry is the heartbeat of our church. We believe in the power of prayer and are committed to interceding for our church, community, and world. Join us as we seek God's face together.",
    descriptionEs: "Nuestro Ministerio de Oracion es el corazon de nuestra iglesia. Creemos en el poder de la oracion y estamos comprometidos a interceder por nuestra iglesia, comunidad y mundo. Unete a nosotros mientras buscamos el rostro de Dios juntos.",
    image: "/images/prayer.jpg",
    activities: [
      { en: "Thursday Prayer Service", es: "Servicio de Oracion Jueves" },
      { en: "Prayer Chain", es: "Cadena de Oracion" },
      { en: "Intercessory Prayer", es: "Oracion Intercesora" },
      { en: "Prayer Walks", es: "Caminatas de Oracion" },
    ],
    schedule: { en: "Thursdays at 7:00 PM", es: "Jueves a las 7:00 PM" },
    contact: "iglesia.hosanna@gmail.com",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const ministry = ministryData[slug as keyof typeof ministryData];

  if (!ministry) {
    notFound();
  }

  return <MinistryPage ministry={ministry} />;
}

export function generateStaticParams() {
  return Object.keys(ministryData).map((slug) => ({ slug }));
}
