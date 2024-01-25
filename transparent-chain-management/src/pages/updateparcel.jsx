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


  //parcel data

  const [parcelCode, setParcelCode] = useState('');
  const [parcelLocation, setParcelLocation] = useState('');

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

  async function updateParcelLocation() {
    if (hasMetamask && isConnected) try {

      const transaction = await contract.updateParcelLocation(parcelCode, new Date().toLocaleString(), currentUserAddress[0], parcelLocation)

      console.log(transaction);

      setScreenInfo("Parcel was updated. See more info in the \"Parcel info\" section");

    } catch (e) {
      console.log(e)
    }
  }  

  return (
    <Center style={{display: "flex", justifyContent: "center", height: '100vh'}}>
      {hasMetamask ? (
        isConnected ? (

          <div>

            <Center>
            <Textarea style={{width: "300px", margin:"8px 0px"}}
              value={parcelCode}
              onChange={(event) => setParcelCode(event.currentTarget.value)}
              placeholder={"Write parcel code"}
              label={"Parcel code"}
            />   
            </Center>

            <Center>
            <Textarea style={{width: "300px", margin:"8px 0px"}}
              value={parcelLocation}
              onChange={(event) => setParcelLocation(event.currentTarget.value)}
              placeholder={"Write current parcel location"}
              label={"Current location"}
            />   
            </Center>       
            
            
          <Center> 

                 

            <Button onClick={() => updateParcelLocation()}>
              Update parcel
            </Button>

            

          </Center>

            <Center>
            <div style={{ width: '500px', marginTop: '50px' }}>
  {screenInfo !== '' ? (
    <Alert variant="light" color="blue" title="Information" style={{ whiteSpace: 'pre-line' }}>
      {screenInfo}
    </Alert>
  ) : (
    ''
  )}
</div>      
            </Center></div>



          ) : (
          <Button onClick={() => connect()}>
            Connect
          </Button>
        )
      ) : ("Download Metamask! ")}
    </Center>
  )
}
