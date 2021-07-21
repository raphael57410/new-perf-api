import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Weights extends BaseSchema {
  protected tableName = 'Weights'

  public async up () {
    this.schema.dropTableIfExists(this.tableName)
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
    })
  }
}
