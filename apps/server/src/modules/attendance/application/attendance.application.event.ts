export namespace AttendanceApplicationEvent {
  export namespace AttendanceCreated {
    export const key = 'attendance.application.attendance.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
