export namespace EnrollmentApplicationEvent {
  export namespace EnrollmentCreated {
    export const key = 'enrollment.application.enrollment.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
