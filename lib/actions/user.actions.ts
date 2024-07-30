'use server';

import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  } = process.env;


//GET USER INFO
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
      const { database } = await createAdminClient();
  
      const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }




//  SIGN IN 
export const signIn = async ({ email, password }: signInProps) => {
    try {
      const { account } = await createAdminClient();
      const response = await account.createEmailPasswordSession(email, password);
    
    //   cookies().set("appwrite-session", session.secret, {
    //     path: "/",
    //     httpOnly: true,
    //     sameSite: "strict",
    //     secure: true,
    //   });
  
    //   const user = await getUserInfo({ userId: session.userId }) 
  
      return parseStringify(response);
    } catch (error) {
      console.error('Error', error);
    }
  }

//SIGN UP
export const signUp=async({ password, ...userData }: SignUpParams)=>{
    const { email, firstName, lastName } = userData;
    let newUserAccount;

    try{
            const {account}=await createAdminClient();
            const newUserAccount=await account.create(
                ID.unique(),
                email,
                password,
                `${firstName} ${lastName}`
            );

            const session=await account.createEmailPasswordSession(email,password);
            cookies().set("appwrite-session", session.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,

            });

            return parseStringify(newUserAccount);


    }
    catch(error){

        console.log('Error', error);

    }
}

// GET LOGGED INFO USER

// export async function getLoggedInUser() {
//     try {
//       const { account } = await createSessionClient();
//       const user = await account.get();
  
//     //   const user = await getUserInfo({ userId: result.$id})
  
//       return parseStringify(user);
//     } catch (error) {
//       console.log(error)
//       return null;
//     }
//   }
// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}


  //LOGOUT
  
  export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();
  
      cookies().delete('appwrite-session');
  
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }