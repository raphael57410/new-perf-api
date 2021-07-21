// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Weight from 'App/Models/Weight'

export default class WeightController {

    /**
     * CreateWeight
     */
     public async createWeight(request:any, response:any, currentUserId) {

        const weight = await Weight.create({
            name: request.body().name,
            user_id: currentUserId,
            first_Weight: request.body().firstWeight,
            second_Weight: request.body().secondWeight
        });
        response.created({
            data: weight,
            message:'la nouvelle performance a été ajoutée !'
        });
    }

    /**
     * FetchWeight
     */
     public async fetchWeights(response:any, currentUserId:number) {

        const weight = await Weight
                                .query()
                                .where('user_id', currentUserId)
        response.status(200)
        if (response.status(200)) {
            response.send(weight)
        }else {
            response.send('pas de performance trouvée')
        }

    }

    /**
     * updateWeight
     */
     public async updateWeight(response:any, weightId:number) {
        
        const weight = await Weight.findOrFail(weightId)
        weight.name  = response.ctx.request.requestBody.name 
        weight.first_Weight = response.ctx.request.requestBody.firstWeight
        weight.second_Weight = response.ctx.request.requestBody.secondWeight
        
        await weight.save()

    }

    /**
     * deleteWeight
     */
     public async deleteWeight(weightId:number) {
        
        const weight = await Weight.findOrFail(weightId)
        await weight.delete()

    }
}
