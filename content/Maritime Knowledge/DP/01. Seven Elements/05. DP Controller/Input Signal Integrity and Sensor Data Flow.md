# Input Signal Integrity and Sensor Data Flow

## Definition

Input signal integrity means that the data entering the DP control system is believable, timely, and correctly interpreted.
Input signal integrity는 DP control system으로 들어오는 데이터가 믿을 만하고, 제때 들어오며, 올바르게 해석되는 상태를 뜻한다.

At induction level, the key idea is simple: sensor value is not reality itself.
Induction 수준에서 핵심은 단순하다. 센서값은 현실 그 자체가 아니다.

## Basic Data Flow

```text
Physical value
  ↓
Sensor
  ↓
Signal / data output
  ↓
DP input interface
  ↓
Validation and filtering
  ↓
State estimation
  ↓
DP controller
```

## Common Signal Types

| Signal type | Examples | DP use |
|---|---|---|
| Analog | 4-20 mA, 0-10 V | Simple sensor values and feedback |
| Serial | RS-232, RS-422, NMEA 0183 | Gyro, GNSS, wind sensor |
| Ethernet | UDP/TCP, vendor protocol | Modern PRS, DP networks, HMI |
| Fieldbus | CAN, Modbus, Profibus | Thruster, PMS, machinery interface |
| Discrete | Relay/contact | Ready, running, alarm, fault status |

## Common Error Types

| Error | Meaning | DP concern |
|---|---|---|
| Noise | Small random variation | Thruster hunting if followed directly |
| Bias / offset | Constant error | Wrong position or heading estimate |
| Drift | Slowly changing error | Gyro and sensor reference issue |
| Delay | Late data | Controller acts on old information |
| Dropout | Data loss | Loss of redundancy or reference |
| Spike / jump | Sudden false value | False position or heading error |
| Scaling error | Wrong conversion | Incorrect value from correct signal |
| Sign error | Direction reversed | Feedback may act the wrong way |
| Coordinate error | Wrong axis/frame | Force direction or position correction error |

## Induction-Level Examples

### False Wind Input

Wind sensor shows wind even when the vessel feels nearly calm.
선박 주변은 거의 무풍처럼 느껴지는데 wind sensor가 바람을 표시할 수 있다.

If wind feed-forward uses that value, DP may generate unnecessary thrust.
그 값이 wind feed-forward에 사용되면 DP가 불필요한 추력을 만들 수 있다.

### PRS Jump

A GNSS or other PRS may suddenly jump.
GNSS 또는 다른 PRS 값이 갑자기 튈 수 있다.

The DP system should validate the jump before treating it as real vessel movement.
DP system은 그것을 실제 선박 이동으로 보기 전에 검증해야 한다.

### Gyro Heading Error

Heading input affects coordinate transformation.
Heading input은 좌표 변환에 영향을 준다.

A small heading error can make surge/sway force direction wrong.
작은 heading error도 surge/sway force 방향을 틀리게 만들 수 있다.

### MRU Compensation Error

MRU helps compensate antenna or transducer movement caused by roll, pitch, and heave.
MRU는 roll, pitch, heave 때문에 움직이는 antenna나 transducer 위치를 보정하는 데 도움을 준다.

If lever arm, sign, alignment, or timing is wrong, the corrected position can be wrong.
Lever arm, sign, alignment, timing이 틀리면 보정된 위치가 틀릴 수 있다.

## What the DP System Usually Checks

- Range check: is the value physically possible?
- Range check: 값이 물리적으로 가능한가?
- Rate-of-change check: did it change too fast?
- Rate-of-change check: 너무 빨리 변했는가?
- Comparison: does it agree with other sensors?
- Comparison: 다른 센서와 일치하는가?
- Quality flag: does the sensor report good quality?
- Quality flag: 센서가 좋은 품질을 보고하는가?
- Filtering: should short noise be smoothed?
- Filtering: 짧은 noise를 완화해야 하는가?
- Weighting: how much should this input be trusted?
- Weighting: 이 입력을 얼마나 믿어야 하는가?
- Rejection: should this input be excluded?
- Rejection: 이 입력을 제외해야 하는가?

## DPO Mindset

Do not ask only “what value is displayed?”
단순히 “무슨 값이 표시되는가?”만 묻지 않는다.

Ask:
다음을 물어본다.

- Is this value consistent with the vessel motion?
- 이 값이 실제 선박 운동과 일관적인가?
- Is the raw value different from the DP accepted value?
- raw value와 DP accepted value가 다른가?
- Did controller demand change after this input changed?
- 이 입력이 변한 뒤 controller demand가 변했는가?
- Does another independent sensor agree?
- 다른 독립 센서도 동의하는가?

## Related Notes

- [[Closed-loop Control]]
- [[Position Reference Systems]]
- [[Gyrocompass]]
- [[Motion Reference Unit]]
- [[Wind Sensor]]
- [[Kalman Filter]]
