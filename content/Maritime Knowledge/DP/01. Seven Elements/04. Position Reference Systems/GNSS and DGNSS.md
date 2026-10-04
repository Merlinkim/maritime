---
aliases:
  - GNSS
  - DGNSS
  - DGPS
---

# GNSS and DGNSS

## GNSS Is Not Only GPS

GNSS(Global Navigation Satellite System)는 위성항법 시스템 전체를 뜻한다.
GNSS(Global Navigation Satellite System) refers to the entire satellite navigation system.

**한국어**

| Constellation | 운영 주체 |
|---|---|
| GPS | United States |
| GLONASS | Russia |
| Galileo | European Union |
| BeiDou | China |

**English**

| Constellation | Operator |
|---|---|
| GPS | United States |
| GLONASS | Russia |
| Galileo | European Union |
| BeiDou | China |

Multi-constellation receiver는 더 많은 위성을 사용할 수 있어 geometry와 availability를 개선할 수 있다. 하지만 모든 신호가 같은 antenna, receiver 또는 전파간섭의 영향을 받는다면 완전한 독립성이 생기는 것은 아니다.
Multi-constellation receiver can use more satellites, improving geometry and availability. However, if all signals are affected by the same antenna, receiver, or radio interference, complete independence is not achieved.

## How GNSS Calculates Position

![[GNSS as DP Position Reference-v2.png|1200]]

각 위성은 자신의 위치와 신호 송신시간이 포함된 navigation message를 보낸다. Receiver는 신호가 도착하는 데 걸린 시간을 측정하고 빛의 속도를 곱해 위성까지의 거리를 추정한다.
Each satellite transmits a navigation message containing its position and signal transmission time. The receiver measures the time taken for the signal to arrive and estimates the distance to the satellite by multiplying by the speed of light.

```text
Pseudorange ≈ Speed of light × Signal travel time
```

Receiver clock은 위성의 atomic clock만큼 정확하지 않으므로 측정거리에는 공통 clock error가 포함된다. 그래서 이를 진짜 range가 아니라 **pseudorange**라고 부른다.
Since the receiver clock is not as accurate as the satellite's atomic clock, the measured distance includes a common clock error. Therefore, it is called **pseudorange** rather than true range.

## Why At Least Four Satellites?

Receiver가 풀어야 할 미지수는 네 개다.
The receiver has four unknowns to solve for.

1. X position
2. Y position
3. Z position
4. Receiver clock bias

따라서 기본적인 3D position과 time solution에는 최소 네 개의 satellite measurement가 필요하다. 실제 운용에서는 추가 위성이 geometry 개선, redundancy와 fault detection에 사용된다.
Therefore, at least four satellite measurements are required for the basic 3D position and time solution. In actual operation, additional satellites are used for geometry improvement, redundancy, and fault detection.

```text
Satellite 1 range ─┐
Satellite 2 range ─┼→ X, Y, Z + receiver clock bias
Satellite 3 range ─┤
Satellite 4 range ─┘
```

## Satellite Geometry and DOP

위성 수가 많아도 모두 하늘의 비슷한 방향에 모여 있으면 작은 range error가 큰 position error로 확대된다. 이를 Dilution of Precision(DOP)으로 표현한다.
Even with many satellites, if they are all clustered in a similar direction in the sky, a small range error can be magnified into a large position error. This is expressed as Dilution of Precision(DOP).

- HDOP: horizontal geometry
- VDOP: vertical geometry
- PDOP: 3D position geometry

일반적으로 DOP가 낮을수록 geometry가 좋다. 그러나 좋은 HDOP가 multipath, spoofing 또는 correction 오류까지 없애주는 것은 아니다.
Generally, a lower DOP means better geometry. However, good HDOP does not eliminate multipath, spoofing, or correction errors.

## From GNSS to DGNSS

DGNSS는 정확히 알려진 위치의 reference station이 GNSS 측정오차를 계산하고 correction을 사용자에게 전달하는 방식이다.
DGNSS is a method where a reference station at a precisely known location calculates GNSS measurement errors and transmits corrections to the user.

```text
Known reference-station position
              ↓ compare
GNSS measured reference position
              ↓
       Range corrections
              ↓ radio / satellite / network
        Vessel DGNSS receiver
              ↓
       Corrected position
```

Offshore에서는 상용 satellite correction service나 network 기반 correction이 사용될 수 있다. Correction 방식과 서비스 범위, convergence, age limit은 시스템마다 다르므로 선박 장비 매뉴얼을 확인해야 한다.
Offshore, commercial satellite correction services or network-based corrections can be used. Since the correction method, service coverage, convergence, and age limit vary by system, the vessel equipment manual must be checked.

