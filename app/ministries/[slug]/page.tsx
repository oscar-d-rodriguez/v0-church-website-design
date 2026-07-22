import { notFound } from "next/navigation";
import { MinistryPage } from "@/components/ministry-page";

const ministryData = {
  worship: {
    titleEn: "Worship Ministry",
    titleEs: "Ministerio de Alabanzas",
    descriptionEn: "Our Worship Ministry leads the congregation in heartfelt praise and worship. Through music, prayer, and creative arts, we create an atmosphere where people can encounter God's presence. We offer training in instruments, lead worship services, and support other churches. Join us as we lift our voices together in worship.",
    descriptionEs: "Nuestro Ministerio de Alabanzas dirige a la congregación en alabanza y adoración sincera. A través de la música, la oración y las artes creativas, creamos un ambiente donde las personas pueden encontrar la presencia de Dios. Ofrecemos capacitación en instrumentos, lideramos servicios de adoración y apoyamos a otras iglesias.",
    image: "/images/hero-2.jpg",
    directorImage: "/images/ministries/image2.jpeg",
    directorEn: "María José Avilés",
    directorEs: "María José Avilés",
      directorIsFemale: true,
    activities: [
      { en: "Rehearsals and Music Training", es: "Ensayos y Capacitación Musical" },
      { en: "Sunday Worship Services at 2:00 PM", es: "Servicios de Adoración Dominical a las 2:00 PM" },
      { en: "Instrument Classes & Personal Training", es: "Clases de Instrumentos y Capacitación Personal" },
      { en: "Ministry at Other Churches", es: "Ministerio en Otras Iglesias" },
    ],
    schedule: { en: "Sundays at 2:00 PM & Rehearsals During Week", es: "Domingos a las 2:00 PM & Ensayos Durante la Semana" },
    contact: "mariajoseaviles.mja@gmail.com",
  },
  children: {
    titleEn: "Hosanna Kids: Children's Ministry",
    titleEs: "Ministerio de Niños: Hosanna Kids",
    descriptionEn: "Our Children's Ministry provides a safe, fun, and faith-filled environment for kids to learn about Jesus. Through engaging Bible classes and activities, we help children grow in their relationship with God.",
    descriptionEs: "Nuestro Ministerio de Niños proporciona un ambiente seguro, divertido y lleno de fe para que los niños aprendan sobre Jesús. A través de clases bíblicas interesantes y actividades, ayudamos a los niños a crecer en su relación con Dios.",
    image: "/images/ministries/image5.jpeg",
    directorImage: "/images/ministries/image4.jpeg",
    directorEn: "Stephanie Tapia",
    directorEs: "Stephanie Tapia",
    directorIsFemale: true,
    activities: [
      { en: "Bible Classes Every Sunday", es: "Clases Bíblicas Todos los Domingos" },
      { en: "Bible Stories & Teachings", es: "Historias y Enseñanzas Bíblicas" },
      { en: "Games & Fun Activities", es: "Juegos y Actividades Divertidas" },
      { en: "Child Development in Faith", es: "Desarrollo Infantil en la Fe" },
    ],
    schedule: { en: "Every Sunday", es: "Todos los Domingos" },
    contact: "aletapia1507@gmail.com",
  },
  men: {
    titleEn: "Men's Ministry",
    titleEs: "Ministerio de Varones",
    descriptionEn: "Our Men's Ministry exists to help men grow as spiritual leaders in their homes, workplaces, and community. Through fellowship, camping trips, and church activities, we equip men to live with purpose and integrity.",
    descriptionEs: "Nuestro Ministerio de Varones existe para ayudar a los hombres a crecer como líderes espirituales en sus hogares, lugares de trabajo y comunidad. A través de la comunión, viajes de campamento y actividades de iglesia, equipamos a los hombres para vivir con propósito e integridad.",
    image: "/images/ministries/image7.jpeg",
    directorImage: "/images/ministries/image6.jpeg",
    directorEn: "Pedro Lazo",
    directorEs: "Pedro Lazo",
    directorIsFemale: false,
    activities: [
      { en: "Men's Camping Trips", es: "Viajes de Campamento para Hombres" },
      { en: "Support for Sons & Young Men", es: "Apoyo para Hijos y Jóvenes Hombres" },
      { en: "Church Activity Support", es: "Apoyo en Actividades de la Iglesia" },
      { en: "Spiritual Leadership Development", es: "Desarrollo del Liderazgo Espiritual" },
    ],
    schedule: { en: "Various times and special events", es: "Varios horarios y eventos especiales" },
    contact: "pedrolazo76401@gmail.com",
  },
  women: {
    titleEn: "Women's Ministry",
    titleEs: "Ministerio de Mujeres",
    descriptionEn: "Our Women's Ministry provides opportunities for women to connect, grow, and serve together. Through fellowship events, kitchen service, and community activities, we encourage women to deepen their faith and support one another.",
    descriptionEs: "Nuestro Ministerio de Mujeres brinda oportunidades para que las mujeres se conecten, crezcan y sirvan juntas. A través de eventos de comunión, servicio en la cocina y actividades comunitarias, alentamos a las mujeres a profundizar su fe y apoyarse mutuamente.",
    image: "/images/ministries/image9.jpeg",
    directorImage: "/images/ministries/image8.jpeg",
    directorEn: "María José Avilés",
    directorEs: "María José Avilés",
    directorIsFemale: true,
    activities: [
      { en: "Fellowship Events & Gatherings", es: "Eventos de Comunión y Encuentros" },
      { en: "Kitchen Service & Food Ministry", es: "Servicio en la Cocina y Ministerio de Alimentos" },
      { en: "Refreshment Preparation", es: "Preparación de Refrescos" },
      { en: "Community & Church Support", es: "Apoyo Comunitario e Iglesia" },
    ],
    schedule: { en: "Various times and seasonal events", es: "Varios horarios y eventos estacionales" },
    contact: "mariajoseaviles.mja@gmail.com",
  },
  outreach: {
    titleEn: "Consolidation & Outreach Ministry",
    titleEs: "Ministerio de Consolidación",
    descriptionEn: "Our Consolidation Ministry focuses on discipleship and evangelism, helping new believers grow in their faith. We conduct temple visits, provide personal mentorship, and conduct outreach initiatives throughout the year.",
    descriptionEs: "Nuestro Ministerio de Consolidación se enfoca en el discipulado y el evangelismo, ayudando a los nuevos creyentes a crecer en su fe. Realizamos visitas al templo, ofrecemos mentoría personal e iniciativas de alcance durante todo el año.",
    image: "/images/ministries/image11.jpeg",
    directorImage: "/images/ministries/image10.jpeg",
    directorEn: "Sheila Garcia",
    directorEs: "Sheila Garcia",
    directorIsFemale: true,
    activities: [
      { en: "Temple Visits & Follow-up", es: "Visitas al Templo y Seguimiento" },
      { en: "Evangelism & Outreach", es: "Evangelismo y Alcance" },
      { en: "Discipleship & Mentoring", es: "Discipulado y Mentoría" },
      { en: "New Believer Support", es: "Apoyo a Nuevos Creyentes" },
    ],
    schedule: { en: "Multiple visits per year", es: "Múltiples visitas por año" },
    contact: "gahes78@hotmail.com",
  },
  prayer: {
    titleEn: "Prayer Ministry",
    titleEs: "Ministerio de Interseción",
    descriptionEn: "Our Prayer Ministry is the heartbeat of our church. We believe in the power of prayer and are committed to interceding for our church, community, and world. Join us for morning devotionals, intercessory prayer groups, and Wednesday night prayer services.",
    descriptionEs: "Nuestro Ministerio de Oración es el corazón de nuestra iglesia. Creemos en el poder de la oración y estamos comprometidos a interceder por nuestra iglesia, comunidad y mundo. Únete a nosotros para devocionales matutinos, grupos de oración intercesora y servicios de oración.",
    image: "/images/ministries/image13.jpeg",
    directorImage: "/images/ministries/image12.jpeg",
    directorEn: "Juan Carlos Velazquez",
    directorEs: "Juan Carlos Velazquez",
    directorIsFemale: false,
    activities: [
      { en: "Morning Devotionals 'Amaneciendo' (Tues & Thurs 5:00-5:30 AM)", es: "Devocionales Matutinos 'Amaneciendo' (Martes y Jueves 5:00-5:30 AM)" },
      { en: "Wednesday Intercessory Prayer Group", es: "Grupo de Oración Intercesora Miércoles" },
      { en: "Wednesday Night Prayer Service", es: "Servicio de Oración Miércoles" },
      { en: "24/7 Prayer Support via Zoom", es: "Apoyo de Oración 24/7 vía Zoom" },
    ],
    schedule: { en: "Tues/Thurs 5:00-5:30 AM & Wednesdays (Times via Zoom)", es: "Martes/Jueves 5:00-5:30 AM & Miércoles (Horarios vía Zoom)" },
    contact: "juanc76543@gmail.com",
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
