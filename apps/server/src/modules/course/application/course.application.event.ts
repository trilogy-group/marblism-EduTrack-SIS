export namespace CourseApplicationEvent {
  export namespace CourseCreated {
    export const key = 'course.application.course.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
