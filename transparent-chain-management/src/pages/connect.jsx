import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal';
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {Button, Center, Text, Textarea} from "@mantine/core";
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

  const [dataToChain, setDataToChain] = useState('');
  const [dataFromChain, setDataFromChain] = useState([]);


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

      const transaction = await contract.createParcel(currentUserAddress[0], "Parcel1", "Praha", "Brno", "0x700cc0FE831dFcb65E524101DD3043aD0a008279")

      await transaction.wait();

            // Now listen for the ParcelCreated event
            //const filter = contract.filters.ParcelCreated();
            //const events = await contract.queryFilter(filter, transaction.blockHash);

            // Access the parcel code from the event
            //const parcelCode = events[0].args.parcelCode;

            console.log(transaction);

    } catch (e) {
      console.log(e)
    }
  }

  async function updateParcelLocation() {
    if (hasMetamask && isConnected) try {

      await contract.updateParcelLocation(dataToChain, currentUserAddress[0], "Jihlava")

    } catch (e) {
      console.log(e)
    }
  }

  async function parcelInfo() {
    if (hasMetamask && isConnected) try {
      
    const response = await contract.parcelInfo(dataToChain, currentUserAddress[0])
    console.log(response);

    let dataArray = []
    response.forEach((data) => {
      dataArray.push({data: data[1]})
    })

    } catch (e) {
      console.log(e)
    }
  }

  async function ReceiveParcel() {
    if (hasMetamask && isConnected) try {
      console.log(dataToChain, currentUserAddress[0])
      await contract.submitInsuranceRequest()
    } catch (e) {
      console.log(e)
    }
  }

  async function getDataFromChain() {
    const response = await contract.getAllInsuranceRequests()

    let dataArray = []
    response.forEach((data) => {
      dataArray.push({data: data[1]})
    })

    setDataFromChain(dataArray)
  }

  return (
    <Center style={{display: "flex", justifyContent: "center", height: '100vh'}}>
      {hasMetamask ? (
        isConnected ? (

          <div><Center>

            <Textarea
              value={dataToChain}
              onChange={(event) => setDataToChain(event.currentTarget.value)}
              placeholder={"Store your data to blockchain"}
              label={"Add data"}
            />

            <Button onClick={() => createParcel()}>
              Create parcel
            </Button>

            <Button onClick={() => parcelInfo()}>
              Get parcel
            </Button>

            <Button onClick={() => updateParcelLocation()}>
              Update parcel
            </Button>

          </Center>

            <Center>

              <div>
                {dataFromChain.map((data, index) => (
                  <div key={index}>
                    <Text>{data.data}</Text>
                  </div>
                ))}
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
