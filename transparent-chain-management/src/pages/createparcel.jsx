import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal';
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {Button, Center, Text, Textarea, Alert} from "@mantine/core";
import {abi, contractAddress} from "../config/constants";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {8995: "https://core.bloxberg.org"}
    }
  }
}

if (typeof window != 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
  })
}

export default function Connect() {

  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);

  const [contract, setContract] = useState(undefined);
  const [currentUserAddress, setCurrentUserAddress] = useState('');

  const [parcelCode, setParcelCode] = useState('');


  //parcel data

  const [parcelName, setParcelName] = useState('');
  const [parcelFrom, setParcelFrom] = useState('');
  const [parcelTo, setParcelTo] = useState('');
  const [parcelReceiver, setParcelReceiver] = useState('');

  //end parcel data

  const [screenInfo, setScreenInfo] = useState('');

  useEffect(() => {
    checkMetamask();

    if (isConnected)
      initialize()

  })

  const checkMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true)
    } else {
      setHasMetamask(false)
    }
  }

  async function connect() {
    if (hasMetamask) {
      const web3ModalProvider = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(web3ModalProvider)

      setSigner(provider.getSigner())
      setIsConnected(true)
    }
  }

  async function initialize () {

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const currentUserAddress = await window.ethereum.request({method: 'eth_accounts'})

    setContract(contract)
    setCurrentUserAddress(currentUserAddress)
  }

  async function createParcel() {
    if (hasMetamask && isConnected) try {

      var parcelCode = makeid(16);     

      console.log(parcelCode)

      const transaction = await contract.createParcel(parcelCode, new Date().toLocaleString(), currentUserAddress[0], parcelName, parcelFrom, parcelTo, parcelReceiver);

      console.log(transaction);

      setScreenInfo("Parcel was created. Your Parcel code: " + parcelCode);

    } catch (e) {
      console.log(e)
    }
  }  

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <Center style={{display: "flex", justifyContent: "center", height: '100vh'}}>
      
      {hasMetamask ? (
        isConnected ? (

          <div>

<Center>
            <div style={{ width: '500px', margin: '50px 0px' }}>
  {screenInfo !== '' ? (
    <Alert variant="light" color="blue" title="Information" style={{ whiteSpace: 'pre-line' }}>
      {screenInfo}
    </Alert>
  ) : (
    ''
  )}
</div>      
            </Center>

            <Center>
            <Textarea style={{width: "300px", margin:"8px 0px"}}
              value={parcelName}
              onChange={(event) => setParcelName(event.currentTarget.value)}
              placeholder={"Write short description"}
              label={"Parcel description"}
            />   
            </Center>

            <Center>
            <Textarea style={{width: "300px", margin:"8px 0px"}}
              value={parcelFrom}
              onChange={(event) => setParcelFrom(event.currentTarget.value)}
              placeholder={"Write your address (Country, City, Street)"}
              label={"Your Address"}
            />   
            </Center>

            <Center>
            <Textarea style={{width: "300px", margin:"8px 0px"}}
              value={parcelTo}
              onChange={(event) => setParcelTo(event.currentTarget.value)}
              placeholder={"Write receiver`s address (Country, City, Street)"}
              label={"Receiver`s address"}
            />   
            </Center>

            <Center>
            <Textarea style={{width: "300px", margin:"8px 0px"}}
              value={parcelReceiver}
              onChange={(event) => setParcelReceiver(event.currentTarget.value)}
              placeholder={"Write receiver`s wallet"}
              label={"Receiver`s wallet"}
            />   
            </Center>          
            
            
          <Center> 

                 

            <Button onClick={() => createParcel()}>
              Create parcel
            </Button>

            

          </Center>

            </div>



          ) : (
          <Button onClick={() => connect()}>
            Connect
          </Button>
        )
      ) : ("Download Metamask! ")}
    </Center>
    
  )
}
