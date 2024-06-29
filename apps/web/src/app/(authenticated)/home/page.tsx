'use client'

import { useEffect, useState } from 'react'
import { Row, Col, Card, Typography, Spin } from 'antd'
import {
  UserOutlined,
  NotificationOutlined,
  TeamOutlined,
  BookOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<Model.User | null>(null)
  const [notifications, setNotifications] = useState<Model.Notification[]>([])
  const [parents, setParents] = useState<Model.Parent[]>([])
  const [students, setStudents] = useState<Model.Student[]>([])
  const [teachers, setTeachers] = useState<Model.Teacher[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await Api.User.findOne(userId, {
            includes: ['notifications', 'parents', 'students', 'teachers'],
          })
          const notificationsData = await Api.Notification.findManyByUserId(
            userId,
            { includes: ['user'] },
          )
          const parentsData = await Api.Parent.findManyByUserId(userId, {
            includes: ['user', 'students'],
          })
          const studentsData = await Api.Student.findManyByUserId(userId, {
            includes: ['user', 'parent'],
          })
          const teachersData = await Api.Teacher.findManyByUserId(userId, {
            includes: ['user', 'courses'],
          })

          setUser(userData)
          setNotifications(notificationsData)
          setParents(parentsData)
          setStudents(studentsData)
          setTeachers(teachersData)
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Dashboard Overview</Title>
      <Text>Quickly assess the system's status with key metrics below.</Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4}>Users</Title>
            <Text>{user ? '1' : '0'}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <NotificationOutlined
              style={{ fontSize: '24px', color: '#1890ff' }}
            />
            <Title level={4}>Notifications</Title>
            <Text>{notifications.length}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4}>Parents</Title>
            <Text>{parents.length}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4}>Students</Title>
            <Text>{students.length}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={4}>Teachers</Title>
            <Text>{teachers.length}</Text>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
