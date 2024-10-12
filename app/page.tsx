'use client'
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Header30 } from '@/components/Header30';
import { Product12 } from '@/components/Product12';
import Layout239Client from '@/components/Layout239/Layout239Client';
import CTA25Client from '@/components/CTA25/CTA25Client';
import Footer3Client from '@/components/Footer3/Footer3Client'; 

const Navbar1Client = dynamic(() => import("../components/Navbar1/Navbar1Client"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const productData = {
    subtitle: "Nos Meilleures Ventes",
    title: "Découvrez Nos Produits Naturels pour la Croissance",
    description: "Chez Cullinan Oil, nous proposons une variété de produits naturels à base de marijuana pour la croissance des cheveux et de la barbe.",
    buttonText: "Ajouter au Panier",
  };

  const featureData = [
    { id: 1, title: "100% Naturel", description: "Tous nos produits sont à base d'ingrédients naturels.", imageUrl: "/layout1.jpg" },
    { id: 2, title: "Certifié Bio", description: "Certifiés biologiques, nos produits respectent les normes.", imageUrl: "/layout2.jpg" },
    { id: 3, title: "Effets Rapides", description: "Des résultats visibles en quelques semaines.", imageUrl: "/layout3.jpg" },
  ];

  const footerLinkGroups = [
    { title: "Notre Entreprise", links: [ { text: "À Propos de Nous", href: "/about" }, { text: "Contact", href: "/contact" } ] },
    { title: "Ressources", links: [ { text: "Blog", href: "/blog" }, { text: "Centre d'Aide", href: "/help" } ] }
  ];

  const socialLinks = [
    { href: "https://twitter.com", icon: <i className="fab fa-twitter" /> },
    { href: "https://facebook.com", icon: <i className="fab fa-facebook" /> },
  ];

  return (
    <>
      <Navbar1Client
        logo={{ src: '/logo.png', url: '/', alt: 'Logo Cullinan Oil' }}
        navLinks={[
          { url: '/about', title: 'À Propos' },
          { url: '/contact', title: 'Contact' },
          { url: '/acceder', title: 'Se Connecter', isButton: true }
        ]}
      />
      <Header30
        heading="Bienvenue chez Cullinan Oil"
        description="Découvrez des produits naturels pour la croissance des cheveux et de la barbe."
        buttons={[
          { title: "Commencer", variant: "default" },
          { title: "En Savoir Plus", variant: "outline" }
        ]}
        image={{
          src: "/header.jpg",
          alt: "Image de fond des produits de croissance capillaire"
        }}
      />
      <Layout239Client
        tagline="Nos Avantages"
        heading="Découvrez Nos Avantages"
        description="Voici certains des avantages incroyables que nous offrons."
        features={featureData}
        buttons={[
          { title: "En Savoir Plus", variant: "default", url: '/ciao' },
          { title: "S'inscrire", variant: "outline", url: '/ciao' },
        ]}
      />
      <Product12
        subtitle={productData.subtitle}
        title={productData.title}
        description={productData.description}
        buttonText={productData.buttonText}
      />
      <CTA25Client
        heading="Rejoignez Nous"
        description="Commandez maintenant et profitez des bienfaits de nos produits."
        buttons={[
          { title: "Commencer", variant: "default" },
        ]}
      />
      <Footer3Client
        logo={<Image src="/logo.png" alt="Logo Cullinan Oil" width={100} height={50} />}
        linkGroups={footerLinkGroups}
        socialLinks={socialLinks}
        copyright="© 2024 Cullinan Oil. Tous droits réservés."
      />
    </>
  );
}
