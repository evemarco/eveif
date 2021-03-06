// en-us

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  test: 'Test en anglais',
  meta: {
    title: 'EveIF Tools for Eve Online',
    home: {
      title: 'Home',
      description: 'Various help and trade tools for the MMO Eve Online game',
      keywords: 'tools, help, trade, trading, mmo, game, eve online, eve, esi, sso, api, science fiction, strategy'
    },
    contact: {
      title: 'Contact',
      description: 'Contact page',
      keywords: 'eve online, eve, contact, character, pseudonym'
    },
    scam: {
      title: 'Scam Factory',
      description: 'Help page to made scam in the market',
      keywords: 'eve online, eve, market, scam, trade, margin trading, skills'
    }
  },
  menu: {
    title: 'Menu',
    changelog: {
      label: 'Changelog',
      desc: ''
    },
    contact: {
      label: 'Contact',
      desc: ''
    },
    guide: {
      label: 'WH Guide',
      desc: 'wormhole help'
    },
    fittings: {
      label: 'Fittings',
      desc: 'from o.smium.org'
    },
    trade: {
      label: 'Market',
      desc: 'consult price'
    },
    transport: {
      label: 'Transport trade',
      desc: 'hub to hub'
    },
    station: {
      label: 'Station trade',
      desc: 'in one hub only'
    },
    scam: {
      label: 'Scam factory',
      desc: 'with margin trading'
    },
    about: {
      label: 'About',
      desc: ''
    }
  },
  session: {
    title: 'Session',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin'
  },
  error404: {
    text: 'Sorry, nothing here...',
    button: 'Go back'
  },
  login: {
    title: 'SSO Connexion Page',
    subtitle: 'Give the Authorizations',
    option1: 'Read citadels infos',
    option2: 'Access citadels market',
    option3: 'Open windows in game',
    option4: 'Set waypoints in game',
    message: 'You are connected'
  },
  logout: {
    message: 'You are deconnected'
  },
  admin: {
    message: 'No administration page actually'
  },
  error: {
    notAdmin: 'Your character has not "admin" role',
    notUser: 'Your character has not "user" role',
    notScammer: 'Your character has not "scammer" role',
    notTrader: 'Your character has not "trader" role',
    notConnected: 'Your character is not connected, please login',
    tokenExpired: 'Your token expired, please reconnect',
    noScope: 'You don\'t have the right scope for this operation'
  },
  pageIndex: {
    slide: [
      { title: 'This website offers: ',
        text: `<p class="bg-1">In the Guide section, help with living in wormhole space <br/>
        (wormhole entry code table and gas table).</p>
        <p class="bg-2">In the Trade section, a price consultation of the items in game <br/>
        and charts on the main marketplaces (Jita, Amarr, Dodixie, Rens, Hek).</p>
        <p class="bg-1">In a private area, for those who have a "trader" status, <br/>
        access to tools listing the best deals of the moment.</p>
        <p class="bg-2">You can connect with your player account through the SSO system, <br/>
        giving you ease of use in interaction with the game.</p>`
      },
      { title: 'Play for free!',
        text: `<p class="bg-1">Try the experience EVE Online, for free, without obligation in time, <br/>
        and switch to a full access account, with the game or subscription credits.<br/>
        Are you a new player?<br/>
        Go through this <strong><a target="_blank" href="http://secure.eveonline.com/signup/?invc=bf6cfbe6-d148-4ac6-ae98-cfd1494b1215&amp;action=buddy" title="Referral link">link</a></strong> to earn 250,000 skill points and progress faster.</p>`
      },
      { title: 'Gameplay',
        text: `<p class="bg-1">Find out what you can do as a pilot in New Eden, <br/>
        create challenges, the universe is vast, <br/>
        associate with other players to be stronger!</p>`
      },
      { title: 'This is EVE!',
        text: `<p class="bg-1">Eve Online is a sandbox game where the smallest of your actions has an influence on other players. <br/>
        Everyone can develop the activity of their choice : mine asteroids, <br/>
        explore, fight, produce, trade, haul...</p>`
      },
      { title: 'The citadels',
        text: `<p class="bg-1">Citadels are recent structures (2016) with the same features as the stations,<br/>
        but owned by the players, with services and customizable taxes.</p>`
      },
      { title: 'Presentation 2017',
        text: `<p class="bg-1">Official presentation of the game (end of 2017) <br/>
        that lists the richness and possibilities of the game, <br/>
        with some principles to know to start.</p>`
      },
      { title: 'The refineries',
        text: `<p class="bg-1">During the Lifeblood update (October 2017), refineries made their appearance.<br/>
        They allow the mining of moons (by extraction and pulverization of pieces), <br/>
        the reaction on raw materials (gas), and a better reprocessing of raw ores.</p>`
      }
    ]
  },
  pageContact: {
    text: `I am contactable in game <a href="https://www.eveonline.com/en" target="_blank" rel="noopener">Eve Online</a>, under the character`
  },
  pageScam: {
    title: 'Scam factory',
    table: {
      id: 'ID',
      name: 'Name',
      nb: 'NB',
      minPrice: 'Min price',
      maxPrice: 'Max Price',
      packaged: 'Vol. / unit',
      totalPrice: 'Total price'
    },
    universe: {
      title: 'Universe market',
      table: {
        nb: 'NB',
        price: 'Price',
        station: 'Station',
        modified: 'Created / modified',
        average: 'Average'
      }
    }
  },
  common: {
    openItem: 'Show item in market game',
    itemOpened: 'showed in market game',
    refresh: 'Refresh data',
    copy: 'Copy in the clipboard',
    copied: 'copied in the clipboard',
    destination: 'Destination to'
  }
}
