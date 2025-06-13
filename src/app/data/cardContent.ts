export interface CardContent {
  title: string;
  description: string;
}

export interface CardContentMap {
  temple: CardContent;
  leftLight: CardContent;
  topRightLights: CardContent;
  tree: CardContent;
  letters: CardContent;
  sun: CardContent;
  flower: CardContent;
}

export const cardContent: CardContentMap = {
  temple: {
    title: "The Phishing Dojo",
    description: "Face the most notorious scam and phishing threats in the web3 ecosystem with the Phishing Dojo's immersive challenges. Can you spot them all?"
  },
  leftLight: {
    title: "Damn Vulnerable DeFi",
    description: "The renowned challenges to dive into real-world smart contract security, featuring the most vulnerable Solidity contracts ever witnessed."
  },
  topRightLights: {
    title: "Security Frameworks",
    description: "A curated resource full of best practices and potential pitfalls in crypto security, collaborating with industry experts at the Security Alliance (SEAL)."
  },
  tree: {
    title: "Education & awareness",
    description: "We organize, coordinate and participate in conferences, workshops and hackathons. With a strong foothold in LATAM."
  },
  letters: {
    title: "Security research & bug hunting",
    description: "Independent reviews of smart contracts and web3 infrastructure that share Ethereum's ethos. We share learnings in public reports and blog posts."
  },
  sun: {
    title: "Sun",
    description: "Sun"
  },
  flower: {
    title: "Tooling",
    description: "Construimos repositorios de código abierto para promover entornos de desarrollo más seguros."
  }
}; 