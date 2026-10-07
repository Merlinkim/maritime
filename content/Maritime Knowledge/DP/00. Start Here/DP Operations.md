# DP Operations

## 이 문서의 역할

이 폴더는 DP 운용을 공부할 때 “어디부터 봐야 하는가”를 잡아주는 시작점이다.

지금 구조에서는 세부 주제를 많이 벌리지 않고, 먼저 두 축으로 공부한다.

```text
1. Seven Elements
2. Closed-loop Control
```

나머지 주제들은 이 두 축에서 파생되는 내용으로 보면 된다.

## 공부 순서

### 1단계: DP가 뭔지 잡기

- [[DP]]
- [[What is DP?]]
- [[Seven Elements of DP]]

먼저 DP를 “선박을 원하는 위치와 heading에 붙잡아두는 시스템”으로 이해한다.

### 2단계: 7 Elements로 시스템을 나누기

- [[Power]]
- [[Thrusters]]
- [[Environmental Sensors]]
- [[Position Reference Systems]]
- [[DP Controller]]
- [[HMI]]
- [[DP Operator]]

DP를 한 덩어리로 보면 너무 어렵다.

그래서 7개 요소로 나눠서 본다.

### 3단계: Closed-loop로 연결하기

- [[Closed-loop Control]]
- [[Input Signal Integrity and Sensor Data Flow]]
- [[Kalman Filter]]
- [[Vessel Mathematical Model]]
- [[Thrust Allocation]]

7개 요소를 따로 외우는 것보다, 값이 어떻게 돌고 도는지 이해하는 것이 중요하다.

### 4단계: 고장과 검증으로 넘어가기

- [[FMEA]]
- [[Failure Modes and Effects]]
- [[Redundancy and WCFDI]]

DP는 “정상일 때 어떻게 움직이나”도 중요하지만, “고장 났을 때 안전하게 버티는가”가 더 중요하다.

### 5단계: 운용 판단 도구 보기

- [[ASOG and WSOG]]
- [[CAMO and TAM]]
- [[Capability and Footprint Plots]]
- [[Consequence Analysis]]

이 문서들은 DP Controller를 직접 구성하는 요소라기보다, DPO가 운용 판단을 하는 도구에 가깝다.

## 지금은 이렇게 이해하면 된다

```text
7 Elements = DP를 구성하는 부품 묶음

Closed-loop = 그 부품들이 계속 값을 주고받으며 위치를 유지하는 방식

FMEA = 고장 났을 때 시스템이 어떻게 버티는지 확인하는 문서

ASOG = 어떤 상태에서 계속 작업하고, 언제 멈출지 정한 운용 기준
```

처음부터 깊게 들어가지 말고, 각 문서에서 “이게 closed-loop의 어느 부분인가?”를 계속 생각하면 된다.
