export namespace StudentApplicationEvent {
  export namespace StudentCreated {
    export const key = 'student.application.student.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
