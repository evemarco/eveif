// fr

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  test: 'Test en français',
  meta: {
    title: 'Outils EveIF pour Eve Online',
    home: {
      title: 'Accueil',
      description: 'Différents outils d\'aide et de trade pour le jeu MMO Eve Online',
      keywords: 'outils, aide, trade, commerce, mmo, jeu, eve online, eve, esi, sso, api, jeu massivement multijoueur, science fiction, stratégie'
    },
    contact: {
      title: 'Contact',
      description: 'Page de contact',
      keywords: 'eve online, eve, contact, personnage, pseudonyme'
    },
    scam: {
      title: 'Fabrique de scam',
      description: 'Page d\'aide pour fabriquer du scam dans le market du jeu',
      keywords: 'eve online, eve, market, scam, arnaque, trade, margin trading, skills, compétences'
    }
  },
  menu: {
    title: 'Menu',
    changelog: {
      label: 'Journal des modifications',
      desc: 'suivi des versions'
    },
    contact: {
      label: 'Contact',
      desc: ''
    },
    guide: {
      label: 'Guide WH',
      desc: 'aide pour les wormhole'
    },
    fittings: {
      label: 'Fittings',
      desc: 'du site o.smium.org'
    },
    trade: {
      label: 'Market',
      desc: 'consulter les prix'
    },
    transport: {
      label: 'Trade en transport',
      desc: 'de hub à hub'
    },
    station: {
      label: 'Trade en station',
      desc: 'dans un seul hub'
    },
    scam: {
      label: 'Fabrique de scam',
      desc: 'avec le margin trading'
    },
    about: {
      label: 'Au sujet du site',
      desc: ''
    }
  },
  session: {
    title: 'Session',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    admin: 'Administration'
  },
  error404: {
    text: 'Désolé, il n\'y a rien ici...',
    button: 'Retour'
  },
  login: {
    title: 'Page de Connection SSO',
    subtitle: 'Donner les autorisations',
    option1: 'Lire les infos des citadelles',
    option2: 'Accéder au market des citadelles',
    option3: 'Ouvrir des fenêtres dans le jeu',
    option4: 'Définir des waypoints dans le jeu',
    message: 'Vous êtes connecté'
  },
  logout: {
    message: 'Vous êtes déconnecté'
  },
  admin: {
    message: 'Pas de page d\'administration pour l\'instant'
  },
  error: {
    notAdmin: 'Votre perso n\'a pas de rôle "admin"',
    notUser: 'Votre perso n\'a pas de rôle "user"',
    notScammer: 'Votre perso n\'a pas de rôle "scammer"',
    notTrader: 'Votre perso n\'a pas de rôle "trader"',
    notConnected: 'Votre perso n\'est pas connecté, veuillez vous connecter',
    tokenExpired: 'Votre token a expiré, veuillez vous reconnecter',
    noScope: 'Vous n\'avez pas le bon scope pour cette opération'
  },
  pageIndex: {
    slide: [
      { title: 'Ce site web propose : ',
        text: `<p class="bg-1">Dans la partie Guide, des aides à la vie en espace wormhole <br/>(tableau de code des entrées wormhole et tableau des gas).</p>
        <p class="bg-2">Dans la partie Trade, une consultation des prix des objets en jeu <br/>et des graphiques sur les principales places de marché (Jita, Amarr, Dodixie, Rens, Hek).</p>
        <p class="bg-1">Dans une partie privée, pour ceux qui ont un status "trader", <br/>un accès à des outils listant les meilleures affaires du moment.</p>
        <p class="bg-2">Vous pouvez vous connecter avec votre compte joueur par le système SSO, <br/>vous donnant des facilités d'usage en interaction avec le jeu.</p>`
      },
      { title: 'Jouez gratuitement !',
        text: `<p class="bg-1">Tentez l'expérience EVE Online, gratuitement, sans engagement dans le temps, <br/>
        et basculez en compte en accès complet, avec les crédits du jeu ou par abonnement.<br/>
        Etes-vous un nouveau joueur ?<br/>
        Passez par ce <strong><a target="_blank" href="https://www.eveonline.com/fr/signup?invc=bf6cfbe6-d148-4ac6-ae98-cfd1494b1215" title="Lien de parrainage">lien</a></strong> pour gagner 250 000 points de compétences et progresser plus vite.</p>`
      },
      { title: 'Gameplay',
        text: `<p class="bg-1">Découvrez ce que vous pouvez faire en tant que pilote à New Eden, <br/>
        créez vous des challenges, l'univers est vaste, <br/>
        associez vous à d'autres joueurs pour être plus fort !</p>`
      },
      { title: 'This is EVE !',
        text: `<p class="bg-1">Eve Online est un jeu bac à sable où la moindre de vos actions a une influence sur les autres joueurs. <br/>
        Chacun peut y développer l'activité de son choix : miner des astéroïdes, <br/>
        explorer, se battre, produire, marchander, transporter...</p>`
      },
      { title: 'Les citadelles',
        text: `<p class="bg-1">Les citadelles sont des structures récentes (2016) avec les mêmes fonctionnalités que les stations,<br/>
        mais possédées par les joueurs, avec des services et des taxes personnalisables.</p>`
      },
      { title: 'Présentation 2017',
        text: `<p class="bg-1">Présentation officielle du jeu (fin 2017)<br/>
        qui énumère la richesse et les possibilités du jeu,<br/>
        avec quelques principes à savoir pour commencer.</p>`
      },
      { title: 'Les raffineries',
        text: `<p class="bg-1">Lors de la mise à jour Lifeblood (octobre 2017), les raffineries ont fait leur apparition.<br/>
        Ils permettent le minage des lunes (par extraction et pulvérisation de morceaux),<br/>
        la réaction sur des matières premières (gas), et un meilleur retraitement des minerais brutes.</p>`
      }
    ]
  },
  pageContact: {
    text: `Je suis contactable dans le jeu <a href="https://www.eveonline.com/fr" target="_blank" rel="noopener">Eve Online</a>, sous le pseudonyme`
  },
  pageScam: {
    title: 'Fabrique de scam',
    table: {
      id: 'ID',
      name: 'Nom',
      nb: 'NB',
      minPrice: 'Prix min',
      maxPrice: 'Prix max',
      packaged: 'Vol. / unité',
      totalPrice: 'Prix total'
    },
    universe: {
      title: 'Market de l\'univers',
      table: {
        nb: 'NB',
        price: 'Prix',
        station: 'Station',
        modified: 'Créé / modifié',
        average: 'Moyenne'
      }
    }
  },
  common: {
    openItem: 'Montrer l\'item dans le market du jeu',
    itemOpened: 'montré dans le market du jeu',
    refresh: 'Rafraichir les données',
    copy: 'Copier dans le clipboard',
    copied: 'copié dans le clipboard',
    destination: 'Destination vers'
  }
}
