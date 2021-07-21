 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import User from 'App/Models/User'

export default class UserController {

    /** 
     * premiere methode de test
     * @param ctx
     */
    public async index(ctx: HttpContextContract) {
        console.log(ctx);
        return [
            {
            titre:'coucou je passe part le controleur',
            }
        ]
    }

    /**
     * CreateUser
     */
    public async createUser(request:any, response:any) {
        
        const user = await User.create({
            email: request.body().email,
            role: request.body().roles,
            password: request.body().password
        });
        response.created({
            data: user,
            message:'Votre compte a été crée !'
        });
    }

    /**
     * FetchAllUser
     */
     public async fetchAllUser(response:any) {
        
        const users = await User.all()

        return response.send({
            data :users,
            status: response.status(200)
        })
    }

      /**
     * DeleteUser
     */
       public async deleteUser(response:any, userId:any) {
        
        const user = await User.findOrFail(userId)
        await user.delete()

        return response.send({
            status: response.status(200),
            message: 'la personne a été supprimé !'
        })
    }
}
