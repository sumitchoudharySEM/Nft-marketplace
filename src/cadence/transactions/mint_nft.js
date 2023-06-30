export const mintNFT= `
import ConnectNFT from 0x3aeeb4de672c74b1

transaction(ipfshash:String, name:String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&ConnectNFT.Collection>(from: /storage/ConnectNFTCollection)
                ??panic("no such collection found")
    let nft <- ConnectNFT.createToken(ipfshash:ipfshash, metadata:{"name":name})
    collection.deposit(token: <- nft)
  }

  execute {
    log("a new nft is created and stored in users account")
  }
}`