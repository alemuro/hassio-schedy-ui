import React from 'react';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'
import RoomsPage from '../components/Pages/RoomsPage'

const Home = () => (
  <div className={styles.container}>
    <Head>
      <meta key="charset" charset="utf-8" />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <title>Schedy UI</title>
      <link key="icon" rel="icon" href="/favicon.ico" />
      <link key="bootstrap" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    </Head>

    <main className={styles.main}>
      <Header />
      <RoomsPage />
    </main>
  </div>
)

export default Home
