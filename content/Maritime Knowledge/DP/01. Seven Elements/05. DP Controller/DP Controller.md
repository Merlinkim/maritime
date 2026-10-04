# DP Controller

## Role

DP Controller는 목표 위치·Heading과 추정된 현재 상태의 차이를 필요한 Force와 Moment로 변환하고, 이를 가용 추진기에 배분한다. 센서값을 그대로 따라가는 장치가 아니라 선박 모델과 필터를 이용해 신호를 해석한다.
The DP Controller converts the difference between the target position/Heading and the estimated current state into required Force and Moment, and distributes this to the available thrusters. It does not simply follow sensor values, but interprets the signal using the vessel model and filters.

## Processing Chain

1. PRS, gyro, MRU, wind 및 장비 feedback 수신
1. Receiving PRS, gyro, MRU, wind, and equipment feedback
2. 신호 검증과 [[Kalman Filter|state estimation]]
2. Signal validation and [[Kalman Filter|state estimation]]
3. 목표값과 현재 상태의 오차 계산
3. Calculating the error between the target value and the current state
4. [[PID Control|control law]]을 이용한 요구 Force와 Moment 계산
4. Calculating the required Force and Moment using [[PID Control|control law]]
5. [[Thrust Allocation]]으로 각 추진기 명령 생성
5. Generating individual thruster commands using [[Thrust Allocation]]
6. 실제 응답을 다시 받아 [[Closed-loop Control]] 수행
6. Receiving the actual response and performing [[Closed-loop Control]]

## Key Concepts

- [[Closed-loop Control]]
- [[Vessel Mathematical Model]]
- [[Kalman Filter]]
- [[PID Control]]
- [[Thrust Allocation]]

## What to Monitor

- 선택된 DP mode와 setpoint
- Selected DP mode and setpoint
- Position/heading error와 변화 추세
- Position/heading error and change trend
- 모델이 추정한 외력 및 current
- Estimated external force and current by the model
- 사용 중인 sensor와 PRS
- Used sensor and PRS
- 요구 추력과 가용 추력의 차이
- Difference between required and available thrust
- Controller, network와 I/O 상태
- Controller, network, and I/O status

## Failure Concerns

계산기 이중화만으로 제어계통 전체의 이중화가 완성되지는 않는다. 공통 전원, 네트워크, I/O, 센서, 소프트웨어와 제어 station의 고장 경계를 함께 확인해야 한다.
System redundancy alone does not complete the redundancy of the entire control system. Fault boundaries of common power, network, I/O, sensor, software, and the control station must be checked together.

## Connections

- 공식 시스템 경계: [[DP Control System (IMO)]]
- Official system boundary: [[DP Control System (IMO)]]
- 운용 인터페이스: [[HMI]]
- Operation interface: [[HMI]]
