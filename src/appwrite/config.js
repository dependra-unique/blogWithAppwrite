import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client)
    }

    //post Create
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {   
            console.log("create post");

            // slug ko as a ID.unique() ki tarah hi use kar rhe hai
            return await this.databases.createDocument( 
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug,                   
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            console.log("Error in createPost method", error);
        }
    }

    //update post
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Error in uptadePost method", error);        }
    }

    //delete post
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error in deletePost method", error);
            return false;
        }
    }

    //get one post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            
        } catch (error) {
            console.log("Error in getPost method", error);
            return false
        }
    }

    //get all post who has active status => ye kaam hum queries ki help se kar sekte hai,, document mein ja ke padhna hai aapwrite ke
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Error in getPosts method", error);
            return false;
        }
    }
    
    //Upload file
    async uploadFile(file){
        try {
            console.log("upload file");
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Error in uploadFile method", error);
            return false;
        }
    }

    //delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;            
        } catch (error) {
            console.log("Error in deleteFile", error);
            return false;
        }
    }

    //file preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service;