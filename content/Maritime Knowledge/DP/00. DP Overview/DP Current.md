# DP Current

**DP Current**는 일반적으로 해류계가 직접 측정한 Ocean Current가 아니다. DP 제어기가 선박 모델과 센서 정보를 이용해 계산한 **잔여 저주파 외력의 등가 표현**이다.
**DP Current** is generally not the Ocean Current directly measured by the current meter. It is an **equivalent representation of residual low-frequency external forces** calculated by the DP controller using the vessel model and sensor information.

## What it represents

DP 시스템이 알고 있는 값은 대략 다음과 같다.
The values known by the DP system are approximately as follows.

- Position and heading change
- Estimated vessel velocity
- Commanded and measured thrust
- Measured wind and modeled wind force
- Vessel mathematical model

이 정보로 설명되지 않고 남는 저주파 힘과 Moment를 Observer가 추정한다. 제조사 시스템은 이 잔여 외력을 등가적인 Current speed와 direction으로 표시할 수 있다.
The Observer estimates the low-frequency force and Moment remaining unexplained by this information. The manufacturer's system can display this residual external force as an equivalent Current speed and direction.

```text
Actual environmental and external loads
− Modeled wind effect
− Known thrust and vessel response
= Residual low-frequency disturbance
≈ Displayed DP Current
```

## What may be included

표시되는 DP Current에는 실제 해류 외에도 다음 영향이 섞일 수 있다.
The displayed DP Current may contain the following influences in addition to the actual ocean current.

- Wave drift force
- Wind model error
- Incorrect draught or vessel model
- Mooring, riser, hose, cable 또는 towline force
- Mooring, riser, hose, cable, or towline force
- Thruster interaction and loss of efficiency
- Sensor bias or Position Reference error
- 기타 모델에 포함되지 않은 외력
- External forces not included in other models

따라서 DP Current를 정밀한 해양학적 Current 측정값으로 취급하면 안 된다.
Therefore, DP Current should not be treated as a precise oceanographic current measurement.

## How to interpret it

- 안정된 상태에서는 대체로 천천히 변해야 한다.
- In a stable state, it should generally change slowly.
- 급격한 변화는 실제 환경 변화뿐 아니라 PRS jump, sensor error 또는 잘못된 모델 입력 때문일 수 있다.
- Rapid changes may be due not only to actual environmental changes but also to PRS jump, sensor error, or incorrect model input.
- 단독 값보다 Position deviation, Thruster demand, Wind 및 Reference status와 함께 해석한다.
- It should be interpreted together with Position deviation, Thruster demand, Wind, and Reference status, rather than as a single value.
- 표시 명칭과 계산 방식은 제조사별로 다를 수 있으므로 해당 DP Manual을 우선한다.
- Since the display name and calculation method may vary by manufacturer, the respective DP Manual should be prioritized.

## DP Current vs Measured Current

**한국어**

| DP Current | Measured Ocean Current |
|---|---|
| 모델 기반 잔여 외력 추정 | Current meter 등의 센서 측정 |
| 여러 미모델링 힘이 포함될 수 있음 | 특정 위치와 수심의 물 흐름을 측정 |
| 위치 유지 제어를 위한 내부 상태 | 해양 관측 또는 별도 운용 정보 |

**English**

| DP Current | Measured Ocean Current |
|---|---|
| Model-based residual force estimation | Sensor measurement like Current meter |
| May include various unmodeled forces | Measures water flow at a specific location and depth |
| Internal state for position keeping control | Ocean observation or separate operational information |

→ [[Current Estimation]]  
→ [[Vessel Mathematical Model]]  
→ [[Kalman Filter]]

