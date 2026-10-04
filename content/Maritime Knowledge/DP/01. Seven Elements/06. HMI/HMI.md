# HMI

## Role

HMI(Human–Machine Interface)는 DP 시스템의 상태를 보여주고 운용자의 입력을 받는 경계다. 화면이 예쁜 것보다 **현재 mode, setpoint, 장비 상태, 경보, 성능 여유와 변화 추세**를 오해 없이 전달하는 것이 중요하다.
HMI(Human–Machine Interface) is the boundary that displays the status of the DP system and receives operator input. It is more important to accurately convey the **current mode, setpoint, equipment status, alarms, performance margin, and change trends** than to have a visually appealing screen.

## Information to Present

- Vessel position, heading, target과 error
- Vessel position, heading, target and error
- DP mode와 control gain
- DP mode and control gain
- 선택된 PRS와 sensor 상태
- Selected PRS and sensor status
- Thruster command, feedback와 가용 상태
- Thruster command, feedback, and availability status
- Generator, bus와 power reserve
- Generator, bus and power reserve
- Alarm, warning와 event history
- Alarm, warning, and event history
- Environmental data와 capability 관련 정보
- Environmental data and capability related information

## Human-Factor Principles

- 중요한 경보는 원인과 예상 영향을 구분할 수 있어야 한다.
- Critical alerts must distinguish between cause and expected impact.
- 색상만으로 상태를 구분하지 않고 문자·형상도 함께 사용한다.
- Uses characters and shapes, not just color, to distinguish states.
- 자동화가 수행 중인 동작과 운용자가 해야 할 동작을 명확히 표시한다.
- Clearly indicates the actions performed by automation and the actions required by the operator.
- 자주 쓰는 기능은 일관된 위치와 조작 논리를 유지한다.
- Frequently used functions maintain consistent location and operation logic.
- 화면 전환 중에도 안전 핵심 정보가 사라지지 않도록 한다.
- Ensure that critical safety information does not disappear even during screen transitions.

## Common Risks

- Alarm flood로 핵심 고장을 놓침
- Missed core failure due to alarm flood
- 잘못된 mode 또는 control station 선택
- Incorrect mode or control station selection
- 화면상 정상 표시와 실제 field 상태의 불일치
- Discrepancy between the normal display on the screen and the actual field status
- 단위, reference frame 또는 방향 표기의 혼동
- Confusion regarding units, reference frames, or directional notation
- 자동화 의존으로 인한 상황인식 저하
- Reduced situational awareness due to automation dependency

## Connections

- 정보 생성: [[DP Controller]]
- Information generation: [[DP Controller]]
- 최종 판단과 조작: [[DP Operator]]
- Final judgment and operation: [[DP Operator]]
- 공식 시스템 경계: [[DP Control System (IMO)]]
- Official system boundary: [[DP Control System (IMO)]]
