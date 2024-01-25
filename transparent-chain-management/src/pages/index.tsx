import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React from 'react';
import {Button, Center, Text, Textarea, Alert} from "@mantine/core";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems:"center", height: '100vh'}}>
      <Button style={{margin:"0px 40px"}}><a href='/createparcel'>Create parcel</a></Button>      
      <Button style={{margin:"0px 40px"}}><a href='/info'>Parcel Info</a></Button>
      <Button style={{margin:"0px 40px"}}><a href='/updateparcel'>Update parcel</a></Button>
      <Button style={{margin:"0px 40px"}}><a href='/confirm'>Confirm parcel</a></Button>
    </div>
  );
};
