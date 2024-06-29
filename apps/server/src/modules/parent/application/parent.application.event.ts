export namespace ParentApplicationEvent {
  export namespace ParentCreated {
    export const key = 'parent.application.parent.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
