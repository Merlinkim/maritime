# DP Operator

## Role

DP Operator(DPO)는 시스템 상태와 작업 위험을 감시하고, 설정 변경·고장 대응·작업 중단 또는 철수 판단을 수행한다. DPO는 자동제어를 대신 계산하는 사람이 아니라 **자동화의 전제와 한계가 여전히 유효한지 판단하는 운용자**다.
The DP Operator (DPO) monitors system status and operational risks, and makes judgments regarding setting changes, fault response, work suspension, or withdrawal. The DPO is not a person who calculates instead of automatic control, but rather **an operator who judges whether the premises and limitations of automation are still valid**.

## Core Responsibilities

- 작업 전 DP setup과 redundancy 확인
- DP setup and redundancy check before work
- Power, thruster, sensor와 PRS 구성 확인
- Check configuration of Power, thruster, sensor, and PRS
- Position/heading, 환경조건과 성능 여유의 추세 감시
- Monitor trends of Position/heading, environmental conditions, and performance margin
- Alarm의 원인과 작업에 미치는 영향 판단
- Judge the cause of alarms and their impact on the work
- ASOG 또는 해당 운용 기준에 따른 상태 변경과 보고
- Status change and reporting according to ASOG or relevant operating standards
- 필요 시 안전한 mode 변경, 수동 개입, 작업 중단 및 escape 수행
- Change to a safe mode, manual intervention, work suspension, and escape execution if necessary
- Handover와 log 기록
- Handover and log recording

## Mental Model

```text
고장 또는 환경 변화
Failure or environmental change
→ 어떤 장비와 기능이 영향을 받는가?
→ Which equipment and functions are affected?
→ 현재 redundancy와 추력 여유는 얼마인가?
→ What redundancy and thrust margin remain?
→ 위치 상실 전 안전하게 중단·철수할 시간은 충분한가?
→ Is there enough time to stop the operation and move clear safely before position is lost?
```

## Common Traps

- 경보를 확인했지만 작업 영향은 평가하지 않음
- Confirmed the alarm but did not assess the impact on the work
- 장비 수량만 보고 독립성과 공통고장을 놓침
- Reported only equipment quantity and missed independence and common-mode failures
- 현재 위치오차가 작다는 이유로 악화 추세를 무시함
- Ignored the deteriorating trend because the current position error was small
- 자동제어가 처리할 것이라는 기대 때문에 개입이 늦어짐
- Delayed intervention due to the expectation that automatic control would handle it
- 교대 시 비정상 구성이나 임시조치를 전달하지 않음
- Did not convey abnormal configurations or temporary measures during shift change

## Connections

- 운용 화면: [[HMI]]
- Operation screen: [[HMI]]
- 고장 분석: [[FMEA]]
- Failure analysis: [[FMEA]]
- 운용 판단: [[DP Operations]]
- Operational judgment: [[DP Operations]]
