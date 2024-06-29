import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ParentApi } from './parent/parent.api'

import { StudentApi } from './student/student.api'

import { TeacherApi } from './teacher/teacher.api'

import { CourseApi } from './course/course.api'

import { ScheduleApi } from './schedule/schedule.api'

import { EnrollmentApi } from './enrollment/enrollment.api'

import { AttendanceApi } from './attendance/attendance.api'

import { DocumentApi } from './document/document.api'

import { FinancialApi } from './financial/financial.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Parent extends ParentApi {}

  export class Student extends StudentApi {}

  export class Teacher extends TeacherApi {}

  export class Course extends CourseApi {}

  export class Schedule extends ScheduleApi {}

  export class Enrollment extends EnrollmentApi {}

  export class Attendance extends AttendanceApi {}

  export class Document extends DocumentApi {}

  export class Financial extends FinancialApi {}
}