> [!important]
> Correction은 주로 **accuracy**를 개선한다. Correction link가 살아 있다는 사실만으로 position의 **integrity**나 두 DGNSS의 독립성이 보장되지는 않는다.
> Correction primarily improves **accuracy**. The fact that a Correction link is active does not guarantee the position's **integrity** or the independence of two DGNSS systems.

## DP Installation Chain

```text
GNSS antenna
   ↓ RF cable
Receiver + correction input
   ↓ position, quality, timestamp
PRS interface / network
   ↓
DP Controller validation and weighting
   ↓
Vessel reference-point correction
   ↓
Position estimate
```

고장 분석 시 antenna에서 DP input까지 전체 chain을 본다. 수신기는 두 대여도 antenna splitter, correction decoder, network switch, UPS 또는 serial converter를 공유하면 common point가 남는다.
Fault analysis considers the entire chain from the antenna to the DP input. Even if two receivers share an antenna splitter, correction decoder, network switch, UPS, or serial converter, a common point remains.

## Main Error Sources

### Satellite and Orbit

- Satellite clock error
- Ephemeris/orbit error
- Unhealthy satellite 또는 잘못된 navigation data
- Unhealthy satellite or incorrect navigation data

### Atmosphere

- Ionospheric delay
- Tropospheric delay
- Space weather에 따른 급격한 변화
- Rapid changes due to space weather

### Local Environment

- Mast, crane와 구조물에 의한 blockage
- Blockage by masts, cranes, and structures
- 금속 구조물·수면 반사로 인한 multipath
- Multipath due to metal structures or water surface reflection
- 안테나 케이블, connector와 전원 문제
- Antenna cable, connector, and power supply issues
- 높은 elevation mask 또는 좋지 않은 위성 geometry
- High elevation mask or poor satellite geometry

### Radio-Frequency Interference

- **Jamming:** 강한 신호로 GNSS reception을 방해하여 quality 저하 또는 position loss 유발
- **Jamming:** Interfering with GNSS reception using strong signals, causing quality degradation or position loss
- **Spoofing:** 가짜 GNSS-like signal로 receiver가 그럴듯하지만 잘못된 위치·시간을 계산하도록 유도
- **Spoofing:** Inducing the receiver to calculate plausible but incorrect position/time using fake GNSS-like signals

Spoofing은 단순 loss보다 위험할 수 있다. 잘못된 위치가 valid처럼 보이면 DP가 이를 실제 선박 이동으로 판단하여 thruster를 사용할 수 있기 때문이다.
Spoofing can be more dangerous than simple loss. This is because if an incorrect position appears valid, the DP may interpret it as actual vessel movement and use the thruster.

### Correction Service

- Correction signal loss
- Stale correction 또는 excessive age
- Stale correction or excessive age
- 잘못된 service/beam 선택
- Incorrect service/beam selection
- 두 receiver가 같은 provider와 decoder를 공유
- Two receivers sharing the same provider and decoder
- Reference network 또는 distribution 장애
- Reference network or distribution failure

## Two GNSS Units Are Not Automatically Independent

```text
GNSS 1 ─┐
        ├─ Same satellites
GNSS 2 ─┘  Same correction provider
           Same jamming/spoofing environment
           Possibly shared antenna/network/power
```

두 장비가 다른 화면에 별도 PRS로 표시되어도 common-mode failure로 동시에 이동하거나 상실될 수 있다. 진정한 다양성을 높이려면 별도 전원·경로뿐 아니라 Laser, microwave, hydroacoustic 같은 **비-GNSS 원리**를 함께 고려한다.
Even if two devices are displayed separately as PRS on different screens, they can simultaneously move or be lost due to common-mode failure. To increase true diversity, consider not only separate power and paths but also **non-GNSS principles** such as Laser, microwave, hydroacoustic.

## Accuracy vs Integrity

**한국어**

| 상태 | Accuracy | Integrity | 위험성 |
|---|---|---|---|
| 실제와 가깝고 quality 경고도 정상 | 좋음 | 좋음 | 정상 |
| 실제와 가깝지만 fault detection 불능 | 현재는 좋음 | 나쁨 | 오류 발생 시 모름 |
| 실제와 멀고 즉시 invalid alarm | 나쁨 | 좋음 | 탐지 후 제외 가능 |
| 실제와 멀지만 valid로 표시 | 나쁨 | 나쁨 | DP에 가장 위험 |

