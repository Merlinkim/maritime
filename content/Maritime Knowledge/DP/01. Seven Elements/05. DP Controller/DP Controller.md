# DP Controller

## 한 줄 정의

DP Controller는 DP 시스템의 두뇌다.

목표 위치와 현재 위치의 차이를 보고, 선박을 다시 목표 위치로 돌려보내기 위해 필요한 추력 명령을 만든다.

## 단순 흐름

```text
센서와 PRS가 현재 상태를 알려줌
→ controller가 현재 위치를 추정함
→ 목표 위치와 비교함
→ 오차를 계산함
→ 필요한 힘을 계산함
→ thruster에 명령을 보냄
```

## 중요한 점

DP Controller는 센서값을 그대로 믿고 움직이는 장비가 아니다.

센서값에는 noise, delay, jump, bias가 있을 수 있다.

그래서 controller는 여러 입력을 검증하고, 필터링하고, 추정해서 “지금 선박이 어디에 있는지”를 만든다.

이 추정값을 기준으로 제어 명령을 만든다.

## Controller 안에서 일어나는 일

| 단계 | 쉬운 설명 | 관련 문서 |
|---|---|---|
| 입력 받기 | PRS, gyro, MRU, wind, thruster feedback을 받는다 | [[Input Signal Integrity and Sensor Data Flow]] |
| 상태 추정 | 선박의 현재 위치와 움직임을 추정한다 | [[Kalman Filter]] |
| 오차 계산 | 목표값과 현재 추정값의 차이를 계산한다 | [[Closed-loop Control]] |
| 제어 계산 | 오차를 줄이기 위해 필요한 힘을 계산한다 | [[PID Control]] |
| 추력 배분 | 필요한 힘을 각 thruster 명령으로 나눈다 | [[Thrust Allocation]] |

## Controller를 볼 때 생각할 것

```text
입력이 맞는가?
추정이 맞는가?
계산이 맞는가?
명령이 실제로 나갔는가?
선박이 그 명령대로 반응했는가?
```

이 질문이 DP Controller 공부의 기본이다.

## Controller와 감시 도구

Controller 자체는 계산을 하지만, DPO는 그 계산이 안전한지 계속 감시해야 한다.

그래서 아래 문서들이 같이 붙는다.

- [[ASOG and WSOG]]
- [[CAMO and TAM]]
- [[Consequence Analysis]]
- [[Capability and Footprint Plots]]

이 문서들은 controller의 내부 알고리즘이라기보다는, controller와 선박 상태를 운용자가 판단하기 위한 도구다.

## 기억할 문장

DP Controller는 “센서값을 보고 추진기를 움직이는 장치”가 아니라, “여러 입력을 해석해서 선박 상태를 추정하고 오차를 줄이는 명령을 만드는 장치”다.
