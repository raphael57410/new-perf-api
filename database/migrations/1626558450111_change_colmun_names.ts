import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Weight extends BaseSchema {
  protected tableName = 'Weight'

  public async up () {
    this.schema.table(this.tableName, (table) => {
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
    })
  }
}
