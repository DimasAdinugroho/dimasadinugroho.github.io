// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'DimasAdinugroho', // (This is the only required config)
  },
  base: '/',
  projects: {
    github: {
      display: false, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [],
    },
  },
  seo: { title: 'Portfolio of Ariful Alam', description: '', imageURL: '' },
  social: {
    linkedin: 'dimasadinugrohos',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    medium: 'DimasAdinugroho',
    dev: '',
    stackoverflow: '',
    discord: '',
    telegram: '',
    website: 'https://dimasadinugroho.github.io',
    phone: '',
    email: 'dimasadinugroho92@gmail.com',
  },
  resume: {
    fileUrl:
      'https://github.com/DimasAdinugroho/dimasadinugroho.github.io/tree/main/public/static/cv.pdf',
  },
  skills: [
    'Python',
    'Kubernetes',
    'AWS',
    'GCP',
    'MySQL',
    'PostgreSQL',
    'Git',
    'Docker',
    'Terraform',
    'ArgoCD',
    'Vault'
  ],
  experiences: [
    {
      company: 'StraitsX',
      position: 'SRE',
      from: 'July 2025',
      to: 'Present',
      companyLink: 'https://www.straitsx.com',
    },
    {
      company: 'Tokopedia',
      position: 'Machine Learning Engineer | MLOps',
      from: 'Jan 2020',
      to: 'Jun 2025',
      companyLink: 'https://tokopedia.com',
    },

  ],
  certifications: [
    {
      name: 'CKAD',
      body: 'Kubernetes Certified Application Developer',
      year: 'April 2025',
      link: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/74fa05f7-3008-4461-9f5e-7951eb1f6336-dimas-adinugroho-9ec5be83-ca11-4e21-898c-1cab7cd8ccb0-certificate.pdf',
    },
    {
      name: 'ACE',
      body: 'GCP Associate Cloud Engineer',
      year: 'Mar 2024',
      link: 'https://google.accredible.com/8bfeff99-dd61-4ca3-b1f2-d1a60e09a5c5',
    },
  ],
  educations: [
    {
      institution: 'Institut Teknologi Bandung',
      degree: 'Bachelor Degree',
      from: '2010',
      to: '2014',
    },
  ],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'medium', // medium | dev
    username: 'd_adinugrohos', // to hide blog section, keep it empty
    limit: 2, // Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'nord',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'caramellatte',
      'abyss',
      'silk',
      'procyon',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
