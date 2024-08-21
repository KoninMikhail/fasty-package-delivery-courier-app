<!-- markdownlint-disable MD032 MD033-->
<!-- Write your README.md file. Build something amazing! This README.md template can guide you to build your project documentation, but feel free to modify it as you wish 🥰 -->

# **Fasty - Package Delivery Courier PWA**

> Empower your delivery management with my cutting-edge tool designed for rapid creation and seamless exchange of deliveries. Learn and apply best practices of Feature Sliced Design along the way..

<div align="center">
  <!-- Change your logo -->
  <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa">
    <img width="100%" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/project_image.jpg" alt="@KoninMikhail/fasty-package-delivery-courier-pwa's logo">
  </a>
  <br>
  <a href="#">
    <img src="https://img.shields.io/badge/build-stable-blue?style=for-the-badge&color=succeess" alt="KoninMikhail/fasty-package-delivery-courier-pwa">
     </a>
    <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/issues">
      <img src="https://img.shields.io/github/issues/KoninMikhail/fasty-package-delivery-courier-pwa?color=0088ff&style=for-the-badge&logo=github" alt="KoninMikhail/fasty-package-delivery-courier-pwa issues"/>
    </a>
    <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/pulls">
      <img src="https://img.shields.io/github/issues-pr/koninmikhail/social-analytics-dashboard-template?color=0088ff&style=for-the-badge&logo=github"  alt="KoninMikhail/ pull requests"/>
    </a>
    <a href="https://case.mikekonin.com/fasty-package-delivery-courier-pwa/">
         <img src="https://img.shields.io/badge/ -live demo-blue?style=for-the-badge&color=important" alt="KoninMikhail/fasty-package-delivery-courier-pwa link to live demo.">
    </a>
</div>

<br />

Welcome to the Fasty App, a robust PWA designed to streamline delivery operations for couriers. Built with cutting-edge technologies like React, TypeScript, and Feature Sliced Design, our app is tailored to meet the dynamic needs of modern courier services.

## Key Features:
- **Day/Night Theme:** Seamlessly switch between day and night modes for optimal readability and user experience.
- **Multilingual Support:** Effortlessly switch between Russian and English languages.
- **Offline Capable:** Enjoy uninterrupted service with PWA capabilities, ensuring your deliveries are managed even without an active internet connection.
- **Multi-Platform:** Access the app from mobile, tablet, or PC, ensuring a consistent experience across all devices.
- **Courier Authentication:** Secure login for couriers to manage their deliveries.
- **Delivery Selection:** Choose suitable deliveries from a list of upcoming tasks.
- **My Deliveries:** View your current and scheduled deliveries easily.
- **History:** Browse through completed deliveries for reference and record-keeping.
- **Search Function:** Quickly find specific deliveries using the in-app search.
- **Delivery Maps:** Utilize OpenStreetMap integration for precise navigation on the delivery page.
- **Profile Management:** Edit your profile information and change your avatar quickly and intuitively.

## Our Objectives:
- **Rapid Deployment:** Quickly set up a comprehensive delivery service.
- **Feature Sliced Design Best Practices:** Showcase the best practices in Feature Sliced Design for scalable and maintainable architecture.
- **Easy Onboarding:** Facilitate rapid learning of the architecture for new developers.
- **Collaboration-Friendly:** Enable users to suggest and contribute new functionalities.

Experience the future of delivery management with the Fasty App — where efficiency meets innovation.

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa">
    <img width="100%" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/project_image_mobile.jpg" alt="@KoninMikhail/fasty-package-delivery-courier-pwa's logo">
  </a>

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa">
    <img width="100%" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/project_image_desktop.jpg" alt="@KoninMikhail/fasty-package-delivery-courier-pwa's logo">
  </a>

<br />

## Request features ⚡

> Use [issue](https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/issues) and follow the rules :)

## Report bug 🤬

> The data from repository is provided an 'As is', without any guarantees. All the data provided is used at your own risk.
> **If you want report a bug** - use [issue](https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/issues)

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/menu.png" width="50px" />

## TABLE OF CONTENTS

