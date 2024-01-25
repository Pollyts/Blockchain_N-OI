import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React from 'react';
import {Button, Center, Text, Textarea, Alert} from "@mantine/core";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <div style={{display: "flex", justifyContent: "space-around", alignItems:"center", margin:'0px 200px', height: '100vh'}}>
      <Button><a href='/createparcel'>Create Parcel</a></Button>      
      <Button><a href='/info'>Parcel Info</a></Button>
      <Button><a href='/updateparcel'>Update Parcel</a></Button>
      <Button><a href='/confirm'>Confirm receipt</a></Button>
    </div>
  );
};
