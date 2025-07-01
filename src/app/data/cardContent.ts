export interface CardLink {
  label: string;
  url: string;
}

export interface CardContent {
  title: string;
  description: string;
  buttonText?: string;
  links?: CardLink[];
}

export interface CardContentMap {
  temple: CardContent;
  leftLight: CardContent;
  topRightLights: CardContent;
  tree: CardContent;
  letters: CardContent;
  flower: CardContent;
}

export const cardContent: CardContentMap = {
  temple: {
    title: "The Phishing Dojo",
    description: "Face the most notorious scam and phishing threats in the web3 ecosystem with the Phishing Dojo's immersive challenges. Can you spot them all?",
    buttonText: "Enter the phishing dojo",
    links: [
      {
        label: "Enter the phishing dojo",
        url: "https://phishing.therektgames.com/"
      }
    ]
  },
  leftLight: {
    title: "Damn Vulnerable DeFi",
    description: "The renowned challenges to dive into real-world smart contract security, featuring the most vulnerable Solidity contracts ever witnessed.",
    buttonText: "Play now",
    links: [
      {
        label: "Play now",
        url: "https://www.damnvulnerabledefi.xyz/"
      }
    ]
  },
  topRightLights: {
    title: "Security Frameworks",
    description: "A curated resource full of best practices and potential pitfalls in crypto security, collaborating with industry experts at the <a href='https://www.securityalliance.org/' target='_blank' rel='noopener noreferrer'>Security Alliance (SEAL)</a>.",
    buttonText: "Learn & contribute",
    links: [
      {
        label: "Learn & contribute",
        url: "https://frameworks.securityalliance.org/"
      }
    ]
  },
  tree: {
    title: "Education & awareness",
    description: "We organize, coordinate and participate in conferences, workshops and hackathons. With a strong foothold in LATAM.",
    links: [
      {
        label: "Recent Events",
        url: "https://lu.ma/theredguild"
      },
      {
        label: "Smart contract security course with cyfrin",
        url: "https://updraft.cyfrin.io/courses/security"
      },
      {
        label: "Undercover campaign in ethargentina",
        url: "https://blog.theredguild.org/you-were-not-pwned-the-red-guild-ethereum-argentina-2023/"
      }
    ]
  },
  letters: {
    title: "Security research & bug hunting",
    description: "Independent reviews of smart contracts and web3 infrastructure that share Ethereum's ethos. We share learnings in public reports and blog posts.",
    buttonText: "Read our blog",
    links: [
      {
        label: "Read our blog",
        url: "https://blog.theredguild.org/"
      }
    ]
  },
  flower: {
    title: "Tooling",
    description: "We build open-source repositories to promote safer development environments.",
    links: [
      {
        label: "Web3 devcontainer",
        url: "https://github.com/theredguild/devcontainer"
      },
      {
        label: "devsecops toolkit",
        url: "https://github.com/theredguild/DevSecOps-toolkit"
      }
    ]
  }
}; 