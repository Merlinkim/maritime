# Closed-loop Control

## 한 줄 정의

Closed-loop Control은 결과를 다시 확인하면서 계속 수정하는 제어 방식이다.

DP에서는 선박이 목표 위치에서 얼마나 벗어났는지 계속 확인하고, 그 오차를 줄이도록 추력을 계속 수정한다.

## 아주 쉬운 예시

자동차로 차선을 유지한다고 생각하면 된다.

```text
차가 오른쪽으로 밀림
→ 운전자가 오른쪽으로 벗어난 것을 봄
→ 핸들을 왼쪽으로 조금 돌림
→ 차가 다시 가운데로 옴
→ 다시 확인함
```

DP도 비슷하다.

```text
선박이 목표 위치에서 밀림
→ DP가 위치 오차를 봄
→ 반대 방향 추력을 만듦
→ 선박이 돌아옴
→ 다시 위치를 확인함
```

## DP의 closed-loop

```text
목표 위치 / 목표 heading
        ↓
현재 위치 / 현재 heading 추정
        ↓
오차 계산
        ↓
DP Controller
        ↓
필요한 힘 계산
        ↓
Thrust Allocation
        ↓
Thrusters
        ↓
선박이 움직임
        ↓
센서와 PRS가 다시 측정
        ↓
상태 추정
        ↓
다시 오차 계산
```

이 고리가 계속 반복된다.

그래서 DP는 한 번 명령하고 끝나는 시스템이 아니다.

## 이 고리 안에서 중요한 것

| 부분 | 역할 |
|---|---|
| PRS | 위치 feedback을 준다 |
| Gyro | heading feedback을 준다 |
| MRU | 선체 동요 보정에 도움을 준다 |
| Wind sensor | 바람 입력을 준다 |
| Kalman Filter | 여러 센서와 모델을 섞어 현재 상태를 추정한다 |
| Vessel Mathematical Model | 선박이 어떻게 움직일지 예측한다 |
| DP Controller | 오차를 보고 필요한 힘을 계산한다 |
| Thrust Allocation | 필요한 힘을 각 추진기 명령으로 나눈다 |

## 센서값은 현실 그 자체가 아니다

DP에서 중요한 포인트는 이것이다.

센서값은 실제 현실이 아니라, 현실을 측정한 결과다.

측정값에는 오차가 있을 수 있다.

- noise
- delay
- jump
- drift
- bias
- 잘못된 offset
- 잘못된 방향 설정

그래서 DP는 raw sensor value를 그대로 믿지 않고 검증하고 필터링한다.

이 부분은 [[Input Signal Integrity and Sensor Data Flow]]에서 따로 본다.

## 수학모델은 어디에 쓰이는가

[[Vessel Mathematical Model]]은 DP 컴퓨터 안에 있는 “가상의 선박”이라고 생각하면 된다.

이 모델은 이런 질문에 도움을 준다.

```text
이전 상태와 추력을 보면,
선박이 지금쯤 어디에 있어야 하지?
```

센서값이 갑자기 튀면 모델은 이렇게 도와준다.

```text
선박이 실제로 이렇게 갑자기 움직일 수 있나?
아니면 센서값이 튄 건가?
```

## Kalman Filter는 어디에 쓰이는가

[[Kalman Filter]]는 여러 센서값과 수학모델을 합쳐서 “가장 그럴듯한 현재 상태”를 만드는 부분이다.

쉽게 말하면 이 질문을 계속 한다.

```text
이번에는 센서를 더 믿을까?
모델 예측을 더 믿을까?
```

그래서 Kalman Filter는 센서와 controller 사이에 있다.

## 왜 중요한가

Closed-loop가 잘못된 값을 믿으면 위험하다.

예를 들어 PRS가 실제보다 2m 튀었는데 DP가 그것을 진짜 선박 이동으로 믿으면, 필요 없는 추력 명령을 만들 수 있다.

Gyro heading이 틀리면 좌표 변환이 틀어지고, 힘의 방향도 틀어질 수 있다.

MRU 보정이 틀리면 PRS 위치가 흔들리는 것처럼 보일 수 있다.

## DPO가 봐야 할 흐름

DPO는 단순히 위치오차만 보면 늦을 수 있다.

아래 흐름을 같이 봐야 한다.

```text
센서값
→ DP가 받아들인 값
→ 추정 위치
→ controller demand
→ thruster command
→ 실제 thruster feedback
→ 선박 반응
```

## 기억할 문장

Closed-loop는 “오차를 보고, 명령하고, 결과를 다시 확인하는 반복 고리”다.

DP의 문제를 볼 때는 항상 “이 문제가 고리의 어느 부분을 흔드는가?”를 생각한다.

## 관련 문서

- [[DP Controller]]
- [[Vessel Mathematical Model]]
- [[Kalman Filter]]
- [[Thrust Allocation]]
- [[Position Reference Systems]]
- [[Gyrocompass]]
- [[Motion Reference Unit]]
