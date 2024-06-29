export namespace TeacherApplicationEvent {
  export namespace TeacherCreated {
    export const key = 'teacher.application.teacher.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
