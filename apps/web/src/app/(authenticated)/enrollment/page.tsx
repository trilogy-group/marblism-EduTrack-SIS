'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Button, Select, List, Card, Spin } from 'antd'
import { PlusOutlined, MinusOutlined, LoadingOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EnrollmentPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [students, setStudents] = useState<Model.Student[]>([])
  const [courses, setCourses] = useState<Model.Course[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (userId) {
      fetchStudents()
      fetchCourses()
    }
  }, [userId])

  const fetchStudents = async () => {
    try {
      const studentsFound = await Api.Student.findManyByUserId(userId, {
        includes: ['user', 'enrollments.course'],
      })
      setStudents(studentsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch students', { variant: 'error' })
    }
  }

  const fetchCourses = async () => {
    try {
      const coursesFound = await Api.Course.findMany({ includes: ['teacher'] })
      setCourses(coursesFound)
      setLoading(false)
    } catch (error) {
      enqueueSnackbar('Failed to fetch courses', { variant: 'error' })
      setLoading(false)
    }
  }

  const handleEnroll = async (courseId: string) => {
    if (!selectedStudent) {
      enqueueSnackbar('Please select a student first', { variant: 'info' })
      return
    }
    try {
      await Api.Enrollment.createOneByStudentId(selectedStudent, { courseId })
      enqueueSnackbar('Enrolled successfully', { variant: 'success' })
      fetchStudents() // Refresh student data
    } catch (error) {
      enqueueSnackbar('Failed to enroll', { variant: 'error' })
    }
  }

  const handleDrop = async (enrollmentId: string) => {
    try {
      await Api.Enrollment.deleteOne(enrollmentId)
      enqueueSnackbar('Dropped successfully', { variant: 'success' })
      fetchStudents() // Refresh student data
    } catch (error) {
      enqueueSnackbar('Failed to drop course', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title>Course Enrollment</Title>
          <Paragraph>
            As a student, you can register for courses, manage your course load,
            and handle waitlists for popular courses.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Select
            placeholder="Select a student"
            style={{ width: 200 }}
            onChange={value => setSelectedStudent(value)}
          >
            {students.map(student => (
              <Option key={student.id} value={student.id}>
                {student.user?.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={12}>
          <Title level={3}>Available Courses</Title>
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={courses}
              renderItem={course => (
                <List.Item>
                  <Card
                    title={course.name}
                    extra={
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => handleEnroll(course.id)}
                      >
                        Enroll
                      </Button>
                    }
                  >
                    <Text>{course.description}</Text>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Col>
        <Col span={12}>
          <Title level={3}>Current Enrollments</Title>
          {selectedStudent ? (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={
                students.find(student => student.id === selectedStudent)
                  ?.enrollments
              }
              renderItem={enrollment => (
                <List.Item>
                  <Card
                    title={enrollment?.course?.name}
                    extra={
                      <Button
                        type="danger"
                        icon={<MinusOutlined />}
                        onClick={() => handleDrop(enrollment.id)}
                      >
                        Drop
                      </Button>
                    }
                  >
                    <Text>{enrollment?.course?.description}</Text>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <Text>Select a student to view enrollments</Text>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
