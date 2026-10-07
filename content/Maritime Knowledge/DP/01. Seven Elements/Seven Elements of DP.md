---
aliases:
  - DP Seven Elements
---

# Seven Elements of DP

## 왜 7 Elements로 시작하는가

DP는 처음 보면 장비 이름이 너무 많다.

Gyro, MRU, GNSS, PRS, thruster, controller, HMI, PMS 같은 단어가 한꺼번에 나오면 머릿속에서 섞인다.

그래서 먼저 7개 큰 박스로 나누어 본다.

이 7개 박스만 머리에 있으면, 새로운 장비나 문제가 나와도 어디에 붙는지 대략 알 수 있다.

## 7개의 큰 박스

| 번호 | 요소 | 쉬운 설명 | 핵심 질문 |
|---|---|---|---|
| 1 | [[Power]] | DP 장비와 추진기에 전기를 주는 부분 | 고장 후에도 전기가 남는가? |
| 2 | [[Thrusters]] | 전기를 실제 힘으로 바꾸는 부분 | 명령한 힘이 실제로 나오는가? |
| 3 | [[Environmental Sensors]] | 바람과 선박 동요를 재는 부분 | 외부 힘과 선체 운동을 믿을 수 있게 재는가? |
| 4 | [[Position Reference Systems]] | 선박 위치를 알려주는 부분 | 지금 위치를 독립적으로 확인할 수 있는가? |
| 5 | [[DP Controller]] | 센서값을 해석하고 추력 명령을 만드는 두뇌 | 오차를 어떤 명령으로 바꾸는가? |
| 6 | [[HMI]] | 사람이 보는 화면과 조작부 | 운용자가 상황을 이해할 수 있는가? |
| 7 | [[DP Operator]] | 시스템을 감시하고 판단하는 사람 | 언제 계속하고 언제 멈출지 아는가? |

## 가장 단순한 흐름

```text
Power
→ Thrusters
→ Vessel movement
→ Sensors / PRS
→ DP Controller
→ HMI / DP Operator
→ 다시 Thrusters
```

이 흐름은 완전한 원이 된다.

그래서 DP는 closed-loop 시스템이다.

## 각 요소를 closed-loop에 붙여보기

| 요소 | Closed-loop에서의 위치 |
|---|---|
| Power | 명령을 실제 힘으로 만들기 위한 에너지 |
| Thrusters | controller 명령을 실제 힘으로 바꾸는 출력 장치 |
| Environmental Sensors | 바람, 동요 같은 외부 조건 입력 |
| Position Reference Systems | 위치 feedback |
| DP Controller | 오차 계산, 상태 추정, 추력 계산 |
| HMI | 사람이 상태를 보고 조작하는 창 |
| DP Operator | 시스템을 감시하고 운용 판단을 내리는 사람 |

## 헷갈릴 때 돌아올 질문

새로운 장비나 문제가 나오면 이렇게 묻는다.

```text
이건 7개 중 어디에 들어가지?
이 값은 입력인가, 계산인가, 출력인가?
이 문제가 closed-loop의 어느 부분을 흔들지?
```

## IMO의 3 Sub-systems와의 관계

IMO 문서에서는 DP를 보통 세 하위 시스템으로 본다.

- [[Power System (IMO)]]
- [[Thruster System (IMO)]]
- [[DP Control System (IMO)]]

7 Elements는 공부하기 쉽게 더 잘게 나눈 틀이다.

공식 문서와 연결할 때는 [[Three Sub-systems of DP]]를 같이 보면 된다.

## 다음에 볼 것

- [[Closed-loop Control]]
- [[Input Signal Integrity and Sensor Data Flow]]
- [[PRS and Gyro Troubleshooting Before Technician Arrival]]
