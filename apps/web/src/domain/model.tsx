import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Parent as ParentModel } from './parent/parent.model'

import { Student as StudentModel } from './student/student.model'

import { Teacher as TeacherModel } from './teacher/teacher.model'

import { Course as CourseModel } from './course/course.model'

import { Schedule as ScheduleModel } from './schedule/schedule.model'

import { Enrollment as EnrollmentModel } from './enrollment/enrollment.model'

import { Attendance as AttendanceModel } from './attendance/attendance.model'

import { Document as DocumentModel } from './document/document.model'

import { Financial as FinancialModel } from './financial/financial.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Parent extends ParentModel {}

  export class Student extends StudentModel {}

  export class Teacher extends TeacherModel {}

  export class Course extends CourseModel {}

  export class Schedule extends ScheduleModel {}

  export class Enrollment extends EnrollmentModel {}

  export class Attendance extends AttendanceModel {}

  export class Document extends DocumentModel {}

  export class Financial extends FinancialModel {}
}
