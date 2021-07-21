import UserController from 'App/Controllers/Http/UserController'
import WeightController from 'App/Controllers/Http/WeightController'
import CreateUser from 'App/Validators/CreateUserValidator'
import CreateWeight from 'App/Validators/CreateWeightValidator'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
|   import './routes/cart'
|   import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

//###### USER ##########

/**
 * Route pour le login
 *
 * 
 */
Route.post('/login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const token = await auth.use('api').attempt(email, password,{
        expiresIn: '60mins'
      })
      // on recupere le user pour l'envoyer au front-end
      const user = auth.use('api').user

      return {token, user }

    } catch {
      return response.badRequest('le mot de passe ou l\'email sont incorrect !')
    }
});

/**
 * Route pour la dèconnexion
 */
Route.post('/logout', async ({ auth }) => {
  await auth.use('api').revoke()
  return {
    revoked: true,
    message: 'utilisateur deconnecté'
  }
})

/**
 * Route pour ajouter un utilisateur
 */
Route.post('/addUser', async ({request, response}) => {
    /**
     * vérification des données récupéré
     */
    await request.validate(CreateUser)
    

    /**
     * Controlleur utilisé pour ajouté en base de données
     */
    return new UserController().createUser(request, response);
});

/**
 * Route pour rècuperer tout les utilisateurs
 */
 Route.get('/allUser', async ({auth,response}) => {
  await auth.use('api').revoke()
  
  /**
   * Controlleur utilisé pour ajouter en base de données
   */
  return new UserController().fetchAllUser(response);
});

/**
 * Route pour supprimer un utilisateur
 */
 Route.post('/deleteUser', async ({auth, request, response}) => {
  await auth.use('api').revoke()
  const userId = request.body().id;
  
  /**
   * Controlleur utilisé pour supprimer un utilisateur
   */
  return new UserController().deleteUser(response, userId);
});

//###### WEIGHTS ##########

/**
 * Route pour ajouter une performance
 */
 Route.post('/addWeight', async ({auth ,request, response}) => {
  await auth.use('api').authenticate()
  const currentUserId = auth.use('api').user?.id 
  
  /**
   * vérification des données récupéré
   */
  await request.validate(CreateWeight);

  /**
   * Controlleur utilisé pour ajouter en base de données
   */
  return new WeightController().createWeight(request, response,currentUserId);
});

/**
 * Route pour recuperer tout les performances de l'utilisateur connecté
 */
 Route.get('/weights', async ({auth ,response}) => {
  await auth.use('api').authenticate()
  const currentUserId: number | undefined = auth.use('api').user?.id

  /**
   * Controlleur utilisé pour ajouter en base de données
   */
  if (currentUserId) {
    return new WeightController().fetchWeights(response, currentUserId);
  }else {
    response.send('vous etes pas connecté !');
  }
});

/**
 * Route pour mettre à jour une performance
 */
 Route.patch('/updateWeights/:id', async ({auth, response}) => {
  await auth.use('api').authenticate()
  const weightId = response.ctx?.params.id

  /**
   * Controlleur utilisé pour mettre à jour une performance
   */
  return new WeightController().updateWeight(response, weightId)
  
  
});

/**
* Route supprimer une performance
*/
 Route.delete('/deleteWeights/:id', async ({auth, response}) => {
  await auth.use('api').authenticate()
  const weightId = response.ctx?.params.id
  
  /**
   * Controlleur utilisé pour mettre à jour une performance
   */
  return new WeightController().deleteWeight(weightId)
});


