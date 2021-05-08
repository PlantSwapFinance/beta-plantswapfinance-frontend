import nfts from 'config/constants/nfts'

describe('Config NFTs', () => {
  it.each(nfts.map((nft) => nft.farmerId))('NFT #%d has an unique farmer id', (farmerId) => {
    const duplicates = nfts.filter((n) => farmerId === n.farmerId)
    expect(duplicates).toHaveLength(1)
  })
})
