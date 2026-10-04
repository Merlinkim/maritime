# Position Reference Systems

## Role in DP

Position Reference System(PRS)은 선박이 **어디에 있는지**, 또는 작업 대상에 대해 **어디에 있는지**를 DP Controller에 알려준다. DP는 위치오차를 PRS로 확인한 뒤 thruster command를 수정하므로, 잘못된 PRS 값은 정상적인 선박을 잘못된 방향으로 움직이게 할 수 있다.
The Position Reference System (PRS) tells the DP Controller **where the vessel is**, either in Earth-fixed coordinates or **relative to the work target**. Because DP uses PRS data to determine position error and adjust thruster commands, an incorrect PRS value can drive an otherwise healthy vessel in the wrong direction.

> [!important]
> PRS의 핵심은 개수가 아니라 **서로 다른 원리, 독립성, 정확도, 무결성 및 작업 적합성**이다.
> The core of PRS is not the quantity, but the **different principles, independence, accuracy, integrity, and operational suitability**.

![[GNSS as DP Position Reference-v2.png|1200]]

## What Does a PRS Measure?

**한국어**

| Reference type | 측정 기준 | 대표 장비 | 적합한 상황 |
|---|---|---|---|
| Absolute | 지구고정 좌표 | [[GNSS and DGNSS|GNSS/DGNSS]] | 넓은 해역의 station keeping |
| Relative | 구조물·target과 선박의 상대 위치 | Laser, microwave/radar | Platform 근접 작업 |
| Seabed referenced | 해저의 transponder/beacon | USBL, LBL, SBL | 심해·subsea 작업 |
| Mechanical | 해저 weight와 wire 각도·길이 | Taut wire | 제한된 범위의 고정점 작업 |

**English**

| Reference type | Measurement basis | Representative equipment | Suitable situation |
|---|---|---|---|
| Absolute | Earth-fixed coordinates | [[GNSS and DGNSS|GNSS/DGNSS]] | Station keeping in wide areas |
| Relative | Relative position of the vessel to a structure/target | Laser, microwave/radar | Close proximity work to a platform |
| Seabed referenced | Transponder/beacon on the seabed | USBL, LBL, SBL | Deepwater/subsea work |
| Mechanical | Angle and length of seabed weight and wire | Taut wire | Fixed point work in limited range |

같은 선박 위치라도 작업 목적에 따라 필요한 reference가 다르다. Wellhead나 platform을 기준으로 작업한다면 지구좌표만 정확한 것보다 작업 대상과의 상대거리를 직접 측정하는 PRS가 더 유용할 수 있다.
Even if the vessel's position is the same, the required reference differs depending on the work objective. If working relative to a wellhead or platform, a PRS that directly measures the relative distance to the work object may be more useful than one that only measures earth coordinates.

## Information Flow

```text
Physical reference
Satellite / Target / Seabed transponder
                 ↓
        Antenna or sensor
                 ↓
        Receiver processing
                 ↓
 Quality, validity, time and position
                 ↓
 Lever-arm / heading / motion compensation
                 ↓
     DP validation and weighting
                 ↓
        Estimated vessel position
```

PRS가 출력하는 좌표는 즉시 thruster로 가지 않는다. DP Controller는 timestamp, quality, residual, 다른 PRS와의 일치 여부를 확인하고 [[Kalman Filter]]를 통해 선박 위치 추정에 반영한다.
The coordinates output by the PRS do not immediately go to the thruster. The DP Controller checks the timestamp, quality, residual, and consistency with other PRS, and incorporates it into the vessel position estimation via [[Kalman Filter]].

## Performance Terms

**한국어**

| 용어 | 질문 |
|---|---|
| Accuracy | 표시 위치가 실제 위치에 얼마나 가까운가? |
| Precision | 같은 조건에서 측정값이 얼마나 모여 있는가? |
| Integrity | 값이 믿을 수 없을 때 사용자가 제때 경고받는가? |
| Availability | 필요한 순간에 사용할 수 있는가? |
| Continuity | 작업 중 끊기지 않고 유지되는가? |
| Latency | 실제 측정과 DP 도착 사이 지연은 얼마인가? |
| Update rate | 새 위치값이 초당 몇 번 들어오는가? |

**English**

| Term | Question |
|---|---|
| Accuracy | How close is the displayed position to the actual position? |
| Precision | How close are the measurements under the same conditions? |
| Integrity | Does the user receive a timely warning when the value is unreliable? |
| Availability | Can it be used when needed? |
| Continuity | Is it maintained without interruption during operation? |
| Latency | What is the delay between actual measurement and DP arrival? |
| Update rate | How many times per second is a new position value received? |

정확도가 높은 값이라도 오류를 탐지하지 못하면 DP에는 위험하다. 그래서 **accuracy와 integrity는 다른 개념**이다.
Even if the value has high accuracy, it is dangerous for DP if it cannot detect errors. Therefore, **accuracy and integrity are different concepts**.

## Diversity and Independence

