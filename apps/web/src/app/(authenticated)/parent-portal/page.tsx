'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  List,
  Avatar,
} from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ParentPortalPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [parent, setParent] = useState<Model.Parent | null>(null)
  const [students, setStudents] = useState<Model.Student[]>([])
  const [teachers, setTeachers] = useState<Model.Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.Parent.findManyByUserId(userId, {
        includes: ['students.user', 'students.enrollments.course.teacher.user'],
      })
        .then(parents => {
          if (parents.length > 0) {
            setParent(parents[0])
            setStudents(parents[0].students || [])
            const teacherIds = new Set(
              parents[0].students?.flatMap(student =>
                student.enrollments?.map(
                  enrollment => enrollment.course?.teacher?.userId,
                ),
              ) || [],
            )
            if (teacherIds.size > 0) {
              Api.Teacher.findMany({
                filters: { userId: { in: Array.from(teacherIds) } },
                includes: ['user'],
              }).then(teachers => setTeachers(teachers))
            }
          }
        })
        .catch(error => {
          enqueueSnackbar('Failed to load data', { variant: 'error' })
        })
        .finally(() => setLoading(false))
    }
  }, [userId])

  const handleUpdateContact = (values: Partial<Model.Parent>) => {
    if (parent?.id) {
      Api.Parent.updateOne(parent.id, values)
        .then(updatedParent => {
          setParent(updatedParent)
          enqueueSnackbar('Contact information updated successfully', {
            variant: 'success',
          })
        })
        .catch(error => {
          enqueueSnackbar('Failed to update contact information', {
            variant: 'error',
          })
        })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>Parent Portal</Title>
          <Paragraph>
            Stay informed about your child's academic performance, update your
            contact information, and communicate with teachers.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="My Contact Information" loading={loading}>
            <Form
              layout="vertical"
              initialValues={{ phoneNumber: parent?.phoneNumber }}
              onFinish={handleUpdateContact}
            >
              <Form.Item name="phoneNumber" label="Phone Number">
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Enter your phone number"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Contact Information
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="My Child's Progress" loading={loading}>
            <List
              itemLayout="horizontal"
              dataSource={students}
              renderItem={student => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={student.user?.name}
                    description={`Grade: ${student.grade}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Communicate with Teachers" loading={loading}>
            <List
              itemLayout="horizontal"
              dataSource={teachers}
              renderItem={teacher => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<MailOutlined />} />}
                    title={teacher.user?.name}
                    description={
                      <a href={`mailto:${teacher.user?.email}`}>
                        <MessageOutlined /> Send Email
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
