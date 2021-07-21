import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Weights from 'App/Models/Weight'

export default class User extends BaseModel {
  /*relation a la table weight*/ 
  @hasMany(() => Weights)
  public Weights: HasMany<typeof Weights>
  /**
   * création des colonnes
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public role: string

  @column({ serializeAs: null })
  public password: string

  /**
   * avant la sauvegarde dans la base de données le mot de passe est hasher
   * @param user
   */
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
