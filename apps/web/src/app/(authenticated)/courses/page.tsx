'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Select,
  Table,
  Modal,
  Space,
  Row,
  Col,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CoursesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [courses, setCourses] = useState<Model.Course[]>([])
  const [teachers, setTeachers] = useState<Model.Teacher[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Model.Course | null>(null)

  const [form] = Form.useForm()

  useEffect(() => {
    fetchCourses()
    fetchTeachers()
  }, [])

  const fetchCourses = async () => {
    try {
      const coursesFound = await Api.Course.findMany({
        includes: ['teacher', 'teacher.user'],
      })
      setCourses(coursesFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch courses', { variant: 'error' })
    }
  }

  const fetchTeachers = async () => {
    try {
      const teachersFound = await Api.Teacher.findMany({ includes: ['user'] })
      setTeachers(teachersFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch teachers', { variant: 'error' })
    }
  }

  const handleAddCourse = () => {
    setEditingCourse(null)
    setIsModalVisible(true)
  }

  const handleEditCourse = (course: Model.Course) => {
    setEditingCourse(course)
    setIsModalVisible(true)
    form.setFieldsValue(course)
  }

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await Api.Course.deleteOne(courseId)
      enqueueSnackbar('Course deleted successfully', { variant: 'success' })
      fetchCourses()
    } catch (error) {
      enqueueSnackbar('Failed to delete course', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingCourse) {
        await Api.Course.updateOne(editingCourse.id, values)
        enqueueSnackbar('Course updated successfully', { variant: 'success' })
      } else {
        await Api.Course.createOneByTeacherId(values.teacherId, values)
        enqueueSnackbar('Course created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchCourses()
    } catch (error) {
      enqueueSnackbar('Failed to save course', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Teacher',
      dataIndex: ['teacher', 'user', 'name'],
      key: 'teacher',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Model.Course) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCourse(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCourse(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Course Management</Title>
          <Text>Manage courses, assign teachers, and set up schedules.</Text>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddCourse}
            style={{ marginBottom: 16 }}
          >
            Add Course
          </Button>
          <Table columns={columns} dataSource={courses} rowKey="id" />
        </Col>
      </Row>
      <Modal
        title={editingCourse ? 'Edit Course' : 'Add Course'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Course Name"
            rules={[
              { required: true, message: 'Please input the course name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input the course description!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="teacherId"
            label="Teacher"
            rules={[{ required: true, message: 'Please select a teacher!' }]}
          >
            <Select placeholder="Select a teacher">
              {teachers.map(teacher => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.user?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
