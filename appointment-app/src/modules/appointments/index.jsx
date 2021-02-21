import React, { useEffect, useState } from "react";
import { Table, Button, Col, Row, message, Typography } from "antd";
import styled from "styled-components";
import ApiCalls from "../../apis/ApiCalls";
import moment from "moment";
import ProfileAvatar from "../../components/ProfileAvatar";

const Wrapper = styled.div`
  @media (min-width: 700px) {
    padding: 24px;
  }
`;

function Schedules() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  function fetchAppointments() {
    const params = {};
    setLoading(true);
    ApiCalls.getAppointments(params)
      .then((res) => {
        setLoading(false);
        setAppointments(res);
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data);
        } else {
          message.error("Server not responding");
        }
      });
  }

  function handleAccept(appointmentId) {
    ApiCalls.acceptAppointment({ appointmentId })
      .then(() => {
        fetchAppointments();
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data);
        } else {
          message.error("Server not responding");
        }
      });
  }
  function handleReject(appointmentId) {
    ApiCalls.rejectAppointment({ appointmentId })
      .then(() => {
        fetchAppointments();
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data);
        } else {
          message.error("Server not responding");
        }
      });
  }

  const StatusButtons = (status, record) => {
    return (
      <>
        {
          {
            pending: (
              <Row gutter={8} justify="center">
                <Col>
                  <Button
                    type="default"
                    onClick={() => handleReject(record._id)}
                  >
                    Reject
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => handleAccept(record._id)}
                  >
                    Accept
                  </Button>
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
        pagination={false}
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
          render={(buyer) => (
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
          render={(item) => (
            <Typography.Text>
              {" "}
              {moment(item).format("D-MMM-yyy")}
            </Typography.Text>
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
          render={(status, record) => StatusButtons(status, record)}
        />
      </Table>
    </Wrapper>
  );
}

export default Schedules;
