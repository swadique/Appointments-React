import React, { useContext, useEffect, useState } from "react";
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
import days from "../../constants/days";
import styled from "styled-components";
import ApiCalls from "../../apis/ApiCalls";
import moment from "moment";
import useDebounce from "../../utils/useDebounce";
import UserContext from "../../contexts/userContext";
const { RangePicker } = TimePicker;

function TimeSlots() {
  const Wrapper = styled.div`
    @media (min-width: 700px) {
      padding: 24px;
    }
  `;
  const [timeSlots, setTimeSlots] = useState(days);
  const [isAllSlotsActive, setIsAllSlotsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { userData } = useContext(UserContext);

  function timeHandler(e, record) {
    try {
      setTimeSlots((oldSlot) => {
        let tempArray = [...oldSlot];
        const index = tempArray.findIndex(
          (item) => item.slotId === record.slotId
        );
        tempArray[index] = {
          ...oldSlot[index],
          startTime: moment(e[0]).format("HH:mm"),
          endTime: moment(e[1]).format("HH:mm"),
        };
        console.log(tempArray, "tempArray");
        return tempArray;
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  const debouncedDurationHandler = useDebounce(durationHandler, 500);

  function durationHandler(e, record) {
    try {
      console.log(e);
      setTimeSlots((oldSlot) => {
        let tempArray = [...oldSlot];
        const index = tempArray.findIndex(
          (item) => item.slotId === record.slotId
        );
        tempArray[index] = {
          ...oldSlot[index],
          duration: e,
        };
        console.log(tempArray, "tempArray");
        return tempArray;
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  function statusHandler(e, record) {
    setTimeSlots((oldSlot) => {
      let tempArray = [...oldSlot];
      const index = tempArray.findIndex(
        (item) => item.slotId === record.slotId
      );
      tempArray[index] = {
        ...oldSlot[index],
        status: e ? "enabled" : "disabled",
      };
      console.log(tempArray, "tempArray");
      return tempArray;
    });
    console.log(e, record);
  }
  async function handleSubmit() {
    setButtonLoading(true);
    new Promise((response, reject) => {
      timeSlots.forEach((item) => {
        if (item.status === "enabled") {
          if (!item.startTime || !item.endTime || !item.duration) {
            reject(`The values for ${item.day} is missing`);
          }
        }
      });
      response(true);
    })
      .then((res) => {
        if (res) {
          ApiCalls.saveTimeSlots({ timeSlots: timeSlots, isAllSlotsActive })
            .then((res) => {
              setButtonLoading(false);
              message.success("Slots Updated");
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
              if (e.response) {
                message.error(e.response.data);
              } else {
                message.error("Something went wrong");
              }
            });
        }
      })
      .catch((error) => {
        message.error(error);
        setButtonLoading(false);
      });
  }
  useEffect(() => {
    if (userData.timeSlots) {
      setTimeSlots(userData.timeSlots);
      setIsAllSlotsActive(userData.isAllSlotsActive);
    }
  }, [userData]);
  useEffect(() => {
    setLoading(true);
    ApiCalls.getUserProfile()
      .then((res) => {
        setLoading(false);
        setTimeSlots(res.timeSlots);
        setIsAllSlotsActive(res.isAllSlotsActive);
      })
      .catch((e) => {
        if (e.response) {
          message.error(e.response.message);
          setLoading(false);
        }
      });
  }, []);

  return (
    <Wrapper>
      <Table
        dataSource={timeSlots}
        pagination={false}
        loading={loading}
        tableLayout="fixed"
        title={() => (
          <Row justify="space-between" align="middle" gutter={24}>
            <Col>
              <Typography.Title level={3} type="secondary">
                Available times
              </Typography.Title>
            </Col>
            <Col>
              <Switch
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
                checked={isAllSlotsActive}
                onChange={(value) => setIsAllSlotsActive(value)}
              />
            </Col>
          </Row>
        )}
        footer={() => (
          <Row justify="end" gutter={24}>
            <Col>
              <Button
                shape="round"
                type="primary"
                size="large"
                onClick={handleSubmit}
                loading={buttonLoading}
              >
                Save
              </Button>
            </Col>
            <Col span={1} />
          </Row>
        )}
      >
        <Table.Column title="Day" dataIndex="day" align="left" />
        <Table.Column
          title="Interval"
          dataIndex="timeslot"
          align="center"
          render={(item, record) => (
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="HH:mm"
              onChange={(e) => timeHandler(e, record)}
              value={[
                record.startTime
                  ? moment(record.startTime, "HH:mm")
                  : undefined,
                record.endTime ? moment(record.endTime, "HH:mm") : undefined,
              ]}
              clearIcon={false}
              disabled={!isAllSlotsActive ? true : record.status === "disabled"}
            />
          )}
        />
        <Table.Column
          title="Duration"
          dataIndex="duration"
          align="center"
          render={(item, record) => (
            <InputNumber
              placeholder="duration"
              onChange={(e) => debouncedDurationHandler(e, record)}
              disabled={!isAllSlotsActive ? true : record.status === "disabled"}
              value={record.duration}
            />
          )}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          align="center"
          render={(item, record) => (
            <Switch
              onChange={(e) => statusHandler(e, record)}
              checked={item === "enabled"}
              disabled={!isAllSlotsActive}
            />
          )}
        />
      </Table>
    </Wrapper>
  );
}

export default TimeSlots;
