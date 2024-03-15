import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    //this is sign up => that means create account
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount){
                //call login method
                return this.login({email, password})
            }else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    //this is login
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
            
            
        } catch (error) {
            throw error
        }
    }

    //Get the currently logged in user.
    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            throw error;
        }
         return null;
    }

    //current user logout => using deleteSessions()
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error in logout::", error);
        }

    }
}

const authService = new AuthService()
export default authService