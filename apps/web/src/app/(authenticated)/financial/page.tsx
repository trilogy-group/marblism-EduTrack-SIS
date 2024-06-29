'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd'
import {
  DollarCircleOutlined,
  FileTextOutlined,
  FundOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function FinancialInformationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [financials, setFinancials] = useState<Model.Financial[]>([])
  const [students, setStudents] = useState<Model.Student[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const financialsFound = await Api.Financial.findMany({
          includes: ['student', 'student.user'],
        })
        setFinancials(financialsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch financial data', { variant: 'error' })
      }
    }

    const fetchStudents = async () => {
      try {
        const studentsFound = await Api.Student.findMany({ includes: ['user'] })
        setStudents(studentsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch students data', { variant: 'error' })
      }
    }

    fetchFinancials()
    fetchStudents()
  }, [])

  const handleAddFinancial = async (values: any) => {
    try {
      await Api.Financial.createOneByStudentId(values.studentId, {
        amount: values.amount,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        status: values.status,
      })
      enqueueSnackbar('Financial record added successfully', {
        variant: 'success',
      })
      setIsModalVisible(false)
      form.resetFields()
      // Refresh financial data
      const financialsFound = await Api.Financial.findMany({
        includes: ['student', 'student.user'],
      })
      setFinancials(financialsFound)
    } catch (error) {
      enqueueSnackbar('Failed to add financial record', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Student Name',
      dataIndex: ['student', 'user', 'name'],
      key: 'studentName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate: string) => dayjs(dueDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Financial Information</Title>
      <Text>
        As an admin, you can track tuition payments and fees, process financial
        aid and scholarships, and generate invoices and receipts.
      </Text>
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Button
          type="primary"
          icon={<DollarCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Financial Record
        </Button>
        <Table dataSource={financials} columns={columns} rowKey="id" />
      </Space>
      <Modal
        title="Add Financial Record"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddFinancial} layout="vertical">
          <Form.Item
            name="studentId"
            label="Student"
            rules={[{ required: true, message: 'Please select a student' }]}
          >
            <Select placeholder="Select a student">
              {students.map(student => (
                <Option key={student.id} value={student.id}>
                  {student.user?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter an amount' }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select a due date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please enter a status' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
