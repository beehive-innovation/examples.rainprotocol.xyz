export const networks = [{
  label: "Mumbai",
  config: {
    chainId: '0x13881',
    chainName: 'Mumbai',
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC', // 2-6 characters long
      decimals: 18
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  },
  addresses: {
    BALANCE_TIER_FACTORY_ADDRESS:
      "0x31a5F2f477297C2F3AED28E03Fec8934cc4298a7",
    ERC721_BALANCE_TIER_FACTORY_ADDRESS:
      "0xF95c6106d8b0FE566805a856Dfb7F64083369caF",
    COMBINE_TIER_FACTORY_ADDRESS:
      "0x09f91AC0215AFa0533Bf3212FBe59086300c3165",
    SALE_FACTORY: "0x7fbc27F1D14e0c59e2F4346B5166692659c4694D",
    EMISSIONS_FACTORY: "0x83b45E84dfd5f00a03c6C483B27C44A0C4E9903f",
    GATED_NFT_FACTORY: "0xD9AD3A87E4c1F604091c1A0E147c88B3A9E1B4ad",
    VERIFY_TIER_FACTORY: "0x007aB50f8c491AE54114139b9ada40aB3c6e4811",
    VERIFY_FACTORY: "0x39e3c764e6185C6a3100D0dA1195D26519b42750",
    CALCULATOR_EXAMPLE: ""
  },
  blockExplorer: 'https://mumbai.polygonscan.com/',
  graphUrl: 'https://api.thegraph.com/subgraphs/name/beehive-innovation/rain-protocol-v2_1-mumbai'
}]