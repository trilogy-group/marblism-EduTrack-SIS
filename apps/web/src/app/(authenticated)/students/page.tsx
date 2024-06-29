'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Upload,
  Table,
  Space,
  Modal,
} from 'antd'
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function StudentProfilesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [students, setStudents] = useState<Model.Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Model.Student | null>(
    null,
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsFound = await Api.Student.findMany({
          includes: ['user', 'parent.user'],
        })
        setStudents(studentsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch students', { variant: 'error' })
      }
    }

    fetchStudents()
  }, [])

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  const handleCreateOrUpdateStudent = async (
    values: Partial<Model.Student>,
  ) => {
    try {
      if (selectedStudent) {
        await Api.Student.updateOne(selectedStudent.id, values)
        enqueueSnackbar('Student updated successfully', { variant: 'success' })
      } else {
        await Api.Student.createOneByUserId(userId, values)
        enqueueSnackbar('Student created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      setSelectedStudent(null)
      const studentsFound = await Api.Student.findMany({
        includes: ['user', 'parent.user'],
      })
      setStudents(studentsFound)
    } catch (error) {
      enqueueSnackbar('Failed to save student', { variant: 'error' })
    }
  }

  const handleEditStudent = (student: Model.Student) => {
    setSelectedStudent(student)
    setIsModalVisible(true)
  }

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await Api.Student.updateOne(studentId, {
        dateDeleted: dayjs().toISOString(),
      })
      enqueueSnackbar('Student deleted successfully', { variant: 'success' })
      const studentsFound = await Api.Student.findMany({
        includes: ['user', 'parent.user'],
      })
      setStudents(studentsFound)
    } catch (error) {
      enqueueSnackbar('Failed to delete student', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditStudent(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStudent(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Student Profiles</Title>
      <Text>
        Manage student profiles, upload documents, and track attendance records.
      </Text>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ margin: '20px 0' }}
      >
        Add Student
      </Button>
      <Table dataSource={students} columns={columns} rowKey="id" />

      <Modal
        title={selectedStudent ? 'Edit Student' : 'Add Student'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedStudent(null)
        }}
        footer={null}
      >
        <Form
          initialValues={selectedStudent || { grade: '', parentId: '' }}
          onFinish={handleCreateOrUpdateStudent}
        >
          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: 'Please input the grade!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="parentId"
            label="Parent ID"
            rules={[{ required: true, message: 'Please input the parent ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Upload Document">
            <Upload
              fileList={fileList}
              customRequest={handleUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedStudent ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
