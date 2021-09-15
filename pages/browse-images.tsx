import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import React, { MouseEvent, useState, SetStateAction, Dispatch, useEffect } from "react";
import Head from "next/head";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import Link from "next/link"
import Sidebar from "../components/sidebar"
import PageHeading from "../components/pageheadingcomponent";
import DashboardComponent from "../components/dashboard";
import UserDetails from "../components/user-details";
import UploadImages from "../components/upload-images"
import BrowseImages from "../components/browse-images";
import Collections from "../components/collections";
import RegisterNewUser from "../components/register-new-user";
import LoginUser from "../components/login-user";
import BrowseUsers from "../components/browse-users";
import DefaultLayout from "../components/Layout/DefaultLayout";

Amplify.configure({ ...awsExports, ssr: true });

interface RegNewUserProps {
  username: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: RegNewUserProps = { username: '' };

  try {
    const user = await SSR.Auth.currentAuthenticatedUser();
    if (user && user.username) {
      myProps.username = user.username;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: myProps
  };
}

export default function BrowseImagesPage(props: RegNewUserProps) {

  const dashPropsIn = { pageHeading: 'Browse images', username: props.username }
  const layoutProps = {username: props.username, title: dashPropsIn.pageHeading, children: BrowseImages(dashPropsIn)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}