import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TimePicker,
  Switch,
  Button,
  Col,
  Row,
  Input,
  message,
  InputNumber,
} from "antd";
import days from "../../constants/days";
import styled from "styled-components";
import ApiCalls from "../../apis/ApiCalls";
import moment from "moment";
import useDebounce from "../../utils/useDebounce";
const { RangePicker } = TimePicker;

function TimeSlots() {
  const Wrapper = styled.div`
    @media (min-width: 700px) {
      padding: 24px;
    }
  `;
  const [timeSlots, setTimeSlots] = useState(days);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
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
    const result = await timeSlots.forEach((item) => {
      if (item.status === "enabled") {
        if (!item.startTime || !item.endTime || !item.duration) {
          message.error(`The values for ${item.day} not found`);
          setValidated(false);
        }
      }
    });
    setValidated(true)
    if (validated) {
      ApiCalls.saveTimeSlots({timeSlots:timeSlots}).then((res) => {
        console.log(res);
      });
    }
  }
  useEffect(() => {
    setLoading(true);
    ApiCalls.getUserProfile()
      .then((res) => {
        setLoading(false);
        setTimeSlots(res.timeSlots);
      })
      .catch((e) => {
        if (e.response) {
          message.error(e.response.message);
        }
      });
  }, []);

  return (
    <Wrapper>
      <Table
        dataSource={timeSlots}
        pagination={{ position: ["none", "none"] }}
        loading={loading}
        title={() => (
          <Row justify="space-between" align="middle" gutter={24}>
            <Col>
              <h3>Available times</h3>
            </Col>
            <Col>
              <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
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
          render={(item, record, index) => (
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
              disabled={record.status === "disabled"}
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
              disabled={record.status === "disabled"}
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
            />
          )}
        />
      </Table>
    </Wrapper>
  );
}

export default TimeSlots;
