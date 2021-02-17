import React, { useEffect, useState } from "react";
import {
  Table,
  TimePicker,
  Switch,
  Button,
  Col,
  Row,
  message,
  InputNumber,
  Typography,
} from "antd";
import styled from "styled-components";
import ApiCalls from "../../apis/ApiCalls";
import moment from "moment";
import ProfileAvatar from "../../components/ProfileAvatar";

function Schedules() {
  const Wrapper = styled.div`
    @media (min-width: 700px) {
      padding: 24px;
    }
  `;
  const [isAllSlotsActive, setIsAllSlotsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const data = [
    {
      _id: {
        $oid: "602aaa9541be316efcd96779",
      },
      status: "pending",
      buyer: {
        $oid: "602963563c147887182e803e",
      },
      seller: {
        $oid: "602963223c147887182e8036",
      },
      startTime: "10:00",
      endTime: "11:00",
      appointmentDate: {
        $date: "2021-02-14T17:52:22.085Z",
      },
      duration: "60",
    },
    {
      _id: {
        $oid: "602ab5043393dd76824c361b",
      },
      status: "accepted",
      buyer: {
        firstName: "sdsS",
        lastName: "Sdsds",
      },
      seller: {
        $oid: "602963223c147887182e8036",
      },
      startTime: "10:00",
      endTime: "11:00",
      appointmentDate: {
        $date: "2021-02-15T13:52:23.023Z",
      },
      duration: "60",
    },
  ];
  useEffect(() => {
    const params = {};
    ApiCalls.getAppointments(params).then((res) => {
      setAppointments(res);
    });
  }, []);

  const StatusButtons = (status) => {
    return (
      <>
        {
          {
            pending: (
              <Row gutter={8} justify="center">
                <Col>
                  <Button type="default">Reject</Button>
                </Col>
                <Col>
                  <Button type="primary">Accept</Button>
                </Col>
              </Row>
            ),
            accepted: <Button disabled={true}>Accepted</Button>,
            rejected: <Button disabled={true}>Rejected</Button>,
          }[status]
        }
      </>
    );
  };

  return (
    <Wrapper>
      <Table
        dataSource={appointments}
        loading={loading}
        tableLayout="fixed"
        title={() => (
          <Typography.Title level={3} type="secondary">
            Appointments
          </Typography.Title>
        )}
      >
        <Table.Column
          title={<Typography.Title level={5}>Buyer</Typography.Title>}
          dataIndex="buyer"
          align="left"
          render={(buyer, record, index) => (
            <Row gutter={8}>
              <Col>
                <ProfileAvatar url={buyer.profilePic} />
              </Col>
              <Col>
                <Typography.Text>{`${buyer.firstName} ${
                  buyer.lastName || ""
                }`}</Typography.Text>
              </Col>
            </Row>
          )}
        />
        <Table.Column
          title={<Typography.Title level={5}>Date</Typography.Title>}
          dataIndex="appointmentDate"
          align="center"
          render={(item, record) => (
            <Typography.Text> {moment(item).format("D-MMM-yyy")}</Typography.Text>
          )}
        />
        <Table.Column
          title={<Typography.Title level={5}>Start Time</Typography.Title>}
          dataIndex="startTime"
          align="center"
        />
        <Table.Column
          title={<Typography.Title level={5}>End Time</Typography.Title>}
          dataIndex="endTime"
          align="center"
        />
        <Table.Column
          dataIndex="status"
          align="center"
          render={(status, record) => StatusButtons(status)}
        />
      </Table>
    </Wrapper>
  );
}

export default Schedules;
