export namespace FinancialApplicationEvent {
  export namespace FinancialCreated {
    export const key = 'financial.application.financial.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
