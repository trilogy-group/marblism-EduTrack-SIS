import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('8e24eb33-f385-4e7a-88de-da3875345ad2', '1Patsy75@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_11223', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('063184b8-ceb7-46e5-ab82-3090ab781cec', '8Doyle18@hotmail.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_12345', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('6bb6499b-da7d-454d-a117-0c58707f57fd', '15Verdie_Hamill24@hotmail.com', 'Emily Clark', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_12345', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('a9798252-dfdc-4008-a867-58d29c2fdf1b', '22Herman_Rice@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_67890', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('62796ee4-c088-45ff-93e3-736e043256c0', '29Adaline.Hagenes75@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=31', 'cus_78901', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('99e6392b-0e4e-4fd7-bedb-866964e396a8', '36Jacques_Nitzsche69@yahoo.com', 'Emily Clark', 'https://i.imgur.com/YfJQV5z.png?id=38', 'cus_12345', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('9f5d654f-138b-4c39-8884-57001a358044', '43Oswald.Schmitt@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_12345', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('1d3c51ca-baf5-44df-b15d-501fcae7a644', '50Roscoe14@hotmail.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_12345', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('fa9208ef-6cb8-45a7-98f6-b3c7cacca207', '57Carlee31@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_44556', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('45da9ddd-581b-4794-bf53-8a796bb9285e', 'Tuition Payment Reminder', 'Course registration for the next semester is now open.', 'Robert Brown', '74Mossie.Reilly0@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=75', 'https://i.imgur.com/YfJQV5z.png?id=76', 'a9798252-dfdc-4008-a867-58d29c2fdf1b');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('8cb6d9da-7e25-4a03-87bd-8f2ae0e29f78', 'ParentTeacher Meeting', 'A new assignment has been posted for your Math course.', 'John Doe', '81Madalyn57@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=82', 'https://i.imgur.com/YfJQV5z.png?id=83', '6bb6499b-da7d-454d-a117-0c58707f57fd');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('8cca1795-7523-4f05-bc17-0da9bf63bc85', 'Course Registration Open', 'This is a reminder to complete your tuition payment by the end of the month.', 'Michael Johnson', '88Shyanne_Johnston@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', '62796ee4-c088-45ff-93e3-736e043256c0');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('88e5d96b-c25d-4f25-b134-4f82e35ee751', 'ParentTeacher Meeting', 'A new assignment has been posted for your Math course.', 'John Doe', '95Brett.Moore55@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=96', 'https://i.imgur.com/YfJQV5z.png?id=97', '99e6392b-0e4e-4fd7-bedb-866964e396a8');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('0c36d1fb-e6c0-46a5-9df1-d57ee980ed17', 'New Assignment Posted', 'You are invited to attend the upcoming parentteacher meeting.', 'Jane Smith', '102Lori.Metz40@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=103', 'https://i.imgur.com/YfJQV5z.png?id=104', '1d3c51ca-baf5-44df-b15d-501fcae7a644');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('d2da95a8-b183-4a92-81b7-261ce15f1566', 'New Assignment Posted', 'Course registration for the next semester is now open.', 'Michael Johnson', '109Mozelle_Erdman-Luettgen@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=110', 'https://i.imgur.com/YfJQV5z.png?id=111', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('19d6b1a8-8966-47cb-83dd-fca065e3f6b2', 'Upcoming Exam Schedule', 'Course registration for the next semester is now open.', 'Robert Brown', '116Hanna_Klein@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=117', 'https://i.imgur.com/YfJQV5z.png?id=118', '99e6392b-0e4e-4fd7-bedb-866964e396a8');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('e61dedf0-d3ca-4f36-9d52-60b06791eebb', 'Tuition Payment Reminder', 'A new assignment has been posted for your Math course.', 'Jane Smith', '123Mozelle53@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=124', 'https://i.imgur.com/YfJQV5z.png?id=125', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('c223b6f3-66a8-43c8-9ae8-9e2dd2352710', 'New Assignment Posted', 'You are invited to attend the upcoming parentteacher meeting.', 'Robert Brown', '130Jaylon_Nikolaus22@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=131', 'https://i.imgur.com/YfJQV5z.png?id=132', '62796ee4-c088-45ff-93e3-736e043256c0');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('76390eed-73ec-4764-a911-e47a591a34da', 'Upcoming Exam Schedule', 'A new assignment has been posted for your Math course.', 'John Doe', '137Frederick.Ferry74@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=138', 'https://i.imgur.com/YfJQV5z.png?id=139', '62796ee4-c088-45ff-93e3-736e043256c0');

INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('497f56b8-ee3f-4647-90b5-4ddd14531759', '81312345678', 'a9798252-dfdc-4008-a867-58d29c2fdf1b');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('f860e951-64b2-4813-b2f0-989b994dfae2', '442079460958', '9f5d654f-138b-4c39-8884-57001a358044');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('7d85a922-05aa-4061-85d4-83fdc6f0ae48', '442079460958', '1d3c51ca-baf5-44df-b15d-501fcae7a644');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('413f77fe-dc3a-4282-a5e6-d753cbe71834', '61383766284', '62796ee4-c088-45ff-93e3-736e043256c0');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('2e1c5081-1ad9-4cc1-8f19-6eda18ead6d3', '442079460958', '063184b8-ceb7-46e5-ab82-3090ab781cec');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('16ada562-ffeb-42c5-b637-0b625cdf8aa7', '61383766284', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('c3e43cd8-5921-44a4-85da-21d0eac569d8', '442079460958', '99e6392b-0e4e-4fd7-bedb-866964e396a8');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('8ec6f033-7abb-4061-a8a3-b1f664e42370', '442079460958', '6bb6499b-da7d-454d-a117-0c58707f57fd');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('9363db85-bc5d-48fd-b694-d5ede11fa399', '919876543210', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "parent" ("id", "phoneNumber", "userId") VALUES ('87740ea0-eba6-461c-ad3c-2fd6898e79ce', '919876543210', '8e24eb33-f385-4e7a-88de-da3875345ad2');

INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('43b610a5-b47d-4c6a-93f3-25e0ead780ff', 'D', 'a9798252-dfdc-4008-a867-58d29c2fdf1b', '2e1c5081-1ad9-4cc1-8f19-6eda18ead6d3');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('adf05f1b-4153-412e-977f-9c760546cbf5', 'B', '8e24eb33-f385-4e7a-88de-da3875345ad2', 'c3e43cd8-5921-44a4-85da-21d0eac569d8');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('07ef4542-24e1-4cc7-86bc-649405455084', 'A', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '8ec6f033-7abb-4061-a8a3-b1f664e42370');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('9348c591-6849-4c47-84fe-89ddd3119c1b', 'A', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'c3e43cd8-5921-44a4-85da-21d0eac569d8');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('ccacb1bf-c0e6-4a2e-80e0-f5ae34f6eea8', 'D', '62796ee4-c088-45ff-93e3-736e043256c0', '497f56b8-ee3f-4647-90b5-4ddd14531759');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('619b2b2d-3a9f-421a-860d-0b3cb71ae043', 'B', '9f5d654f-138b-4c39-8884-57001a358044', '87740ea0-eba6-461c-ad3c-2fd6898e79ce');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('a9c90561-83ea-472d-88a1-d40be740ad04', 'F', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'c3e43cd8-5921-44a4-85da-21d0eac569d8');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('6caa1561-bbd4-464f-99e3-236e7c415556', 'B', '1d3c51ca-baf5-44df-b15d-501fcae7a644', '9363db85-bc5d-48fd-b694-d5ede11fa399');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('975b0dae-dc80-47cb-a912-1945c899b9c5', 'D', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '497f56b8-ee3f-4647-90b5-4ddd14531759');
INSERT INTO "student" ("id", "grade", "userId", "parentId") VALUES ('21f9fb2d-f4c1-45f8-b0ea-de9e4f3875b7', 'A', '1d3c51ca-baf5-44df-b15d-501fcae7a644', '87740ea0-eba6-461c-ad3c-2fd6898e79ce');

INSERT INTO "teacher" ("id", "department", "userId") VALUES ('64ebfe4e-77a9-41a6-ace2-d4a5beb72699', 'English', 'fa9208ef-6cb8-45a7-98f6-b3c7cacca207');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('4710e7b8-db09-4b42-8e1c-b657ec29058f', 'Science', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('bc742354-df37-4988-855a-1653ec697e1d', 'Mathematics', '9f5d654f-138b-4c39-8884-57001a358044');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('aff457a9-1c7b-4ac3-aad7-8f56780e62cf', 'English', '063184b8-ceb7-46e5-ab82-3090ab781cec');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('fd454e82-42d8-4b7e-95f6-a55b0c4bd540', 'English', '1d3c51ca-baf5-44df-b15d-501fcae7a644');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('cc908a11-b86d-4471-863b-10f27846065d', 'Physical Education', 'fa9208ef-6cb8-45a7-98f6-b3c7cacca207');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('3feb5fd4-1546-4f33-999c-d7e6c487fb21', 'History', 'fa9208ef-6cb8-45a7-98f6-b3c7cacca207');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('77a3a6a9-9483-4f46-a399-4f496e5188a6', 'Mathematics', 'fa9208ef-6cb8-45a7-98f6-b3c7cacca207');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('5bf42311-9cf4-466d-b0bb-0d83f2bc0687', 'Mathematics', '063184b8-ceb7-46e5-ab82-3090ab781cec');
INSERT INTO "teacher" ("id", "department", "userId") VALUES ('fab5d594-0073-48ec-bdd1-1c9b91a1f755', 'Science', '9f5d654f-138b-4c39-8884-57001a358044');

INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('94e66303-cb25-4d90-8a34-a0fb985b1ce9', 'Environmental Science', 'A comprehensive overview of psychological theories and practices.', 'aff457a9-1c7b-4ac3-aad7-8f56780e62cf');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('59584750-e29d-4821-8f1a-c7ebf0286fe2', 'Environmental Science', 'A comprehensive overview of psychological theories and practices.', '3feb5fd4-1546-4f33-999c-d7e6c487fb21');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('97eb5ca0-8b5b-453f-b293-af03bb68d9ea', 'Advanced Calculus', 'An indepth study of calculus concepts and applications.', '77a3a6a9-9483-4f46-a399-4f496e5188a6');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('64015613-d723-4ab9-8399-4cacff0fed2b', 'Modern World History', 'An indepth study of calculus concepts and applications.', '3feb5fd4-1546-4f33-999c-d7e6c487fb21');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('18b50dad-6a93-40da-9f3f-2e733eea62ee', 'Principles of Marketing', 'A comprehensive overview of psychological theories and practices.', '77a3a6a9-9483-4f46-a399-4f496e5188a6');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('3e672a7b-5fcf-47c7-8b28-f5a1c234b40c', 'Advanced Calculus', 'An indepth study of calculus concepts and applications.', 'bc742354-df37-4988-855a-1653ec697e1d');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('ef64dafc-8176-4d12-9cb0-b4a5a035c30f', 'Principles of Marketing', 'Study of environmental issues and sustainable practices.', 'bc742354-df37-4988-855a-1653ec697e1d');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('caf1254c-f406-4a03-a392-ef5d0e75e0eb', 'Modern World History', 'An exploration of significant events and trends in modern history.', '4710e7b8-db09-4b42-8e1c-b657ec29058f');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('7c36a150-f864-4849-b14e-25499adedb1b', 'Environmental Science', 'Fundamentals of marketing principles and strategies.', 'cc908a11-b86d-4471-863b-10f27846065d');
INSERT INTO "course" ("id", "name", "description", "teacherId") VALUES ('df99745f-8dc1-4c93-8e08-2cf1cdec401b', 'Principles of Marketing', 'An indepth study of calculus concepts and applications.', 'bc742354-df37-4988-855a-1653ec697e1d');

INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('f65bcd22-6353-4735-a1ce-b97e661f1e34', 'Tuesday', '1100', '1200', '7c36a150-f864-4849-b14e-25499adedb1b');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('0c10047b-6f5f-400c-96c2-f71fce6bcbeb', 'Tuesday', '1430', '1400', 'caf1254c-f406-4a03-a392-ef5d0e75e0eb');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('52289676-aa96-4528-be2d-8bb732894e0b', 'Friday', '1300', '0900', '59584750-e29d-4821-8f1a-c7ebf0286fe2');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('d1496297-bcd4-4ad1-9bf6-b6f749e8948f', 'Friday', '0930', '1530', 'ef64dafc-8176-4d12-9cb0-b4a5a035c30f');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('9f864098-6e1f-4d40-988f-5266e6c5c3e9', 'Friday', '1100', '1200', 'ef64dafc-8176-4d12-9cb0-b4a5a035c30f');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('b5ab4e96-9e29-49a3-afea-1390d28bf31a', 'Tuesday', '1430', '1030', '59584750-e29d-4821-8f1a-c7ebf0286fe2');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('1dae05d9-c7b0-4cab-9a30-ee213643aac6', 'Monday', '0930', '0900', 'df99745f-8dc1-4c93-8e08-2cf1cdec401b');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('acc3a2e6-5301-4591-b764-f99f275c2b10', 'Wednesday', '0930', '1200', 'ef64dafc-8176-4d12-9cb0-b4a5a035c30f');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('88b8bfd9-fb97-41d3-820a-4f504f4c8e16', 'Friday', '0930', '1400', 'caf1254c-f406-4a03-a392-ef5d0e75e0eb');
INSERT INTO "schedule" ("id", "dayOfWeek", "startTime", "endTime", "courseId") VALUES ('5801f14d-9070-4458-833e-74c1e9742d1c', 'Thursday', '1430', '1200', '18b50dad-6a93-40da-9f3f-2e733eea62ee');

INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('dd119fbf-9b20-431c-969d-06bd3c779875', '2024-04-12T16:41:14.931Z', '619b2b2d-3a9f-421a-860d-0b3cb71ae043', '64015613-d723-4ab9-8399-4cacff0fed2b');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('c86950a6-d5af-49d3-a7fb-5668e6a8363a', '2025-05-05T04:13:21.448Z', '619b2b2d-3a9f-421a-860d-0b3cb71ae043', '94e66303-cb25-4d90-8a34-a0fb985b1ce9');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('7d9c3691-4d39-47e7-a622-5ed2ab426253', '2024-04-16T02:08:42.564Z', '975b0dae-dc80-47cb-a912-1945c899b9c5', 'caf1254c-f406-4a03-a392-ef5d0e75e0eb');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('b1dc20ac-6906-4595-9e63-a77225644b35', '2023-10-14T04:39:02.253Z', '975b0dae-dc80-47cb-a912-1945c899b9c5', '64015613-d723-4ab9-8399-4cacff0fed2b');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('3891bdbe-6374-4bc0-af23-8ecdf8af7d9f', '2025-06-07T20:40:52.546Z', 'a9c90561-83ea-472d-88a1-d40be740ad04', 'ef64dafc-8176-4d12-9cb0-b4a5a035c30f');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('ba0c864b-4ea2-4dd8-9bf6-9ba6d684a98b', '2025-03-13T11:44:49.892Z', '43b610a5-b47d-4c6a-93f3-25e0ead780ff', '59584750-e29d-4821-8f1a-c7ebf0286fe2');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('0c3a5bd5-9b24-44eb-845e-bc6e1cf821eb', '2024-05-10T15:07:13.981Z', '9348c591-6849-4c47-84fe-89ddd3119c1b', '18b50dad-6a93-40da-9f3f-2e733eea62ee');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('ff5dbbd0-8e35-41b5-9bf6-6bfadce245c0', '2024-05-08T19:42:47.396Z', '21f9fb2d-f4c1-45f8-b0ea-de9e4f3875b7', '18b50dad-6a93-40da-9f3f-2e733eea62ee');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('1d261909-d7f9-40d4-b99a-e325427b2658', '2024-06-21T00:38:10.142Z', '07ef4542-24e1-4cc7-86bc-649405455084', '18b50dad-6a93-40da-9f3f-2e733eea62ee');
INSERT INTO "enrollment" ("id", "enrollmentDate", "studentId", "courseId") VALUES ('f1e5b13c-d170-4c6e-a249-69567940cec2', '2024-08-11T21:56:13.311Z', 'ccacb1bf-c0e6-4a2e-80e0-f5ae34f6eea8', 'ef64dafc-8176-4d12-9cb0-b4a5a035c30f');

INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('6742b83d-fa5c-4ced-b389-e1a3ac4f7140', '2024-10-22T21:19:04.895Z', 'Unexcused', 'ff5dbbd0-8e35-41b5-9bf6-6bfadce245c0');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('ca8cd28c-9301-4f64-b163-e8fa96ffe2dc', '2024-07-07T17:40:22.593Z', 'Excused', '1d261909-d7f9-40d4-b99a-e325427b2658');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('c19a8ae8-89d8-4741-b137-cce51446fd53', '2023-08-04T07:46:52.255Z', 'Late', '0c3a5bd5-9b24-44eb-845e-bc6e1cf821eb');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('cc8dcad7-52db-4025-bfc6-30088d762de0', '2024-12-17T10:58:26.062Z', 'Excused', 'f1e5b13c-d170-4c6e-a249-69567940cec2');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('59ce4742-5350-436a-97b7-13f04c99df2e', '2024-04-15T00:09:06.927Z', 'Present', 'dd119fbf-9b20-431c-969d-06bd3c779875');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('68caddaa-f8a7-46db-a66d-70b777ceeee3', '2023-11-06T18:00:52.263Z', 'Absent', '7d9c3691-4d39-47e7-a622-5ed2ab426253');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('58e6cb54-cb61-4234-9fd2-d723181dbcc8', '2024-03-13T02:32:13.975Z', 'Absent', '0c3a5bd5-9b24-44eb-845e-bc6e1cf821eb');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('bcfceff4-93d5-4863-a073-c2c1b0b68aa8', '2024-03-07T18:54:54.322Z', 'Absent', '7d9c3691-4d39-47e7-a622-5ed2ab426253');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('0ea734f5-23ca-436c-8eb4-2299dde213b1', '2025-04-16T23:19:40.529Z', 'Unexcused', 'b1dc20ac-6906-4595-9e63-a77225644b35');
INSERT INTO "attendance" ("id", "date", "status", "enrollmentId") VALUES ('e80c03af-5de2-4c73-ad0b-fb40ab9afba7', '2024-12-20T11:13:17.632Z', 'Present', '3891bdbe-6374-4bc0-af23-8ecdf8af7d9f');

INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('82bc7fb5-8e98-453e-a904-8f3a5e4063e3', 'https://i.imgur.com/YfJQV5z.png?id=321', '43b610a5-b47d-4c6a-93f3-25e0ead780ff');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('efb2ce27-bbff-4dfa-9ef5-1aca96d80db0', 'https://i.imgur.com/YfJQV5z.png?id=323', '43b610a5-b47d-4c6a-93f3-25e0ead780ff');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('0d093de7-d2ac-4b57-b678-606d26c60932', 'https://i.imgur.com/YfJQV5z.png?id=325', '9348c591-6849-4c47-84fe-89ddd3119c1b');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('e5a2abf2-2276-41e7-b081-0170bb2befcd', 'https://i.imgur.com/YfJQV5z.png?id=327', '43b610a5-b47d-4c6a-93f3-25e0ead780ff');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('6d39906e-03eb-4cb2-b15c-f2a03faf90fc', 'https://i.imgur.com/YfJQV5z.png?id=329', 'a9c90561-83ea-472d-88a1-d40be740ad04');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('5c3085f3-89f8-4c7c-a563-80fe28fee392', 'https://i.imgur.com/YfJQV5z.png?id=331', 'ccacb1bf-c0e6-4a2e-80e0-f5ae34f6eea8');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('e0c64e38-4a44-4eef-906b-25f2a0c13331', 'https://i.imgur.com/YfJQV5z.png?id=333', 'a9c90561-83ea-472d-88a1-d40be740ad04');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('73b4e762-625d-456b-af2e-e23b977b4823', 'https://i.imgur.com/YfJQV5z.png?id=335', 'ccacb1bf-c0e6-4a2e-80e0-f5ae34f6eea8');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('749f7925-35bb-485f-a3a7-554f14c24d39', 'https://i.imgur.com/YfJQV5z.png?id=337', '975b0dae-dc80-47cb-a912-1945c899b9c5');
INSERT INTO "document" ("id", "documentUrl", "studentId") VALUES ('4a03b19a-ab81-474d-bea5-e355c5d38de2', 'https://i.imgur.com/YfJQV5z.png?id=339', '975b0dae-dc80-47cb-a912-1945c899b9c5');

INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('2288089e-d642-4946-810b-62e2e47d8eac', 41, '2024-02-01T10:35:07.661Z', 'Pending', '21f9fb2d-f4c1-45f8-b0ea-de9e4f3875b7');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('9a2afeb7-f962-4dc4-af35-ad6ef8170031', 289, '2025-05-04T09:07:17.645Z', 'In Progress', '619b2b2d-3a9f-421a-860d-0b3cb71ae043');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('fb660a38-ecfb-4449-b1db-e01cb8c5c57a', 863, '2025-03-15T01:09:12.651Z', 'Overdue', '43b610a5-b47d-4c6a-93f3-25e0ead780ff');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('be7b393e-e6e6-4cb2-b36c-968243058c1a', 595, '2023-11-25T05:37:23.060Z', 'In Progress', '6caa1561-bbd4-464f-99e3-236e7c415556');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('02b8e25c-617d-4a07-a8e5-e0457d663ad7', 3, '2023-12-14T11:05:17.077Z', 'Overdue', '975b0dae-dc80-47cb-a912-1945c899b9c5');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('9935a26a-0b6f-43e6-9eac-450b2529bdbf', 763, '2024-02-27T07:44:26.734Z', 'In Progress', '21f9fb2d-f4c1-45f8-b0ea-de9e4f3875b7');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('9d17de60-92ca-4bbb-9594-c0f8a2bda9f6', 693, '2023-09-03T05:13:42.380Z', 'Overdue', '6caa1561-bbd4-464f-99e3-236e7c415556');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('370cfb4f-9779-4135-b77e-42a648c66f5f', 689, '2023-12-05T09:50:55.915Z', 'Overdue', 'ccacb1bf-c0e6-4a2e-80e0-f5ae34f6eea8');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('61846014-83ba-4d6f-98af-9806f6280b0e', 71, '2023-09-28T01:28:39.391Z', 'Pending', '9348c591-6849-4c47-84fe-89ddd3119c1b');
INSERT INTO "financial" ("id", "amount", "dueDate", "status", "studentId") VALUES ('aa2addae-315c-45e8-afcd-d506271d0362', 378, '2023-12-03T01:46:46.813Z', 'Paid', 'adf05f1b-4153-412e-977f-9c760546cbf5');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