- [General](#)
  - [Instrodution](#fasty---package-delivery-courier-pwa)
  - [Key Features](#key-features)
  - [Request feature](#request-features-)
  - [Report bug](#report-bug-)
- [Quick start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Offline Mode](#offline-mode)
  - [Multilingual Support](#multilingual-support)
- [Architecture](#architecture)
  - [Feature Sliced Design](#feature-sliced-design)
  - [Component Structure](#component-structure)
- [Authentication](#authentication)
- [Profile Management](#profile-management)
- [Delivery Management](#delivery-management)
  - [Selecting Deliveries](#selecting-deliveries)
  - [Viewing My Deliveries](#viewing-my-deliveries)
  - [Delivery History](#delivery-history)
  - [Search Functionality](#search-functionality)
  - [OpenStreetMap Integration](#openstreetmap-integration)
- [Customization](#customization)
  - [Themes](#themes)
  - [Extending Functionality](#extending-functionality)
- [Contributing](#contributors)
- [Buy Me A Coffee](#buy-me-a-coffee)
- [License and Changelog](#license-and-changelog)


<br /><br />

<img align="left" src="https://raw.githubusercontent.com/KoninMikhail/fasty-package-delivery-courier-pwa/master/.resources/icons/qs.png" width="50px" />

# Quick start

## Requirements:
>- **NodeJS:** 20 (My version at building time)
>- **PNPM**
>- **Yarn:** 1.22 (only if you doesnt have backend)

## Installation


> If you have your own backend:
1. Clone this repository:
2. Go to `fasty-package-delivery-courier-pwa` folder.
3. Make `.env` from `.env.example` and past your data
4. Install pnpm via `npm install -g pnpm`
5. Install depends via `pnpm i`
6. Build project -> `pnpm build` & Enjoy !
7. (optional) If you need run on test web-server -> `pnpm preview`
8. (optional) if you use `nginx` you can pass `dist` to config;

> If you need backend with demoData:
1. Register [Atlas](https://www.mongodb.com/products/platform/atlas-database) account and create mongodb database
2. clone [Fasty.API](https://github.com/KoninMikhail/fasty-pwa-demo-api) 
3. Go to `fasty-pwa-demo-api`
4. Make `.env` from `.env.example` and past your settings
5. Install yarn via `npm install -g yarn`
6. Install deps `yarn install`;
7. Seed demo data via `prisma db seed`.
8. Start your backend `yarn dev` (start in dev mode)
9. Return to upper guide & Enjoy it!


<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />

## Contributors

I am <3 contributions big or small. If you help my project --> 🍰**link to your profile will be here**🍰.

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KoninMikhail/fasty-package-delivery-courier-pwa" />
</a>

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/coffee.png" width="50px" />

## Buy Me A Coffee

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/generate">
  <img alt="KoninMikhail/fasty-package-delivery-courier-pwa Author brand logo without text" align="right" src="https://raw.githubusercontent.com/KoninMikhail/fasty-package-delivery-courier-pwa/main/.resources/images/logo.png" width="25%" />
</a>

Currently I'm seeking for new sponsors to help maintain this project! ❤️

With every donation you make - you're helping with development of this project. _You will be also featured in project's README.md_, so everyone will see your contribution and visit your content⭐.

<a href="https://yoomoney.ru/to/410011749810070">
  <img src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/sponsor.svg">
</a>

#### OR CLICK BUTTON

[![GitHub followers](https://img.shields.io/github/followers/koninmikhail.svg?style=social)](https://github.com/koninmikhail)
[![GitHub stars](https://img.shields.io/github/stars/koninmikhail/fasty-package-delivery-courier-pwa.svg?style=social)](https://github.com/koninmikhail/fasty-package-delivery-courier-pwa/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/koninmikhail/fasty-package-delivery-courier-pwa.svg?style=social)](https://github.com/koninmikhail/fasty-package-delivery-courier-pwa/watchers)
[![GitHub forks](https://img.shields.io/github/forks/koninmikhail/fasty-package-delivery-courier-pwa.svg?style=social)](https://github.com/koninmikhail/fasty-package-delivery-courier-pwa/network/members)

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/law.png" width="50px" />

## **License and Changelog**

> Copyright (c) 2023, KoninMikhail.
> This project under **[MIT](LICENSE)** license. See the changes in the **[CHANGELOG.md](CHANGELOG.md)** file.
