export const getSaleNFTsScript= `
import ConnectNFT from 0x3aeeb4de672c74b1
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTMarketplace from 0x3aeeb4de672c74b1
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

pub fun main(account: Address): String  {
  
    let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
                    .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SalecollectionPublic}>()
                    ?? panic("Can't get user sale collection.")
    
                    let collection = getAccount(account).getCapability(/public/ConnectNFTCollection)
                    .borrow<&ConnectNFT.Collection{ConnectNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

                    let saleIDs = saleCollection.getIDs()
                    let returnVals: {UFix64: &ConnectNFT.NFT} = {}

                    for saleID in saleIDs {
                      let price = saleCollection.getPrice(id: saleID)
                      let nftRef = collection.borrowNFT(id: saleID)
                  
                      returnVals.insert(key:price, nftRef)
                    }
                  
                    return "hii"

}

`