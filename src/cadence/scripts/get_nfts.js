export const getNFTsScript = `
import ConnectNFT from 0x3aeeb4de672c74b1
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&AnyResource] {
  
    let collection = getAccount(account).getCapability(/public/ConnectNFTCollection)
                    .borrow<&ConnectNFT.Collection{ConnectNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

    let returnVals: [&AnyResource] = [] 
    let ids = collection.getIDs()    
    for id in ids {
    returnVals.append(collection.borrowNFT(id: id))
  }

  return returnVals}
`