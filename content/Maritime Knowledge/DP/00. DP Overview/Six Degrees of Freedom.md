# Six Degrees of Freedom

자유롭게 떠 있는 선박은 세 방향의 병진운동과 세 축 주위의 회전운동을 한다. 이를 **Six Degrees of Freedom, 6-DOF**라고 한다.
A freely floating vessel undergoes three translational movements and rotational movements around three axes. This is called **Six Degrees of Freedom, 6-DOF**.

## Coordinate System

**한국어**

| Axis | 방향 | 병진운동 | 회전운동 |
|---|---|---|---|
| Longitudinal axis, X | Fore–Aft | **Surge** | **Roll** |
| Transverse axis, Y | Port–Starboard | **Sway** | **Pitch** |
| Vertical axis, Z | Up–Down | **Heave** | **Yaw** |

**English**

| Axis | Direction | Translational Movement | Rotational Movement |
|---|---|---|---|
| Longitudinal axis, X | Fore–Aft | **Surge** | **Roll** |
| Transverse axis, Y | Port–Starboard | **Sway** | **Pitch** |
| Vertical axis, Z | Up–Down | **Heave** | **Yaw** |

> [!note]
> 축의 양(+) 방향과 회전 부호는 제조사와 좌표계 정의에 따라 달라질 수 있으므로 장비 Manual의 Convention을 확인해야 한다.
> The positive (+) direction and rotation sign of the axis may vary depending on the manufacturer and coordinate system definition, so the equipment Manual's Convention must be checked.

## Horizontal Plane

일반적인 DP 시스템이 직접 제어하는 운동이다.
Movement directly controlled by a typical DP system.

- **Surge**: 선박의 선수·선미 방향 이동
- **Surge**: Movement along the vessel's bow-to-stern direction
- **Sway**: 선박의 좌현·우현 방향 이동
- **Sway**: Movement along the vessel's port-to-starboard direction
- **Yaw**: 수직축 주위 회전, 즉 Heading 변화
- **Yaw**: Rotation around the vertical axis, i.e., Heading change

DP 제어기는 Thruster와 Propulsion System을 이용하여 X·Y 방향의 힘과 Z축 주위 Moment를 만든다.
The DP controller generates forces in the X and Y directions and a Moment around the Z-axis using the Thruster and Propulsion System.

## Vertical Plane and Attitude

일반적인 DP 시스템이 직접 제어하지 않는 운동이다.
Movement not directly controlled by a typical DP system.

- **Heave**: 선박의 상하운동
- **Heave**: Vertical movement of the vessel
- **Roll**: 선박 종축 주위의 좌우 회전
- **Roll**: Side-to-side rotation around the vessel's longitudinal axis
- **Pitch**: 선박 횡축 주위의 선수·선미 회전
- **Pitch**: Bow-to-stern rotation around the vessel's transverse axis

직접 제어하지 않더라도 다음 이유로 DP 운용에 중요하다.
Although not directly controlled, it is important for DP operation for the following reasons.

- MRU가 측정한 Roll, Pitch, Heave를 Position Reference 보정에 사용
- Using Roll, Pitch, and Heave measured by MRU for Position Reference correction
- 안테나와 센서가 회전 중심에서 떨어져 있을 때 발생하는 Lever-arm 효과 보정
- Correction of the Lever-arm effect when the antenna and sensor are located away from the center of rotation
- 작업 장비, Gangway, ROV 및 Lifting operation의 한계 결정
- Determining the limitations of work equipment, Gangway, ROV, and Lifting operation
- 거친 해상에서 센서 품질과 위치 유지 성능 평가
- Evaluating sensor quality and position holding performance in rough seas

## DP Perspective

```text
Controlled directly     Surge + Sway + Yaw
Measured / compensated  Heave + Roll + Pitch
```

→ [[What is DP?]]  
→ [[Motion Reference Unit]]
