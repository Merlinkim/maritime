# Motion Reference Unit

## Role in DP

Motion Reference Unit(MRU)는 선박의 **Roll, Pitch, Heave**와 장비에 따라 각속도·가속도를 측정한다. DP가 이 세 운동을 직접 억제하는 것은 아니지만, 안테나와 acoustic transducer가 동요하면서 생기는 위치 측정 오차를 보정하는 데 중요하다.
The Motion Reference Unit (MRU) measures the vessel's **Roll, Pitch, Heave** and angular velocity/acceleration depending on the equipment. Although DP does not directly suppress these three motions, it is crucial for compensating position measurement errors caused by the movement of the antenna and acoustic transducer.

## Typical Outputs

- Roll and pitch angle
- Heave 또는 vertical displacement
- Heave or vertical displacement
- Angular rate
- Linear acceleration
- Data validity와 quality status
- Data validity and quality status

## Motion Compensation

GNSS antenna나 PRS sensor가 선박의 회전중심과 떨어져 있으면 roll·pitch·yaw에 의해 센서 위치가 움직인다. Controller는 MRU와 gyro 정보, sensor lever arm을 이용하여 측정점을 원하는 vessel reference point로 환산한다.
If the GNSS antenna or PRS sensor is offset from the vessel's center of rotation, the sensor position moves due to roll, pitch, and yaw. The Controller uses the MRU and gyro information, and the sensor lever arm to transform the measurement point to the desired vessel reference point.

Hydroacoustic system에서는 transducer의 기울기를 보정하지 않으면 수심이 깊을수록 수평 위치오차가 커질 수 있다.
In a hydroacoustic system, if the transducer tilt is not compensated, the horizontal position error can increase as the water depth increases.

## Lever Arm Error

Lever arm은 MRU, GNSS antenna, acoustic transducer, vessel reference point 사이의 거리와 방향이다.
Lever arm is the distance and direction between the MRU, GNSS antenna, acoustic transducer, and vessel reference point.

작은 roll/pitch 오차도 antenna가 높이 설치되어 있으면 position error로 커질 수 있다.
A small roll/pitch error can become a position error when the antenna is installed high above the reference point.

```text
High antenna + wrong roll/pitch compensation
  → wrong corrected PRS position
  → false position input to DP
```

Induction 수준에서는 MRU가 “동요를 완벽히 제거하는 장비”가 아니라 “동요를 측정하고 보정값을 계산하는 장비”라는 점을 기억하면 된다.
At induction level, remember that the MRU does not perfectly remove motion; it measures motion and helps calculate compensation.

## DPO Watch Point

PRS position이 wave 주기와 비슷하게 흔들리면 MRU compensation, lever arm, time sync 문제를 의심할 수 있다.
If PRS position moves with a wave-like period, MRU compensation, lever arm, or time synchronization should be considered.

## Important Configuration

- MRU 설치 방향과 좌표축
- MRU installation direction and coordinate axes
- 센서 위치 및 lever-arm 값
- Sensor position and lever-arm values
- Roll/pitch sign convention
- Heave mode와 filter setting
- Heave mode and filter setting
- Update rate, latency와 time synchronization
- Update rate, latency, and time synchronization

## Failure and Degradation

- Frozen 또는 noisy output
- Frozen or noisy output
- 잘못된 mounting angle이나 lever arm
- Incorrect mounting angle or lever arm
- Bias와 slow drift
- Bias and slow drift
- Time delay 또는 서로 다른 장비 간 시간 불일치
- Time delay or time mismatch between different equipment
- 공통 전원·network 상실
- Common power or network loss
- 한계 이상의 동요로 인한 quality 저하
- Quality degradation due to excessive motion

## DPO Monitoring

- 복수 MRU 간 roll/pitch 차이와 추세
- Roll/pitch difference and trend among multiple MRUs
- 실제 선체 운동과 표시값의 합리성
- Rationality between actual vessel motion and displayed values
- PRS quality가 동요 주기와 함께 나빠지는지 여부
- Whether the PRS quality degrades along with the motion period
- 선택된 MRU와 해당 PRS의 compensation source
- Selected MRU and the corresponding PRS compensation source
- 정비 후 방향, offset과 sign 설정의 변경 여부
- Changes in direction, offset, and sign settings after maintenance

## Related Notes

- [[Environmental Sensors]]
- [[Position Reference Systems]]
- [[Gyrocompass]]
- [[Kalman Filter]]
