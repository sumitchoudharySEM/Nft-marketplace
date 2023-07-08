export const setupUserTx= `
import ConnectNFT from 0x3aeeb4de672c74b1
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTMarketplace from 0x3aeeb4de672c74b1
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction {

  prepare(acct: AuthAccount) {
  acct.save(<- ConnectNFT.createEmptyCollection(), to:/storage/ConnectNFTCollection)
  acct.link<&ConnectNFT.Collection{ConnectNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/ConnectNFTCollection, target:/storage/ConnectNFTCollection )
  acct.link<&ConnectNFT.Collection>(/private/ConnectNFTCollection, target:/storage/ConnectNFTCollection )

  let ConnectNFTCollection = acct.getCapability<&ConnectNFT.Collection>(/private/ConnectNFTCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReciver)

    acct.save(<- NFTMarketplace.createSaleCollection(ConnectNFTCollection:ConnectNFTCollection, FlowTokenVault :FlowTokenVault), to: /storage/MySaleCollection )
    acct.link<&NFTMarketplace.SaleCollection{NFTMarketplace.SalecollectionPublic}>(/public/MySaleCollection, target: /storage/MySaleCollection)
  }

  execute {
    log("user stored collection and salecollection inside there account")
  }
}`