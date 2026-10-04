# Power

## Role

Power는 발전에서 배전까지, DP 제어장치와 추진 시스템이 작동하는 데 필요한 에너지를 공급한다. 핵심은 단순한 총 발전용량이 아니라 **현재 부하, 예비력, 배전 구성, 고장 후 잔존 능력**이다.
Power supplies the energy required for the DP control system and propulsion system, from generation to distribution. The key is not the simple total generation capacity, but **current load, reserve capacity, distribution configuration, and residual capability after failure**.

## Main Components

- Prime mover와 Generator
- Prime mover and Generator
- Main switchboard, busbar와 bus-tie
- Main switchboard, busbar and bus-tie
- Transformer, converter와 distribution board
- Transformer, converter and distribution board
- Power Management System (PMS)
- UPS와 제어전원
- UPS and control power supply
- 연료, 냉각수, 윤활유, 환기 등 보조계통
- Auxiliary systems such as fuel, cooling water, lubricating oil, and ventilation

## What to Monitor

- 온라인 발전기 수와 spinning reserve
- Number of online generators and spinning reserve
- 각 발전기의 부하 및 load-sharing
- Load of each generator and load-sharing
- Bus configuration과 bus-tie 상태
- Bus configuration and bus-tie status
- 과부하, 전압·주파수 이상 경보
- Overload, voltage/frequency abnormal alarms
- PMS 상태와 자동 기동 가능 여부
- PMS status and automatic start capability
- 작업 중 예상되는 큰 부하 변화
- Expected large load changes during operation

## Typical Failure Effects

- Generator trip 또는 engine failure
- Generator trip or engine failure
- Switchboard fault와 blackout
- Switchboard fault and blackout
- Bus-tie 또는 보호계전기의 부적절한 동작
- Improper operation of bus-tie or protective relay
- PMS, governor 또는 AVR failure
- PMS, governor or AVR failure
- 공통 보조계통 상실로 인한 다수 발전기 동시 영향
- Simultaneous impact of multiple generators due to common auxiliary system loss

전력계통을 볼 때는 개별 장비 고장뿐 아니라 하나의 고장이 여러 장비에 동시에 미치는 **common cause**와 [[Worst Case Failure Design Intent]]를 함께 검토한다.
When viewing the power system, one must review not only individual equipment failures but also the **common cause** and [[Worst Case Failure Design Intent]] that a single failure can have on multiple pieces of equipment.

## Connections

- 공식 시스템 경계: [[Power System (IMO)]]
- Official system boundary: [[Power System (IMO)]]
- 다음 요소: [[Thrusters]]
- Following elements: [[Thrusters]]
- 검증 방법: [[FMEA]]
- Verification method: [[FMEA]]