다음 두 구성은 PRS 수량은 같지만 redundancy 수준이 다르다.
The following two configurations have the same quantity of PRS but different levels of redundancy.

```text
GNSS 1 + GNSS 2
→ 같은 위성, 보정서비스, 전파환경 공유 가능
→ May share the same satellites, correction service, and RF environment

GNSS + Laser 또는 Hydroacoustic
GNSS + Laser or Hydroacoustic
→ 측정 원리와 failure mode가 더 다양함
→ Provides greater diversity in measurement principles and failure modes
```

독립성을 평가할 때 확인할 항목:
Items to check when evaluating independence:

- 다른 측정 원리를 사용하는가?
- Does it use a different measurement principle?
- Antenna, receiver, power와 network가 분리되어 있는가?
- Are the Antenna, receiver, power, and network separated?
- 동일 constellation이나 correction provider에 의존하는가?
- Does it rely on the same constellation or correction provider?
- 같은 heading/MRU 값을 사용해 함께 잘못 보정될 수 있는가?
- Can it be incorrectly corrected together using the same heading/MRU values?
- 동일 target, transponder 또는 reflector가 단일고장점인가?
- Is the target, transponder, or reflector a single point of failure?
- 하나의 cable route, interface 또는 DP I/O에 모이지 않는가?
- Are they not converging on a single cable route, interface, or DP I/O?

## Weighting and Voting

DP는 선택된 PRS를 항상 동일하게 평균하지 않는다. Quality와 variance에 따라 weight를 주고, 예측 위치와의 residual이 큰 값을 경고하거나 reject할 수 있다.
DP does not always average selected PRS identically. It can weight based on Quality and variance, or warn/reject values with large residuals from the predicted position.

```text
PRS measurement − Model prediction = Residual
```

세 PRS가 있어도 둘이 같은 원인으로 함께 이동하면 majority가 잘못될 수 있다. 따라서 다수결보다 **measurement principle과 common-mode failure**를 먼저 본다.
Even with three PRS, if they move together due to the same cause, the majority can be wrong. Therefore, we first consider the **measurement principle and common-mode failure** rather than majority voting.

## Reference Point and Lever Arm

PRS sensor는 보통 선박 중심이나 DP rotation centre에 정확히 놓이지 않는다. Antenna 위치에서 측정한 좌표를 DP reference point로 변환하려면 다음 정보가 필요하다.
PRS sensors are usually not placed exactly at the vessel's center or DP rotation center. To convert coordinates measured from the antenna location to the DP reference point, the following information is required.

- Antenna/sensor의 longitudinal, transverse, vertical offset
- Longitudinal, transverse, vertical offset of the Antenna/sensor
- [[Gyrocompass|Heading]]
- [[Motion Reference Unit|Roll and pitch]]
- 선택된 centre of rotation 또는 monitoring point
- Selected center of rotation or monitoring point

Offset이나 heading이 틀리면 선박이 회전할 때 PRS 위치가 원을 그리며 움직이는 것처럼 보일 수 있다.
If the offset or heading is incorrect, the PRS position may appear to move in a circle when the vessel rotates.

## Main PRS Technologies

### GNSS / DGNSS

위성 신호의 전파시간으로 pseudorange를 구해 절대 위치를 계산한다. 자세한 원리와 DP 고장요인은 [[GNSS and DGNSS]]를 참고한다.
Absolute position is calculated by obtaining pseudorange using the propagation time of the satellite signal. For detailed principles and DP failure modes, refer to [[GNSS and DGNSS]].

### Laser PRS

선박의 laser scanner가 구조물에 설치한 reflector를 탐지하여 range와 bearing을 측정한다.
The vessel's laser scanner detects a reflector installed on a structure and measures range and bearing.

- 장점: 근거리 상대위치가 직관적이고 정확함
- Advantage: Intuitive and accurate short-range relative position
- 한계: 비·안개·눈·분무, 반사체 가림, 유사 반사체 오인, target geometry
- Limitation: Fog, rain, snow, spray, obscured reflectors, similar reflectors misidentification, target geometry
- 확인: 올바른 target ID와 reflector 선택, line of sight
- Check: Correct target ID and reflector selection, line of sight

### Microwave / Radar PRS

구조물 쪽 transponder 또는 radar target과의 range/bearing을 전파로 측정한다.
Measures range/bearing to a transponder or radar target on a structure using propagation.

- 장점: 기상과 가시성의 영향을 laser보다 적게 받을 수 있음
- Advantage: Less affected by weather and visibility than laser
- 한계: multipath, 다른 transponder 간섭, line of sight와 target geometry
- Limitation: multipath, other transponder interference, line of sight and target geometry
- 확인: 올바른 station/ID, channel과 상대좌표 방향
- Check: Correct station/ID, channel, and relative coordinate direction

### Hydroacoustic PRS

선체 transducer와 해저 transponder 사이 음파의 travel time과 방향을 측정한다.
Measures the travel time and direction of sound waves between the hull transducer and the seabed transponder.

