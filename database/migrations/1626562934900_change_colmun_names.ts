import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Weights extends BaseSchema {
  protected tableName = 'Weights'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      table.string('name')
      table.integer('first_weight')
      table.integer('second_weight')
    })
  }

  public async down () {
    this.schema.table(this.tableName, () => {
    })
  }
}
