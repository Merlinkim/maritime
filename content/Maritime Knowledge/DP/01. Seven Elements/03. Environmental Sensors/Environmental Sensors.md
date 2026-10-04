# Environmental Sensors

## Role

Environmental Sensors는 DP 제어기가 외력과 선박의 자세·운동을 판단하는 데 필요한 측정값을 제공한다. 센서값은 직접 제어 입력으로 쓰이거나 Position Reference의 보정 및 상태 추정에 사용된다.
Environmental Sensors provide measurements necessary for the DP controller to determine external forces and vessel attitude/motion. Sensor values can be used as direct control inputs or for calibration and state estimation of the Position Reference.

## Main Sensors

- [[Wind Sensor]]: 풍향·풍속 측정, wind feed-forward에 사용
- [[Wind Sensor]]: Measures wind direction and speed, used for wind feed-forward
- [[Gyrocompass]]: Heading과 yaw 정보 제공
- [[Gyrocompass]]: Provides heading and yaw information
- [[Motion Reference Unit]]: Roll, pitch, heave 및 가속도 측정
- [[Motion Reference Unit]]: Measures roll, pitch, heave, and acceleration

## Operating Principles

- 센서는 차폐, 난류, 진동과 열의 영향을 고려해 설치한다.
- Sensors must be installed considering the effects of shielding, turbulence, vibration, and heat.
- 동일 원인으로 함께 틀어질 수 있는 센서는 숫자가 많아도 완전한 독립성을 제공하지 않는다.
- Sensors that can fail together due to the same cause do not provide complete independence, even if there are many.
- 제어에 선택된 센서, 제외된 센서와 값의 차이를 지속적으로 감시한다.
- Continuously monitors the difference between selected sensors and excluded sensors, and their values.
- 편차, 급변, 고착값과 시간 동기 오류를 단순 장비 고장만큼 중요하게 본다.
- Treats deviation, rapid change, stuck values, and time synchronization errors as critically as simple equipment failure.

## Failure Questions

- 잘못된 값이 자동으로 거부되는가?
- Are incorrect values automatically rejected?
- 운용자는 어느 센서가 제어에 사용 중인지 알 수 있는가?
- Can the operator know which sensors are being used for control?
- 센서 교체 또는 재선택 시 제어가 불안정해지지 않는가?
- Does control remain stable when sensors are replaced or reselected?
- 전원·네트워크·위치가 실제로 분리되어 있는가?
- Are the power, network, and location physically separated?

## Connections

- 공식 시스템 경계: [[DP Control System (IMO)]]
- Official system boundary: [[DP Control System (IMO)]]
- 위치 정보: [[Position Reference Systems]]
- Position information: [[Position Reference Systems]]
- 정보 처리: [[DP Controller]]
- Information processing: [[DP Controller]]