- USBL: 하나의 transducer array로 range/bearing 계산
- USBL: Calculates range/bearing using a single transducer array
- SBL: 선체에 떨어져 설치된 여러 transducer 사용
- SBL: Uses multiple transducers installed on the hull
- LBL: 해저에 넓게 배치한 여러 transponder network 사용
- LBL: Uses a network of multiple transponders widely deployed on the seabed

Sound velocity profile, 수심, transducer alignment, vessel noise, thruster aeration과 acoustic multipath가 성능에 영향을 준다. [[Motion Reference Unit|MRU]]와 [[Gyrocompass|gyro]] 보정도 중요하다.
Sound velocity profile, water depth, transducer alignment, vessel noise, thruster aeration, and acoustic multipath affect performance. Calibration of [[Motion Reference Unit|MRU]] and [[Gyrocompass|gyro]] is also important.

### Taut Wire

해저에 내린 weight와 선박 사이 wire의 길이와 각도를 측정해 상대위치를 구한다. 원리가 독립적이지만 수심·작업반경·해류, wire 접촉과 기계적 손상에 제한을 받는다.
Relative position is determined by measuring the length and angle of the wire between the weight dropped on the seabed and the vessel. Although the principle is independent, it is limited by water depth, working radius, currents, wire contact, and mechanical damage.

## Typical Failure Patterns

**한국어**

| Pattern | 화면에서 보이는 현상 | 가능한 원인 |
|---|---|---|
| Jump | 위치가 순간적으로 이동 | GNSS solution change, target 오인, acoustic ambiguity |
| Drift | 서서히 한 방향으로 이동 | correction loss, bias, sound-speed 또는 alignment error |
| Frozen value | 값은 정상처럼 보이나 변하지 않음 | data/interface failure |
| Noisy position | 점이 넓게 산란 | poor geometry, multipath, sea state, weak signal |
| Common shift | 여러 PRS가 함께 이동 | 공통 GNSS/보정/gyro/MRU 또는 reference failure |
| Drop-out | 간헐적 또는 완전한 상실 | blockage, interference, power/network failure |

**English**

| Pattern | Observed phenomenon | Possible cause |
|---|---|---|
| Jump | Sudden position shift | GNSS solution change, target misidentification, acoustic ambiguity |
| Drift | Gradual movement in one direction | correction loss, bias, sound-speed or alignment error |
| Frozen value | Value appears normal but does not change | data/interface failure |
| Noisy position | Widely scattered points | poor geometry, multipath, sea state, weak signal |
| Common shift | Multiple PRS moving together | common GNSS/correction/gyro/MRU or reference failure |
| Drop-out | Intermittent or complete loss | blockage, interference, power/network failure |

## DPO Monitoring

- 선택된 PRS와 실제 control weight
- Selected PRS and actual control weight
- PRS 간 deviation과 model residual의 변화 추세
- Trend of deviation between PRS and model residual
- Quality, age, HDOP/geometry 및 correction status
- Quality, age, HDOP/geometry and correction status
- 갑작스러운 jump, slow drift, frozen position
- Sudden jump, slow drift, frozen position
- 기상·heading·thruster 사용과 quality 변화의 관계
- Relationship between weather/heading/thruster usage and quality change
- Reference point, target ID와 offset 설정
- Reference point, target ID and offset setting
- 한 PRS 상실 후 남는 원리와 독립성
- Principles and independence remaining after losing one PRS
- 위치값 변화가 실제 선박 운동인지 measurement error인지 다른 수단으로 cross-check
- Cross-check position change between actual vessel motion and measurement error using other means

## Practical Decision Sequence

```text
PRS disagreement detected
→ 실제 선박 움직임이 있는가?
→ Is the vessel actually moving?
→ 어느 PRS끼리 같은 원리·입력을 공유하는가?
→ Which PRSs share the same principles or inputs?
→ Model, gyro, MRU와 다른 센서는 정상인가?
→ Are the model, gyro, MRU, and other sensors healthy?
→ 독립적인 PRS가 어느 값을 지지하는가?
→ Which value is supported by an independent PRS?
→ 선박 절차·ASOG에 따라 reject, downgrade 또는 작업 중단
→ Reject the input, downgrade status, or stop the operation according to vessel procedures and the ASOG
```

원인을 확정하지 않고 의심되는 PRS를 반복 선택·해제하면 estimated position과 thruster command가 급변할 수 있다.
Repeatedly selecting and deselecting suspected PRS without confirming the cause can cause sudden changes in estimated position and thruster command.

## Related Notes

- [[GNSS and DGNSS]]
- [[Environmental Sensors]]
- [[Gyrocompass]]
- [[Motion Reference Unit]]
- [[Kalman Filter]]
- [[Closed-loop Control]]
- [[FMEA]]

## References

- [IMCA M 252 — Guidance on position reference systems and sensors for DP operations](https://www.imca-int.com/resources/technical-library/document/255bc45a-c55b-ee11-8def-6045bdd2c3b2/)
- [IMCA — Position reference systems: a timely reminder](https://www.imca-int.com/resources/dp/dp-incidents/position-reference-systems-a-timely-reminder/)
