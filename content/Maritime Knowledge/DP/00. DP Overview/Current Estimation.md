# Current Estimation

DP 시스템은 일반적으로 실제 해류를 직접 측정하지 않는다. 대신 선박의 운동, 추진기 출력, 측정된 바람 및 수학적 모델을 결합하여 선박에 작용하는 **저주파 외력**을 추정한다.
The DP system generally does not directly measure actual currents. Instead, it estimates the **low-frequency external forces** acting on the vessel by combining vessel motion, thruster output, measured wind, and mathematical models.

## Inputs

- Position Reference measurements
- Gyro heading
- MRU data
- Wind measurements
- Thruster command and feedback
- Vessel mass, damping and hydrodynamic model
- Draught and configuration data

## Estimation Process

```text
Sensor Measurements
        +
Vessel Mathematical Model
        +
Known Thruster and Wind Effects
        ↓
State Estimator / Observer
        ↓
Estimated Position and Velocity
        +
Estimated Low-frequency Disturbance
```

많은 DP 시스템은 Kalman filter 또는 이와 유사한 Observer를 사용한다. 목적은 다음과 같다.
Many DP systems use a Kalman filter or similar Observer. The purpose is as follows:

- Noise가 있는 Position Reference를 평활화
- Smoothing noisy Position Reference
- Reference update 사이의 선박 상태 예측
- Predicting vessel state between Reference updates
- 일시적인 Measurement loss 동안 모델 기반 추정 유지
- Maintaining model-based estimation during temporary Measurement loss
- 빠른 Wave-frequency motion과 저주파 Drift motion 분리
- Separating fast Wave-frequency motion from low-frequency Drift motion
- 제어에 필요한 저주파 외력 추정
- Estimating low-frequency external forces required for control

## Why wave filtering matters

DP가 모든 파도 주기의 운동을 따라가려고 하면 Thruster가 빠르게 반복 작동하면서 전력과 장비를 불필요하게 소모할 수 있다. 따라서 제어기는 일반적으로 빠른 wave-frequency motion을 필터링하고 위치를 천천히 이동시키는 저주파 성분에 반응한다.
If DP tries to follow all wave cycles of motion, the thrusters can rapidly cycle on and off, unnecessarily consuming power and equipment. Therefore, the controller generally filters out fast wave-frequency motion and responds to the low-frequency component that slowly moves the position.

> [!important]
> 필터링은 파도의 영향을 무시한다는 뜻이 아니다. 고주파 운동을 Thruster로 직접 추종하지 않도록 분리하고, 평균 및 저주파 Drift 영향은 계속 보상한다는 뜻이다.
> Filtering does not mean ignoring the effect of waves. It means separating the high-frequency motion so that the thrusters do not directly track it, while still compensating for the average and low-frequency Drift influence.

## Limitations

추정 품질은 다음 조건에 영향을 받는다.
The estimation quality is affected by the following conditions.

- 부정확한 선박 모델 또는 Draught 입력
- Inaccurate vessel model or Draught input
- Thruster feedback 오류와 추력 손실
- Thruster feedback error and thrust loss
- Wind Sensor 오차
- Wind Sensor error
- Position Reference bias 또는 jump
- Position Reference bias or jump
- 급격한 환경 변화
- Rapid environmental changes
- Riser, cable, hose 등 모델에 없는 외력
- External forces not included in the model, such as risers, cables, or hoses
- 너무 짧거나 부적절한 Filter time constant
- Too short or inappropriate Filter time constant

추정 결과가 실제 환경과 다르더라도 반드시 시스템 고장을 의미하는 것은 아니다. 반대로 안정적으로 보이는 추정값이 모든 센서가 정상임을 보장하지도 않는다.
The estimation result does not necessarily mean a system failure even if it differs from the actual environment. Conversely, an estimation value that appears stable does not guarantee that all sensors are normal.

## Output

추정된 저주파 외력은 제어기의 Bias compensation에 사용되며, 일부 시스템에서는 [[DP Current]]라는 등가 Current vector로 운용자에게 표시된다.
The estimated low-frequency external force is used for the controller's Bias compensation, and in some systems, it is displayed to the operator as an equivalent Current vector called [[DP Current]].

→ [[DP Current]]  
→ [[Kalman Filter]]  
→ [[Closed-loop Control]]

