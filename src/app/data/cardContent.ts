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
    buttonText: "Enter the phishing dojo"
  },
  leftLight: {
    title: "Damn Vulnerable DeFi",
    description: "The renowned challenges to dive into real-world smart contract security, featuring the most vulnerable Solidity contracts ever witnessed.",
    buttonText: "Play now"
  },
  topRightLights: {
    title: "Security Frameworks",
    description: "A curated resource full of best practices and potential pitfalls in crypto security, collaborating with industry experts at the Security Alliance (SEAL).",
    buttonText: "Learn & contribute"
  },
  tree: {
    title: "Education & awareness",
    description: "We organize, coordinate and participate in conferences, workshops and hackathons. With a strong foothold in LATAM.",
    links: [
      {
        label: "Recent Events",
        url: "#"
      },
      {
        label: "Smart contract security course with cyfrin",
        url: "#"
      },
      {
        label: "Undercover campaign in ethargentina",
        url: "#"
      }
    ]
  },
  letters: {
    title: "Security research & bug hunting",
    description: "Independent reviews of smart contracts and web3 infrastructure that share Ethereum's ethos. We share learnings in public reports and blog posts.",
    buttonText: "Read our blog"
  },
  flower: {
    title: "Tooling",
    description: "We build open-source repositories to promote safer development environments.",
    links: [
      {
        label: "Web3 devcontainer",
        url: "#"
      },
      {
        label: "devsecops toolkit",
        url: "#"
      }
    ]
  }
}; 