**English**

| Status | Accuracy | Integrity | Risk |
|---|---|---|---|
| Close to actual and quality warning normal | Good | Good | Normal |
| Close to actual but fault detection unavailable | Currently Good | Poor | Unknown upon failure |
| Far from actual and immediate invalid alarm | Poor | Good | Excludable after detection |
| Far from actual but displayed as valid | Poor | Poor | Most dangerous for DP |

## Reference Frames and Offsets

GNSS는 antenna phase centre의 좌표를 측정한다. DP에서 사용할 때는 다음이 일치해야 한다.
GNSS measures the coordinates of the antenna phase center. When used for DP, the following must match.

- Datum/reference frame, 일반적으로 WGS 84 계열
- Datum/reference frame, generally WGS 84 based
- Latitude/longitude 또는 projected coordinate 변환
- Latitude/longitude or projected coordinate transformation
- Antenna lever arm
- Vessel reference point
- Heading, roll과 pitch compensation
- Heading, roll and pitch compensation
- Position message의 timestamp와 latency
- Position message's timestamp and latency

두 GNSS가 서로 일정하게 어긋나면 receiver error만 찾지 말고 datum, antenna offset과 coordinate setting도 확인한다.
If two GNSS systems deviate consistently from each other, check not only the receiver error but also the datum, antenna offset, and coordinate setting.

## DPO Monitoring

- Satellite count와 constellation 사용 상태
- Satellite count and constellation usage status
- HDOP/PDOP 및 geometry 변화
- HDOP/PDOP and geometry changes
- Correction status, age와 service selection
- Correction status, age and service selection
- Position quality, alarm과 integrity indication
- Position quality, alarm and integrity indication
- GNSS 1/2의 difference와 장기 drift
- Difference and long-term drift between GNSS 1/2
- 다른 원리의 PRS와 비교한 residual
- Residual compared to PRS of different principles
- SNR 또는 signal level의 동시 저하
- Simultaneous drop in SNR or signal level
- Jamming/spoofing 경보와 주변 지역 보고
- Jamming/spoofing alarms and surrounding area reports
- Crane movement, heading 변화와 satellite blockage의 관계
- Relationship between crane movement, heading change, and satellite blockage
- 갑작스러운 position jump 후 thruster response
- Thruster response after sudden position jump

## Failure Recognition Examples

### Both GNSS Shift Together

두 GNSS가 같은 방향으로 거의 동시에 이동하고 Laser/Acoustic은 안정적이라면 common satellite, correction 또는 interference 문제를 의심한다. GNSS끼리 서로 일치한다는 이유만으로 정상이라고 결론내리지 않는다.
If two GNSS units move in the same direction almost simultaneously and the Laser/Acoustic is stable, suspect common satellite, correction, or interference issues. Do not conclude that it is normal just because the GNSS units match each other.

### One GNSS Slowly Drifts

Correction loss, 잘못된 mode, antenna/receiver fault 또는 coordinate 설정을 확인한다. DP model이 drift를 따라가기 전에 독립 PRS와 비교한다.
Check for correction loss, incorrect mode, antenna/receiver fault, or coordinate settings. Compare with independent PRS before the DP model follows the drift.

### All GNSS Quality Drops

Jamming, antenna blockage 또는 space-weather/지역적 service 문제 가능성을 검토한다. 남은 non-GNSS PRS, operational limit와 안전한 작업중단 시간을 즉시 확인한다.
Review the possibility of jamming, antenna blockage, or space-weather/local service issues. Immediately check remaining non-GNSS PRS, operational limits, and safe shutdown time.

## Related Notes

- [[Position Reference Systems]]
- [[Kalman Filter]]
- [[Gyrocompass]]
- [[Motion Reference Unit]]
- [[DP Operator]]
- [[FMEA]]

## References

- [GPS.gov — GPS Overview](https://www.gps.gov/systems/gps/index.php)
- [GPS.gov — Trilateration](https://www.gps.gov/trilateration)
- [GPS.gov — GPS Accuracy](https://www.gps.gov/gps-accuracy)
- [IALA G1112 — DGNSS Service Design and Implementation](https://www.iala.int/product/g1112/?download=true)
- [IMCA M 252 — Guidance on position reference systems and sensors for DP operations](https://www.imca-int.com/resources/technical-library/document/255bc45a-c55b-ee11-8def-6045bdd2c3b2/)
