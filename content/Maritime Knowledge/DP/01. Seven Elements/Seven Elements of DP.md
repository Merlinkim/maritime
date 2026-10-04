---
aliases:
  - DP Seven Elements
---

# Seven Elements of DP

Seven Elements는 DP를 **학습하고 운용 상태를 점검하기 위한 기능적 관점**이다. 전력에서 시작해 추력을 만들고, 센서와 기준시스템으로 결과를 확인하며, 제어기·화면·운용자가 전체 과정을 닫힌 고리로 연결한다.
Seven Elements is a **functional perspective for learning and checking the operational status of DP**. It starts from power, creates thrust, confirms results with sensors and reference systems, and the controller, HMI, and operator connect the entire process in a closed loop.

> [!important]
> Seven Elements는 IMO의 공식 하위 시스템 분류가 아니다. 공식 분류는 [[Three Sub-systems of DP]]이며, Seven Elements는 장비와 인간 요소를 더 세분하여 이해하기 위한 틀이다.
> Seven Elements is not an official IMO sub-system classification. The official classification is [[Three Sub-systems of DP]], and Seven Elements is a framework to understand equipment and human elements in more detail.

## The Seven Elements

**한국어**

| Element | 핵심 역할 | 핵심 질문 |
|---|---|---|
| [[Power]] | DP 장비와 추진기에 전력 공급 | 필요한 전력을 고장 후에도 공급할 수 있는가? |
| [[Thrusters]] | 전력을 실제 Force와 Moment로 변환 | 명령한 추력이 실제로 발생하는가? |
| [[Environmental Sensors]] | 바람과 선박 운동 측정 | 외력과 선체 운동을 신뢰성 있게 측정하는가? |
| [[Position Reference Systems]] | 위치 또는 상대 위치 제공 | 현재 위치를 독립적으로 확인할 수 있는가? |
| [[DP Controller]] | 상태 추정, 제어 계산, 추력 배분 | 오차를 어떤 추력 명령으로 바꾸는가? |
| [[HMI]] | 상태·경보 표시와 운용 입력 제공 | 운용자가 상황을 정확히 이해하고 조작할 수 있는가? |
| [[DP Operator]] | 감시, 판단, 개입 및 작업 중단 결정 | 시스템의 한계와 변화 추세를 알아차리는가? |

**English**

| Element | Core Role | Key Question |
|---|---|---|
| [[Power]] | Supplying power to DP equipment and thrusters | Can the necessary power be supplied even after a failure? |
| [[Thrusters]] | Converting power into actual Force and Moment | Is the commanded thrust actually generated? |
| [[Environmental Sensors]] | Measuring wind and vessel motion | Are external forces and vessel motion measured reliably? |
| [[Position Reference Systems]] | Providing position or relative position | Can the current position be independently confirmed? |
| [[DP Controller]] | State estimation, control calculation, thrust allocation | How are errors converted into thrust commands? |
| [[HMI]] | Providing status/alarm display and operational input | Can the operator accurately understand and operate the situation? |
| [[DP Operator]] | Monitoring, judgment, intervention, and decision to stop operation | Is the system's limit and trend noticed? |

## Functional Flow

```text
Power → Thrusters → Vessel response
                    ↑            ↓
DP Operator ↔ HMI ↔ DP Controller
                    ↑
     Environmental Sensors + Position References
```

어느 한 요소도 단독으로 DP 성능을 보장하지 않는다. 위치 기준이 정확해도 추력 여유가 없으면 위치를 유지할 수 없고, 장비가 정상이어도 운용자가 경보와 추세를 잘못 해석하면 안전한 작업을 지속할 수 없다.
No single element guarantees DP performance. Even if the position reference is accurate, if there is no thrust reserve, the position cannot be maintained, and even if the equipment is normal, if the operator misinterprets alarms and trends, safe operation cannot continue.

## Relationship to the IMO View

**한국어**

| Seven Elements | 주로 대응하는 IMO 하위 시스템 |
|---|---|
| Power | [[Power System (IMO)]] |
| Thrusters | [[Thruster System (IMO)]] |
| Environmental Sensors | [[DP Control System (IMO)]] |
| Position Reference Systems | [[DP Control System (IMO)]] |
| DP Controller | [[DP Control System (IMO)]] |
| HMI | [[DP Control System (IMO)]] |
| DP Operator | 하위 시스템 외부의 인간 운용 요소 |

**English**

| Seven Elements | Corresponding IMO Sub-system |
|---|---|
| Power | [[Power System (IMO)]] |
| Thrusters | [[Thruster System (IMO)]] |
| Environmental Sensors | [[DP Control System (IMO)]] |
| Position Reference Systems | [[DP Control System (IMO)]] |
| DP Controller | [[DP Control System (IMO)]] |
| HMI | [[DP Control System (IMO)]] |
| DP Operator | Human operational element outside the sub-system |

실제 선박에서는 PMS, 네트워크, 인터페이스처럼 여러 시스템의 경계에 걸친 장비도 존재한다.
In actual vessels, there are also pieces of equipment that span across the boundaries of multiple systems, such as PMS, network, and interface.

## Study Order

1. [[Power]]
2. [[Thrusters]]
3. [[Environmental Sensors]]
4. [[Position Reference Systems]]
5. [[DP Controller]]
6. [[HMI]]
7. [[DP Operator]]
8. [[Three Sub-systems of DP]]에서 공식 경계와 다시 비교
8. Re-comparing with the official boundaries in [[Three Sub-systems of DP]]

## References

- [USCG — Dynamic Positioning Systems Overview](https://www.dco.uscg.mil/OCSNCOE/DP/Overview/)
- [The Nautical Institute — What is Dynamic Positioning?](https://www.nautinst.org/resources-page/what-is-dynamic-positioning.html)
