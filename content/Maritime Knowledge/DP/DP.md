---
aliases:
  - Dynamic Positioning
---

# DP

## 한 줄 정의

DP는 선박이 닻을 내리지 않고도 추진기와 제어 시스템을 이용해 원하는 위치와 선수방위를 자동으로 유지하는 시스템이다.

쉽게 말하면, DP는 선박이 바람, 조류, 파도에 밀려도 계속 자기 위치로 돌아오게 만드는 자동 위치유지 시스템이다.

## 지금 공부의 기준

이 노트는 어려운 공식부터 외우는 방식이 아니라, 먼저 아래 두 가지를 중심으로 잡는다.

1. [[Seven Elements of DP]]
2. [[Closed-loop Control]]

Seven Elements는 DP를 구성하는 큰 부품 지도다.

Closed-loop Control은 그 부품들이 실제로 어떻게 연결되어 위치를 유지하는지 보여주는 작동 원리다.

## 가장 중요한 생각

DP는 단순히 “위치를 잡아주는 장비”가 아니다.

DP는 계속 반복해서 판단한다.

```text
목표 위치
→ 현재 위치 추정
→ 오차 계산
→ 필요한 추력 계산
→ 추진기 명령
→ 선박 반응
→ 다시 현재 위치 추정
```

이 반복되는 고리가 DP의 핵심이다.

## 공부 순서

1. [[Seven Elements of DP]]
2. [[Closed-loop Control]]
3. [[Position Reference Systems]]
4. [[Gyrocompass]]
5. [[Motion Reference Unit]]
6. [[Input Signal Integrity and Sensor Data Flow]]
7. [[FMEA]]
8. [[ASOG and WSOG]]
9. [[MSC.1-Circ.1580]]

## 나중에 깊게 볼 것

- [[Vessel Mathematical Model]]
- [[Kalman Filter]]
- [[Thrust Allocation]]
- [[Redundancy and WCFDI]]
- [[Consequence Analysis]]
- [[Capability and Footprint Plots]]

## 기억할 문장

DP를 볼 때는 “장비 이름”보다 “이 장비가 closed-loop의 어디에 들어가는가?”를 먼저 생각한다.
