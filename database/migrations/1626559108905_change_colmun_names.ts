import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Weights extends BaseSchema {
  protected tableName = 'weights'

  public async up () {
    this.schema.table(this.tableName, () => {
    })
  }

  public async down () {
    this.schema.table(this.tableName, () => {
    })
  }
}
